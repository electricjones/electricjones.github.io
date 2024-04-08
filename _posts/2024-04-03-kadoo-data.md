---
layout: post
title: Kadoo -- Data Model 
blurb: An exploration about how to better model Animal Welfare Data
hero:
  url: /assets/images/kadoo.webp
category: ecology
tags: out-loud projects data animal-sheltering wildlife
author: Michael
---

## Series Contents
{: .article_subtitle }

1. [Kadoo, Animal Welfare Data Platform](https://electricjones.me/ecology/2024/02/25/kadoo/)
2. [Data Model](#) < -- You are here

<b><i>"Reaveal unto me the secrets of your universe."</i></b>
{: .article_paragraph }

With the basic dream-list of an [animal welfare data management platform](https://electricjones.me/ecology/2024/02/25/kadoo/) in our pocket, let's turn our attention to what that might actually look like.
{: .article_paragraph }

When designing systems like Kadoo, I like to start from the bottom up. I'm a data monkey. So, as we continue the daydream, we won't decide on every type of resource, field, or data point. We would need a lot more expert input and iteration to even think about that. What I want to do here is build a skeleton onto which we can add muscle and skin.
{: .article_paragraph }

## Data Standards
{: .article_subtitle }

How we organize data is more important than the actual data. The data must be well structured, predictable, and flexible. We will build this data model with some aims in mind:
{: .article_paragraph }

1. Express relationships well. Build a graph so that multiple resources are connected.
2. Allow for precise querying and updating (get exactly what you want).
3. Have multiple entry points to any relationship graph (start your search anywhere and walk the graph).
4. Have easily sharable and expressable ids for use in busy in-person settings.
5. Be fit for data exchange standards. 
{: .article_paragraph }

Number 5 deserves a post of its own (and I'll get around to it). In short, the power of data is in its portability -- in being able to share, consume, replicate, and understand that data no matter the source. There are many examples of industry data standards. The [Real Estate Standards Organization](https://www.reso.org/) is the standard with which I am most familiar. 
{: .article_paragraph }

As I said, I will explore this potential standards format (with current examples) later, but I wanted to keep that in mind while designing the internal data model for Kadoo.
{: .article_paragraph }

## Overview
{: .article_subtitle }

The core compoenets are **Resources**, which are all top level. So, a single `Animal` resource doesn't have a field on it called "vaccinations", but instead has a relationship to a top-level `Medical` resource that describes the vaccinations.
{: .article_paragraph }

Since many kinds of resources can have different shapes (medical vacinations, medical treatment, medical assesment), we have "types" to differantiate them. These types define what is special about each kind of the resource. 
{: .article_paragraph }

`Notes` are text notes that are their own top-level resource. `Persons` are also special top-level resources. Some of those persons also have `Authentication` records that let them login. Persons with authentications also have roles and permissions that define what they can see, update, and create. Remember that in Kadoo, many more people have Authentication than the typical staff/volunteers.
{: .article_paragraph }

Relationships are the important glue that brings everything together. `Animals` have `Behavior` resources, but `Behavior` resources also have `Animals`. All the relationships are two-way so you can always find your way home again. 
{: .article_paragraph }

Last, `Views` are the templates through which you see the data. Since the data has many complex relationships, a single query can be provide far data than is needed. Views decide what relationships are expanded, what fields are shown, in what order things appear, and how far across the graph we walk. Views are not visual. We're not talking about graphical views. All the data is in some exchange format like JSON. Roles and Permissions are also applied to views.
{: .article_paragraph }

## Resources and Types
{: .article_subtitle }

### The Shape of a Resource
{: .article_subtitle }

At the core of the data model are **Resources** which represent some unique, important, and useful record. Some examples of resources would be:
{: .article_paragraph }

- `Animal`: The core information about a specific animal including age, species, breed, etc.
- `Medical`: Any single medical treatment, exam, or procedure
- `Behavior`: Any single behavior treatment, test, or intervention
- `Person`: Any person (with or w/o authentication)
{: .article_paragraph }

And many, many more. The purpose here is to outline the shape of the data, not its finer points.
{: .article_paragraph }

### Resource IDs
{: .article_subtitle }

Each individual resource (like a specific animal or a single medical vaccination) has a unique id that is a prefix and a human readable, easily sharable id (in base36, meaning all numbers and english letters). 
{: .article_paragraph }

- Animal: A-2JK, A-19L, A-P688KA
- Behavior: B-Z3, B-80
{: .article_paragraph }

I can't tell you how many times I've been working in a busy area, trying to talk about some specific animal and saying a long, complicated number or trying to spell some bizarre name. To remedy this, we use ids like the above. 
{: .article_paragraph }

This base 36 scheme allows for litterally billions of resources in only a few characters (6).
{: .article_paragraph }

### Core Data
{: .article_subtitle }

You'll notice that a single `Behavior` resource (for example) includes all possible behavior tests, assessments, and interventions. But a "Fearful Fido" procedure is not at all the same as an "Intake Assessment", and what's more, those protocols evolve with new research. We will discuss that flexability next, but first let's focus on what they have in common.
{: .article_paragraph }

All resource have some system-wide data attached to them like the id, the resource owner, and timestamps. Beyond that, each resource will have some common, core data specific to its resource. For behavior (for example) it would include the animals involved, the people involved, and a note. More on persons and notes in a bit.
{: .article_paragraph }

So, let's start building our example of a `Behavior` resource:
{: .article_paragraph }

```jsonc
{
   // This ID for the Behavior Resource
   id: "B-2J3K",

   // Relationship to the Person Resource
   // The Staff Person who first created this animal record
   owner: "P-3J",

   // Relationships to the Person Resource
   // Other people who were involved
   persons: ["P-3J", "P-K2I9"],

   // Which animals were involved
   animals: ["A-9", "A-7AJK"]

   // The date the behavior resource was created
   date: "2020-01-01",

   // The location the procedure took place
   // This is a configurable list
   location: {
       site: "main-campus",
       subsite: "play-yards",
       unit: "2"
   }, 
}
```
<br />

### Flexability Through Types
{: .article_subtitle }

I will start by saying I do not like the term "type" and have toyed with "instance" and "kind" but neither is quite right.
{: .article_paragraph }

Flexability happens thanks to "types" which do not have special ids, and are not directly exposed to the public. A "type" would be those "fearful fido tests" or "vaccination prodcedure"s. They specific type defines the schema that makes that individual instance of a resource unique. For example, the "vaccine procedure" type of the `Medical` resource would define data points for the vaccine(s) used, maker, and revaccination date.
{: .article_paragraph }

Building onto our Behavior Resource, a type may look like:
{: .article_paragraph }

```jsonc
   // This is the type of type (type of procedure) it is
   // This is configurable
   // some examples would be "Play Date", "Treatment", "Intake Assessment"
   type: "Play Date",

   // The data is specific to the Play Date type
   // This data would be different for different kinds of types
   // The type of data presented is configurable. You can edit the schema.
   data: {
      duration-in-minutes: 30,
      concerns: ["Barking", "Jumping", "Nipping"],
   }
```
<br />

### Notes and Persons at the Heart
{: .article_subtitle }

**Persons** are (of course) people. This includes persons with authentications privelages (users like staff and volunteers) and those without. Its worth noting that in Kadoo, many more people have authentication privelages than in most systems. Because of its open nature, this includes adopters, community members, fosters, etc. Each with their own authentication, but with limited permissions.
{: .article_paragraph }

```jsonc
{
    // Some core data shared by all persons
    id: "P-18X3",
    name: "Kayla Colman",
    sort-name: "Colman",
   
    // The auth data here is shown for clarity, but would not be shared through public apis.
    // This data is locked down behind permissions
    authentication: {
        login_key: "kcolman@somegreatrescue.org"
    }
}
```
<br />

**Notes** are the other core resource. Notes are anything you want to be known. Notes form the basis of timelines, reports, and all entries. Other resources have relationship with notes, but the notes are unique. We will see why in a bit.
{: .article_paragraph }

```jsonc
{
    // Some core data shared by all persons
    id: "N-O7",
    owner: "P-881"
    text: "Notes with **markdown** and [redact]annotations[/redact]",
    created_at: "12-10-2024",
    updated_at: "2-1-2025",
}
```
<br />

## Relationships
{: .article_paragraph }

What makes data interesting are the relationships between resources. This is also one thing that makes Kadoo distinct from many other systems. A single `Behavior` resource can be connected to multiple people and multiple animals. There is a "primary note" attached to the behavior resource itself. And, each specific animal in the behavior session can have their own set of notes. A single Vaccine Event Resource can be attached to multiple animals and multiple persons.
{: .article_paragraph }

For example, the behavior from above may have these notes added via relationships:
{: .article_paragraph }


```jsonc
{
   // This ID for the Behavior Resource
   id: "B-2J3K",

   // . . . All the other stuff shown above

   // The Note for the behavior session itself, includes all the animals
   session_notes: "N-4CL0",

   // Any notes specific to an animal in the procedure
   animal_notes: {
      // This note is for the animal A-9, which is also referenced in the animals field
      "A-9": "N-D10",
   },
}
```
<br />

In this way, all the resources build a powerful graph that can be traversed. You can explore (walk) the graph from a vaccine event to an animal to their behavior to an outcome to that adopter to the pet pantry events that adopter was a part of.
{: .article_paragraph }

## Views
{: .article_subtitle }

So, now we have a graph of resources connected together by powerful relationships. Each of those relationships can be expanded arbitrarily. That's a LOT of data that can be chased from a single `Animal` resource, for example. 
{: .article_paragraph }

In order to bring some sanity to this hurricane, let's introduce `Views` as their own, special resource. 
{: .article_paragraph }

A `View` is exactly that: a representation of the data at hand. One view of an `Animal` resource may only show the ids of the behavior notes. Another would expand those ids to be an abbreviated representation of the behavior records. Yet another expands them  entirely. Some views will only show certain information (no medical information, for example).
{: .article_paragraph }

Views are also related to permissions. When an adopter views an Animal resource, they have limited permissions and are only able to see what they are permitted to see. They may start on a view (V-18L) and then have permissions applied to that view, further restricting the data they can see. In this way, they create a new view specific to only them (V-20P1).
{: .article_paragraph }

## Pulling It Together
{: .article_subtitle }

So, let's put that together with some examples. Let's look at a json representation of a behavior resource.
{: .article_paragraph }

This would be the default view with no expansions. Just using the ids to define relationships
{: .article_paragraph }

`GET /behaviors/B-2J3K`
```jsonc
{
   // This ID for the Behavior Resource
   id: "B-2J3K",

   // Relationship to the Person Resource
   // The Staff Person who first created this animal record
   owner: "P-3J",

   // Relationships to the Person Resource
   // Other people who were involved
   persons: ["P-3J", "P-K2I9"],

   animals: ["A-9", "A-7AJK"]

   // The date of the behavior resource
   date: "2020-01-01",

   // The location the procedure took place
   // This is a configurable list
   location: {
       site: "main-campus",
       subsite: "play-yards",
       unit: "2"
   },

  
   // The Note for the behavior session itself, includes all the animals
   session_notes: "N-4CL0",

   // Any notes specific to an animal in the procedure
   animal_notes: {
      // This note is for the animal A-9, 
      // which is also referenced in the animals field
      A-9: "N-D10",
   },

   // This is the type of type (type of procedure) it is
   // This is configurable
   // some examples would be "Play Date", "Treatment", "Intake Assessment"
   type: "Play Date",

   // The data is specific to the Play Date type
   // This data would be different for different kinds of types
   // The type of data presented is configurable. You can edit the schema.
   data: {
      duration-in-minutes": 30,
      concerns: ["Barking", "Jumping", "Nipping"],
   }
}
```
<br />

And, if we wanted to see a view on that data, it may look like:
{: .article_paragraph }

`GET /behaviors/B-2J3K/V-289CL`
```jsonc
{
    id: "B-2J3K",
    owner: {
        id: "P-3J",
        name: "Kayla Coleman"
    },
    persons: ["P-3J", "P-K2I9"],
    animals: [
        {
            id: "A-9", 
            name: "Quin"
        },
        {
            id: "A-7AJK", 
            name: "Kadoo"
        }
    ]
    date: "2020-01-01",
    session_notes: {
        id: "N-4CL0",
        text: "These are the notes for the behavior session in general"
    },
    type: "Play Date",
    data: {
        duration-in-minutes: 30,
        concerns: ["Barking", "Jumping", "Nipping"],
    }

    // Notice that we left out location, and animal notes entirely
}
```
<br />

## Overview Again 
{: .article_subtitle }

That was a lot. Let's just go through the overview one more time.
{: .article_paragraph }

- The core compoenets are Resources, which are all top level.
- Resources have "core" data that is shared by all resources of that kind (Behavior, Medical, Animal, Person)
- Resource have "types" for the specific sub-resource kind that we're talking about (Vaccinations, Behavior Treatment, etc)
- Notes and Persons are important resources.
- Relationships glue everything together.
- Views define what data is actually returned and what that return looks like.
{: .article_paragraph }

## Conclusion and Next Steps
{: .article_subtitle }
This has been a messy (and hopefully not too confusing) exploration of what a data model for Animal Welfare Data could look like. This is not at all a complete example, but a simple discover of a system that could be used. 
{: .article_paragraph }

In any case, as I mentioned before, this is NOT a proposal or pitch or business plan. This is not a document about implementation. This is a space to dream.
{: .article_paragraph }

<br />
<a href="https://openai.com/research/dall-e">Post Image Created with DALLE. Temporary logo.</a>
{: .article_paragraph }

Last Updated: April 8, 2024 -- [See Changes](https://github.com/electricjones/electricjones.github.io/commits/main/_posts/2024-02-25-kadoo.md)
{: .article_paragraph }
<br />
