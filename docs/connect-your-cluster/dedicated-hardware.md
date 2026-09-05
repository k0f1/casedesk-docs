---
sidebar_position: 3
---

# Dedicated Hardware

Dedicated Hardware is the CaseDesk path for an organisation-owned Mac,
workstation, or server. It turns a local model runtime into a governed private
AI connection for a software team, without requiring Kubernetes, a public IP,
or an inbound firewall rule.

CaseDesk does not buy, operate, or pay for the hardware. Your organisation
retains the device, runtime, model storage, network boundary, and operating
costs. CaseDesk provides the approval workflow, compatible connection, health
visibility, and operational controls around that runtime.

## When to use it

Dedicated Hardware is a good fit when your organisation wants to use hardware
it already owns while giving multiple internal tools and staff a controlled AI
connection. It is especially useful for Apple Silicon systems and Linux systems
with NVIDIA GPUs.

Running `ollama pull` directly remains a sensible option for an individual
developer or an unmanaged experiment. CaseDesk is for the point where that
runtime becomes a team dependency: model changes need approval, availability
needs visibility, and clients need a stable compatible connection.

## Early-access prerequisites

Before you start, identify a device owner who can approve local changes and
maintain the host. The first supported paths are:

- Apple Silicon Macs using Ollama.
- Linux NVIDIA workstations or servers using Ollama. A higher-concurrency vLLM
  profile is planned for suitable Linux hardware.

The host needs outbound HTTPS access to CaseDesk. It does not need SSH access
from CaseDesk, a public IP address, Kubernetes, or an inbound firewall rule.

## Connect a device

1. In **Connections**, choose **Dedicated Hardware**.
2. Generate a one-time device claim code. Treat it as a credential: it is shown
   once and expires shortly after creation.
3. Run the signed CaseDesk Device Agent on the hardware host and provide the
   claim code during setup. The agent establishes an outbound authenticated
   connection and submits a redacted capability report.
4. Review the reported platform, accelerator capacity, runtime readiness, and
   eligibility. No model runtime is changed during claiming.
5. Select the approved profile and prepare a reviewed plan. The plan pins the
   model digest, lists the proposed runtime changes, and sets bounded
   concurrency and queue limits.
6. Approve the exact plan. Only then may the Device Agent retrieve that signed
   configuration, verify the approved runtime and model, and report service
   health.

## What the Device Agent does

The Device Agent is a small local system component, not an AI agent. It
establishes the outbound connection, reports device and runtime health, and
enforces the configuration approved by the device owner.

It can report redacted operational facts such as platform, accelerator memory,
runtime readiness, model verification, and connectivity state. It does not
require raw cloud credentials, receive inbound network access, or expose the
local runtime directly to the public internet.

## Operate it as a service

The Dedicated Hardware view reports whether the device is online, draining for
maintenance, revoked, or unavailable. It also distinguishes device presence
from model and runtime readiness.

A single workstation is not high availability. Plan for power, network,
sleep/reboot recovery, disk capacity, and a second approved device or another
approved runtime before making the connection a critical business dependency.
CaseDesk will not silently route work to unapproved hardware.

## Customer-controlled boundary

CaseDesk governs the connection around your runtime; it does not replace your
infrastructure operations. Your organisation remains responsible for hardware
procurement, electrical and network costs, physical security, host operating
system maintenance, and the runtime capacity it chooses to make available.

For an architecture review or early-access onboarding, contact the CaseDesk
team before connecting production workloads.
