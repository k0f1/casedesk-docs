---
sidebar_position: 1
---

# Knowledge Bundles (OKF)

Knowledge bundles let you manage your organisation's structured documents inside CaseDesk. Bundles remain separate from deployment inference so endpoint behaviour stays focused on workload policy and compatible APIs.

## What is OKF

OKF (Open Knowledge Format) is an open standard for structured knowledge bundles. A bundle is a directory containing a `bundle.yaml` manifest and Markdown concept files. Bundles are distributed as `.okf.zip` archives.

A minimal bundle looks like this:

```
my-org.okf/
  bundle.yaml
  policies/
    data-handling.md
    acceptable-use.md
  products/
    overview.md
```

## Importing a bundle

1. Go to **Knowledge** in the CaseDesk navigation
2. Click **Import bundle**
3. Upload a `.okf.zip` file
4. CaseDesk extracts and indexes the bundle

## Deployment separation

Knowledge bundles are no longer attached to deployments. Endpoint inference remains governed by workload policy and endpoint tools such as web search, web reader, and model routing. Manage bundles in the Knowledge area without coupling them to a specific deployment.

## Bundle format reference

A valid bundle requires a `bundle.yaml` at the root of the `.okf/` directory:

```yaml
name: my-org-knowledge
version: 1.0.0
description: Internal policies and product documentation
```

Concept files are plain Markdown. Subdirectory names become the namespace for each concept. There are no restrictions on directory depth or file naming beyond the `.okf/` root and the `bundle.yaml` manifest.
