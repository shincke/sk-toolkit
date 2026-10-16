import { cp, readFile, rm, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFilePath = fileURLToPath(import.meta.url);
const scriptsDir = dirname(currentFilePath);
const projectDir = resolve(scriptsDir, '..');
const docsDir = resolve(projectDir, 'docs');
const buildDir = resolve(docsDir, 'build');
const outputDir = resolve(docsDir, 'catalog');
const legacyTokensPath = resolve(docsDir, 'tokens.css');
const docsShowcasePath = resolve(docsDir, 'showcase.css');
const sourceIndexPath = resolve(projectDir, 'src/index.html');
const docsIndexPath = resolve(docsDir, 'index.html');
const stencilBuildDir = resolve(projectDir, 'www/build');
const stencilShowcasePath = resolve(projectDir, 'www/showcase.css');
const npxCommand = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const pagesBasePath = process.env.PAGES_BASE_PATH ?? '/catalog/';

const storybookButtonMarkup = [
  '            <div class="showcase-storybook-link">',
  '              <sk-button id="open-storybook" variant="secondary" size="sm">Open Storybook Documentation</sk-button>',
  '            </div>',
].join('\n');

const storybookButtonStyle = ['', '      .showcase-storybook-link {', '        display: inline-flex;', '        margin-top: 16px;', '      }'].join('\n');

const storybookButtonScript = [
  "      const openStorybook = document.querySelector('#open-storybook');",
  '',
  '      if (openStorybook) {',
  "        openStorybook.addEventListener('click', () => {",
  "          window.open('./catalog/', '_blank', 'noopener');",
  '        });',
  '      }',
  '',
].join('\n');

const createDocsIndex = async () => {
  const sourceHtml = await readFile(sourceIndexPath, 'utf8');

  const docsHtml = sourceHtml
    .replaceAll('href="/build/', 'href="./build/')
    .replaceAll('src="/build/', 'src="./build/')
    .replace('      .showcase-lead {', `${storybookButtonStyle}\n\n      .showcase-lead {`)
    .replace(
      '            <sk-heading size="display">Component Catalog</sk-heading>',
      `            <sk-heading size="display">Component Catalog</sk-heading>\n${storybookButtonMarkup}`,
    )
    .replace(
      "      const themeToggle = document.querySelector('#theme-toggle');\n",
      `      const themeToggle = document.querySelector('#theme-toggle');\n${storybookButtonScript}`,
    );

  await writeFile(docsIndexPath, docsHtml);
};

const runCommand = (command, args) =>
  new Promise((resolveCommand, rejectCommand) => {
    const child = spawn(command, args, {
      cwd: projectDir,
      env: {
        ...process.env,
        CI: '1',
        PAGES_BASE_PATH: pagesBasePath,
        STORYBOOK_DISABLE_TELEMETRY: '1',
      },
      stdio: 'inherit',
    });

    child.on('error', rejectCommand);
    child.on('exit', code => {
      if (code === 0) {
        resolveCommand(undefined);
        return;
      }

      rejectCommand(new Error(`Command failed with exit code ${code ?? 'unknown'}.`));
    });
  });

await rm(buildDir, { recursive: true, force: true });
await rm(outputDir, { recursive: true, force: true });
await rm(legacyTokensPath, { force: true });
await rm(docsShowcasePath, { force: true });

await runCommand(npmCommand, ['run', 'build']);
await cp(stencilBuildDir, buildDir, { recursive: true });
await cp(stencilShowcasePath, docsShowcasePath);
await createDocsIndex();
await runCommand(npxCommand, ['storybook', 'build', '--output-dir', 'docs/catalog']);
