---
layout: post
title: Kadoo -- Resources and Graphs 
blurb: A more specific draft of the Kadoo Data Model
hero:
  url: /assets/images/kadoo.webp
category: ecology
tags: out-loud projects data animal-sheltering wildlife
author: Michael
---

## Series Contents
{: .article_subtitle }

1. [Kadoo, Animal Welfare Data Platform](https://electricjones.me/ecology/2024/02/25/kadoo/)
2. [Data Model](https://electricjones.me/ecology/2024/04/03/kadoo-data/)
2. [Resources and Graphs](#) < -- You are here

<b><i>"Show your work, please."</i></b>
{: .article_paragraph }

We've been working through the fever dream of a novel Animal Welfare Data Management Platform. So far we laid out an enormous list of "wouldn't it be great if"s. Then, we took a shot at a data modelling system to give us maximum flexibility and semantic richness with as little overhead as possible. I reccommend you look at the last two entries in this series to catch up.
{: .article_paragraph }

Now, we will get into the fun stuff. Let's build up a whiteboard full of potential resources and relationships to see what the concrete version of that data model **could** look like.
{: .article_paragraph }

## The Scope and a Disclaimer
{: .article_subtitle }

Let's start with the same disclaimer I've been harping on. **This is not an implementation document**. I know the more detailed I get, the more concrete we pour, the more it seems like an architectural plan. That really isn't the intent. I have volunteered for more than a decade in Animal Welfare, but am very far from being an expert. I am certainly not an expert in all the related fields of animal welfare ()
{: .article_paragraph }

So, what is this?
{: .article_paragraph }

The goals of this post are to:
{: .article_paragraph }

1. Clarify the previous two posts with more concrete examples.
2. Spur conversation about which resources and relationships work the best.
3. Prove the flexibilty (to myself) of the proposed data model.
4. Get over the "blank page" anxiety of creating something concrete.
5. Discover where my blindspots are in relation to the animal welfare space.
{: .article_paragraph }

In the end, I hope this post will be some kindling -- something that can be discussed, edited, and built upon. Just a starting place, not the destination.
{: .article_paragraph }

## Review the Model
{: .article_subtitle }

Just for fun, let's start with a review of the data model we've created. I'll just grab the intro from the previous post.
{: .article_paragraph }

**Resources** are all top level. A single `Animal` resource doesn't have a field on it called "vaccinations", but instead has a relationship to a top-level `Medical` resource that describes the vaccinations.
{: .article_paragraph }

**Types** are how we handle the different shapes of medical or behavior resources (for example). They define what is special about each kind of the resource and present a schema. 
{: .article_paragraph }

**Relationships** are the glue that brings everything together. All relationships are two-way. Relationships build a graph that can be walked to and from anywhere.
{: .article_paragraph }

**Views** describe how data will be presented in each case. Views filter some fields out and expand other fields so you end up getting exactly what you want each time.
{: .article_paragraph }

## Items and Minutia 
{: .article_subtitle }

Those resources and relationships are the only data that would be publicly available (according to permissions, of course). But there will have to be a lot more "structural" (meta) data to keep this house in order. For instance, let's assume a `Medical` resource `type` "vaccination". That type may define other fields important for vaccinations: provider, dosage, manufacturer, serial number, etc. Now assume that we want more control that just free-text fields for all of those. We want to be able to choose the provider from a list and for the dosages to be restrained to certain limits to reduce errors.
{: .article_paragraph }

Those resctrictions and "pick lists" (among other things) are where `Items` come in. They are first class citizens to the data, but they are not full resources to themselves. You cannot `GET /vaccine_providers/VP-281K` to get a specific vaccine provider.
{: .article_paragraph }

Instead these support structures will be exposed as **meta data**. So you could do something like `GET /Medical?meta=vaccines` and get back the schema with all the possible values and constraints. That is just an example. The implementation will be different. But, I thought it important to make a top level category for "items" since we will be using them.
{: .article_paragraph }

Let's also assume that **every** resource has the following data points:
{: .article_paragraph }

- `id`: The friendly ID of the resource (A-2J, B-P49, V-65L)
- `owner`: The authenticated person who first created the resource.
- `created_at`: The timestamp the resource was first created.
- `updated_at`: The timestamp the resource was last updated.
{: .article_paragraph }

Last, let's assume for these examples a few that expands NO relationships. So, we'll use ids except where noted in comments for clarity.
{: .article_paragraph }

## Resources 
{: .article_subtitle }

Enough chatter. Let's make a list!
{: .article_paragraph }

- [Person](#): Describes all people including staff/volunteers, partners, fosters, adopters, etc.
- [Group](#): Collections of people like families, organizations. 
- [Animal](#): The primary resource for a specific animal in care or contact.
- [Behavior](#): Tests, assessments, and procedures.
- Medical: Tests, assessments, and procedures.
- Intake: Various ways an animal enters care. 
- Outcome: Various ways an animal exits care.
- Event: Organization events like adoption events, fundraisers, or education. 
- Opportunity: Volunteer Opportunity. 
- Study: Research study involving people and/or animals.
- DataSet: External data set pulled in and merged or aggregated with internal data.
- Communication: Newsletter, Email Blast, Etc.
- Media: Videos, photos, documents.
{: .article_paragraph }

## Examples
From here, let's detail out a few (4) resources to illustrate how these will look and how they relate. These are just examples. And it will certainly not be exhaustive.

### Person
{: .article_subtitle }

Persons are all human beings. They include (but are not limited to)
{: .article_paragraph }

- Staff / Volunteers
- Partners
- Fosters
- Adopters
- Community Members Using Services
- Fund raisers
- Any other human
{: .article_paragraph }

For those with authentication, it would also include an `Authentication` record and various `Roles`, `Permissions`, and `Teams`.
{: .article_paragraph }

**Example**
`GET /Person/P-R1E2`
```jsonc
{
    name: "Kayla Colman",
    sort_name: "Colman",
    nick_name: "Kayla",
    profile: "This is kayla's short profile about herself."
    tags: ["long-time", "fear-free-certified"]
    emails: [
        {email: "kcolman@rescue.org", primary: true, verified_on: "12-02-24"},
        {email: "kayla@gmail.com", primary: false, verified_on: null},
    ],
    phones: [
        {phone: "+1 555-666-7777", primary: true, verified_on: null},
    ],
    socials: [], // None
    notes: ["N-281H", "N-7KKH1"],

    // Confidential, for authentication only
    // Includes Roles and Permissions
    authentication: {},

    // some resources are allowed multiple types. Person is one of them.
    types: {
        staff: {
            department: "Medical" // data according to `staff` schema
        },
        foster: {
            animals: ["cats", "dogs"] // data according to `foster` schema
        }
    }
}
```
<br />

### Group
{: .article_subtitle }

Groups are collections of Persons. Think families, clubs, schools, partner rescues, etc.
{: .article_paragraph }

**Example**
`GET /Group/G-Z93`
```jsonc
{
    name: "City Kitties Rescue",
    profile: "A short profile about the rescue."
    tags: ["transfer-partner", "adoptions-partner"]
    emails: [
        {email: "admin@citykitties.org", primary: true, verified_on: "12-02-24"},
    ],
    phones: [
        {phone: "+1 555-666-7777", primary: true, verified_on: null},
    ],
    socials: [
        {platform: "facebook", identifier: "@citykitties", "url": "facebook.com/citykitties"},
    ],
    notes: ["N-281H", "N-7KKH1"],

    types: {
        partner: {
            // data according to `partner` schema
        },
    }
}
```
<br />

### Animal
{: .article_subtitle }

Animals are all non-human animals. Those in care, alumni, community, etc.
The species would be considered "types" and each have their own data schema.
There would be, however, common datapoints like age, name, weight, location, status, stage, etc.
{: .article_paragraph }

**Example**
`GET /Animal/A-IKB`
```jsonc
{
    name: "Kadoo",
    age: 7,
    weight: 11.6,
    weight_measure: "lbs",
    location: {
       site: "main-campus",
       subsite: "play-yards",
       unit: "2"
    },


    // Totally fluid, tags are developed by each individual institution
    // These could include AI generated tags
    tags: ["behavior:active", "medical:healthy"]

    // Yeah, animals can have socials. Why not?
    socials: [
        {platform: "facebook", identifier: "@citykitties", "url": "facebook.com/citykitties"},
    ],

    // This is where we get species
    types: {
        cat: {
            breed: "domestic short hair",
            declawed: false // Let's just end this
        },
    },

    // These are the general notes about the animal. Basic Memos. 
    // Each note also has a type so you can differentiate between observations, warnings, etc.
    // It is important to note (lol) that most "notes" actually belong elsewhere.
    // An observation about some behavior (maybe jumpy-mouthiness) would probably be best as a behavior resource, for example
    notes: ["N-281H", "N-7KKH1"],

    // And now for all the other relationships to all the other resources
    behaviors: ["B-123", "B-8J2"],
    medicals: ["M-U82"],
    // And a lot more
}
```
<br />

### Behavior
{: .article_subtitle }

Any assessment, intervention, or observation about behavior.
{: .article_paragraph }

**Example**
`GET /Behavior/B-861`
```jsonc
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
      "A-9": "N-D10",
    },

    // some examples would be "Play Date", "Treatment", "Intake Assessment"
    types: {
        "play_date": {
            duration_in_minutes: 30,
            concerns: ["Barking", "Jumping", "Nipping"],
        }
    }
}
<br />

### Medical
{: .article_subtitle }

Any medical intervention, treatment, assessment, vaccination, or other.
{: .article_paragraph }

**Example**
`GET /Medical/M-441B`
```jsonc
{
    persons: ["P-2817", "P-6YS"],
    animals: ["A-7716", "A-1126"],
    location: {
       site: "main-campus",
       subsite: "play-yards",
       unit: "2"
    },

    types: {
        vaccination: {
            maker: "Novibram",
            dosage: 33,
        },
        exam: {
            type: "intake",
            bcs: 5,
        }
    }
}
```
<br />

## Conclusion and Next Steps
{: .article_subtitle }
This has been a messy (and hopefully not too confusing) exploration of what a data model for Animal Welfare Data could look like. This is not at all a complete example, but a simple discover of a system that could be used. 
{: .article_paragraph }

In any case, as I mentioned before, this is NOT a proposal or pitch or business plan. This is not a document about implementation. This is a space to dream.
{: .article_paragraph }

I will probably leave this hear for now. I think the next step would be to look more concretely at a development plan.
{: .article_paragraph }

<br />
<a href="https://openai.com/research/dall-e">Post Image Created with DALLE. Temporary logo.</a>
{: .article_paragraph }

Last Updated: June 30, 2024 -- [See Changes](https://github.com/electricjones/electricjones.github.io/commits/main/_posts/2024-7-30-kadoo-resources.md)
{: .article_paragraph }
<br />
