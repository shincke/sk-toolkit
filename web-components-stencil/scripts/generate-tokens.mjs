import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const sourcePath = path.join(rootDir, 'src', 'tokens', 'figma-source.json');
const cssOutputPath = path.join(rootDir, 'src', 'global', 'tokens.css');
const tsOutputPath = path.join(rootDir, 'src', 'design-tokens.ts');

const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const themeNames = Object.keys(source.themes);
const firstTheme = source.themes[themeNames[0]];
const themeTokens = Object.keys(firstTheme.tokens);
const colorTokens = themeTokens.filter(token => token.startsWith('--color-'));
const typographyTokens = themeTokens.filter(token => token.startsWith('--font-'));
const tokenGroups = source.tokens;
const flatGlobalTokens = Object.values(tokenGroups).flatMap(group => Object.keys(group));
const animationClasses = Object.keys(source.animations);

const fontFamilies = Array.from(
  new Set(
    themeNames.flatMap(themeName => {
      const values = Object.values(source.themes[themeName].tokens);
      return values.flatMap(value => Array.from(value.matchAll(/'([^']+)'/g), match => match[1]));
    }),
  ),
);
const fontImportUrl = fontFamilies.length
  ? `@import url('https://fonts.googleapis.com/css2?${fontFamilies.map(name => `family=${encodeURIComponent(name).replace(/%20/g, '+')}`).join('&')}&display=swap');`
  : null;

const cssComment = [
  '/*',
  ' * Generated from the Figma design library source.',
  ' * Do not edit manually. Run `npm run sync:tokens` and `npm run generate:tokens` instead.',
  ' */',
].join('\n');

const rootTokenLines = Object.values(tokenGroups).flatMap(group => Object.entries(group).map(([token, value]) => `  ${token}: ${value};`));

const animationLines = animationClasses.flatMap(className => {
  const { duration, timing, iterationCount } = source.animations[className];
  const keyframeName = `token-${className}`;

  if (className === 'spinner-rotate') {
    return [
      `.${className} {`,
      `  animation: ${keyframeName} ${duration} ${timing} ${iterationCount};`,
      '}',
      '',
      `@keyframes ${keyframeName} {`,
      '  to {',
      '    transform: rotate(360deg);',
      '  }',
      '}',
    ];
  }

  return [
    `.${className} {`,
    `  animation: ${keyframeName} ${duration} ${timing} ${iterationCount};`,
    '}',
    '',
    `@keyframes ${keyframeName} {`,
    '  0%,',
    '  100% {',
    '    opacity: 1;',
    '  }',
    '',
    '  50% {',
    '    opacity: 0.55;',
    '  }',
    '}',
  ];
});

const cssLines = [
  ...(fontImportUrl ? [fontImportUrl, ''] : []),
  cssComment,
  '',
  ':root {',
  ...rootTokenLines,
  '}',
  '',
  ...themeNames.flatMap(themeName => {
    const { selector, tokens } = source.themes[themeName];
    const declarations = Object.entries(tokens).map(([token, value]) => `  ${token}: ${value};`);
    return [selector + ' {', ...declarations, '}', ''];
  }),
  ...animationLines,
  '',
  'html,',
  'body {',
  '  min-height: 100%;',
  '}',
  '',
  'body {',
  '  margin: 0;',
  '  background-color: var(--color-background);',
  '  color: var(--color-text-primary);',
  '  font-family: var(--font-sans);',
  '  transition:',
  '    background-color 0.2s ease,',
  '    color 0.2s ease;',
  '}',
];

fs.writeFileSync(cssOutputPath, `${cssLines.join('\n')}\n`);

const tsGroups = [
  "export const SK_THEMES = ['light', 'dark'] as const;",
  '',
  'export type SkTheme = (typeof SK_THEMES)[number];',
  '',
  `export const SK_THEME_TOKENS = [\n${themeTokens.map(token => `  '${token}',`).join('\n')}\n] as const;`,
  '',
  `export const SK_COLOR_TOKENS = [\n${colorTokens.map(token => `  '${token}',`).join('\n')}\n] as const;`,
  '',
  'export const SK_DYNAMIC_COLOR_TOKENS = SK_COLOR_TOKENS;',
  '',
  `export const SK_TYPOGRAPHY_TOKENS = [\n${typographyTokens.map(token => `  '${token}',`).join('\n')}\n] as const;`,
  '',
  `export const SK_GLOBAL_TOKENS = [\n${flatGlobalTokens.map(token => `  '${token}',`).join('\n')}\n] as const;`,
  '',
  `export const SK_SPACING_TOKENS = [\n${Object.keys(tokenGroups.spacing)
    .map(token => `  '${token}',`)
    .join('\n')}\n] as const;`,
  '',
  `export const SK_RADIUS_TOKENS = [\n${Object.keys(tokenGroups.radius)
    .map(token => `  '${token}',`)
    .join('\n')}\n] as const;`,
  '',
  `export const SK_BORDER_WIDTH_TOKENS = [\n${Object.keys(tokenGroups.borderWidth)
    .map(token => `  '${token}',`)
    .join('\n')}\n] as const;`,
  '',
  `export const SK_SHADOW_TOKENS = [\n${Object.keys(tokenGroups.shadow)
    .map(token => `  '${token}',`)
    .join('\n')}\n] as const;`,
  '',
  `export const SK_ANIMATION_CLASSES = [\n${animationClasses.map(name => `  '${name}',`).join('\n')}\n] as const;`,
].join('\n');

fs.writeFileSync(tsOutputPath, `${tsGroups}\n`);

console.log(
  `Generated ${themeNames.length} themes, ${themeTokens.length} theme tokens, ${flatGlobalTokens.length} global tokens, and ${animationClasses.length} animation utilities.`,
);
