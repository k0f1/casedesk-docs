import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const FeatureList = [
  {
    title: 'Find Your Platform',
    description: 'Answer five questions about workload, team, region, availability, and compliance. CaseDesk recommends the right deployment path and workload profile — no infrastructure knowledge required.',
    link: '/getting-started/quick-start',
  },
  {
    title: 'Governed Connection',
    description: 'Connect an approved vLLM, cloud, or provider endpoint that your organisation controls. CaseDesk supplies compatible APIs, routing, policy, and operational visibility without owning the runtime capacity.',
    link: '/deploy-a-model/choosing-a-model',
  },
  {
    title: 'Regional Control',
    description: 'Declare the region and data boundary for the endpoint your organisation or provider controls. CaseDesk verifies that declaration before activation.',
    link: '/introduction/what-is-casedesk',
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
  'Connect and Verify',
  'Review Workload Fit',
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
      description="Private AI control plane for software teams. Connect infrastructure you control through compatible APIs, policy, and operational visibility.">
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
              CaseDesk gives your engineering team one governed API surface over an approved endpoint your organisation or provider controls. Start from workload intent, regional control, and compliance needs; CaseDesk verifies the connection and adds compatible APIs, routing, policy, and operational visibility. Your provider bills the runtime directly.
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
