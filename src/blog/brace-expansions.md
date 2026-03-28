---
title: "Brace expansions and how to use them"
date: 2026-03-28T02:53:47-05:00
draft: false
tags: bash, linux
---

## How brace expansions work

Have you needed to make strings on the terminal? Enter brace expressions.

Brace expressions let you generate arbitrary strings; they can be sequential, non-sequential, or a combination! At the core of the expansion is the **pattern**, which generates strings. Optionally, there can either be a preamble *before* the pattern and a postscript *after* the pattern. Think of both the preamble and the postscript as strings that surround the pattern that will be generated. The format can be expressed as `<preamble>{ <pattern> }<postscript>`.

<details>
  <summary>Click here to see the official description from the manpages</summary>

> Brace expansion is a mechanism by which arbitrary strings may be generated. This mechanism is similar to pathname expansion, but the filenames generated need not exist. Patterns to be brace expanded take the form of an optional preamble, followed by either a series of comma-separated strings or a sequence expression between a pair of braces, followed by an optional postscript. The preamble is prefixed to each string contained within the braces, and the postscript is then appended to each resulting string, expanding left to right - `man 1 bash` 
</details>

In the following paragraphs, I will explain the patterns, preamble/postscript, and nesting for brace expansions. 

### Patterns

Patterns are the power behind brace expanions that generate strings. We place the patterns between curly braces like `{...}`

There are two patterns that you use for brace expansion:
1. Comma separated list of data
2. Sequence of expression (range)

The first pattern you can use is a list of strings. If your pattern is `{banana,apple,orange}` it will output `banana apple orange`.

Notice that without the optional preamble and postscript, the result is just a space separated list of the strings.

The second pattern you can use is a range with a start and a end. If your pattern is `{1..5}` it will output `1 2 3 4 5`. Ranges can be numeric (`1..3`), alphabetic (`a..c`), or a combination.

We can also specify a steps value for the range. For example, `{0..10..2}` will produce only the even numbers from 0 to 10: `0 2 4 6 8 10`.

### Adding the preamble and the postscript

The preamble is like the prefix and the postscript is like the suffix around our pattern.

To add a preamble, just add a string to the left of the pattern. Likewise, add a string to the right of the pattern for the postscript.

![Brace Expansion Format](/assets/images/brace/brace-expansion.png)

Preambles and postscripts are always optional in brace expansion. If we wanted, we can omit either or both. When we use a brace expansion like `{tasty,yum}`, there is neither a preamble nor a postscript. We can also use empty strings if our pattern is a list. This will basically only concatenate the preamble and the postscript. 

![Brace Expansion List](/assets/images/brace/brace-expansion-list.png)

### Nesting

When you *combine* brace expansions, you use them as either a preamble or postscript for another brace expansions. Its a Cartesian product!

A good example comes from [The Bash Hackers Wiki](https://flokoe.github.io/bash-hackers-wiki/syntax/expansion/brace/). It first generates the uppercase letters then the lowercase letters.

{% raw %}
``` 
$ echo {{A..Z},{a..z}}
```
{% endraw %}

Here's another example of nesting. I only have one set of cats that I can pet - but many, many dogs to pet!

{% raw %}
``` 
$ echo pet-{{cat,kitten},{1..5}{dog,puppy}}
pet-cat pet-kitten pet-1dog pet-1puppy pet-2dog pet-2puppy pet-3dog pet-3puppy pet-4dog pet-4puppy pet-5dog pet-5puppy
```
{% endraw %}

### Summary

In short, brace expansions generate a series of strings. 

If you are confused on what strings a brace expansion will make, I recommend `echo`'ing it out. 

``` 
$ echo {a,b,c}
a b c
$ echo {0..5}
0 1 2 3 4 5
$ echo {0..5}{a,b,c}
0a 0b 0c 1a 1b 1c 2a 2b 2c 3a 3b 3c 4a 4b 4c 5a 5b 5c
```

The output from brace expansions produces strings that can be invaluable on the terminal. You can use them for command arguments, parameters, or output.

\
Note: Brace expansions are a feature that was introduced in Bash version 3.0. They are one of the 7 kinds of expansion that the Bash shell performs *and* are actually the very **first expansion** that the shell does in the order of expansions! Unfortunately, brace expansion *is not* portable since it isn't POSIX compliant. 

## 1. Rename files

You can rename files with brace expansions. See `mv file.{pdf,old}` which translates to `mv file.pdf file.old`.

Below we rename a CSV file to a Excel file.

```
$ ls
spreadsheet.csv
$ mv spreadsheet.{csv,xlsx}
$ ls
spreadsheet.xlsx

```

## 2. Copy files 

Brace expansions make it easy to make backups without having to provide the *same* path again for a second argument.

What if you have a super long file like `audit.log.2026-01-01.gz` and you wanted to make a backup copy? You could do `cp audit.log.2026-01-01.gz audit.log.2026-01-01.gz.bkp` *but* that's a lot of typing.

We can use brace expansions to literally run the same command but easier with: `cp audit.log.2026-01-01.gz{,.bkp}`

```
$ ls
audit.log.2026-01-01.gz
$ cp audit.log.2026-01-01.gz{,.bkp}
$ ls
audit.log.2026-01-01.gz
audit.log.2026-01-01.gz.bkp
```

What's the `{,bkp}`? Notice that there is *no* character between the opening brace and the first comma. That left part is empty. It translates to the path being *just* the preamble in the above. 

## 3. Restore a backup file

It is also useful using the `{bkp,}` pattern. Here, its the right side of the comma that is empty.

```
$ ls
dnf.log.bkp
$ mv dnf.log{.bkp,}
$ ls
dnf.log 
```

## 4. Create bulk directories

You can create deeply nested directory trees with just *one* command.

Here are some examples:

- Generate a calendar for the months of January and February
  - `mkdir -p calendar/{January/{1..31},February/{1..28}}`
- Make the directory folder structure of a Eleventy project
  - `mkdir -p eleventy-sample/{dist,scripts,style,es,asset,site{_include,_layout,_data}}`

Make sure to use the `-p` command with `mkdir` if you are making directories where the subdirectories (or path) before them doesn't exist yet. 

## 5. Loop over files

What if you want to go over a bunch of log files form `log01.txt` to `log20.txt`? You may do something funky with output from `ls`, `grep`, or `seq`. However, it can be simpler with brace expansion. The following pattern is useful when your files follow a sequential pattern.

``` bash
for file in log{01..20}.txt ; do
  processLog(file)
done
```
\
You can use brace expansions to replace the command `seq`. `for i in {1..10}` is the same as `for i in $(seq 10)`. In general, I would recommend uisng `seq` in scripts and brace exprassion at the terminal prompt. This is because `seq` will provide exit codes (success/failure).     

Note: Bash v4.0 instroduced the zero-padding of expanded numeric values.

## 6. Bulk download files

Sometimes you need to download files from a website, this makes it easy!

You can use `curl` or `wget` to download files. The commands will see the expansions as separate URLs so you can download a bunch all at once!

``` 
wget http://blog.com/posts/{0..10}.html
wget http://blog.com/{index.html,styles.css,script.js}
```

## 7. Make a inventory of hosts

You can generate a hosts file with a list of your managed servers and hosts with brace expansions. Lets say you are given a couple parameters where a server is defined like `<region>-<instance>-<role>`:

- Region: north,south,west
- Instance: 1..20
- Role: app, db, cache, dev

Your brace expansion would be: `{north,south,west}-{01..20}-{app,db,cache}`

Now you can create your hosts file with one line: `printf "%s\n" {north,south,west}-{01..20}-{app,db,cache,dev} > hosts.txt`. 

For an extra challenge, you can build inventory lists off of available [naming schemes](https://namingschemes.com/Main_Page).

You can also use this same technique to generate usernames or email accounts.

### References:

* Bash manpage
* [GNU Bash Manual](https://www.gnu.org/software/bash/manual/html_node/Brace-Expansion.html)
* [Mastering Eleventy Folder Structures: From Default Setups to Real-World Best Practices](https://www.njfamirm.ir/en/blog/eleventy-folder-structure-guide)
* [Linux Journal: My Favorite bash Tips and Tricks](https://www.linuxjournal.com/article/7385)
* [The BashHackers Wiki: Brace expansion](https://flokoe.github.io/bash-hackers-wiki/syntax/expansion/brace/)