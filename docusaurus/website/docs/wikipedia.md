---
id: wikipedia 
title: Wikipedia
sidebar_label: Wikipedia
---

The **Wikipedia** component scans the **Wikipedia** and returns an article - if anything valid is found under the entered search term.

## Example

```jsx live
<Wikipedia
    language = "de-DE"
/>
```



## Options

* __invisible__ | `boolean`: controls whether to display a text input field to search for Wikipedia articles. Default: `false`.
* __language__ | `string`: language identifier. Default: `'en-US'`.
