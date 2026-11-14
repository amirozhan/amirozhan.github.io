---
# Drafts in _drafts/ are NOT published.
# To publish: move this file to _posts/ and rename it YYYY-MM-DD-your-slug.md
title: "Your post title"
description: "One or two sentences. Shown under the title, on the blog page and on the homepage."
tags: [research, deep learning]
math: false        # set to true to render LaTeX, e.g. $$ E = mc^2 $$
---

Write in Markdown. The first paragraph is used as the summary if you leave out `description`.

## A section heading

Regular text, **bold**, *italic*, [a link](https://amirozhan.github.io/CBSOM/) and `inline code`.

> A quote stands out with a gold rule.

```python
import torch
x = torch.randn(3, 3)
```

![Alt text describing the image](/assets/img/blog/your-image.png)

With `math: true`, display equations go between double dollar signs:

$$ \mathcal{L} = \mathcal{L}_{task} + \lambda \, \mathcal{L}_{SOM} $$
