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
      label: 'Connect Your Cluster',
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
