// Scopoli · Disease ontologies — course content.
// Facts were checked against OLS (ORDO 4.9, Mondo 2026-10-06, HPO 2026-09-01),
// Athena (vocabulary release v20260829), Orphadata (product 4 and 6, June 2026)
// and OFCO at commit 43c5989 in October 2026.

const COURSE = {
  hero: {
    title: "Find, map and pool with disease ontologies",
    text: "Learn to find the right term for a rare disease, a phenotype or a functional limitation in OLS, BioPortal and Athena. Then navigate ORDO, HOOM and OFCO, follow mappings without losing meaning, and annotate and pool real-looking datasets without the classic mistakes: version mismatch, lumped codes and licence conflicts. Solve one problem to unlock the next.",
  },
  order: ["kb", "find", "nav", "auth", "map", "lic", "ann", "pool"],
  blurbs: {
    kb: "Controlled vocabularies, thesauri, classifications, terminologies and ontologies: what they share and how they differ.",
    find: "Find the proper term for a concept in EBI OLS, BioPortal and OHDSI Athena, and learn what each portal is good at.",
    nav: "Move through the term space: parents, groups and subtypes, polyhierarchy, obsolete terms, HPO and OFCO trees, HOOM frequencies.",
    auth: "Who owns a term? Authoritative sources versus mirrors, versions and release files.",
    map: "Cross-references and mapping qualifiers (E, NTBT, BTNT), OMOP 'Maps to', SSSOM, and when a mapping is safe to use.",
    lic: "Licence stacking and version mismatch, with two real cases: Marfan syndrome type 2 and glioblastoma.",
    ann: "Annotate free-text diagnoses, phenotypes and functional limitations with ORDO, HPO and OFCO, and record what you used.",
    pool: "Pool heterogeneous registries coded in ICD-10, ORPHAcodes, Mondo, ICD-O-3, ICF and HPO, and see how wrong a naive pooling gets.",
  },
  about: `<p>Scopoli teaches the way <a href="https://rosalind.info" target="_blank">Rosalind</a> teaches bioinformatics: through a tree of small, self-contained problems grounded in real data. This course is about disease ontologies and terminologies, starting from Orphanet's ORDO, HOOM and OFCO. It is part of <a href="https://koetai.github.io/" target="_blank">Koetai</a>. Its sister course, <a href="https://koetai.github.io/scopoli/" target="_blank">Scopoli · SPARQL</a>, teaches querying knowledge graphs.</p>
    <h2>How checking works</h2>
    <p>Answers are compared after normalising identifiers, so <code>ORPHA:558</code>, <code>Orphanet_558</code> and <code>http://www.orpha.net/ORDO/Orphanet_558</code> count as the same answer. A few problems are checked live against OLS, so they stay valid when a new release appears. Others are pinned to the release named in the problem.</p>
    <h2>The datasets</h2>
    <p>All patients in the <a href="https://github.com/Koetai/scopoli-ontologies/tree/main/data" target="_blank">registries</a> are invented by <a href="https://github.com/Koetai/scopoli-ontologies/blob/main/prepare/make_datasets.py" target="_blank">make_datasets.py</a>. The codes, genes and reclassifications in them are real.</p>
    <h2>Sources and licences</h2>
    <p>ORDO, HOOM and the Orphanet data are © INSERM/Orphanet, CC BY 4.0, via <a href="https://sciences.orphadata.com/" target="_blank">Orphadata</a>. OFCO is from <a href="https://github.com/Orphanet/ofco-ontology" target="_blank">Orphanet/ofco-ontology</a> (no licence stated; see problem NOLI). Mondo is CC BY 4.0. HPO is used under its own licence. SNOMED CT, OMIM, ICD and MedDRA codes are cited as identifiers only.</p>`,
};

const TRACKS = {
  kb: { name: "Words, terms and concepts", color: "var(--t-kb)" },
  find: { name: "Finding terms", color: "var(--t-find)" },
  nav: { name: "Navigating the term space", color: "var(--t-nav)" },
  auth: { name: "Authoritative sources", color: "var(--t-auth)" },
  map: { name: "Mappings", color: "var(--t-map)" },
  lic: { name: "Licences and versions", color: "var(--t-lic)" },
  ann: { name: "Annotating datasets", color: "var(--t-ann)" },
  pool: { name: "Pooling datasets", color: "var(--t-pool)" },
};

// All checked against PubMed or Crossref.
const REFS = {
  gruber1993: { group: "Ontologies and terminologies", authors: "Gruber TR", year: 1993, title: "A translation approach to portable ontology specifications", venue: "Knowledge Acquisition 5(2):199–220", doi: "10.1006/knac.1993.1008" },
  cimino1998: { group: "Ontologies and terminologies", authors: "Cimino JJ", year: 1998, title: "Desiderata for controlled medical vocabularies in the twenty-first century", venue: "Methods Inf Med 37(4–5):394–403", pmid: "9865037" },
  smith2007: { group: "Ontologies and terminologies", authors: "Smith B, Ashburner M, Rosse C, et al.", year: 2007, title: "The OBO Foundry: coordinated evolution of ontologies to support biomedical data integration", venue: "Nat Biotechnol 25:1251–1255", doi: "10.1038/nbt1346", pmid: "17989687" },
  bodenreider2008: { group: "Ontologies and terminologies", authors: "Bodenreider O", year: 2008, title: "Biomedical ontologies in action: role in knowledge management, data integration and decision support", venue: "Yearb Med Inform 2008:67–79", pmid: "18660879" },
  rath2012: { group: "Rare-disease resources", authors: "Rath A, Olry A, Dhombres F, et al.", year: 2012, title: "Representation of rare diseases in health information systems: the Orphanet approach to serve a wide range of end users", venue: "Hum Mutat 33(5):803–808", doi: "10.1002/humu.22078", pmid: "22422702" },
  dechalendar2014: { group: "Rare-disease resources", authors: "de Chalendar M, et al.", year: 2014, title: "Rare diseases and disabilities: improving the information available with three Orphanet projects (conference abstract)", venue: "Orphanet J Rare Dis 9(Suppl 1):O31", doi: "10.1186/1750-1172-9-S1-O31" },
  gargano2024: { group: "Rare-disease resources", authors: "Gargano MA, Matentzoglu N, Coleman B, et al.", year: 2024, title: "The Human Phenotype Ontology in 2024: phenotypes around the world", venue: "Nucleic Acids Res 52(D1):D1333–D1346", doi: "10.1093/nar/gkad1005", pmid: "37953324" },
  vasilevsky2022: { group: "Rare-disease resources", authors: "Vasilevsky NA, Matentzoglu NA, Toro S, et al.", year: 2022, title: "Mondo: Unifying diseases for the world, by the world", venue: "medRxiv preprint", doi: "10.1101/2022.04.13.22273750" },
  ordo: { group: "Rare-disease resources", authors: "Orphanet / INSERM", year: 2026, title: "Orphanet Rare Disease Ontology (ORDO) 4.9 and HPO-ORDO Ontological Module (HOOM) 2.6", venue: "Orphadata", url: "https://sciences.orphadata.com/ordo/" },
  ofco: { group: "Rare-disease resources", authors: "Orphanet", year: 2025, title: "OFCO: Orphanet Functional Consequences Ontology (work in progress)", venue: "GitHub", url: "https://github.com/Orphanet/ofco-ontology" },
  mclaughlin2025: { group: "Portals and tools", authors: "McLaughlin J, et al.", year: 2025, title: "OLS4: a new Ontology Lookup Service for a growing interdisciplinary knowledge ecosystem", venue: "Bioinformatics 41", doi: "10.1093/bioinformatics/btaf279", pmid: "40323307" },
  whetzel2011: { group: "Portals and tools", authors: "Whetzel PL, Noy NF, Shah NH, et al.", year: 2011, title: "BioPortal: enhanced functionality via new Web services from the National Center for Biomedical Ontology to access and use ontologies in software applications", venue: "Nucleic Acids Res 39:W541–W545", doi: "10.1093/nar/gkr469", pmid: "21672956" },
  hripcsak2015: { group: "Portals and tools", authors: "Hripcsak G, Duke JD, Shah NH, et al.", year: 2015, title: "Observational Health Data Sciences and Informatics (OHDSI): opportunities for observational researchers", venue: "Stud Health Technol Inform 216:574–578", pmid: "26262116" },
  matentzoglu2022: { group: "Mappings and data", authors: "Matentzoglu N, Balhoff JP, Bello SM, et al.", year: 2022, title: "A Simple Standard for Sharing Ontological Mappings (SSSOM)", venue: "Database 2022:baac035", doi: "10.1093/database/baac035", pmid: "35616100" },
  jacobsen2022: { group: "Mappings and data", authors: "Jacobsen JOB, Baudis M, Baynam GS, et al.", year: 2022, title: "The GA4GH Phenopacket schema defines a computable representation of clinical data", venue: "Nat Biotechnol 40:817–820", doi: "10.1038/s41587-022-01357-4", pmid: "35705716" },
  wilkinson2016: { group: "Mappings and data", authors: "Wilkinson MD, Dumontier M, Aalbersberg IJ, et al.", year: 2016, title: "The FAIR Guiding Principles for scientific data management and stewardship", venue: "Sci Data 3:160018", doi: "10.1038/sdata.2016.18", pmid: "26978244" },
  carbon2019: { group: "Mappings and data", authors: "Carbon S, Champieux R, McMurry JA, et al.", year: 2019, title: "An analysis and metric of reusable data licensing practices for biomedical resources", venue: "PLoS One 14(3):e0213090", doi: "10.1371/journal.pone.0213090", pmid: "30917137" },
  mizuguchi2004: { group: "Clinical background", authors: "Mizuguchi T, Collod-Béroud G, Akiyama T, et al.", year: 2004, title: "Heterozygous TGFBR2 mutations in Marfan syndrome", venue: "Nat Genet 36:855–860", doi: "10.1038/ng1392", pmid: "15235604" },
  loeys2006: { group: "Clinical background", authors: "Loeys BL, Schwarze U, Holm T, et al.", year: 2006, title: "Aneurysm syndromes caused by mutations in the TGF-beta receptor", venue: "N Engl J Med 355:788–798", doi: "10.1056/NEJMoa055695", pmid: "16928994" },
  loeys2010: { group: "Clinical background", authors: "Loeys BL, Dietz HC, Braverman AC, et al.", year: 2010, title: "The revised Ghent nosology for the Marfan syndrome", venue: "J Med Genet 47:476–485", doi: "10.1136/jmg.2009.072785", pmid: "20591885" },
  yan2009: { group: "Clinical background", authors: "Yan H, Parsons DW, Jin G, et al.", year: 2009, title: "IDH1 and IDH2 mutations in gliomas", venue: "N Engl J Med 360:765–773", doi: "10.1056/NEJMoa0808710", pmid: "19228619" },
  louis2021: { group: "Clinical background", authors: "Louis DN, Perry A, Wesseling P, et al.", year: 2021, title: "The 2021 WHO Classification of Tumors of the Central Nervous System: a summary", venue: "Neuro Oncol 23(8):1231–1251", doi: "10.1093/neuonc/noab106", pmid: "34185076" },
};

const DATA = "data/";
const code = (s) => `<pre>${s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>`;
const OLS = (o, q) => `<a href="https://www.ebi.ac.uk/ols4/search?q=${encodeURIComponent(q)}&ontology=${o}" target="_blank">OLS</a>`;
const term = (iri, label) => `<a href="https://www.ebi.ac.uk/ols4/ontologies/${iri.includes("orpha") ? "ordo" : iri.includes("MONDO") ? "mondo" : "hp"}/classes/${encodeURIComponent(encodeURIComponent(iri))}" target="_blank">${label}</a>`;

async function olsJson(path) {
  const r = await fetch("https://www.ebi.ac.uk/ols4/api/" + path, { headers: { Accept: "application/json" } });
  if (!r.ok) throw new Error("OLS " + r.status);
  return r.json();
}
const enc2 = (iri) => encodeURIComponent(encodeURIComponent(iri));

const PROBLEMS = [
  // ------------------------------------------------- Words, terms and concepts
  {
    id: "VOCB",
    title: "Vocabulary, Terminology, Ontology",
    track: "kb",
    kind: "guide",
    concept: "Kinds of knowledge organisation systems",
    prereqs: [],
    story: `
      <p>"Use an ontology" is advice you will hear often. In practice the resources you'll meet in this course are very different things: ICD-10 is a statistical classification, MeSH is a thesaurus for indexing literature, SNOMED CT is a clinical terminology, and HPO, Mondo and ORDO are OWL ontologies. Orphanet maintains a <i>nomenclature</i> of rare diseases, several <i>classifications</i> of them, and publishes both as an <i>ontology</i>. Knowing which kind of resource you hold tells you what you may and may not do with it.</p>`,
    lesson: `
      <h3>From simplest to most formal</h3>
      <table class="mini">
        <tr><th>Kind</th><th>What it adds</th><th>Typical purpose</th><th>Examples</th></tr>
        <tr><td><b>Controlled vocabulary</b></td><td>An agreed list of preferred terms, often with codes</td><td>Consistent data entry</td><td>Lists of values in a registry form; HOOM's frequency classes</td></tr>
        <tr><td><b>Thesaurus</b></td><td>Synonyms plus broader, narrower and related terms (BT/NT/RT)</td><td>Indexing and retrieval</td><td>MeSH; the Orphanet Functioning Thesaurus that OFCO grew from</td></tr>
        <tr><td><b>Classification</b></td><td>Categories that are mutually exclusive and jointly exhaustive, with residual "other" and "unspecified" classes</td><td>Counting: each case in exactly one box</td><td>ICD-10, ICD-O-3, ICF; Orphanet's classifications</td></tr>
        <tr><td><b>Terminology</b></td><td>Concepts with stable identifiers, many descriptions per concept, polyhierarchy and defined relations</td><td>Recording clinical detail</td><td>SNOMED CT; OMOP's standard vocabularies</td></tr>
        <tr><td><b>Ontology</b></td><td>Formal, machine-interpretable definitions: classes, relations and logical axioms a reasoner can use</td><td>Integration, inference, consistency</td><td>ORDO, HPO, Mondo, OFCO (OWL)</td></tr>
      </table>
      <h3>What they share</h3>
      <ul>
        <li>An <b>identifier</b> for each entry, a preferred <b>label</b>, usually <b>synonyms</b>.</li>
        <li>Some <b>hierarchy</b>, a <b>maintainer</b>, a <b>licence</b> and <b>versions</b> that change over time.</li>
      </ul>
      <h3>Where they differ</h3>
      <ul>
        <li><b>Purpose.</b> A classification must put each case in one box so totals add up. A terminology or ontology may put a disease under several parents (polyhierarchy).</li>
        <li><b>Meaning of the hierarchy.</b> In a thesaurus "narrower" is loose. In an ontology <code>rdfs:subClassOf</code> means every instance of the child is an instance of the parent, and other relations (<i>part of</i>, <i>has frequency</i>) have their own meaning.</li>
        <li><b>Identifiers.</b> Cimino's desiderata ask for permanent, meaningless ("non-semantic") identifiers. ICD-10 codes encode their place in the hierarchy (Q87.4 sits in chapter Q); ORPHA:558 or HP:0001166 say nothing about meaning.</li>
        <li><b>Formality.</b> Only ontologies give definitions a computer can check. Gruber's often-quoted definition calls an ontology "an explicit specification of a conceptualization".</li>
      </ul>
      <p>Real resources mix these. ORDO is an OWL ontology whose classification of disorders comes from Orphanet's classifications. SNOMED CT is a terminology with a description-logic core. OMOP's vocabularies are terminologies stitched together with mappings.</p>`,
    task: `Read through the table, then mark this step as done. The next problems check the distinctions.`,
    refs: ["gruber1993", "cimino1998", "bodenreider2008", "smith2007"],
  },
  {
    id: "KIND",
    title: "One Box per Case",
    track: "kb",
    kind: "choice",
    concept: "Classifications vs ontologies",
    prereqs: ["VOCB"],
    story: `<p>A health ministry wants a table of hospital admissions per disease, where the column totals must equal the number of admissions.</p>`,
    lesson: `<p>Only one kind of resource is built for this: categories that don't overlap and that cover everything, with "other specified" and "unspecified" bins for the rest.</p>`,
    task: `Which resource is designed so that every case falls into exactly one category?`,
    options: [
      { text: "ICD-10", correct: true, why: "A statistical classification: mutually exclusive, exhaustive, with residual categories such as Q87.8 'other specified'." },
      { text: "HPO", why: "An ontology with polyhierarchy: arachnodactyly sits under both 'Long fingers' and 'Slender finger'." },
      { text: "MeSH", why: "A thesaurus for indexing; an article gets several headings." },
      { text: "Mondo", why: "An ontology; a disease can have several parents." },
    ],
    explain: `Pooling becomes tricky exactly here. Classification codes are good for counting but often lump several diseases into one box, as you will see with ICD-10 Q87.4.`,
  },
  {
    id: "RELS",
    title: "What an Ontology Adds",
    track: "kb",
    kind: "choice",
    multi: true,
    concept: "Formal semantics",
    prereqs: ["VOCB"],
    story: `<p>A colleague says their project's list of 300 disease names "is basically an ontology, because it has codes and synonyms".</p>`,
    lesson: `<p>Codes, labels and synonyms are common to every kind of resource. Look for what only formal ontologies have.</p>`,
    task: `Which statements are true of an ontology but <b>not necessarily</b> of a controlled vocabulary?`,
    options: [
      { text: "Classes have logical definitions (axioms) that a reasoner can use to infer new subclass relations or find contradictions.", correct: true },
      { text: "Besides broader/narrower, it has relations with defined meaning, such as <i>part of</i> or <i>has phenotype</i>.", correct: true },
      { text: "Each entry has a stable identifier.", why: "Good vocabularies have that too." },
      { text: "Entries have synonyms.", why: "Thesauri and many vocabularies have synonyms." },
    ],
    explain: `ORDO uses OWL restrictions for <i>part of</i> (classification) and gene–disease relations, and HOOM defines each phenotype annotation as an OWL class. That's what lets the SPARQL course query them as a graph.`,
    refs: ["smith2007"],
  },
  {
    id: "IDEN",
    title: "Meaningless Identifiers",
    track: "kb",
    concept: "Non-semantic identifiers",
    prereqs: ["KIND"],
    story: `<p>When a classification is revised, codes that encode a position in the hierarchy have to change or end up lying about it. Cimino's desiderata therefore ask for identifiers that carry no meaning.</p>`,
    lesson: `<p>Look at the structure of each code. Does it tell you where in the hierarchy the concept sits?</p>`,
    task: `Which of these codes encodes meaning in its structure: <code>Q87.4</code>, <code>ORPHA:558</code>, <code>HP:0001166</code>, <code>MONDO:0007947</code>?`,
    answers: ["Q87.4", "ICD-10:Q87.4"],
    placeholder: "a code",
    explain: `Q87.4: chapter Q (congenital malformations), block Q87 (other specified congenital malformation syndromes affecting multiple systems), item .4. ORPHAcodes, HPO and Mondo numbers are sequential and say nothing about the disease.`,
    refs: ["cimino1998"],
  },
  {
    id: "OFTH",
    title: "From Thesaurus to Ontology",
    track: "kb",
    kind: "choice",
    concept: "The same content in two forms",
    prereqs: ["RELS"],
    story: `<p>Orphanet has described the functional consequences of rare diseases since the 2010s with the <b>Orphanet Functioning Thesaurus</b>, adapted from the WHO ICF. In 2025 it started publishing the same content as <b>OFCO</b>, an OWL ontology on GitHub.</p>`,
    lesson: `<p>Moving a thesaurus into OWL doesn't change the words. It changes what a machine can do with them.</p>`,
    task: `What did turning the thesaurus into OFCO add?`,
    options: [
      { text: "Terms became OWL classes with IRIs, subclass axioms, and ICF mappings qualified as exact, broader or narrower.", correct: true },
      { text: "New activity domains that ICF does not cover.", why: "Cognition, sleep and behaviour were already Orphanet additions in the thesaurus." },
      { text: "Patient-level data about who has which limitation.", why: "OFCO holds the vocabulary; the disease–limitation data are a separate Orphadata product." },
      { text: "A licence that allows reuse.", why: "OFCO states no licence at all — see NOLI." },
    ],
    explain: `You'll use those qualified ICF mappings in the Mappings and Pooling chapters.`,
    refs: ["dechalendar2014", "ofco"],
  },

  // ------------------------------------------------------------ Finding terms
  {
    id: "OLSS",
    title: "Searching OLS",
    track: "find",
    tool: "EBI OLS",
    concept: "Search, labels and identifiers",
    prereqs: ["VOCB"],
    story: `<p>The <a href="https://www.ebi.ac.uk/ols4/" target="_blank">Ontology Lookup Service</a> (OLS) at EMBL-EBI hosts about 270 biomedical ontologies, including ORDO, Mondo and HPO, with a free web interface and an API that needs no key.</p>`,
    lesson: `
      <p>Search, then restrict the results to one ontology with the filter on the left (or <code>&ontology=ordo</code> in the URL). Each result shows a label, a short identifier and the full IRI:</p>
      ${code(`Marfan syndrome   ORDO:558   http://www.orpha.net/ORDO/Orphanet_558`)}
      <p>The <b>ORPHAcode</b> is the number; clinicians write it as <code>ORPHA:558</code>.</p>`,
    task: `Search ${OLS("ordo", "Marfan syndrome")} for Marfan syndrome in ORDO. What is its ORPHAcode?`,
    answers: ["ORPHA:558"],
    placeholder: "ORPHA:…",
    explain: `ORPHA:558. Notice the neighbours in the result list: "Marfan syndrome and Marfan-related disorders" (a group) and "Neonatal Marfan syndrome" (a separate disorder). Search returns candidates; you choose.`,
    refs: ["mclaughlin2025"],
  },
  {
    id: "SYNS",
    title: "Spider Fingers",
    track: "find",
    tool: "EBI OLS",
    concept: "Synonyms and layperson terms",
    prereqs: ["OLSS"],
    story: `<p>A parent's note says "very long, thin spider fingers". HPO records layperson synonyms precisely so that phrases like this can be found.</p>`,
    lesson: `<p>OLS searches synonyms as well as labels. A match on a synonym still returns the term's preferred label, so check you have found the concept you meant.</p>`,
    task: `Find the HPO term for "spider fingers". Give its ID.`,
    answers: ["HP:0001166"],
    placeholder: "HP:…",
    explain: `HP:0001166 Arachnodactyly, with layperson synonyms "Spider fingers" and "Long slender fingers". Annotate with the ID and keep the preferred label next to it; never store only the free text.`,
    refs: ["gargano2024"],
  },
  {
    id: "OLSA",
    title: "The OLS API",
    track: "find",
    tool: "EBI OLS API",
    concept: "Programmatic lookup",
    prereqs: ["OLSS"],
    story: `<p>Looking up 500 diagnoses by hand is not an option. OLS answers the same searches as JSON, with CORS enabled, so scripts and web pages can call it.</p>`,
    lesson: `
      ${code(`curl 'https://www.ebi.ac.uk/ols4/api/search?q=Loeys-Dietz%20syndrome&ontology=ordo&rows=3'`)}
      <p>Each document in <code>response.docs</code> has <code>obo_id</code>, <code>label</code> and <code>iri</code>. In Python:</p>
      ${code(`import requests
r = requests.get("https://www.ebi.ac.uk/ols4/api/search",
                 params={"q": "Loeys-Dietz syndrome", "ontology": "ordo", "rows": 3})
for d in r.json()["response"]["docs"]:
    print(d["obo_id"], d["label"])`)}`,
    task: `Use the API to search ORDO for "Loeys-Dietz syndrome". What is the <code>obo_id</code> of the top hit?`,
    answers: ["ORDO:60030", "ORPHA:60030"],
    placeholder: "ORDO:…",
    explain: `ORDO:60030. The API ranks exact label matches first, but always check the label: free-text matching on "Marfan" also returns "Marfanoid" syndromes.`,
    refs: ["mclaughlin2025"],
  },
  {
    id: "HOOM",
    title: "Where Is HOOM?",
    track: "find",
    kind: "choice",
    multi: true,
    tool: "OLS · BioPortal · Orphadata",
    concept: "Coverage differs between portals",
    prereqs: ["OLSS"],
    story: `<p>HOOM, the HPO–ORDO Ontological Module, states which HPO phenotypes occur in which Orphanet disorder and how often. You want to browse it.</p>`,
    lesson: `<p>No portal hosts everything. In October 2026, OLS returns nothing for the ontology ids <code>hoom</code> and <code>ofco</code>.</p>`,
    task: `Where can you get HOOM?`,
    options: [
      { text: "BioPortal", correct: true, why: "Listed as HOOM, browseable and searchable." },
      { text: "Orphadata (download)", correct: true, why: "The authoritative release: an OWL/XML zip." },
      { text: "EBI OLS", why: "Not loaded in OLS." },
      { text: "OHDSI Athena", why: "Athena holds vocabularies (codes and concepts), not annotation modules like HOOM." },
    ],
    explain: `Before you rely on a portal, check that it holds the resource <i>and the version</i> you need.`,
    refs: ["ordo", "whetzel2011"],
  },
  {
    id: "BPAN",
    title: "The BioPortal Annotator",
    track: "find",
    tool: "BioPortal",
    concept: "Concept recognition in text",
    prereqs: ["HOOM"],
    story: `<p><a href="https://bioportal.bioontology.org/" target="_blank">BioPortal</a>, run by Stanford's National Center for Biomedical Ontology, hosts over a thousand ontologies. Besides search it offers the <b>Annotator</b>, which finds ontology terms in free text. Its web pages are free; its API needs a free account and API key.</p>`,
    lesson: `<p>Open <a href="https://bioportal.bioontology.org/annotator" target="_blank">bioportal.bioontology.org/annotator</a>, paste the text, select ORDO under <i>Ontologies</i>, and run. Each hit shows the matched words and the class.</p>
      <div class="callout">BioPortal is behind a bot check. If the page asks you to confirm you're human, do so.</div>`,
    task: `Annotate <i>"Patient with Loeys-Dietz syndrome and arachnodactyly"</i> with ORDO only. Which ORPHAcode does the Annotator give for the syndrome?`,
    answers: ["ORPHA:60030"],
    placeholder: "ORPHA:…",
    explain: `ORPHA:60030. Run it again with HPO added and "arachnodactyly" gets HP:0001166. Annotators match strings, so check every hit: "MFS" can also match unrelated terms.`,
    refs: ["whetzel2011"],
  },
  {
    id: "ATHN",
    title: "Athena's Standard Concept",
    track: "find",
    tool: "OHDSI Athena",
    concept: "OMOP standard concepts",
    prereqs: ["OLSS"],
    story: `<p>Hospitals that convert their records to the OMOP Common Data Model use <a href="https://athena.ohdsi.org/" target="_blank">Athena</a>, OHDSI's vocabulary browser. In OMOP every source code (ICD-10, Read, ORPHAcode…) is mapped to one <b>standard concept</b>, usually from SNOMED CT, and analyses run on the standard concepts.</p>`,
    lesson: `
      <p>Search, then filter by <i>Concept: Standard</i>. The columns that matter are ID (the OMOP <code>concept_id</code>), CODE (the code in the source vocabulary), CONCEPT (Standard or Non-standard) and VOCAB.</p>
      <div class="callout">Athena first asks you to accept the SNOMED CT and HemOnc licence terms. Read them: browsing is permitted for evaluation, but copying SNOMED CT identifiers into records needs an affiliate licence. You'll meet this again in the licences chapter.</div>`,
    task: `Find Marfan syndrome in Athena. What is the <code>concept_id</code> of the <b>standard</b> concept?`,
    answers: ["258540"],
    placeholder: "concept_id",
    explain: `258540, SNOMED CT 19346006 "Marfan's syndrome" (release v20260829). The same search returns more than a dozen non-standard Marfan concepts: ICD-10, ICD-10-CM, ICD-10-GM, CIM10, ICD-10-CN, MeSH, Mondo, ORPHAcode and others.`,
    refs: ["hripcsak2015"],
  },
  {
    id: "ATST",
    title: "ORPHAcodes in OMOP",
    track: "find",
    kind: "choice",
    tool: "OHDSI Athena",
    concept: "Standard vs non-standard vocabularies",
    prereqs: ["ATHN"],
    story: `<p>Athena added an <b>ORPHAcode</b> vocabulary in 2026: the Marfan concept 693551 (code 558) is valid from 4 May 2026.</p>`,
    lesson: `<p>Open concept 693551 and look at its <i>Relationships</i>. A non-standard concept is only usable in OMOP analytics if it has a "Maps to" relationship to a standard concept.</p>`,
    task: `In release v20260829, what is true of ORPHAcode 558 in Athena?`,
    options: [
      { text: "It is non-standard and has no 'Maps to' relationship yet, so data coded only with ORPHAcodes would not reach Marfan's standard concept.", correct: true },
      { text: "It is the standard concept for Marfan syndrome.", why: "The standard concept is SNOMED CT 19346006 (258540)." },
      { text: "It maps to SNOMED CT 19346006.", why: "ICD-10 Q87.4 does; the ORPHAcode concept had no relationships in this release." },
    ],
    explain: `A rare-disease registry coded with ORPHAcodes can't simply be loaded into OMOP. This may change in later releases; check yours. In the OHDSI forums, contributors have discussed mapping ORPHAcodes to SNOMED since 2020.`,
    refs: ["hripcsak2015"],
  },
  {
    id: "OFGH",
    title: "OFCO Lives on GitHub",
    track: "find",
    tool: "GitHub",
    concept: "Finding terms outside the portals",
    prereqs: ["HOOM"],
    story: `<p>OFCO is in none of the three portals. Its only home is <a href="https://github.com/Orphanet/ofco-ontology" target="_blank">github.com/Orphanet/ofco-ontology</a>: one <code>OFCO.owl</code> file in RDF/XML.</p>`,
    lesson: `<p>Open the file and search it (Ctrl-F) for <code>ICF:d450</code>, or load it in <a href="https://protege.stanford.edu/" target="_blank">Protégé</a> or with rdflib. Each OFCO term carries its ICF mappings as annotated <code>ofco:hasICFuri</code> statements, with the code in <code>ofco:hasICFcode</code> and the qualifier in <code>ECO:0000218</code>.</p>`,
    task: `Which OFCO term maps <b>exactly</b> (E) to ICF <code>d450</code>? Give its local name (the part after <code>https://w3id.org/ofco/</code>).`,
    answers: ["ofco:Walking"],
    placeholder: "local name",
    explain: `<code>ofco:Walking</code>. It maps E to d450, and BTNT ("OFCO broader than the target") to d4502 and d4503. Its subclasses WalkingShortDistances and WalkingLongDistances map E to d4500 and d4501.`,
    refs: ["ofco"],
  },
  {
    id: "DIFF",
    title: "Three Portals Compared",
    track: "find",
    kind: "choice",
    multi: true,
    concept: "OLS vs BioPortal vs Athena",
    prereqs: ["OLSA", "BPAN", "ATST"],
    story: `<p>You'll use all three. Each was built for a different community: OLS for EBI's data resources, BioPortal for semantic-web research and annotation, Athena for observational health data in OMOP.</p>`,
    lesson: `
      <table class="mini">
        <tr><th></th><th>EBI OLS</th><th>BioPortal</th><th>OHDSI Athena</th></tr>
        <tr><td>Content</td><td>OWL/OBO ontologies (ORDO, Mondo, HPO, EFO…)</td><td>Any ontology users upload, incl. HOOM</td><td>OMOP vocabularies: SNOMED, ICD variants, LOINC, RxNorm, ORPHAcode, Mondo, HPO…</td></tr>
        <tr><td>Unit</td><td>Class with IRI</td><td>Class with IRI</td><td><code>concept_id</code> (an OMOP integer) plus source code</td></tr>
        <tr><td>Mappings</td><td>Cross-references in each ontology</td><td>Lexical and user mappings between ontologies</td><td>"Maps to" a standard concept</td></tr>
        <tr><td>Access</td><td>Free, no key, CORS</td><td>Web free; API needs free key</td><td>Licence acceptance; downloads need login, some vocabularies need separate licences</td></tr>
        <tr><td>Extras</td><td>Hierarchy browser, API</td><td>Annotator, Recommender</td><td>Vocabulary bundles for OMOP CDM</td></tr>
      </table>`,
    task: `Which statements are true?`,
    options: [
      { text: "The OLS API can be called without registering.", correct: true },
      { text: "The BioPortal API needs a (free) API key.", correct: true },
      { text: "Athena shows SNOMED CT content only after you accept licence terms.", correct: true },
      { text: "Athena's ORPHAcode concepts are OMOP standard concepts.", why: "They are non-standard (ATST)." },
      { text: "OLS hosts OFCO.", why: "Only GitHub does." },
    ],
    explain: `Rule of thumb: find and browse in OLS, annotate text in BioPortal, and use Athena when your data must end up in OMOP.`,
    refs: ["mclaughlin2025", "whetzel2011", "hripcsak2015"],
  },

  // -------------------------------------------------- Navigating the term space
  {
    id: "PARN",
    title: "Up to the Group",
    track: "nav",
    tool: "EBI OLS",
    concept: "Classification parents (part of)",
    prereqs: ["OLSS"],
    story: `<p>In ORDO, Marfan syndrome has two kinds of parents. Through <code>rdfs:subClassOf</code> it is a "Disease" and a "Disorder" (its type). Through <i>part of</i> restrictions it sits in Orphanet's clinical groups. The OLS tree shows both.</p>`,
    lesson: `<p>Open ${term("http://www.orpha.net/ORDO/Orphanet_558", "Marfan syndrome")} in OLS and look at the tree: <i>part of</i> parents are shown with the relation name.</p>`,
    task: `What is the ORPHAcode of the group "Marfan syndrome and Marfan-related disorders"?`,
    answers: ["ORPHA:284993"],
    placeholder: "ORPHA:…",
    explain: `ORPHA:284993. Orphanet classifies each disorder under several groups (by organ system, by mechanism…), so the same disorder appears in several branches.`,
  },
  {
    id: "LEVL",
    title: "Group, Disorder, Subtype",
    track: "nav",
    kind: "choice",
    tool: "EBI OLS",
    concept: "Classification levels",
    prereqs: ["PARN"],
    story: `<p>Orphanet entities have a <b>level</b>: a <i>group of disorders</i>, a <i>disorder</i> (most often the level used for coding), or a <i>subtype of a disorder</i> (clinical, aetiological or histopathological).</p>`,
    lesson: `<p>In ORDO the level is the type class: <code>ORPHA:557492</code> Group of disorders, <code>ORPHA:557493</code> Disorder, <code>ORPHA:557494</code> Subtype of a disorder.</p>`,
    task: `What level is ORPHA:284963 "Marfan syndrome type 1"?`,
    options: [
      { text: "Subtype of a disorder", correct: true },
      { text: "Disorder" },
      { text: "Group of disorders" },
    ],
    explain: `Marfan syndrome (558) is a disorder with two subtypes: type 1 (284963, FBN1) and type 2 (284973, TGFBR1/TGFBR2, according to Orphanet's gene data). Remember type 2; it comes back.`,
  },
  {
    id: "KIDS",
    title: "Counting Children",
    track: "nav",
    tool: "EBI OLS API",
    concept: "Hierarchy via the API",
    prereqs: ["PARN", "OLSA"],
    story: `<p>How big is the Marfan-related group? The answer depends on the ORDO version.</p>`,
    lesson: `
      ${code(`IRI=$(python3 -c "import urllib.parse as u; print(u.quote(u.quote('http://www.orpha.net/ORDO/Orphanet_284993', safe=''), safe=''))")
curl "https://www.ebi.ac.uk/ols4/api/v2/ontologies/ordo/classes/$IRI/hierarchicalChildren?size=100"`)}
      <p>OLS v2 wants the IRI URL-encoded <b>twice</b>. <code>hierarchicalChildren</code> includes <i>part of</i> children, not only subclasses.</p>`,
    task: `How many direct children does ORPHA:284993 have in the ORDO release OLS serves today?`,
    answers: ["10"],
    live: async () => {
      const j = await olsJson(`v2/ontologies/ordo/classes/${enc2("http://www.orpha.net/ORDO/Orphanet_284993")}/hierarchicalChildren?size=200`);
      return [String(j.totalElements ?? j.elements.length)];
    },
    placeholder: "a number",
    explain: `This is checked live against OLS. In ORDO 4.9 the answer was 10, including Marfan syndrome, Loeys-Dietz syndrome, Shprintzen-Goldberg syndrome and isolated ectopia lentis.`,
  },
  {
    id: "POLY",
    title: "Glioblastoma's Family",
    track: "nav",
    tool: "EBI OLS",
    concept: "Polyhierarchy and grouping",
    prereqs: ["LEVL"],
    story: `<p>Glioblastoma is in ORDO too (ORPHA:360), defined there as a malignant astrocytic tumour of WHO grade IV.</p>`,
    lesson: `<p>Follow the <i>part of</i> parent of ORPHA:360 in OLS.</p>`,
    task: `Which ORDO group is glioblastoma directly part of? Give the ORPHAcode.`,
    answers: ["ORPHA:251561"],
    placeholder: "ORPHA:…",
    explain: `ORPHA:251561 "High-grade astrocytoma". Note the wording "grade IV" in ORDO's definition: it predates the 2021 WHO classification. You'll come back to this in the version chapter.`,
  },
  {
    id: "MOVE",
    title: "A Code That Moved",
    track: "nav",
    tool: "EBI OLS",
    concept: "Deprecated ORPHAcodes",
    prereqs: ["PARN"],
    story: `<p>A discharge letter from 2009 says "Furlong syndrome, ORPHA:97295". In ORDO 4.9 that code still exists, but as a <b>deprecated disorder</b> under "Inactive clinical entity".</p>`,
    lesson: `<p>ORDO keeps retired codes and says where they went: a <code>reason_for_inactivation</code> text and an Orphanet_C056 "moved to" restriction. In OLS, search with <i>Include obsolete terms</i> on.</p>`,
    task: `Which ORPHAcode was Furlong syndrome moved to?`,
    answers: ["ORPHA:60030"],
    placeholder: "ORPHA:…",
    explain: `ORPHA:60030 Loeys-Dietz syndrome. Never annotate with a deprecated code. When you meet one in old data, follow the replacement and keep the original code in a separate column.`,
  },
  {
    id: "MREP",
    title: "Replaced By",
    track: "nav",
    tool: "EBI OLS",
    concept: "Obsolete terms in OBO ontologies",
    prereqs: ["MOVE"],
    story: `<p>Mondo, the Monarch Initiative's merged disease ontology, marks retired classes as <code>owl:deprecated</code>, prefixes the label with "obsolete", and points to a replacement with <code>IAO:0100001</code> "term replaced by".</p>`,
    lesson: `<p>Look up ${term("http://purl.obolibrary.org/obo/MONDO_0017308", "MONDO:0017308")} in OLS.</p>`,
    task: `MONDO:0017308 is "obsolete Marfan syndrome type 2". What replaced it?`,
    answers: ["MONDO:0012427"],
    placeholder: "MONDO:…",
    explain: `MONDO:0012427 "Loeys-Dietz syndrome 2". Mondo moved Marfan syndrome type 2 into Loeys-Dietz syndrome. ORDO 4.9 still has it as a subtype of Marfan syndrome. Same patients, two different homes: hold on to that.`,
    refs: ["vasilevsky2022"],
  },
  {
    id: "HPUP",
    title: "Two Parents for Spider Fingers",
    track: "nav",
    tool: "EBI OLS",
    concept: "Polyhierarchy in HPO",
    prereqs: ["SYNS"],
    story: `<p>Arachnodactyly means fingers that are both long and slender, so HPO gives it two parents.</p>`,
    lesson: `<p>Open HP:0001166 in OLS and look at <i>Parents</i>. Counting "all patients with long fingers" must include patients annotated with any descendant of the long-fingers term.</p>`,
    task: `Which parent of arachnodactyly is about finger <b>length</b>? Give its ID.`,
    answers: ["HP:0100807"],
    placeholder: "HP:…",
    explain: `HP:0100807 Long fingers. The other parent is HP:0001238 Slender finger. You'll use the descendants of Long fingers to pool phenotype data in LONG.`,
    refs: ["gargano2024"],
  },
  {
    id: "HFRQ",
    title: "How Often?",
    track: "nav",
    tool: "Orphadata · BioPortal",
    concept: "HOOM frequency classes",
    prereqs: ["HPUP", "HOOM"],
    story: `<p>HOOM annotates each disorder–phenotype pair with an Orphanet frequency class: <i>Obligate</i> (100%), <i>Very frequent</i> (99–80%), <i>Frequent</i> (79–30%), <i>Occasional</i> (29–5%), <i>Very rare</i> (&lt;4–1%) or <i>Excluded</i> (0%).</p>`,
    lesson: `<p>Look it up in HOOM on BioPortal, on the disease page at <a href="https://www.orpha.net/en/disease/detail/60030" target="_blank">orpha.net</a>, or in Orphadata's <a href="https://www.orphadata.com/data/xml/en_product4.xml" target="_blank">en_product4.xml</a>.</p>`,
    task: `How frequent is <b>aortic dissection</b> (HP:0002647) in Loeys-Dietz syndrome according to Orphanet?`,
    answers: ["Very frequent", "VeryFrequent", "Very frequent (99-80%)", "99-80%", "80-99%"],
    placeholder: "frequency class",
    explain: `Very frequent (99–80%). In Marfan syndrome it is <i>Frequent</i> (79–30%) (Orphadata product 4, June 2026). That difference makes the pooled dissection rates in the last chapter so sensitive to how patients are classified.`,
  },
  {
    id: "OFUP",
    title: "OFCO's Tree",
    track: "nav",
    tool: "GitHub · Protégé",
    concept: "Navigating a new ontology",
    prereqs: ["OFGH"],
    story: `<p>OFCO's root is "Activity limitation and participation restriction", with ten domains below it. Walking sits somewhere in the middle.</p>`,
    lesson: `<p>Look for <code>rdfs:subClassOf</code> on <code>ofco:Walking</code> in the OWL file, or open the file in Protégé and browse the class hierarchy.</p>`,
    task: `What is the direct parent of <code>ofco:Walking</code>? Give its local name.`,
    answers: ["ofco:MotorSkills"],
    placeholder: "local name",
    explain: `<code>ofco:MotorSkills</code>, itself under "Moving around". OFCO is labelled a prototype: you'll find small inconsistencies, such as two terms both labelled "Learning"/"learning" and lower-case labels like "standing". Report them; that's how prototypes get better.`,
    refs: ["ofco"],
  },

  // -------------------------------------------------------- Authoritative sources
  {
    id: "WHOM",
    title: "Who Decides?",
    track: "auth",
    kind: "choice",
    concept: "Authority over a term's meaning",
    prereqs: ["MREP", "LEVL"],
    story: `<p>ORDO says ORPHA:284973 is "Marfan syndrome type 2", a subtype of Marfan syndrome. Mondo cross-references the same ORPHAcode from its class <i>Loeys-Dietz syndrome 2</i>.</p>`,
    lesson: `<p>Aggregators such as Mondo, OLS, BioPortal and Athena copy and integrate. The <b>authority</b> for an identifier is whoever mints and maintains it.</p>`,
    task: `Who is authoritative for what ORPHA:284973 means?`,
    options: [
      { text: "Orphanet (INSERM), which mints ORPHAcodes and releases ORDO", correct: true },
      { text: "Mondo, because it integrates more sources", why: "Mondo is authoritative for MONDO identifiers only." },
      { text: "EBI OLS, because it serves ORDO", why: "OLS is a mirror." },
      { text: "OHDSI Athena", why: "Athena redistributes vocabularies and adds mappings." },
    ],
    explain: `When sources disagree, look up the identifier at its authority, record that release, and treat other sources' views as mappings with their own provenance.`,
    refs: ["rath2012", "vasilevsky2022"],
  },
  {
    id: "MIRR",
    title: "Mirrors and Masters",
    track: "auth",
    kind: "choice",
    multi: true,
    concept: "Authoritative distributions",
    prereqs: ["WHOM"],
    story: `<p>You can get ORDO from five places. Only one is the publisher's own release.</p>`,
    lesson: `<p>ORDO's <code>owl:versionIRI</code> points to <code>https://www.orphadata.com/data/ontologies/ordo/last_version/ORDO_en_4.9.owl</code>. A mirror may lag behind, convert the file, or drop annotations.</p>`,
    task: `Which of these are mirrors or aggregators for ORDO content, rather than the authoritative release?`,
    options: [
      { text: "EBI OLS", correct: true },
      { text: "BioPortal", correct: true },
      { text: "OHDSI Athena (ORPHAcode vocabulary)", correct: true },
      { text: "Orphadata", why: "Orphanet's own distribution site." },
    ],
    explain: `Mirrors are convenient for searching. For the file you annotate with and cite, use the authority's release.`,
    refs: ["ordo"],
  },
  {
    id: "VERS",
    title: "Which Release?",
    track: "auth",
    tool: "EBI OLS API",
    concept: "Version IRIs",
    prereqs: ["MIRR", "OLSA"],
    story: `<p>OLS reloads ontologies regularly. Before annotating, note exactly which release you are looking at.</p>`,
    lesson: `
      ${code(`curl -s https://www.ebi.ac.uk/ols4/api/ontologies/ordo | python3 -c \\
  "import json,sys; c=json.load(sys.stdin)['config']; print(c['versionIri'])"`)}`,
    task: `Which ORDO version does OLS serve right now? Give the number, for example <code>4.9</code>.`,
    answers: ["4.9"],
    live: async () => {
      const j = await olsJson("ontologies/ordo");
      const m = /ORDO_en_([\d.]+)\.owl/.exec(j.config.versionIri || "");
      return m ? [m[1]] : ["4.9"];
    },
    placeholder: "version",
    explain: `Checked live against OLS. Record the version IRI, not just "ORDO", whenever you annotate.`,
  },
  {
    id: "OFCV",
    title: "Three Version Numbers",
    track: "auth",
    tool: "GitHub",
    concept: "Inconsistent version metadata",
    prereqs: ["VERS", "OFUP"],
    story: `<p>At commit 43c5989 the OFCO header contains <code>owl:versionIRI</code>, <code>owl:versionInfo</code> and a second <code>versionInfo</code>, and they disagree.</p>`,
    lesson: `<p>Open <a href="https://raw.githubusercontent.com/Orphanet/ofco-ontology/43c5989021d8d2ec83ae8fc03569891abc12c951/OFCO.owl" target="_blank">OFCO.owl at that commit</a> and read the <code>owl:Ontology</code> header.</p>`,
    task: `Which version does the <code>owl:versionIRI</code> give?`,
    answers: ["0.1.0", "https://w3id.org/ofco/0.1.0"],
    placeholder: "version",
    explain: `0.1.0 (versionIRI <code>https://w3id.org/ofco/0.1.0</code>), while the two versionInfo values say 1.0 and 0.9. For a GitHub-only resource, the reliable version is the <b>commit hash</b>. Cite that.`,
    refs: ["ofco"],
  },

  // ------------------------------------------------------------------ Mappings
  {
    id: "XREF",
    title: "Cross-references",
    track: "map",
    tool: "EBI OLS",
    concept: "oboInOwl:hasDbXref",
    prereqs: ["VERS"],
    story: `<p>ORDO links each ORPHAcode to ICD-10, ICD-11, OMIM, MeSH, MedDRA, UMLS and Mondo through <code>oboInOwl:hasDbXref</code>.</p>`,
    lesson: `<p>In OLS the cross-references are under <i>database cross reference</i>. Each one carries an annotation explaining what kind of match it is; that's the next problem.</p>`,
    task: `Which ICD-10 code does ORDO give for Marfan syndrome?`,
    answers: ["Q87.4", "ICD-10:Q87.4"],
    placeholder: "ICD-10 code",
    explain: `Q87.4, also ICD-11 LD28.01, OMIM 154700, MeSH D008382 and MONDO:0007947.`,
  },
  {
    id: "QUAL",
    title: "Exact or Narrower?",
    track: "map",
    tool: "EBI OLS",
    concept: "ORDO mapping qualifiers",
    prereqs: ["XREF"],
    story: `<p>Orphanet qualifies every mapping:</p>
      <ul>
        <li><b>E</b>: exact, the concepts are equivalent.</li>
        <li><b>NTBT</b>: the ORPHAcode is narrower than the target code.</li>
        <li><b>BTNT</b>: the ORPHAcode is broader than the target code.</li>
        <li><b>ND</b>: not yet decided; <b>W</b>: wrong, kept to warn you.</li>
      </ul>`,
    lesson: `<p>In OLS, expand the cross-reference annotations on ORPHA:60030 Loeys-Dietz syndrome.</p>`,
    task: `How does ORDO qualify the mapping from Loeys-Dietz syndrome to ICD-10 <code>Q87.4</code>?`,
    answers: ["NTBT"],
    placeholder: "E / NTBT / BTNT",
    explain: `NTBT: Loeys-Dietz syndrome is narrower than Q87.4. So WHO ICD-10 has no own code for it, and LDS patients get Q87.4, the Marfan code. Marfan syndrome type 2 (284973) also maps NTBT to Q87.4. Any count of "Q87.4 = Marfan" includes them.`,
  },
  {
    id: "OMIM",
    title: "One to Many",
    track: "map",
    tool: "EBI OLS",
    concept: "Cardinality of mappings",
    prereqs: ["QUAL"],
    story: `<p>OMIM splits Loeys-Dietz syndrome by gene into numbered types. Orphanet has one disorder.</p>`,
    lesson: `<p>Count the OMIM cross-references on ORPHA:60030 and read their qualifiers.</p>`,
    task: `How many OMIM numbers does ORDO 4.9 map to Loeys-Dietz syndrome?`,
    answers: ["7"],
    placeholder: "a number",
    explain: `Seven, all BTNT (the ORPHAcode is broader): 609192, 610168, 613795, 614816, 615582, 619472 and 619656. Going from OMIM to ORPHA is safe (many-to-one). Going from ORPHA to OMIM is not: you can't tell which type a patient has.`,
  },
  {
    id: "MAPT",
    title: "OMOP's 'Maps to'",
    track: "map",
    tool: "OHDSI Athena",
    concept: "Source-to-standard mappings",
    prereqs: ["QUAL", "ATST"],
    story: `<p>An OMOP ETL replaces every source code with the standard concept it "Maps to". What happens to WHO ICD-10 Q87.4?</p>`,
    lesson: `<p>Open ICD10 Q87.4 in Athena (concept 45539310) and look at <i>Relationships</i>.</p>`,
    task: `Which SNOMED CT code does WHO ICD-10 Q87.4 map to?`,
    answers: ["19346006", "SCTID:19346006", "SNOMED:19346006"],
    placeholder: "SNOMED code",
    explain: `19346006 "Marfan's syndrome" (OMOP 258540). Combine this with QUAL: a European hospital that coded Loeys-Dietz patients as Q87.4 turns them into Marfan patients in OMOP, silently.`,
    refs: ["hripcsak2015"],
  },
  {
    id: "SAME",
    title: "Same String, Different Code",
    track: "map",
    tool: "OHDSI Athena",
    concept: "ICD-10 national modifications",
    prereqs: ["MAPT"],
    story: `<p>Search Athena for <code>Q87.4</code> and you get five concepts: ICD10 (WHO), ICD10CM (USA), ICD10GM (Germany), CIM10 (France) and ICD10CN (China). The code is the same; the vocabularies are not.</p>`,
    lesson: `<p>Look for Loeys-Dietz syndrome in ICD-10-CM.</p>`,
    task: `Which ICD-10-CM code is Loeys-Dietz syndrome?`,
    answers: ["Q87.A", "ICD10CM:Q87.A"],
    placeholder: "ICD-10-CM code",
    explain: `Q87.A. In the US it has its own code; in WHO ICD-10 it shares Q87.4 with Marfan. ICD-10-CM also subdivides Marfan itself (Q87.40–Q87.43). Always record <i>which</i> ICD-10.`,
  },
  {
    id: "MOXR",
    title: "Mondo's Opinion",
    track: "map",
    tool: "EBI OLS",
    concept: "Mappings with provenance",
    prereqs: ["SAME", "WHOM"],
    story: `<p>Mondo's class MONDO:0012427 "Loeys-Dietz syndrome 2" carries cross-references to OMIM, DOID, MeSH, NCIt, GARD and one ORPHAcode.</p>`,
    lesson: `<p>Mondo annotates each cross-reference with its source, for example <code>MONDO:equivalentTo</code>.</p>`,
    task: `Which ORPHAcode does Mondo cross-reference from MONDO:0012427?`,
    answers: ["ORPHA:284973"],
    placeholder: "ORPHA:…",
    explain: `ORPHA:284973, which ORDO labels "Marfan syndrome type 2" and files under Marfan syndrome. Following this mapping turns an ORDO "Marfan" subtype into Mondo's "Loeys-Dietz". Neither is wrong, but they classify differently, and pooled counts change with the route you take.`,
    refs: ["vasilevsky2022"],
  },
  {
    id: "ICFM",
    title: "OFCO and ICF",
    track: "map",
    tool: "GitHub",
    concept: "Qualified mappings to a classification",
    prereqs: ["OFCV", "QUAL"],
    story: `<p>A rehabilitation centre codes limitations in ICF. ICF <code>d4502</code> is "walking on different surfaces", a level of detail OFCO doesn't have.</p>`,
    lesson: `<p>In OFCO.owl, find which term maps to <code>ICF:d4502</code> and with which qualifier.</p>`,
    task: `Which OFCO term does ICF d4502 map to?`,
    answers: ["ofco:Walking"],
    placeholder: "local name",
    explain: `<code>ofco:Walking</code>, BTNT: OFCO is broader. A patient coded d4502 can be counted under Walking. You can't go the other way. One mapping, for d5102, hangs off a misspelled IRI, <code>ofco:Washing%20oneself</code>: check that mapping targets actually exist.`,
    refs: ["ofco"],
  },
  {
    id: "SSSM",
    title: "Reading SSSOM",
    track: "map",
    kind: "choice",
    multi: true,
    concept: "Which mappings are safe for roll-up",
    prereqs: ["OMIM", "ICFM"],
    story: `<p><a href="https://mapping-commons.github.io/sssom/" target="_blank">SSSOM</a> is a simple table format for mappings, with a SKOS predicate and provenance on every row. You receive this one, where <code>subject_id</code> is the code in your data and <code>object_id</code> the ORDO/OFCO term you want to count under:</p>
      ${code(`subject_id      predicate_id      object_id        mapping_justification
ICF:d4502       skos:broadMatch   ofco:Walking     semapv:ManualMappingCuration
OMIM:619656     skos:broadMatch   ORPHA:60030      semapv:ManualMappingCuration
MONDO:0007947   skos:exactMatch   ORPHA:558        semapv:ManualMappingCuration
ICD10:Q87.4     skos:exactMatch   ORPHA:558        semapv:ManualMappingCuration
OMIM:610168     skos:narrowMatch  ORPHA:284973     semapv:ManualMappingCuration`)}`,
    lesson: `<p><code>skos:broadMatch</code> means the object is broader than the subject. Data on the subject can be counted under the object when the object is the same or broader, and nothing else in your data also maps there ambiguously.</p>`,
    task: `For which rows can you relabel every record with the subject code as the object, without losing correctness?`,
    options: [
      { text: "ICF:d4502 → ofco:Walking", correct: true },
      { text: "OMIM:619656 → ORPHA:60030", correct: true, why: "One OMIM LDS type, counted under the broader disorder." },
      { text: "MONDO:0007947 → ORPHA:558", correct: true },
      { text: "ICD10:Q87.4 → ORPHA:558", why: "From ORDO's side Marfan → Q87.4 is exact, but LDS and MFS2 also map to Q87.4 (NTBT). A Q87.4 record may not be Marfan." },
      { text: "OMIM:610168 → ORPHA:284973", why: "narrowMatch: the ORPHA subtype is narrower than OMIM 610168, which also covers other cases." },
    ],
    explain: `An "exact" mapping from one side doesn't make it safe in the other direction. Look at every mapping that points at the same target code.`,
    refs: ["matentzoglu2022"],
  },

  // ------------------------------------------------------- Licences and versions
  {
    id: "LICS",
    title: "Licence Stacking",
    track: "lic",
    kind: "guide",
    concept: "Licences of terminologies",
    prereqs: ["SSSM"],
    story: `<p>A dataset annotated with five terminologies is bound by five sets of terms. The combined product can only be shared under conditions that satisfy <b>all</b> of them, so the most restrictive one sets the rules. That is <b>licence stacking</b>.</p>`,
    lesson: `
      <table class="mini">
        <tr><th>Resource</th><th>Licence (as stated by the publisher)</th><th>What it means for you</th></tr>
        <tr><td>ORDO, HOOM</td><td>CC BY 4.0 (<code>dcterms:license</code> in the file)</td><td>Reuse and modify; attribute Orphanet</td></tr>
        <tr><td>Mondo</td><td>CC BY 4.0</td><td>Reuse and modify; attribute</td></tr>
        <tr><td>HPO</td><td>Its own licence, linked from the file's <code>dcterms:license</code></td><td>Free use with conditions; read them before redistributing modified versions</td></tr>
        <tr><td>OFCO</td><td>None stated (empty <code>dcterms:license</code> property)</td><td>Ask Orphanet before redistributing (NOLI)</td></tr>
        <tr><td>ICD-11</td><td>CC BY-ND 3.0 IGO</td><td>Share unchanged; no derivatives such as edited labels</td></tr>
        <tr><td>SNOMED CT</td><td>SNOMED International affiliate licence</td><td>Free in member countries via national release centres; restricted elsewhere and for unlicensed users</td></tr>
        <tr><td>OMIM</td><td>Johns Hopkins copyright; registration for downloads</td><td>Check the terms before redistributing OMIM content</td></tr>
        <tr><td>MedDRA</td><td>Subscription</td><td>Licensed users only</td></tr>
      </table>
      <p>Identifiers alone are often treated more leniently than labels, definitions and hierarchies, but that depends on each licence. SNOMED's sub-licence on Athena explicitly forbids copying SNOMED CT identifiers into records without an affiliate licence.</p>
      <p>Carbon et al. (2019) scored the licences of biomedical resources and found many unclear or missing, which blocks reuse even when the authors intend openness.</p>`,
    task: `Read the table and the referenced analysis, then mark this step as done.`,
    refs: ["carbon2019", "wilkinson2016"],
  },
  {
    id: "STAK",
    title: "What Can You Publish?",
    track: "lic",
    kind: "choice",
    multi: true,
    concept: "The most restrictive licence wins",
    prereqs: ["LICS"],
    story: `<p>You want to publish a pooled registry extract under CC BY 4.0. Its columns: ORPHAcode with ORDO label, Mondo ID, HPO IDs with labels, SNOMED CT concept, OMIM number, and an ICD-11 code with a label you shortened.</p>`,
    lesson: `<p>Go column by column through the table in LICS.</p>`,
    task: `Which columns need a licence check (or removal) beyond attribution before a CC BY 4.0 release?`,
    options: [
      { text: "SNOMED CT concept", correct: true, why: "Affiliate licence; may not be redistributable to everyone." },
      { text: "ICD-11 code with a shortened label", correct: true, why: "CC BY-ND: a modified label is a derivative." },
      { text: "OMIM number", correct: true, why: "Check OMIM's terms." },
      { text: "HPO IDs with labels", correct: true, why: "HPO's own licence; check its conditions." },
      { text: "ORPHAcode with ORDO label", why: "CC BY 4.0: attribute Orphanet and you're fine." },
      { text: "Mondo ID", why: "CC BY 4.0." },
    ],
    explain: `In practice: keep the CC BY parts, and add the restricted columns only where users are licensed, or publish the codes with instructions on where to get the labels.`,
    refs: ["carbon2019"],
  },
  {
    id: "NOLI",
    title: "No Licence Is Not Open",
    track: "lic",
    kind: "choice",
    concept: "Missing licences",
    prereqs: ["LICS"],
    story: `<p>OFCO declares the property <code>dcterms:license</code> but never gives it a value, and the GitHub repository has no LICENSE file.</p>`,
    lesson: `<p>Public is not the same as open.</p>`,
    task: `What does that mean for redistributing an OFCO-annotated dataset with OFCO labels?`,
    options: [
      { text: "Copyright applies by default. Ask Orphanet, or ship only the identifiers and link to the source.", correct: true },
      { text: "It's on GitHub, so it is public domain.", why: "Hosting on GitHub grants no reuse rights beyond viewing and forking on GitHub." },
      { text: "It inherits ORDO's CC BY 4.0.", why: "Licences are not inherited between products of the same publisher." },
    ],
    explain: `Opening an issue on the repository asking for a licence helps everyone, and is how prototypes become reusable.`,
    refs: ["carbon2019", "ofco"],
  },
  {
    id: "SPLT",
    title: "When a Term Splits",
    track: "lic",
    kind: "guide",
    concept: "Version mismatch",
    prereqs: ["STAK", "MOXR", "POLY"],
    story: `
      <p>The most dangerous change in a terminology is not a deleted term but a term that <b>keeps its name and identifier while its meaning narrows</b>. The parent concept is split into several children, and the old identifier lives on as just one of them. Data annotated before the split and after it then use the same code for different populations.</p>`,
    lesson: `
      <h3>Case 1: glioblastoma</h3>
      <p>Until the WHO 2016 classification, "glioblastoma" (ICD-O-3 <code>9440/3</code>) meant every grade IV astrocytic tumour. After IDH mutations were found in a subset of gliomas (Yan et al. 2009), WHO 2016 split it into <i>glioblastoma, IDH-wildtype</i> and <i>glioblastoma, IDH-mutant</i> (ICD-O-3.2 <code>9445/3</code>). The 2021 classification (CNS5) went further: IDH-mutant tumours are no longer glioblastoma at all but <i>astrocytoma, IDH-mutant, CNS WHO grade 4</i>. "Glioblastoma" now means IDH-wildtype only.</p>
      ${code(`before 2016                 WHO 2016                       WHO 2021 (CNS5)
glioblastoma (9440/3)  ──►  glioblastoma, IDH-wildtype ──►  glioblastoma  (= IDH-wildtype only)
                       └─►  glioblastoma, IDH-mutant   ──►  astrocytoma, IDH-mutant, grade 4`)}
      <p>Look at how today's resources hold this history, all checked in October 2026:</p>
      <ul>
        <li><b>NCIt</b> C167335 "Astrocytoma, IDH-Mutant, Grade 4" keeps "Glioblastoma, IDH-mutant" as a synonym and notes that the term glioblastoma no longer applies.</li>
        <li><b>Mondo</b> has MONDO:0850335 "IDH-wildtype glioblastoma" as a child of MONDO:0018177 "glioblastoma", whose definition still says "WHO grade IV". MONDO:0956981 "astrocytoma, IDH-mutant, grade 4" sits elsewhere.</li>
        <li><b>ORDO</b> 4.9 has a single ORPHA:360 "Glioblastoma", defined as grade IV, with no IDH split.</li>
        <li><b>ICD-O-3</b> in Athena still lists <code>9445/3</code> "Glioblastoma, IDH-mutant", as a <i>standard</i> OMOP concept.</li>
      </ul>
      <h3>Case 2: Marfan syndrome type 2</h3>
      <p>Families first reported as "Marfan syndrome type 2" turned out to carry TGFBR2 variants (Mizuguchi et al. 2004), the gene behind Loeys-Dietz syndrome (Loeys et al. 2006). ORDO keeps ORPHA:284973 "Marfan syndrome type 2" as a subtype of Marfan syndrome. Mondo obsoleted MONDO:0017308 in July 2026 and replaced it with Loeys-Dietz syndrome 2. A US registry coded with Mondo in 2025 has these patients as Marfan; one coded in 2027 has them as Loeys-Dietz.</p>
      <h3>Defences</h3>
      <ul>
        <li>Record the terminology <b>version</b> with every annotation, at dataset level at least.</li>
        <li>Keep the <b>evidence</b> that decides the split (IDH status, gene) as its own column.</li>
        <li>Before pooling, map each dataset with the release it was coded in, then re-derive categories from the evidence.</li>
      </ul>`,
    task: `Read both cases, then mark this step as done. The next problems and the Pooling chapter use them.`,
    refs: ["louis2021", "yan2009", "mizuguchi2004", "loeys2006"],
  },
  {
    id: "GBMQ",
    title: "What Is It Called Now?",
    track: "lic",
    tool: "EBI OLS",
    concept: "Current names after a split",
    prereqs: ["SPLT"],
    story: `<p>A 2014 pathology report says "secondary glioblastoma, IDH1 R132H mutant".</p>`,
    lesson: `<p>Search Mondo or NCIt in OLS for the CNS5 name.</p>`,
    task: `Under the 2021 WHO classification, which Mondo class should this tumour get? Give the ID.`,
    answers: ["MONDO:0956981"],
    placeholder: "MONDO:…",
    explain: `MONDO:0956981 "astrocytoma, IDH-mutant, grade 4" (NCIt C167335). Annotating it as MONDO:0018177 "glioblastoma" would be correct for 2014 and wrong for any analysis using the 2021 definition.`,
    refs: ["louis2021"],
  },
  {
    id: "ICDO",
    title: "The Old Name Lives On",
    track: "lic",
    tool: "OHDSI Athena",
    concept: "Lagging classifications",
    prereqs: ["GBMQ"],
    story: `<p>Cancer registries code morphology with ICD-O-3. Its releases don't follow WHO's tumour classification in lockstep.</p>`,
    lesson: `<p>Search Athena for "Glioblastoma, IDH-mutant" and filter on vocabulary ICDO3.</p>`,
    task: `Which ICD-O-3 morphology code is labelled "Glioblastoma, IDH-mutant"?`,
    answers: ["9445/3"],
    placeholder: "morphology code",
    explain: `9445/3. A cancer registry using it today still calls these tumours glioblastomas, while a pathology dataset following CNS5 calls them astrocytomas. Pool the two by label and you mis-count either way.`,
  },
  {
    id: "MISS",
    title: "Why Did It Change?",
    track: "lic",
    tool: "EBI OLS · GitHub",
    concept: "Change provenance",
    prereqs: ["SPLT"],
    story: `<p>Good ontologies record <i>why</i> a term changed. Mondo links each change to a GitHub issue with <code>IAO:0000233</code> "term tracker item".</p>`,
    lesson: `<p>Open MONDO:0017308 in OLS and find its term tracker item.</p>`,
    task: `Which Mondo GitHub issue number documents the obsoletion of "Marfan syndrome type 2"?`,
    answers: ["7693", "#7693"],
    placeholder: "issue number",
    explain: `<a href="https://github.com/monarch-initiative/mondo/issues/7693" target="_blank">monarch-initiative/mondo#7693</a>. Reading the discussion tells you whether old annotations need re-coding. Here they do: MONDO:0017308 patients now belong to MONDO:0012427.`,
    refs: ["vasilevsky2022"],
  },

  // ---------------------------------------------------------- Annotating datasets
  {
    id: "ANDX",
    title: "Coding Diagnoses",
    track: "ann",
    kind: "table",
    concept: "Annotating free-text diagnoses with ORPHAcodes",
    prereqs: ["MOVE", "LEVL", "SPLT"],
    data: DATA + "diagnoses.csv",
    columns: ["row", "orphacode"],
    story: `<p>A clinic hands you twelve free-text diagnoses from discharge letters. Your registry uses ORPHAcodes from ORDO 4.9.</p>`,
    lesson: `
      <ul>
        <li>Code at the <b>most specific level the evidence supports</b>: a subtype if the gene is known, the disorder otherwise.</li>
        <li>Never use a deprecated code; follow "moved to".</li>
        <li>If ORDO has no finer code (no IDH split for glioblastoma), use the closest code and keep the detail in another column.</li>
      </ul>`,
    task: `Download <code>diagnoses.csv</code>, look up each diagnosis, and paste <code>row,orphacode</code> lines.`,
    key: {
      D01: "ORPHA:284963", D02: "ORPHA:558", D03: "ORPHA:60030", D04: "ORPHA:284979",
      D05: "ORPHA:115", D06: "ORPHA:1885", D07: "ORPHA:2462", D08: "ORPHA:60030",
      D09: "ORPHA:360", D10: "ORPHA:251589", D11: "ORPHA:251579", D12: "ORPHA:91387",
    },
    wrong: `Check the evidence in each row (gene known?), synonyms ("Beals"), and whether a code was deprecated.`,
    explain: `D01 has FBN1 confirmed, so it gets the subtype 284963. D02 has no genetic result, so it gets the disorder 558. D05 "Beals syndrome" is a synonym of congenital contractural arachnodactyly. D08 Furlong syndrome was moved to Loeys-Dietz. D09 gets ORPHA:360: ORDO has no IDH-wildtype code, so record the IDH status separately.`,
    refs: ["rath2012"],
  },
  {
    id: "ANHP",
    title: "Coding Phenotypes",
    track: "ann",
    kind: "table",
    concept: "Annotating clinical findings with HPO",
    prereqs: ["ANDX", "HPUP"],
    data: DATA + "phenotype_text.csv",
    columns: ["row", "hpo_id"],
    story: `<p>The same letters describe findings in everyday words. Phenotype-driven diagnostics and HOOM both need HPO terms.</p>`,
    lesson: `<p>Search OLS with the phrase as written: HPO's synonyms (including layperson ones) usually find the term. Prefer the most specific term that is clearly stated.</p>`,
    task: `Download <code>phenotype_text.csv</code> and paste <code>row,hpo_id</code> lines.`,
    key: {
      H01: "HP:0001166", H02: "HP:0001083", H03: "HP:0002616", H04: "HP:0000316",
      H05: "HP:0000193", H06: "HP:0000768", H07: "HP:0001763", H08: "HP:0001519",
    },
    explain: `"Enlarged aortic root" is a synonym of Aortic root aneurysm (HP:0002616), not of the broader Aortic aneurysm. "Marfanoid habitus" is a synonym of Disproportionate tall stature (HP:0001519).`,
    refs: ["gargano2024", "jacobsen2022"],
  },
  {
    id: "ANOF",
    title: "Coding Daily Life",
    track: "ann",
    kind: "table",
    concept: "Annotating functional limitations with OFCO",
    prereqs: ["ANHP", "OFUP"],
    data: DATA + "function_text.csv",
    columns: ["row", "ofco_term"],
    story: `<p>A patient questionnaire records what people cannot do. You'll code it with OFCO so it can be compared with Orphanet's functional-consequence data.</p>`,
    lesson: `<p>OFCO is not in any portal, so search the OWL file or browse it in Protégé. Use local names such as <code>Driving</code> or full IRIs.</p>`,
    task: `Download <code>function_text.csv</code> and paste <code>row,ofco_term</code> lines.`,
    key: {
      O01: "ofco:WalkingLongDistances", O02: "ofco:WashingOneself", O03: "ofco:PracticingSports",
      O04: "ofco:Driving", O05: "ofco:Reading", O06: "ofco:LiftingAndCarryingObjects",
    },
    explain: `"Cannot walk more than 500 m" is the specific WalkingLongDistances, not Walking. The football row is about practising sport (ICF d9201), not about walking or running.`,
    refs: ["ofco", "dechalendar2014"],
  },
  {
    id: "AMET",
    title: "Record What You Used",
    track: "ann",
    kind: "choice",
    multi: true,
    concept: "Annotation metadata",
    prereqs: ["ANOF", "VERS"],
    story: `<p>Two years from now someone will pool your dataset with another. Everything you learned in the version chapter says what they will need.</p>`,
    lesson: `<p>The GA4GH Phenopacket schema, for example, records every <code>OntologyClass</code> as id plus label, and lists each resource with its name, namespace prefix, IRI prefix and <b>version</b> in its metadata.</p>`,
    task: `Which of these should travel with an annotated dataset?`,
    options: [
      { text: "The terminology and its exact version or release (version IRI, or commit hash for OFCO)", correct: true },
      { text: "The identifier and the label as shown at annotation time", correct: true },
      { text: "The evidence that decides between subtypes (gene, IDH status)", correct: true },
      { text: "The licence of each terminology used", correct: true },
      { text: "Only the label, because IDs can change", why: "Labels change more often than IDs; keep both." },
    ],
    explain: `This is FAIR principle R1.1 (clear licence) and R1.2 (provenance) applied to annotations.`,
    refs: ["jacobsen2022", "wilkinson2016"],
  },

  // ------------------------------------------------------------- Pooling datasets
  {
    id: "MFNV",
    title: "Three Registries, Naively",
    track: "pool",
    tool: "Dataset",
    concept: "Naive pooling by label",
    prereqs: ["AMET", "SSSM", "MISS"],
    story: `
      <p>Three Marfan registries agree to pool data on aortic dissection. All patients are invented; the codes are real.</p>
      <ul>
        <li><a href="${DATA}nl_registry_2012.csv" download>nl_registry_2012.csv</a>: Netherlands, 2012, WHO ICD-10.</li>
        <li><a href="${DATA}fr_registry_2024.csv" download>fr_registry_2024.csv</a>: France, 2024, ORPHAcodes from ORDO.</li>
        <li><a href="${DATA}us_registry_2025.csv" download>us_registry_2025.csv</a>: USA, mid-2025, Mondo (before July 2026).</li>
      </ul>`,
    lesson: `<p>A spreadsheet, pandas or a few lines of Python will do. First do what many projects do: take every patient whose code's <i>own</i> label says Marfan syndrome or a Marfan subtype.</p>
      ${code(`import pandas as pd
nl = pd.read_csv("nl_registry_2012.csv")
nl.icd10_who.value_counts()`)}`,
    task: `How many patients are "Marfan" by label across the three registries?`,
    answers: ["107"],
    placeholder: "a number",
    explain: `107: all 45 Q87.4 rows from NL, ORPHA:558, 284963 and 284973 from FR (38), and MONDO:0007947 and 0017308 from US (24). You already know three reasons this is wrong.`,
  },
  {
    id: "MFFB",
    title: "Marfan by Evidence",
    track: "pool",
    tool: "Dataset",
    concept: "Re-deriving categories from evidence",
    prereqs: ["MFNV"],
    story: `<p>Each registry recorded the gene. That's the evidence that survives every reclassification.</p>`,
    lesson: `<p>Define the analysis population by evidence, not by label: Marfan syndrome type 1 is FBN1-related. Patients without a genetic result can't be assigned to a subtype; leave them out of subtype analyses and report how many there are.</p>`,
    task: `How many patients across all three registries have FBN1-related Marfan syndrome?`,
    answers: ["75"],
    placeholder: "a number",
    explain: `75 (30 + 25 + 20). The 13 untested patients (NL Q87.4, FR ORPHA:558) stay unassigned, and the TGFBR/SMAD patients labelled Marfan in NL (Q87.4), FR (284973) and US (MONDO:0017308) go to the Loeys-Dietz spectrum.`,
    refs: ["loeys2010"],
  },
  {
    id: "MFDS",
    title: "The Dissection Rate",
    track: "pool",
    tool: "Dataset",
    concept: "How misclassification biases outcomes",
    prereqs: ["MFFB", "HFRQ"],
    story: `<p>Aortic dissection is very frequent in Loeys-Dietz syndrome and frequent in Marfan syndrome (HFRQ). Mixing the two changes the answer.</p>`,
    lesson: `<p>Compute the proportion with <code>aortic_dissection == "yes"</code> in your FBN1 population. Round to one decimal.</p>`,
    task: `What percentage of FBN1-related Marfan patients had an aortic dissection?`,
    answers: ["18.7", "18.7%"],
    placeholder: "percentage",
    explain: `18.7% (14/75). The naive "Marfan" group from MFNV gives 24.3% (26/107), an overestimate of 30% caused only by how the codes were pooled.`,
  },
  {
    id: "MFTG",
    title: "The Other Spectrum",
    track: "pool",
    tool: "Dataset",
    concept: "Pooling across disagreeing ontologies",
    prereqs: ["MFDS", "MOXR"],
    story: `<p>Now the Loeys-Dietz side: every patient with TGFBR1, TGFBR2, SMAD3 or TGFB2, whatever their code says. That includes ICD-10 Q87.4, ORDO's "Marfan syndrome type 2", Mondo's obsolete MFS2, LDS and LDS2.</p>`,
    lesson: `<p>Filter on the gene column, then compute the dissection percentage, rounded to one decimal.</p>`,
    task: `What percentage of TGF-β pathway patients had an aortic dissection?`,
    answers: ["51.2", "51.2%"],
    placeholder: "percentage",
    explain: `51.2% (22/43). Fifteen of these 43 patients carry a "Marfan" code in their source registry: 10 in NL, 5 in FR. Another 4 in the US carry a Marfan code that Mondo later moved to Loeys-Dietz.`,
    refs: ["loeys2006"],
  },
  {
    id: "GBNV",
    title: "Glioblastoma, Naively",
    track: "pool",
    tool: "Dataset",
    concept: "Version mismatch in practice",
    prereqs: ["ICDO", "GBMQ", "AMET"],
    story: `
      <p>Three brain tumour cohorts, coded in different eras:</p>
      <ul>
        <li><a href="${DATA}gbm_registry_2015.csv" download>gbm_registry_2015.csv</a>: WHO 2007 era, ICD-O-3 <code>9440/3</code> for every glioblastoma, IDH often unknown.</li>
        <li><a href="${DATA}gbm_registry_2019.csv" download>gbm_registry_2019.csv</a>: WHO 2016, <code>9440/3</code> IDH-wildtype and <code>9445/3</code> IDH-mutant.</li>
        <li><a href="${DATA}gbm_registry_2023.csv" download>gbm_registry_2023.csv</a>: CNS5 via Mondo.</li>
      </ul>`,
    lesson: `<p>Count every patient whose code's own label contains "glioblastoma" (9440/3, 9445/3, MONDO:0850335, MONDO:0018177).</p>`,
    task: `How many "glioblastoma" patients does naive pooling give?`,
    answers: ["133"],
    placeholder: "a number",
    explain: `133. The 7 MONDO:0956981 patients are left out (their label says astrocytoma), while the 11 IDH-mutant tumours from 2015 and 2019 are counted because their old code says glioblastoma. Same biology, opposite decisions.`,
  },
  {
    id: "GBC5",
    title: "Glioblastoma Under CNS5",
    track: "pool",
    tool: "Dataset",
    concept: "Harmonising to one definition",
    prereqs: ["GBNV"],
    story: `<p>Your analysis uses the 2021 WHO definition: glioblastoma means IDH-wildtype.</p>`,
    lesson: `<p>Ignore the codes' labels and use <code>idh_status</code>. Tumours with unknown IDH status can't be classified under CNS5.</p>`,
    task: `How many patients are glioblastoma under CNS5?`,
    answers: ["105"],
    placeholder: "a number",
    explain: `105 (40 + 30 + 35). Another 17 have unknown IDH status (14 in 2015, 3 coded with the unsplit MONDO:0018177 in 2023). Report them; don't silently add them to either group.`,
    refs: ["louis2021"],
  },
  {
    id: "GB24",
    title: "Two-Year Survival",
    track: "pool",
    tool: "Dataset",
    concept: "Outcome bias from a term split",
    prereqs: ["GBC5"],
    story: `<p>IDH-mutant grade 4 astrocytomas have a much better prognosis than IDH-wildtype glioblastomas. That is why WHO separated them.</p>`,
    lesson: `<p>Compute the share of patients with <code>survival_months &gt;= 24</code> in the CNS5 glioblastoma group, rounded to one decimal.</p>`,
    task: `What percentage of CNS5 glioblastoma patients survived at least 24 months?`,
    answers: ["6.7", "6.7%"],
    placeholder: "percentage",
    explain: `6.7%. The naive group from GBNV gives 9.8%, almost half again as high, because IDH-mutant tumours and unknowns were mixed in. A trial benchmarked against the naive figure would look worse than it is.`,
    refs: ["yan2009", "louis2021"],
  },
  {
    id: "WALK",
    title: "Walking, in Two Codings",
    track: "pool",
    tool: "Dataset",
    concept: "Rolling up through qualified mappings",
    prereqs: ["ICFM", "AMET"],
    story: `<p>Site A codes limitations in ICF (<a href="${DATA}site_a_icf.csv" download>site_a_icf.csv</a>), site B in OFCO (<a href="${DATA}site_b_ofco.csv" download>site_b_ofco.csv</a>). You want everyone with a walking limitation, which is <code>ofco:Walking</code> or any of its subclasses.</p>`,
    lesson: `<p>Use OFCO's ICF mappings: d450 (E), d4500 and d4501 (E to the subclasses), d4502 and d4503 (BTNT to Walking). d475 is driving and d5100 is washing: not walking.</p>`,
    task: `How many patients across both sites have a walking limitation?`,
    answers: ["26"],
    placeholder: "a number",
    explain: `26: at site A, 9 d4501 + 4 d4502 + 3 d450 = 16; at site B, 7 WalkingLongDistances + 2 WalkingShortDistances + 1 Walking = 10.`,
    refs: ["ofco"],
  },
  {
    id: "LONG",
    title: "Long Fingers, All of Them",
    track: "pool",
    tool: "Dataset · EBI OLS API",
    concept: "Hierarchy-aware counting",
    prereqs: ["WALK", "HPUP", "KIDS"],
    story: `<p><a href="${DATA}phenotypes.csv" download>phenotypes.csv</a> holds one HPO annotation per patient, made by different clinicians at different levels of detail.</p>`,
    lesson: `
      <p>Get all descendants of HP:0100807 Long fingers from OLS:</p>
      ${code(`IRI=$(python3 -c "import urllib.parse as u; print(u.quote(u.quote('http://purl.obolibrary.org/obo/HP_0100807', safe=''), safe=''))")
curl "https://www.ebi.ac.uk/ols4/api/ontologies/hp/terms/$IRI/descendants"`)}
      <p>Then count patients whose term is Long fingers itself or one of its descendants.</p>`,
    task: `How many patients have Long fingers or a more specific term?`,
    answers: ["16"],
    placeholder: "a number",
    explain: `16: 11 arachnodactyly, 3 long fingers and 2 tapered finger (HPO 2026-09-01). Slender finger (HP:0001238) is a sibling, not a descendant: arachnodactyly is under both, but slender-only patients don't have long fingers.`,
    refs: ["gargano2024"],
  },
  {
    id: "LESS",
    title: "What Went Wrong?",
    track: "pool",
    kind: "choice",
    multi: true,
    concept: "Lessons for pooling",
    prereqs: ["MFTG", "GB24", "LONG"],
    story: `<p>Look back at the five pooling problems.</p>`,
    lesson: `<p>Choose every practice that would have prevented the errors you saw.</p>`,
    task: `Which practices make pooled analyses robust?`,
    options: [
      { text: "Record the terminology version with each dataset, and resolve obsolete and moved codes before pooling", correct: true },
      { text: "Keep the deciding evidence (gene, IDH status) and define analysis groups from it", correct: true },
      { text: "Use only mappings whose direction and qualifier allow roll-up, and check all mappings into a target", correct: true },
      { text: "Count through the hierarchy, using descendants, not just exact codes", correct: true },
      { text: "Translate everything to labels and match strings", why: "Labels are the least stable part, and 'glioblastoma' changed meaning." },
      { text: "Map everything to the coarsest common code (e.g. ICD-10) to be safe", why: "Safe for totals, but it destroys exactly the distinctions (Marfan vs LDS) your outcome depends on." },
    ],
    explain: `These four practices are the core of this course. Its sister course, <a href="https://koetai.github.io/scopoli/" target="_blank">Scopoli · SPARQL</a>, shows how to do the same at scale on a knowledge graph.`,
    refs: ["wilkinson2016", "matentzoglu2022"],
  },
];
