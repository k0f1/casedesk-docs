import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const FeatureList = [
  {
    title: 'Find Your Platform',
    description: 'Answer five questions about your team, use case, and region. CaseDesk recommends the right model size, runtime, and compliance tier — no infrastructure knowledge required.',
    link: '/getting-started/quick-start',
  },
  {
    title: 'Dedicated Endpoint',
    description: 'Your deployment runs on a dedicated namespace — no shared GPU with other customers. vLLM continuous batching serves your whole team simultaneously. Scales to zero when idle.',
    link: '/deploy-a-model/choosing-a-model',
  },
  {
    title: 'Attach Knowledge',
    description: 'Upload OKF knowledge bundles — your documentation, runbooks, and policies. Your endpoint answers questions grounded in your own data, not the open internet.',
    link: '/knowledge/bundles',
  },
  {
    title: 'Use Your AI Endpoint',
    description: 'Every deployment exposes an OpenAI-compatible REST endpoint. Works with Cursor, Continue, LangChain, Open WebUI, or any OpenAI SDK client — no code changes required.',
    link: '/use-your-endpoint/openai-compatible-api',
  },
];

const WorkflowSteps = [
  'Answer 5 Questions',
  'Get Recommendation',
  'Deploy Instantly',
  'Attach Knowledge',
  'Use Anywhere',
];

function Feature({title, description, link}) {
  return (
    <div className={clsx('col col--3')}>
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
            to="/use-your-endpoint/openai-compatible-api"
            style={{marginLeft: '1rem'}}>
            View API Reference
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
      description="Private AI for software teams. Dedicated inference endpoints, your region, your data.">
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
              CaseDesk provisions a dedicated AI endpoint for your engineering team. Choose your model size, region, and compliance level — we handle the infrastructure. vLLM continuous batching, scale to zero when idle, OpenAI-compatible API. Your data never leaves your chosen region.
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
