// Scopoli · Disease ontologies (a Koetai product) — a Rosalind-style course on
// finding, navigating, mapping and pooling with disease terminologies.
// Plain JS, hash routing, progress kept in localStorage.

const BY_ID = Object.fromEntries(PROBLEMS.map((p) => [p.id, p]));
const STORE = "koetai.scopoli-ontologies.v1";
const view = document.getElementById("view");

// ------------------------------------------------------------------ storage
function load() {
  let s;
  try { s = JSON.parse(localStorage.getItem(STORE)); } catch {}
  return Object.assign({ solved: {}, drafts: {} }, s || {});
}
function save(state) {
  try { localStorage.setItem(STORE, JSON.stringify(state)); } catch {}
}
let state = load();
const isSolved = (id) => !!state.solved[id];

function markSolved(p) {
  const first = !isSolved(p.id);
  state.solved[p.id] = Date.now();
  save(state);
  updateProgress();
  const nav = document.querySelector(".pnav");
  if (nav) nav.outerHTML = pageNav(p);
  return first;
}

// ------------------------------------------------------------------ helpers
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const trackDot = (t) => `<span class="dot" style="background:${TRACKS[t].color}"></span>`;
const kindOf = (p) => p.kind || "answer";
const unsolvedPrereqs = (p) => p.prereqs.filter((id) => !isSolved(id));
const children = (id) => PROBLEMS.filter((p) => p.prereqs.includes(id));
const TOOL = { guide: "Reading", answer: "Answer", choice: "Quiz", table: "Annotate" };
const toolLabel = (p) => p.tool || TOOL[kindOf(p)];

// Identifiers are compared in a canonical CURIE form, so ORPHA:558,
// Orphanet_558 and http://www.orpha.net/ORDO/Orphanet_558 are the same answer.
const CANON = [
  [/^https?:\/\/www\.orpha\.net\/ordo\/orphanet_/, "orpha:"],
  [/^(orphanet|ordo|orpha)[:_]/, "orpha:"],
  [/^https?:\/\/purl\.obolibrary\.org\/obo\/([a-z]+)_/, "$1:"],
  [/^(hp|mondo|ncit|doid)_/, "$1:"],
  [/^https?:\/\/w3id\.org\/ofco\//, "ofco:"],
];
function canon(x) {
  let s = String(x).trim().replace(/^<|>$/g, "").toLowerCase().replace(/\s+/g, " ");
  for (const [re, to] of CANON) s = s.replace(re, to);
  if (/^[\d,. %]+$/.test(s)) s = s.replace(/[, %]/g, "");
  return s.replace(/ /g, "");
}
function matches(input, accepted) {
  const got = canon(input);
  if (!got) return false;
  return [].concat(accepted).some((a) => {
    const want = canon(a);
    if (got === want) return true;
    // A bare number counts for an ORPHAcode; a bare name counts for an OFCO term.
    if (/^\d+$/.test(got) && want === "orpha:" + got) return true;
    return want.startsWith("ofco:") && got === want.slice(5);
  });
}

function updateProgress() {
  const n = PROBLEMS.filter((p) => isSolved(p.id)).length;
  document.getElementById("progress").textContent = `${n} / ${PROBLEMS.length} solved`;
}

function cite(key) {
  const r = REFS[key];
  if (!r) return "";
  const link = r.doi ? `https://doi.org/${r.doi}` : r.url;
  return `${r.authors} (${r.year}). ${r.title}. <i>${r.venue}</i>.${link ? ` <a href="${link}" target="_blank">${esc(r.doi ? "doi:" + r.doi : link.replace(/^https?:\/\//, ""))}</a>` : ""}${r.pmid ? ` · PMID <a href="https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/" target="_blank">${r.pmid}</a>` : ""}`;
}

// ------------------------------------------------------------------- views
function home() {
  const counts = COURSE.order.map((t) => {
    const ps = PROBLEMS.filter((p) => p.track === t);
    return { t, total: ps.length, done: ps.filter((p) => isSolved(p.id)).length, first: ps[0] };
  });
  const next = PROBLEMS.find((p) => !isSolved(p.id) && unsolvedPrereqs(p).length === 0);
  const started = Object.keys(state.solved).length > 0;
  view.innerHTML = `
    <section class="hero">
      <h1>${COURSE.hero.title}</h1>
      <p>${COURSE.hero.text}</p>
      <p>${next ? `<a class="btn primary" href="#/p/${next.id}">${started ? "Continue" : "Start"} with ${next.id} · ${esc(next.title)} →</a>` : `<span class="btn primary">All problems solved 🎉</span>`}
      <a class="btn" href="#/tree">View the tree</a></p>
    </section>
    <div class="tracks">
      ${counts.map(({ t, total, done, first }, i) => `
        <div class="card">
          <div class="step">Chapter ${i + 1}</div>
          <h3>${trackDot(t)}${TRACKS[t].name}</h3>
          <div class="empty">${COURSE.blurbs[t]}</div>
          <p style="margin:10px 0 0;font-size:13px">${done} / ${total} solved · starts at <a href="#/p/${first.id}">${first.id}</a></p>
        </div>`).join("")}
    </div>`;
}

let listFilter = "all";
function list() {
  const rows = PROBLEMS.filter((p) => listFilter === "all" || p.track === listFilter);
  view.innerHTML = `
    <h1>Problems</h1>
    <div class="filters">
      <button class="chip ${listFilter === "all" ? "on" : ""}" data-f="all">All</button>
      ${COURSE.order.map((k) => `<button class="chip ${listFilter === k ? "on" : ""}" data-f="${k}">${trackDot(k)}${TRACKS[k].name}</button>`).join("")}
    </div>
    <div class="table-scroll"><table class="list">
      <thead><tr><th>ID</th><th>Title</th><th>Concept</th><th>Where</th><th>Status</th></tr></thead>
      <tbody>${rows.map((p) => `
        <tr>
          <td class="id">${trackDot(p.track)}<a href="#/p/${p.id}">${p.id}</a></td>
          <td><a href="#/p/${p.id}">${esc(p.title)}</a></td>
          <td class="concept">${esc(p.concept)}</td>
          <td class="concept">${esc(toolLabel(p))}</td>
          <td>${isSolved(p.id) ? '<span class="solved">✓ solved</span>' : unsolvedPrereqs(p).length ? '<span class="empty">locked</span>' : "open"}</td>
        </tr>`).join("")}
      </tbody>
    </table></div>`;
  view.querySelectorAll("[data-f]").forEach((b) => b.addEventListener("click", () => { listFilter = b.dataset.f; list(); }));
}

function tree() {
  // Layer = longest path from a root, then order each layer by parents' position.
  const level = {};
  const depth = (id) => level[id] ?? (level[id] = Math.max(-1, ...BY_ID[id].prereqs.map(depth)) + 1);
  PROBLEMS.forEach((p) => depth(p.id));
  const layers = [];
  PROBLEMS.forEach((p) => (layers[level[p.id]] ||= []).push(p.id));
  const order = Object.fromEntries(COURSE.order.map((t, i) => [t, i]));
  const xpos = {};
  layers.forEach((ids) => {
    const bary = (id) => { const ps = BY_ID[id].prereqs; return ps.length ? ps.reduce((s, q) => s + xpos[q], 0) / ps.length : 0; };
    ids.sort((a, b) => order[BY_ID[a].track] - order[BY_ID[b].track] || bary(a) - bary(b));
    ids.forEach((id, i) => (xpos[id] = i - (ids.length - 1) / 2));
  });
  const W = 118, H = 92, NW = 96, NH = 44;
  const maxW = Math.max(...layers.map((l) => l.length));
  const width = maxW * W + 40, height = layers.length * H + 30;
  const cx = (id) => width / 2 + xpos[id] * W;
  const cy = (id) => 30 + level[id] * H;
  let edges = "", nodes = "";
  PROBLEMS.forEach((p) => p.prereqs.forEach((q) => {
    const x1 = cx(q), y1 = cy(q) + NH / 2, x2 = cx(p.id), y2 = cy(p.id) - NH / 2, my = (y1 + y2) / 2;
    edges += `<path class="edge" d="M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}"/>`;
  }));
  PROBLEMS.forEach((p) => {
    const c = TRACKS[p.track].color, s = isSolved(p.id);
    nodes += `<a href="#/p/${p.id}"><g class="node ${s ? "solved" : ""}" transform="translate(${cx(p.id) - NW / 2},${cy(p.id) - NH / 2})">
      <title>${esc(p.title)} — ${esc(p.concept)}</title>
      <rect width="${NW}" height="${NH}" rx="8" style="stroke:${c};${s ? `fill:${c}` : ""}"/>
      <text x="${NW / 2}" y="19" text-anchor="middle">${p.id}${s ? " ✓" : ""}</text>
      <text class="sub" x="${NW / 2}" y="34" text-anchor="middle">${esc(p.title.length > 17 ? p.title.slice(0, 16) + "…" : p.title)}</text>
    </g></a>`;
  });
  view.innerHTML = `
    <h1>Problem tree</h1>
    <p class="empty">Arrows point from a problem to the problems it unlocks. Filled boxes are solved.</p>
    <div class="tree-box"><svg viewBox="0 0 ${width} ${height}" width="${width}" role="img" aria-label="Problem dependency tree">${edges}${nodes}</svg></div>
    <div class="legend">${COURSE.order.map((k) => `<span>${trackDot(k)}${TRACKS[k].name}</span>`).join("")}</div>`;
}

function references() {
  const groups = {};
  Object.entries(REFS).forEach(([k, r]) => (groups[r.group] ||= []).push(k));
  view.innerHTML = `<div class="about">
    <h1>References</h1>
    <p>Papers and specifications cited in the course. Problems link here under <i>Further reading</i>.</p>
    ${Object.entries(groups).map(([g, keys]) => `<h2>${esc(g)}</h2><ul class="refs">${keys.map((k) => `<li id="ref-${k}">${cite(k)}</li>`).join("")}</ul>`).join("")}
  </div>`;
}

function about() {
  view.innerHTML = `<div class="about">
    <h1>About</h1>
    ${COURSE.about}
    <h2>Why "Scopoli"?</h2>
    <p><i>Koetai</i> takes its name from the four-eyed fish <i>Anableps</i>, which swims at the surface of mangrove waters and sees above and below the waterline at once. The Tyrolean naturalist <a href="https://www.wikidata.org/wiki/Q84181" target="_blank">Giovanni Antonio Scopoli</a> (1723–1788) established the genus <a href="https://www.wikidata.org/wiki/Q1976257" target="_blank"><i>Anableps</i></a> in 1777. A careful annotator, like the fish, keeps two worlds in view: the data and the terminology it is described with.</p>
    <p>Your progress and drafts are stored only in this browser.</p>
    <p><button class="btn" id="reset">Reset my progress</button></p>
  </div>`;
  document.getElementById("reset").addEventListener("click", () => {
    if (confirm("Forget all solved problems and drafts?")) { state = { solved: {}, drafts: {} }; save(state); updateProgress(); about(); }
  });
}

// Problems that are open now (prerequisites met, not solved), in course order,
// starting after `p` and preferring its own chapter.
function openAfter(p) {
  const i = PROBLEMS.indexOf(p);
  const ordered = [...PROBLEMS.slice(i + 1), ...PROBLEMS.slice(0, i)];
  const open = ordered.filter((q) => !isSolved(q.id) && unsolvedPrereqs(q).length === 0);
  return [...open.filter((q) => q.track === p.track), ...open.filter((q) => q.track !== p.track)];
}

function nextLinks(p) {
  const btn = (c) => `<a class="btn" href="#/p/${c.id}">${c.id} · ${esc(c.title)} →</a>`;
  const unlocked = children(p.id).filter((c) => unsolvedPrereqs(c).length === 0 && !isSolved(c.id));
  if (unlocked.length) return `<div class="next">Unlocked: ${unlocked.map(btn).join("")}</div>`;
  const next = openAfter(p)[0];
  if (next) return `<div class="next">Next up: ${btn(next)} <a href="#/tree">or pick from the tree</a></div>`;
  return `<div class="next">That was the last open problem. <a class="btn" href="#/tree">View the tree</a></div>`;
}

// Previous / tree / next bar under every problem, so no page is a dead end.
function pageNav(p) {
  const i = PROBLEMS.indexOf(p), prev = PROBLEMS[i - 1], next = PROBLEMS[i + 1], open = openAfter(p)[0];
  const link = (q, label) => q ? `<a href="#/p/${q.id}">${label}</a>` : "<span></span>";
  return `<nav class="pnav">
    ${link(prev, prev ? `← ${prev.id} · ${esc(prev.title)}` : "")}
    <span class="pnav-mid">${open && !isSolved(p.id) ? "" : open ? `<a class="btn primary" href="#/p/${open.id}">Next open: ${open.id} →</a>` : ""} <a href="#/tree">Tree</a></span>
    ${link(next, next ? `${next.id} · ${esc(next.title)} →` : "")}
  </nav>`;
}

function problem(id) {
  const p = BY_ID[id];
  if (!p) { view.innerHTML = `<p>No problem called ${esc(id)}. <a href="#/problems">Back to the list</a>.</p>`; return; }
  const kind = kindOf(p);
  const missing = unsolvedPrereqs(p);
  view.innerHTML = `
    <div class="crumbs"><a href="#/problems">Problems</a> › ${trackDot(p.track)}${TRACKS[p.track].name}</div>
    <div class="ptitle"><span class="pid">${p.id}</span><h1>${esc(p.title)}</h1></div>
    <div class="meta">
      <span>Concept: <b>${esc(p.concept)}</b></span>
      <span>Where: <b>${esc(toolLabel(p))}</b></span>
      ${p.prereqs.length ? `<span>After: ${p.prereqs.map((q) => `<a href="#/p/${q}">${q}</a>`).join(", ")}</span>` : ""}
      ${isSolved(p.id) ? '<span class="badge solved-badge">✓ solved</span>' : ""}
    </div>
    ${missing.length ? `<div class="note">Recommended first: ${missing.map((q) => `<a href="#/p/${q}">${q} · ${esc(BY_ID[q].title)}</a>`).join(", ")}. You can still try this one.</div>` : ""}
    <div class="cols">
      <div>
        <div class="section"><h2>Background</h2>${p.story}</div>
        <div class="section"><h2>${kind === "guide" ? "In depth" : "The concept"}</h2>${p.lesson}</div>
        <div class="section"><h2>${kind === "guide" ? "Your step" : "Problem"}</h2>
          <div class="task">${p.task}</div>
          ${p.hint ? `<details><summary>Hint</summary><p>${p.hint}</p></details>` : ""}
          <div id="reveal"></div>
        </div>
        ${p.refs ? `<div class="section"><h2>Further reading</h2><ul class="refs">${p.refs.map((k) => `<li>${cite(k)}</li>`).join("")}</ul></div>` : ""}
      </div>
      <div class="editor-pane" id="pane"></div>
    </div>
    ${pageNav(p)}`;
  const pane = document.getElementById("pane");
  const verdictBox = () => document.getElementById("verdict");
  const solvedNow = (extra = "") => {
    const first = markSolved(p);
    renderReveal(p);
    verdictBox().innerHTML = `<div class="verdict ok"><b>Correct!</b>${extra}${first ? " Problem solved." : ""}${nextLinks(p)}</div>`;
  };

  if (kind === "guide") {
    pane.innerHTML = `<div class="card done-card">
      <p>${isSolved(p.id) ? "You've completed this step." : "Read the background and work through the step, then mark it as done."}</p>
      <button class="btn primary" id="done">${isSolved(p.id) ? "✓ Done" : "Mark as done"}</button>
      <div id="verdict"></div></div>`;
    document.getElementById("done").addEventListener("click", () => {
      markSolved(p);
      document.getElementById("done").textContent = "✓ Done";
      verdictBox().innerHTML = `<div class="verdict ok"><b>Done.</b>${nextLinks(p)}</div>`;
    });
    return;
  }

  if (kind === "answer") {
    pane.innerHTML = `<div class="card done-card">
      <label for="answer">Your answer</label>
      <div class="actions"><input id="answer" type="text" spellcheck="false" autocomplete="off" placeholder="${esc(p.placeholder || "type your answer")}">
      <button class="btn primary" id="submit">Submit answer</button></div>
      <div id="verdict"></div></div>`;
    const input = document.getElementById("answer");
    input.value = state.drafts[p.id] ?? "";
    input.addEventListener("input", () => { state.drafts[p.id] = input.value; save(state); });
    const check = async () => {
      let accepted = p.answers;
      if (p.live) {
        verdictBox().innerHTML = `<div class="verdict info">Checking against the live source…</div>`;
        try { accepted = await p.live(); } catch {}
      }
      if (matches(input.value, accepted)) solvedNow();
      else verdictBox().innerHTML = `<div class="verdict bad"><b>Not quite.</b> ${p.wrong || "Try again."}</div>`;
    };
    document.getElementById("submit").addEventListener("click", check);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
    renderReveal(p);
    return;
  }

  if (kind === "choice") {
    const type = p.multi ? "checkbox" : "radio";
    pane.innerHTML = `<div class="card done-card">
      <div class="choice-q">${p.multi ? "Select <b>all</b> that apply." : "Select one."}</div>
      ${p.options.map((o, i) => `<label class="opt"><input type="${type}" name="opt" value="${i}"> <span>${o.text}</span></label>`).join("")}
      <div class="actions"><button class="btn primary" id="submit">Submit answer</button></div>
      <div id="verdict"></div></div>`;
    document.getElementById("submit").addEventListener("click", () => {
      const picked = [...pane.querySelectorAll("input[name=opt]")].map((x) => x.checked);
      const wrong = p.options.filter((o, i) => !!o.correct !== picked[i]).length;
      if (!wrong) {
        pane.querySelectorAll(".opt .why").forEach((el) => el.remove());
        pane.querySelectorAll(".opt").forEach((el, i) => { if (p.options[i].why) el.insertAdjacentHTML("beforeend", `<div class="why">${p.options[i].why}</div>`); });
        solvedNow();
      } else {
        verdictBox().innerHTML = `<div class="verdict bad"><b>Not quite.</b> ${p.multi ? `${wrong} option${wrong === 1 ? " is" : "s are"} set wrongly.` : "Try again."}</div>`;
      }
    });
    renderReveal(p);
    return;
  }

  // table: paste "id,code" lines; each row is checked against the key.
  pane.innerHTML = `<div class="card done-card">
    ${p.data ? `<p><a class="btn" href="${p.data}" download>⬇ ${esc(p.data.split("/").pop())}</a></p>` : ""}
    <label for="paste">Paste your annotations, one row per line: <code>${esc(p.columns.join(","))}</code></label>
    <textarea id="paste" rows="12" spellcheck="false" placeholder="${esc(p.columns.join(","))}"></textarea>
    <div class="actions"><button class="btn primary" id="submit">Check annotations</button></div>
    <div id="verdict"></div><div id="out"></div></div>`;
  const box = document.getElementById("paste");
  box.value = state.drafts[p.id] ?? "";
  box.addEventListener("input", () => { state.drafts[p.id] = box.value; save(state); });
  document.getElementById("submit").addEventListener("click", () => {
    const given = {};
    box.value.split(/\r?\n/).forEach((line) => {
      const cells = line.split(/[,;\t]/).map((c) => c.trim().replace(/^"|"$/g, ""));
      if (cells[0] && cells[0] !== p.columns[0]) given[cells[0]] = cells[1] || "";
    });
    const ids = Object.keys(p.key);
    const rows = ids.map((rid) => ({ rid, got: given[rid] ?? "", ok: matches(given[rid] ?? "", p.key[rid]) }));
    const good = rows.filter((r) => r.ok).length;
    document.getElementById("out").innerHTML = `<div class="results"><table><thead><tr><th>${esc(p.columns[0])}</th><th>your ${esc(p.columns[1])}</th><th></th></tr></thead>
      <tbody>${rows.map((r) => `<tr><td>${esc(r.rid)}</td><td>${esc(r.got) || '<span class="empty">missing</span>'}</td><td>${r.ok ? "✓" : "✗"}</td></tr>`).join("")}</tbody></table></div>`;
    if (good === ids.length) solvedNow(` All ${ids.length} rows annotated well.`);
    else verdictBox().innerHTML = `<div class="verdict bad"><b>Not quite.</b> ${good} of ${ids.length} rows are right. ${p.wrong || ""}</div>`;
  });
  renderReveal(p);
}

function renderReveal(p) {
  const box = document.getElementById("reveal");
  if (!box || !p.explain) return;
  const body = p.answers ? `<p>Answer: <code>${esc([].concat(p.answers)[0])}</code></p>`
    : p.options ? `<ul>${p.options.map((o) => `<li>${o.correct ? "✓" : "✗"} ${o.text}${o.why ? ` — <span class="empty">${o.why}</span>` : ""}</li>`).join("")}</ul>`
    : p.key ? `<div class="table-scroll"><table class="mini"><tr><th>${esc(p.columns[0])}</th><th>${esc(p.columns[1])}</th></tr>${Object.entries(p.key).map(([k, v]) => `<tr><td>${esc(k)}</td><td><code>${esc([].concat(v)[0])}</code></td></tr>`).join("")}</table></div>` : "";
  if (isSolved(p.id)) box.innerHTML = `<div class="reveal"><h2>Explanation</h2>${body}<p>${p.explain}</p></div>`;
  else if (kindOf(p) !== "guide") box.innerHTML = `<details><summary>Give up and show the answer</summary>${body}<p>${p.explain}</p></details>`;
}

// ------------------------------------------------------------------ router
function route() {
  const h = location.hash.replace(/^#\/?/, "");
  const [page, arg] = h.split("/");
  document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("on", a.dataset.nav === (page === "p" ? "problems" : page)));
  if (page === "problems") list();
  else if (page === "tree") tree();
  else if (page === "references") references();
  else if (page === "about") about();
  else if (page === "p") problem(arg?.toUpperCase());
  else home();
  updateProgress();
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);
route();
