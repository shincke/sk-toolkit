# SK Toolkit

SK Toolkit is a web component library built with Stencil.

## Documentation

[https://hincksof.github.io/sk-toolkit/](https://shincke.github.io/sk-toolkit/)

## Local Development

Requirements:

- Node.js 22
- npm 11

From `web-components-stencil/`:

### 1. Stencil only

```bash
npm start
```

Use this when you want to work on the Stencil project by itself.
It runs the Stencil dev server, watches files, rebuilds on change, and serves the local preview.

### 2. Storybook with web components enabled

```bash
npm run storybook
```

Use this when you want to preview components in Storybook.

What this command does:

1. Runs one Stencil build first.
2. Starts Stencil in watch mode so component changes rebuild automatically.
3. Starts Storybook on `http://localhost:6006`.

This is important because Storybook depends on the generated Stencil runtime and loader.
It does not compile the Stencil components directly from source by itself.

### 3. Test

```bash
npm test
```

### 4. Production build

```bash
npm run build
```

## License

This project is released under the MIT License.
See [LICENSE](LICENSE).
