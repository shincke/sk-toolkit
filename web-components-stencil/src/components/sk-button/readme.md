# sk-button



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute    | Description | Type                                                   | Default     |
| ----------------- | ------------ | ----------- | ------------------------------------------------------ | ----------- |
| `accessibleLabel` | `aria-label` |             | `string`                                               | `undefined` |
| `disabled`        | `disabled`   |             | `boolean`                                              | `false`     |
| `fullWidth`       | `full-width` |             | `boolean`                                              | `false`     |
| `iconOnly`        | `icon-only`  |             | `boolean`                                              | `false`     |
| `loading`         | `loading`    |             | `boolean`                                              | `false`     |
| `size`            | `size`       |             | `"lg" \| "md" \| "sm"`                                 | `'md'`      |
| `type`            | `type`       |             | `"button" \| "reset" \| "submit"`                      | `'button'`  |
| `variant`         | `variant`    |             | `"destructive" \| "ghost" \| "primary" \| "secondary"` | `'primary'` |


## Dependencies

### Used by

 - [sk-record-card](../../patterns/sk-record-card)

### Depends on

- [sk-loading](../sk-loading)

### Graph
```mermaid
graph TD;
  sk-button --> sk-loading
  sk-loading --> sk-caption
  sk-record-card --> sk-button
  style sk-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
