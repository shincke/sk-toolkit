# sk-toolkit Design System — Agent Instructions

## Source of truth

- Figma defines the visual design.
- `design-metadata/` defines component contracts and visual references.
- `src/` is the implementation source of truth.
- Reuse existing design tokens and components.
- Do not invent new variants without explicit instruction.

## Before implementing a component

1. Find its entry in `design-metadata/`.
2. Read the component JSON.
3. Inspect the referenced screenshot in `design-metadata/images/<component-name>/<light-mode>.png` AND `design-metadata/images/<component-name>/<dark-mode>.png`. The screenshot is the visual reference for the component.
4. Inspect existing Stencil components.
5. Reuse existing tokens.
6. Implement the component.
7. Add/update tests.
8. Validate against the visual reference.

## Stencil

All reusable UI components must be implemented as Stencil Web Components.

## Design system

Do not introduce arbitrary colors, spacing, typography, borders or radii.
Use the existing design tokens.
