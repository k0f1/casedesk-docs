import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const FeatureList = [
  {
    title: 'Connect Infrastructure',
    description: 'Connect a Kubernetes cluster, GPU VM, or on-prem server. CaseDesk supports AWS EKS, Azure AKS, GKE, and any SSH-accessible server — no Kubernetes required for GPU VMs.',
    link: '/connect-your-cluster/aws-eks/existing-cluster',
  },
  {
    title: 'Deploy a Model',
    description: 'Choose from a curated catalogue of open-source models — chat, reasoning, coding, and vision. One click, no YAML.',
    link: '/deploy-a-model/choosing-a-model',
  },
  {
    title: 'Use Your AI Endpoint',
    description: 'Every deployment exposes an OpenAI-compatible REST endpoint. Drop it into any application that uses the OpenAI SDK — no code changes required.',
    link: '/use-your-endpoint/openai-compatible-api',
  },
];

const WorkflowSteps = [
  'Connect Infrastructure',
  'Deploy Model',
  'Get Endpoint',
  'Use Anywhere',
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
            Connect Infrastructure
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
        <section style={{padding: '2rem 0 0'}}>
          <div className="container">
            <p style={{
              textAlign: 'center',
              fontSize: '1.1rem',
              maxWidth: '800px',
              margin: '0 auto',
              color: 'var(--ifm-color-emphasis-700)',
            }}>
              CaseDesk is a BYOC platform that deploys and manages open-source AI models on Kubernetes, GPU VMs and on-prem infrastructure while exposing OpenAI-compatible endpoints for your applications.
            </p>
          </div>
        </section>

        <section style={{padding: '3rem 0'}}>
          <div className="container">
            <div className="row">
              {FeatureList.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>

        <section style={{padding: '2rem 0 3rem', background: 'var(--ifm-color-emphasis-100)'}}>
          <div className="container" style={{textAlign: 'center'}}>
            <Heading as="h2" style={{marginBottom: '1.5rem'}}>How it works</Heading>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
            }}>
              {WorkflowSteps.map((step, i) => (
                <span key={i} style={{display: 'inline-flex', alignItems: 'center', gap: '0.75rem'}}>
                  <span style={{
                    background: 'var(--ifm-color-primary)',
                    color: 'white',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '2rem',
                    fontWeight: '600',
                    whiteSpace: 'nowrap',
                  }}>
                    {i + 1}. {step}
                  </span>
                  {i < WorkflowSteps.length - 1 && (
                    <span style={{color: 'var(--ifm-color-primary)', fontWeight: 'bold', fontSize: '1.25rem'}}>→</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
