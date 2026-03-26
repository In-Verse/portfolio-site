---
title: "Square Matrix"
date: 2019-08-08T02:20:33-05:00
draft: false
tags: math, poetry
---

Charles Dodgson wrote the poem below. He is better known as Lewis Carroll for writing the childhood book *Alice and Wonderland* and *Through the Looking Glass*. Dodgson was also a mathematician who pioneered how to find the determinant of a square matrix. In other words, he found a method to determine whether a solution to a system of linear equations exists.

| I | often | wondered | when | I | cursed |
| --- | --- | --- | --- | --- | --- |
| Often | feared | where | I | would | be |
| Wondered | where | she'd | yield | her | love |
| When | I | yield | so | will | she |
| I | would | her | will | be | pitied |
| Cursed | be | love | she | pitied | me |

Do you notice anything about the poem?

Here are my observations:
- Poem fits in a 6x6 table
- Poem is a square
- Poem can be read both horizontally (through rows) and vertically (through columns)

Personally, this is fascinating! I can use my basic understanding of linear algebra to consider the poem as a matrix. 

| I **(a11)**| often **(a12)**| wondered **(a13)**| when **(a14)**| I **(a15)**| cursed **(a16)**|
| --- | --- | --- | --- | --- | --- |
| Often **(a21)**| feared **(a22)**| where **(a23)**| I **(a24)**| would **(a25)**| be **(a26)**|
| Wondered **(a31)**| where **(a32)**| she'd **(a33)**| yield **(a34)**| her **(a35)**| love **(a36)**|
| When **(a41)**| I **(a42)**| yield **(a43)**| so **(a44)**| will **(a45)**| she **(a46)**|
| I **(a51)**| would **(a52)**| her **(a53)**| will **(a54)**| be **(a55)**| pitied **(a56)**|
| Cursed **(a61)**| be **(a62)**| love **(a63)**| she **(a64)**| pitied **(a65)**| me **(a66)**|

Observe that a12 = a21. In this case, "often" = "often". When the columns and the rows of a matrix are interchanged, then we get the transpose of that matrix. In this case, A= AT. By a further set of proofs (A-1AT = I), we can see that our matrix A is invertible. 

Yes, linear algebra deals with numbers (integers, floats). However, Dodgson shows that you can also look at words (strings)!

> Contrariwise, if it was so, it might be; and if it were so, it would be; but as it isn't, it ain't. That's logic. - Tweedledee 