---
sidebar_position: 1
---

# Google GKE — I Already Have a Cluster

## What you need before you start

- A Google Cloud account with an active GKE cluster
- Your Google account must have at minimum the **Kubernetes Engine Cluster Viewer** role on the cluster

## Connect the cluster

1. In CaseDesk, go to **Clusters → Connect cluster → GCP GKE**
2. Click **Sign in with Google** — you'll be redirected to Google OAuth
3. Authorise CaseDesk to access your Google Cloud project
4. Select the cluster to connect
5. Click **Connect cluster →**

CaseDesk requests the `https://www.googleapis.com/auth/cloud-platform` scope to list your GKE clusters and deploy Kubernetes workloads into the cluster you select. Your OAuth tokens are encrypted and stored securely. CaseDesk refreshes them automatically.

## Required IAM permissions

CaseDesk needs read access to list clusters and deploy workloads into a namespace. The minimum roles are:

- **Kubernetes Engine Cluster Viewer** — to list and describe clusters
- **Kubernetes Engine Developer** — to create deployments, services, and pods inside your cluster

You can restrict these to a specific cluster using IAM Conditions in the Google Cloud Console.

## Troubleshooting

**No clusters appear after signing in** — verify your Google account has Kubernetes Engine Cluster Viewer on at least one project.

**Connection fails after selecting a cluster** — ensure your cluster's control plane is accessible (not locked to a private IP only). For private clusters, the GKE API endpoint must be reachable from the internet or you need Authorized Networks configured.
