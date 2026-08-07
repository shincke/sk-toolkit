# sk-ai-chat

<!-- Auto Generated Below -->

## Properties

| Property           | Attribute           | Description | Type     | Default                               |
| ------------------ | ------------------- | ----------- | -------- | ------------------------------------- |
| `header`           | `header`            |             | `string` | `"AI Chat"`                           |
| `inputPlaceholder` | `input-placeholder` |             | `string` | `"Ask anything..."`                   |
| `subheader`        | `subheader`         |             | `string` | `"Ask questions and explore answers"` |
| `suggestionsLabel` | `suggestions-label` |             | `string` | `"Suggested prompts"`                 |

## Shadow Parts

| Part         | Description |
| ------------ | ----------- |
| `"footer"`   |             |
| `"messages"` |             |
| `"wrapper"`  |             |

---

_Built with [StencilJS](https://stenciljs.com/)_

Responsibilities
Belong to sk-ai-chat (component)

Render layout regions: header, thread viewport, footer/composer area.
Render visual states driven by props: idle/loading/error/disabled.
Render message list exactly as received.
Emit user interaction intents only.
Accessibility primitives: aria-live regions, keyboard-safe interaction affordances.
Presentation-level behaviors: smooth scroll, viewport pin-to-bottom behavior when instructed.
Belong to Nuxt (consumer app)

Compose outgoing prompt payloads.
Call AI/model APIs and tools.
Manage streaming state/chunk aggregation.
Persist and hydrate conversation history.
Decide product behavior for suggestions, retries, moderation, citations policy.
Produce final message objects and pass them as props.
