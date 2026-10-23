# Scopoli · Disease ontologies

A [Koetai](https://koetai.github.io/) product. A [Rosalind](https://rosalind.info)-style course with 56 problems on finding, navigating, mapping, annotating and pooling with disease ontologies. It starts from Orphanet's ORDO, HOOM and OFCO, and brings in HPO, Mondo, NCIt, ICD and OMOP along the way.

**Live:** https://koetai.github.io/scopoli-ontologies/

Sister course: [Scopoli · SPARQL](https://koetai.github.io/scopoli/), on querying knowledge graphs.

| Chapter | What you learn |
|---|---|
| **Words, terms and concepts** | Controlled vocabularies, thesauri, classifications, terminologies and ontologies: what they share and how they differ |
| **Finding terms** | EBI OLS (web and API), BioPortal (incl. Annotator), OHDSI Athena (standard concepts), OFCO on GitHub, and how the three portals compare |
| **Navigating the term space** | Parents and *part of* groups, group/disorder/subtype levels, polyhierarchy, deprecated and obsolete terms, HPO and OFCO trees, HOOM frequencies |
| **Authoritative sources** | Who mints a term, mirrors versus releases, version IRIs, OFCO's inconsistent version metadata |
| **Mappings** | ORDO qualifiers (E, NTBT, BTNT), one-to-many mappings, OMOP "Maps to", ICD-10 variants, Mondo's provenance, OFCO→ICF, SSSOM |
| **Licences and versions** | Licence stacking, missing licences, and two real term splits: glioblastoma (WHO 2016 → CNS5) and Marfan syndrome type 2 (Mondo, July 2026) |
| **Annotating datasets** | Coding free-text diagnoses (ORDO), findings (HPO) and functional limitations (OFCO), and the metadata to keep |
| **Pooling datasets** | Pooling registries coded in ICD-10, ORPHAcodes, Mondo, ICD-O-3, ICF and HPO, and measuring how much naive pooling biases the results |

## Checking

- **Answer problems** normalise identifiers, so `ORPHA:558`, `Orphanet_558` and the full IRI are the same answer. Some answers are fetched live from OLS (`live`).
- **Choice problems** need exactly the right set of options.
- **Table problems** check one annotation per row.

Facts were verified in October 2026 against OLS (ORDO 4.9, Mondo 2026-10-06, HPO 2026-09-01), Athena release v20260829, Orphadata products 4 and 6, and OFCO commit `43c5989`. All references were checked against PubMed or Crossref.

## Data

The registries in [`data/`](data/) are synthetic: every patient is invented, while the codes, genes and reclassifications are real. Regenerate them, and print the expected answers, with:

```bash
python3 prepare/make_datasets.py
```

## Running locally

```bash
python3 -m http.server 8000
```

## Licence notes

ORDO, HOOM and Orphanet data © INSERM/Orphanet, CC BY 4.0. Mondo is CC BY 4.0. HPO is used under its own licence. OFCO currently states no licence. SNOMED CT, OMIM, ICD and MedDRA codes appear as identifiers in exercises only.
