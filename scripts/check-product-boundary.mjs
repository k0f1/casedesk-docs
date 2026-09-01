import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import process from 'node:process';

const root = process.cwd();
const docsRoot = join(root, 'docs');
const files = [join(root, 'sidebars.js')];
const retiredCustomerClaims = [
  'deploy a model',
  'deploy your ai platform',
  'casedesk-funded capacity',
  'casedesk-funded hardware',
  'managed gpu price',
  'we handle the infrastructure',
  'no cloud account required. we handle the infrastructure',
  'your data never leaves your region',
  'no document leaves your region',
];

async function collectMarkdown(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await collectMarkdown(path);
    } else if (entry.isFile() && path.endsWith('.md')) {
      files.push(path);
    }
  }
}

await collectMarkdown(docsRoot);

const failures = [];
for (const path of files) {
  const content = (await readFile(path, 'utf8')).toLowerCase();
  for (const claim of retiredCustomerClaims) {
    if (content.includes(claim)) {
      failures.push(`${relative(root, path)} contains retired claim: ${claim}`);
    }
  }
}

if (failures.length) {
  console.error('CaseDesk product-boundary check failed:\n' + failures.join('\n'));
  process.exit(1);
}

console.log(`CaseDesk product-boundary check passed for ${files.length} documentation files.`);
