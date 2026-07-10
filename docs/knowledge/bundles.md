---
sidebar_position: 1
---

# Knowledge Bundles (OKF)

Knowledge bundles let you attach your organisation's documents to a deployment. When a bundle is attached, the CaseDesk inference proxy automatically searches it for relevant context whenever a query relates to your organisational knowledge. No prompt changes are required in your application.

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

## Attaching a bundle to a deployment

A bundle must be attached to a deployment before it affects inference.

1. Go to **Knowledge**
2. Find the bundle card and click **Attach**
3. Select the deployment to attach it to
4. Click **Confirm**

Once attached, the inference proxy includes relevant bundle content in the context for matching queries.

## Detaching a bundle

1. Go to **Knowledge**
2. Find the bundle card
3. Click the attached deployment name to open the attachment options
4. Click **Detach**

The deployment continues operating normally without the bundle.

## Bundle format reference

A valid bundle requires a `bundle.yaml` at the root of the `.okf/` directory:

```yaml
name: my-org-knowledge
version: 1.0.0
description: Internal policies and product documentation
```

Concept files are plain Markdown. Subdirectory names become the namespace for each concept. There are no restrictions on directory depth or file naming beyond the `.okf/` root and the `bundle.yaml` manifest.
