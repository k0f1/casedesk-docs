import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const FeatureList = [
  {
    title: 'Connect Your Cluster',
    description: 'Link your existing AWS EKS or Azure AKS cluster to CaseDesk in minutes using scoped credentials.',
    link: '/connect-your-cluster/aws-eks/existing-cluster',
  },
  {
    title: 'Deploy a Model',
    description: 'Choose from open-source models like Llama 3.2, deploy to your cluster, and get a private endpoint.',
    link: '/deploy-a-model/choosing-a-model',
  },
  {
    title: 'Use Your Endpoint',
    description: 'Call your deployed model via an OpenAI-compatible API. Drop it into any application that uses the OpenAI SDK.',
    link: '/use-your-endpoint/openai-compatible-api',
  },
];

function Feature({title, description, link}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md" style={{paddingTop: '1.5rem'}}>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <Link to={link} className="button button--outline button--primary button--sm">
          Read more →
        </Link>
      </div>
    </div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/getting-started/quick-start">
            Get Started →
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/connect-your-cluster/aws-eks/existing-cluster"
            style={{marginLeft: '1rem'}}>
            Connect Your Cluster
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="CaseDesk Documentation"
      description="Deploy open-source AI models on your own infrastructure with CaseDesk.">
      <HomepageHeader />
      <main>
        <section style={{padding: '3rem 0'}}>
          <div className="container">
            <div className="row">
              {FeatureList.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
