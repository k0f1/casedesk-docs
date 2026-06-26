/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: [
        'introduction/what-is-casedesk',
        'introduction/how-it-works',
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/quick-start',
      ],
    },
    {
      type: 'category',
      label: 'Connect Infrastructure',
      items: [
        {
          type: 'category',
          label: 'Kubernetes Clusters',
          items: [
            {
              type: 'category',
              label: 'AWS EKS',
              items: [
                'connect-your-cluster/aws-eks/existing-cluster',
                'connect-your-cluster/aws-eks/create-cluster',
              ],
            },
            {
              type: 'category',
              label: 'Azure AKS',
              items: [
                'connect-your-cluster/azure-aks/existing-cluster',
                'connect-your-cluster/azure-aks/create-cluster',
              ],
            },
            {
              type: 'category',
              label: 'Google GKE',
              items: [
                'connect-your-cluster/gcp-gke/existing-cluster',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'GPU VMs',
          items: [
            'connect-your-cluster/gpu-vm/connect-via-ssh',
          ],
        },
        {
          type: 'category',
          label: 'On-prem Servers',
          items: [
            'connect-your-cluster/onprem/install-agent',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Deploy a Model',
      items: [
        'deploy-a-model/choosing-a-model',
        'deploy-a-model/deployment-status',
      ],
    },
    {
      type: 'category',
      label: 'Use Your Endpoint',
      items: [
        'use-your-endpoint/openai-compatible-api',
        'use-your-endpoint/anthropic-compatible-api',
        'use-your-endpoint/gemini-compatible-api',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/deploy-deepseek-on-aws-eks',
        'guides/deploy-llama-on-kubernetes',
        'guides/deploy-qwen-on-azure-aks',
        'guides/use-with-open-webui',
      ],
    },
    {
      type: 'category',
      label: 'Comparisons',
      items: [
        'comparisons/casedesk-vs-hugging-face-endpoints',
        'comparisons/casedesk-vs-replicate',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      items: [
        'troubleshooting/unauthorized',
        'troubleshooting/deployment-stuck-pending',
      ],
    },
    {
      type: 'category',
      label: 'Security',
      items: [
        'security/iam-scoped-credentials',
      ],
    },
  ],
};

export default sidebars;
