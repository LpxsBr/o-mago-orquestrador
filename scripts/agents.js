#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const roleDirectory = 'subagents';
const providers = ['codex', 'claude', 'cursor', 'grok', 'gemini', 'copilot'];
const providerConfig = {
  codex: path.join('.codex', 'config.toml'),
  claude: 'CLAUDE.md',
  gemini: 'GEMINI.md',
};
const blockStart = '<!-- o-mago-orquestrador:start -->';
const blockEnd = '<!-- o-mago-orquestrador:end -->';

const usage = `Usage: node scripts/agents.js init <destination> [--providers <provider> ...]
Providers: ${providers.join(', ')}
Omit --providers to include all providers.`;

function existingContent(destination, relativePath) {
  const target = path.join(destination, relativePath);
  const segments = relativePath.split(path.sep);
  let current = destination;

  for (const [index, segment] of segments.entries()) {
    current = path.join(current, segment);
    const entry = fs.lstatSync(current, { throwIfNoEntry: false });
    if (!entry) return undefined;
    if (entry.isSymbolicLink()) {
      throw new Error(`Symlink in destination path: ${current}`);
    }
    const isExpectedType = index === segments.length - 1 ? entry.isFile() : entry.isDirectory();
    if (!isExpectedType) {
      throw new Error(`Unexpected file type: ${current}`);
    }
  }

  return fs.readFileSync(target);
}

function install(destination, selectedProviders) {
  const roles = fs.readdirSync(path.join(root, roleDirectory), { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => path.join(roleDirectory, entry.name))
    .sort();
  if (roles.length === 0) {
    throw new Error(`No role definitions in ${path.join(root, roleDirectory)}`);
  }

  const files = [
    'AGENTS.md',
    'AGENTS-ORQUESTRACAO.md',
    ...roles,
    ...Object.entries(providerConfig)
      .filter(([provider]) => selectedProviders.includes(provider))
      .map(([, file]) => file),
  ];

  const pending = [];
  const conflicts = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(root, file));
    const current = existingContent(destination, file);
    if (current === undefined) {
      pending.push({ file, content });
    } else if (current.equals(content)) {
      continue;
    } else if (path.extname(file) === '.md') {
      const existingText = current.toString('utf8').replace(/\r\n/g, '\n');
      const instructions = content.toString('utf8').trimEnd();
      const lines = existingText.split('\n');
      const start = lines.indexOf(blockStart);
      const end = lines.indexOf(blockEnd);
      if (start !== -1 && end > start) {
        continue;
      }
      if (start !== -1 || end !== -1) {
        conflicts.push(file);
        continue;
      }
      if (!`\n${existingText}\n`.includes(`\n${instructions}\n`)) {
        pending.push({
          file,
          content: `\n\n${blockStart}\n\n${instructions}\n\n${blockEnd}\n`,
          append: true,
        });
      }
    } else {
      conflicts.push(file);
    }
  }
  if (conflicts.length > 0) {
    throw new Error(`Conflicting files: ${conflicts.join(', ')}`);
  }

  for (const { file, content, append } of pending) {
    const target = path.join(destination, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    if (append) {
      fs.appendFileSync(target, content);
    } else {
      fs.writeFileSync(target, content, { flag: 'wx' });
    }
  }
  console.log(`${pending.length} file(s) written in ${destination}`);
}

function main(args) {
  if (args.includes('--help') || args.includes('-h')) {
    console.log(usage);
    return;
  }

  const [command, destination, option, ...values] = args;
  if (command !== 'init' || !destination || destination.startsWith('-')) {
    throw new Error(usage);
  }
  if (option !== undefined && (option !== '--providers' || values.length === 0)) {
    throw new Error(usage);
  }
  const selectedProviders = option === undefined ? providers : values;
  const unknownProviders = selectedProviders.filter((provider) => !providers.includes(provider));
  if (unknownProviders.length > 0) {
    throw new Error(`Unknown providers: ${unknownProviders.join(', ')}\n${usage}`);
  }

  install(path.resolve(destination), selectedProviders);
}

try {
  main(process.argv.slice(2));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
