---
title: "Files Full Of Whitespace"
date: 2020-06-22T01:53:47-05:00
draft: false
tags: bash, linux
---

## A preamble on the frustrations of filenames 

I was a student worker in Sysops when I encountered a frustrating problem. I was making a Windows Virtual Machine as a "test box" on my Arch Linux work computer. I downloaded the Windows ISO from our network share. However, try as I might, I couldn't get VMbox to recognize the ISO as a *valid* option. 

I was confused for a good while! Then, I brought in my boss. However, he was also confused...! Some more time passed before we realized the simple issue. It was because the Windows ISO ended in capital ISO extension instead of a lowercase iso extension. For Windows, the case doesn't matter. But, for Linux, the case *does* matter. Bad practices from file naming in Windows can come back to haunt you when using the files on another operating system. Escaping spaces in Linux haunts me in my dreams.

So, this got me to thinking about bad filenames. What would be the most annoying thing for a programmer to encounter? I first thought it might be something with abstract Unicode characters. But, then, I rememembered whitespace. What if somebody encountered a folder full of "nothing"?

I remembered a silly space character that once caused some trouble in .NET. The Mongolian Vowel Separator has a value of U+180e. You probably don't use it in your regular speech (unless you are from Mongolia). However, the vowel separator has oscillated between being in the "formatting" category and "space" category. Because of this, you can create code that will actually vary based on the Unicode expression. You could insert a Mongolian Vowel Separator in a variable and the compiler will think nothing of it all - and then in other instances, your compiler will be bugged out. 

However, as of current, the Mongolian Vowel Separator is not classified as whitespace. So, what is whitespace? There are currently 25 characters defined as whitespace ("WS") in the Unicode Database. I choose from that to create a program that will create the max number of whitespace possible. 

## A starter script to make space

Here is a basic implementation with the classic space character " ". Note that you can replace it with the Unicode equivalent as long as you escape it with a `\`.

```  bash
function makespace(){
  local space=""
  for i in {1..255}
    do
      space=$space' '
      touch "./$space"
    done
    space=''
```

It's that simple. 

Note: The loop goes to 255 because the max filelength of a file in a directory is (usually) 255 characters. The filename lenghts can be defined at a filesystem level or as a constant in your `limits.h`.

## More Fun With Space Making

We can run our script and make filenames full of space characters in our current directory... but is there more that we can do? 

### Search and ~~destroy~~ make space

The program can write spaces to one directory. But, you can extend it to write to all possible directories if you look for `find`able directories. Put the result in a list that the program can while loop over. Now, you can write to directories on the server that you have permission to.

``` 
find /home/ -type d \( -perm -o+w \) 2>/dev/null > ~/list.txt
```

### Be a time wizard and change each file's time 

Create a distinct timestamp for each file. Note that you *need* to check month, day, hour, and minute values if its less than 10 because you need to append a 0; it's just how the command `touch` takes timestamps. 

``` bash
function timestamp(){
  stamp=''
  local year=`shuf -i 1990-2018 -n 1`
  stamp="$stamp$year"
  local month=`shuf -i 1-12 -n 1`
  isone $month
}
```

### Make your files contain good luck 

Make variable size of each file made of space with `fortune`. Why? Because directing the output of fortune in a file will mean that it will be harder for somebody to delete files based on a fixed-or-empty size value. After you create a file, just put some fortune in it.

```  bash
fortune > $file 
```

The biggest `fortune` size would be from a Iain M. Banks quote that outputs a file of size 2435. And the smallest would be "Chess tonight.", which outputs a size of 15. This is a *huge* range. If you wanted to, you could also increase this range through appending or cutting text. The tool `sed` is perfect for this because of the many ways it can transform text.

### Schedule your space making adventures 

Lets make a cronjob so that your program will relentlessly create spaces on a schedule. 

Everyday at 1AM seems like a good time to make space!

``` 
0 1 * * * /home/parsley/spacemaker.sh
```

## Why would you ever need files full of just whitespace?

I'll be honest, creating directories of whitespace is not practical. However, it's great fun and gets you scripting. Having files full of whitespace means that you're going to start to be creative. If all the files are full of whitespace and you're looking for a secret or flag in a CTF, what are you going to do? When you do a basic `ls`, the output will be, well, nothing. Doing a long listing with `ls -l` is better but still rough to go through the files. You can't rely on filenames. And, you don't want to `less` or `cat` through 255 files on different directories. This might force you to use regular expressions and `grep`.

PS. As the systems operator that had to spend a day to clean up my own valiant space making efforts, I hope that you have the wisdom to *not* give yourself future problems! This is fun to do in a Docker container or VM.

### References:

- [Attack of the Mongolian File Separator](https://codeblog.jonskeet.uk/2014/12/01/when-is-an-identifier-not-an-identifier-attack-of-the-mongolian-vowel-separator/)
- [Unicode Standard](https://www.unicode.org/versions/Unicode10.0.0/)
