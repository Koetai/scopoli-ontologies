"""Build the synthetic registries used in Scopoli's pooling exercises.

Every patient here is invented. The codes, genes and reclassifications are
real; the counts and outcomes are made up to show what goes wrong when
datasets annotated with different terminologies, or different versions of
one terminology, are pooled without care.

    python3 prepare/make_datasets.py      # writes data/*.csv, prints answers
"""
import csv
import json
import random
import statistics
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "data"
rng = random.Random(1777)  # Scopoli named Anableps in 1777


PREFIX = {
    "nl_registry_2012.csv": "NL", "fr_registry_2024.csv": "FR", "us_registry_2025.csv": "US",
    "gbm_registry_2015.csv": "G15-", "gbm_registry_2019.csv": "G19-", "gbm_registry_2023.csv": "G23-",
    "site_a_icf.csv": "A", "site_b_ofco.csv": "B", "phenotypes.csv": "P",
}


def write(name, header, rows):
    rows = list(rows)
    rng.shuffle(rows)
    with open(OUT / name, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(header)
        for i, r in enumerate(rows, 1):
            w.writerow([f"{PREFIX[name]}{i:03d}", *r])
    return rows


def cohort(code, gene_choices, n, dissections):
    """n patients with one code; exactly `dissections` of them dissected."""
    flags = ["yes"] * dissections + ["no"] * (n - dissections)
    rng.shuffle(flags)
    return [(code, rng.choice(gene_choices), flags[i]) for i in range(n)]


# --- Marfan / Loeys-Dietz -------------------------------------------------
# NL: coded with WHO ICD-10 in 2012. Q87.4 covers Marfan syndrome, but ORDO
# also maps Loeys-Dietz syndrome and Marfan syndrome type 2 to Q87.4 (NTBT).
nl = (cohort("Q87.4", ["FBN1"], 30, 6)
      + cohort("Q87.4", ["TGFBR2"], 6, 3)
      + cohort("Q87.4", ["TGFBR1"], 4, 2)
      + cohort("Q87.4", ["not tested"], 5, 1))
# FR: coded with ORDO in 2024, at subtype level when the gene was known.
fr = (cohort("ORPHA:284963", ["FBN1"], 25, 5)
      + cohort("ORPHA:558", ["not tested"], 8, 1)
      + cohort("ORPHA:284973", ["TGFBR2"], 5, 3)
      + cohort("ORPHA:60030", ["TGFBR1", "TGFBR2", "SMAD3", "TGFB2"], 12, 6))
# US: coded with Mondo in mid-2025, before Mondo obsoleted MONDO:0017308
# "Marfan syndrome type 2" (July 2026, replaced by Loeys-Dietz syndrome 2).
us = (cohort("MONDO:0007947", ["FBN1"], 20, 3)
      + cohort("MONDO:0017308", ["TGFBR2"], 4, 2)
      + cohort("MONDO:0018954", ["TGFBR1", "SMAD3", "TGFB2"], 9, 4)
      + cohort("MONDO:0012427", ["TGFBR2"], 3, 2))

write("nl_registry_2012.csv", ["patient", "icd10_who", "gene", "aortic_dissection"], nl)
write("fr_registry_2024.csv", ["patient", "orphacode", "gene", "aortic_dissection"], fr)
write("us_registry_2025.csv", ["patient", "mondo_id", "gene", "aortic_dissection"], us)

MARFAN_LABELLED = {"Q87.4", "ORPHA:558", "ORPHA:284963", "ORPHA:284973", "MONDO:0007947", "MONDO:0017308"}
TGF = {"TGFBR1", "TGFBR2", "SMAD3", "TGFB2"}
everyone = nl + fr + us
naive = [r for r in everyone if r[0] in MARFAN_LABELLED]
fbn1 = [r for r in everyone if r[1] == "FBN1"]
tgf = [r for r in everyone if r[1] in TGF]
rate = lambda rows: round(100 * sum(r[2] == "yes" for r in rows) / len(rows), 1)

# --- Glioblastoma -----------------------------------------------------------
# 2015: WHO 2007 era, ICD-O-3 9440/3 for every glioblastoma, IDH often unknown.
# 2019: WHO 2016 / ICD-O-3.2, 9440/3 = IDH-wildtype, 9445/3 = "Glioblastoma, IDH-mutant".
# 2023: WHO CNS5 (2021) via Mondo. IDH-mutant grade 4 tumours are no longer
#       glioblastoma but "astrocytoma, IDH-mutant, grade 4".
def tumours(code, idh, n, median):
    return [(code, idh, max(1, round(rng.gauss(median, median * 0.35)))) for _ in range(n)]

g15 = tumours("9440/3", "wildtype", 40, 15) + tumours("9440/3", "mutant", 6, 31) + tumours("9440/3", "unknown", 14, 17)
g19 = tumours("9440/3", "wildtype", 30, 15) + tumours("9445/3", "mutant", 5, 31)
g23 = (tumours("MONDO:0850335", "wildtype", 35, 15) + tumours("MONDO:0956981", "mutant", 7, 31)
       + tumours("MONDO:0018177", "unknown", 3, 16))

write("gbm_registry_2015.csv", ["patient", "icdo3_morphology", "idh_status", "survival_months"], g15)
write("gbm_registry_2019.csv", ["patient", "icdo3_morphology", "idh_status", "survival_months"], g19)
write("gbm_registry_2023.csv", ["patient", "mondo_id", "idh_status", "survival_months"], g23)

GBM_LABELLED = {"9440/3", "9445/3", "MONDO:0850335", "MONDO:0018177"}
tum = g15 + g19 + g23
gbm_naive = [t for t in tum if t[0] in GBM_LABELLED]
gbm_cns5 = [t for t in tum if t[1] == "wildtype"]
gbm_unknown = [t for t in tum if t[1] == "unknown"]
surv24 = lambda rows: round(100 * sum(t[2] >= 24 for t in rows) / len(rows), 1)

# --- Walking limitations: ICF-coded (site A) and OFCO-coded (site B) --------
walk_icf = [("ICF:d4501",)] * 9 + [("ICF:d4502",)] * 4 + [("ICF:d450",)] * 3 + [("ICF:d475",)] * 5 + [("ICF:d5100",)] * 2
walk_ofco = [("ofco:WalkingLongDistances",)] * 7 + [("ofco:WalkingShortDistances",)] * 2 + [("ofco:Walking",)] * 1 + [("ofco:Driving",)] * 4
write("site_a_icf.csv", ["patient", "icf_code"], walk_icf)
write("site_b_ofco.csv", ["patient", "ofco_term"], walk_ofco)
WALK_ICF = {"ICF:d450", "ICF:d4500", "ICF:d4501", "ICF:d4502", "ICF:d4503"}
walking = sum(r[0] in WALK_ICF for r in walk_icf) + sum(r[0].startswith("ofco:Walking") for r in walk_ofco)

# --- Phenotypes: HPO roll-up --------------------------------------------------
pheno = ([("HP:0001166",)] * 11 + [("HP:0100807",)] * 3 + [("HP:0001182",)] * 2
         + [("HP:0001238",)] * 4 + [("HP:0001519",)] * 6 + [("HP:0001083",)] * 5)
write("phenotypes.csv", ["patient", "hpo_id"], pheno)
LONG_FINGERS = {"HP:0100807", "HP:0001166", "HP:0001182", "HP:0025091"}  # term + OLS descendants
long_fingers = sum(r[0] in LONG_FINGERS for r in pheno)

answers = {
    "marfan_naive": len(naive),
    "fbn1": len(fbn1),
    "tgf_spectrum": len(tgf),
    "dissection_naive_pct": rate(naive),
    "dissection_fbn1_pct": rate(fbn1),
    "dissection_tgf_pct": rate(tgf),
    "gbm_naive": len(gbm_naive),
    "gbm_cns5": len(gbm_cns5),
    "gbm_unknown": len(gbm_unknown),
    "gbm_surv24_naive_pct": surv24(gbm_naive),
    "gbm_surv24_cns5_pct": surv24(gbm_cns5),
    "walking": walking,
    "long_fingers": long_fingers,
}
print(json.dumps(answers, indent=2))
