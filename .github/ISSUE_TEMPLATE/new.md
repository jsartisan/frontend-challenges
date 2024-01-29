---
name: New Challenge
about: Propose a new challenge, a PR will be auto generated.
title: ""
labels: new-challenge
---

> Please follow the template and fill the info. A PR will be auto-generated and always reflect on your changes.
>
> Detailed solution/guide is not required, but please be sure the challenge is solvable.

## Info

Basic info of your challenge questions,

```yaml
difficulty: easy # medium / hard / extreme
title: Your Question Name
template: vanilla # react / vue / svelte
# tags: union, array # separate by comma
```

## Question

<!--question-start-->

Describe your question and give some examples. Markdown is supported here.
<!--question-end-->

## Template

This is the template that the editor in the questions 's playground will use.

<!--template-start-->

```html index.html active
<div>Hello World</div>
```

You can also make a file hidden by adding `hidden` to the end of the code block.

```html index.html hidden
<div>Hello World</div>
```

If you want make a file active by default, add `active` to the end of the code block.

```html index.html active
<div>Hello World</div>
```

<!--template-end-->

Note: Please don't delete the comments `<!--question-start-->` and `<!--question-end-->`, `<!--template-start-->` and `<!--template-end-->`, they are used to identify/extract the question and template.
