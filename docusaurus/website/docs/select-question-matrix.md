---
id: select-question-matrix
title: Select Question Matrix
sidebar_label: Select Question Matrix
---

A question with an answer consisting of multiple select boxes.

## Example

```jsx live
<SelectQuestionMatrix
    rows={[ 'First Row' ]} 
    cols={[ 'First Column', 'Second Column' ]} 
    options={{ '0:0': [ 'Incorrect', 'Correct' ], '0:1':  [ 'Incorrect', 'Incorrect', 'Correct' ] }} 
    solution={{ '0:0': 1, '0:1': 2 }}
/>
```

## Options

* __question__ | `(string|node)`: question to be displayed at the top of the select question matrix. Default: `''`.
* __rows__ | `array`: undefined. Default: `[]`.
* __cols__ | `array`: column labels. Default: `[]`.
* __options__ | `object`: object with key-value pairs with keys having the form `row:col`, e.g. `0:0`, `0:1`, `1:0` etc., and their corresponding values being arrays of the possible answer choices for the individual select questions. Default: `{}`.
* __solution__ | `object`: solution object with key-value pairs with keys having the form `row:col`, e.g. `0:0`, `0:1`, `1:0` etc., and their corresponding values being the index of the correct answer element from the respective `options` array. Default: `{}`.
* __hints__ | `array<(string|node)>`: hints providing guidance on how to answer the question. Default: `[]`.
* __hintPlacement__ | `string`: placement of the hints (either `top`, `left`, `right`, or `bottom`). Default: `'bottom'`.
* __feedback__ | `boolean`: controls whether to display feedback buttons. Default: `true`.
* __provideFeedback__ | `string`: whether to provide `none` feedback at all, `individual` feedback on the submitted answer(s), or `overall` feedback for all questions. Default: `'individual'`.
* __allowIncomplete__ | `boolean`: whether to allow submissions without a selection made in each select box. Default: `false`.
* __nTries__ | `number`: after how many tries no further answers are accepted (if `provideFeedback` is not `none`). Default: `1`.
* __failureMsg__ | `string`: notification text displayed upon submitting incorrect answers. Default: `none`.
* __successMsg__ | `string`: notification text displayed upon submitting correct answers. Default: `none`.
* __cellLabels__ | `object`: undefined. Default: `{}`.
* __chat__ | `boolean`: controls whether the element should have an integrated chat. Default: `false`.
* __className__ | `string`: class name. Default: `''`.
* __style__ | `object`: CSS inline styles. Default: `{}`.
* __onSubmit__ | `function`: callback function invoked upon submission with the answers as a first and a boolean indicating correctness as second parameter. Default: `onSubmit() {}`.
