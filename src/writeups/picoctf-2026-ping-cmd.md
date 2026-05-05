---
title: "picoCTF 2026 - ping-cmd"
date: 2026-03-09
draft: false
tags:
  - misc
  - linux
ctf: picoCTF 2026
---

## Challenge

**Category:** General Skills  
**Points:** 100  
**Description:** Can you make the server reveal its secrets? It seems to be able to ping Google DNS, but what happens if you get a little creative with your input?


<details>
  <summary>Click here to see the official challenge description</summary>
  <figure>
  <img src="/assets/images/writeups/picoctf-2026/ping-cmd/challenge.png" alt="Alt text">
  <figcaption>Challenge description for the ping-cmd from picoCTF 2026</figcaption>
</figure>
</details>

## Just a regular ping to Google?

We can `nc` in and see that the service lets you ping an IP twice. The only IP that it lets you ping is Google (`8.8.8.8`). 

However, what if you try other inputs?

After trying another IP after the first, we can see that it only takes the last argument. 

It's also interesting that the app *takes* user input despite saying that it will only ping one IP. 

What if we add a semicolon to separate commands? The `;` allows us to run the next command unconditionally. 

![Output from nc for the challenge](/assets/images/writeups/picoctf-2026/ping-cmd/ping-cmd-1.png)

It works!

This is an example of command injection! We can add extra commands onto the end of our allowed IP (`8.8.8.8`) with `;` and they will execute on the server. First `ping` will execute and then we can *inject* whatever we want afterwards.
## Exploiting

We found out that the location of the flag on the server is the directory where the service is running. We just need to `cat flag.txt` to get the flag. What executes on the server will be something like `ping -c 2 8.8.8.8 ; cat flag.txt`

![Output from nc for the challenge that reveals the flag with the cat command](/assets/images/writeups/picoctf-2026/ping-cmd/ping-cmd-2.png)

## Flag

The flag is `picoCTF{p1nG_c0mm@nd_3xpL0it_su33essFuL_d1fdbd0}`.

## Lessons

- The `;` allows chaining commands in Bash
- Always sanitize user input 
