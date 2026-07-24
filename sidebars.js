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
      label: 'Connect Your Servers',
      items: [
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
        'deploy-a-model/autoscaling',
        'deploy-a-model/routing-pool',
      ],
    },
    {
      type: 'category',
      label: 'Knowledge',
      items: [
        'knowledge/bundles',
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
        'troubleshooting/deployment-stuck-pending',
      ],
    },
  ],
};

export default sidebars;
