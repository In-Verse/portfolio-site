---
title: "Data Analytics of Animal Crossing Villagers"
date: 2025-08-28T02:53:47-05:00
draft: false
tags: python
---

Animal Crossing: New Horizons (ACNH) is a life simulation game by Nintendo. You play as a human that moves to an island populated by anthropomorphic animal residents. You meet neighbors, fish, dig for fossils, interior decorate, visit the museum, and more. It's a heartfelt "slice of life" game where you can unwind from the real world.

I used ACNH as a dataset because of my personal connection to the videogame series. I have played multiple Animal Crossing games through the years. My aunt got me into the game series when I was a kid. She would bring over her memory card so that we could visit each other's worlds. 

I started this project because I wanted to better understand why I love the game so much. Since much of the magic is centered around the villagers - their personalities, stories, quirks - analyzing them seemed like a way to uncover what makes ACNH so captivating to me.

![Animal Crossing Game](/assets/images/animal-crossing/game.png)

I had questions like:
- What makes up a villager's interaction?
- What is the gender distribution of villagers?
- What are the most and least common species?
- What kind of hobbies do villagers have?

## Background

### What is a villager?

A villager is a non playable character (NPC) that you share your videogame island (aka. town) with. They interact with the player and other NPCs on the island. Villagers are a core component of Animal Crossing. Many players have favorite villagers that they seek out.

![Villager Character Sheet](/assets/images/animal-crossing/villager.png)

In short, villagers:
- Own a house on the island
- Interact with other villagers and the player
- Request things from you
- Can have a good/bad relationship with you
- Have a personality and hobbies

### Personalities & Hobbies

There are 8 personality types. Animal Crossing *genders* each personality. There are 4 female personalities and 4 male personalities.

Each personality also has 2 subtypes, A and B.

The personality determines what it's like to interact with each villager. For example, dialogue will be different for a Peppy villager and a Jock villager.

Female personalities: Normal, Peppy, Snooty, Uchi/Sisterly

| Female | |
| --- | --- |
| Normal | Cooking, poetry, reading, knitting |
| Peppy | Singing, dancing, fashion, pop stars |
| Snooty | Art, fashion, shopping, spas |
| Uchi/Sisterly | Crafts, family, gardening, countryside |

Male personalities: Lazy, Jock, Cranky, Smug

| Male | |
| --- | --- |
| Lazy | Daydreaming, food, superheroes |
| Jock | Jogging, working out, muscles, sports |
| Cranky | Life advice, reliving memories, bonsai |
| Smug | Music, travel, fashion, fame |

Hobbies are pastimes that villagers do. It influences what they read and what they do in their free time. 

Unlike personalities, hobbies are not gender restricted. For example, you can have a cranky male villager with a nature hobby or a normal female villager with a fitness hobby.

| Hobby | Description |
| --- | --- | 
| Education | Inspecting things, reading |
| Fashion | Wearing accessories, style, Able Sisters |
| Fitness | Sport shades, dumbbells, stretching |
| Music | Singing and dancing outside |
| Nature | Gardening, examining fossils, fishing |
| Play | Running, comic books |

### Examples

Here are some visual examples.

![Example of all the personalities](/assets/images/animal-crossing/personality-visual.png)

Below is my favorite villager, Punchy. He is a Lazy cat. He likes talking about food and even running like a superhero outside. He is a bit childlike and reads comic books.

![Picture of Punchy talking about food and reading comic](/assets/images/animal-crossing/punchy.png)

### Getting the Data

I got the data through the [ACNH API](https://github.com/alexislours/ACNHAPI/blob/master/villagers.json), which is free and under a CC BY 4.0 license. I downloaded the `villagers.json`

I transformed the data from JSON to XML. I took the fields: name, gender, species, subtype, personality, hobby, and birthday. I wound up with a 4,305 line XML file covering 391 villagers.

![Snippet of the XML](/assets/images/animal-crossing/xml.png)

I then used the following python libraries to do data analytics: `lxml`, `pandas`, `matplotlib`

I chose the colorscheme `seaborn-v0_8-pastel` to mimic the ACNH colors of light blue and green. 

## Data Analysis

### Species Distribution

![Species distribution](/assets/images/animal-crossing/1-speciesdistribution.png)

There are 35 total species. But, you're not equally likely to get each species as a villager on a new island. 

The rarest species is octopus (3) and the most common species is cat (23).

### Gender Distribution

![Gender distribution](/assets/images/animal-crossing/2-genderdistribution.png)

Overall, the gender distribution is split almost 50/50 between female and male across *all* species.

However, if you look at gender across different species, you will notice that there is a lot more variation. It's not all 50/50! 

![Heatmap of personality and hobby](/assets/images/animal-crossing/3-speciesgenderdistribution.png)

There are some interesting patterns we can observe.

First, there are species that are homogeneously the same gender: lions, cows, and bulls.

![100% Gendered species](/assets/images/animal-crossing/one-gender-species.png)

Second, there are species that are overwhelmingly (more than 70%) one gender. Squirrels, sheep, kangaroos, and ostriches are more likely to be female. Gorillas, frogs, eagles, and alligators are more likely to be male.

![Gendered species](/assets/images/animal-crossing/gendered-species.png)

### Personality and Subtypes

We have 8 personalities with 2 subtypes. In this nested piechart, you can see the distribution of subtype between that personality.

![Heatmap of personality and hobby](/assets/images/animal-crossing/7-personalitysubtypes.png)

The most common personality is Lazy, which makes up about 15.3% of villagers or 60 total. The least common personality is Uchi/Sisterly, which makes up 6.1% of villagers or 24 total.

### Hobbies by Personality

There is a strong correlation between a villager's personality and their hobby. 

![Hobbies by personality](/assets/images/animal-crossing/4-hobbiesdistribution.png)

Some hobbies are heavily correlated to a personality type. Snooty and Peppy villagers are more likely to be into fashion.

There are also hobbies that are actually *mutually exclusive* to personalities. For example, Lazy villagers don't do music and Jock villagers don't do nature.

What is the strength of the relationship between personality and hobby? A heatmap helps visualize this.

![Heatmap of personality and hobby](/assets/images/animal-crossing/5-hobbiesheatmap.png)

Strongest correlations:
- Jock + Fitness
- Preppy + Fashion
- Snooty + Fashion
- Lazy + Play


### Lazy Villagers' Hobbies

This nested pie plot looks at the Lazy personality and the subtypes (A,B). Interestingly, we  can observe that subtypes have a correlation with the hobby. Overwhelmingly, the Lazy A villagers like the nature hobby and Lazy B villagers like the play hobby.

![Lazy subtype](/assets/images/animal-crossing/6-lazysubtypeshobbies.png)

Subtypes *can* determine a villager's hobby!

## Reflection

I learned a lot about ACNH personalities. First off, I learned that personalities are *gendered*. In all my years of playing Animal Crossing, I never made that connection. Second, I found that hobbies heavily correspond to personality. Finally, I saw that some species have a higher representation in hobbies or personalities. For example, *all* 8 gorilla villagers have the fitness hobby. 

As a player, it's interesting to look at the data and connect it to my personal experience. I almost always had a cat villager *because* cats are the most common species. I didn't like some villagers *because* they shared the same personality.

However, like most things I end up with more questions. 

- Can we extrapolate and trust our conclusions for species that have less than 10 members?
  - Octopi have only 3 members. Maybe our data isn't large enough. 
- Do personalities have a connection with the friendship system?
- Are cubs and bears *technically* the same species?
  - ACNH counts cubs and bears as different species. Bears seem to be the adult version of cubs.
- Should we count kangaroos as double because they have joeys?
  - Joeys are visibly present so you're technically getting two animals in one villager slot. However, the joey has no name, dialogue, or interaction. 