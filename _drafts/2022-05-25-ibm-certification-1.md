---
layout: post
title:  IBM Qiskit Certification | Part 1
blurb: Series introduction of my learning journey to get the IBM Qiskit Quantum Computing Certification
hero:
    url: /assets/images/qiskit-circuit-1.jpg
category: quantum
tags: resources series qiskit ibm-certification
author: Michael Wilson
# next_url: "hello"
# previous_url: "goodbye"
---

1. **Introduction and Outline** <-- You are here
2. Prologue and Exploring Quantum Computing
3. Foundations (Theory, Math, and Computer Science)
4. Qiskit Part A: Qbits, Gates, and Circuits
5. Qiskit Part B: Algorithms and All the Rest
6. The Missing Pieces
7. Preparing for the Exam
8. My Exam Experience and Conclusion

The [IBM Qiskit Certification](https://www.ibm.com/training/certification/C0010300) is the first widely-available certification for Quantum Computing.
This series is my journey to studying and preparing for the certification. 
I first came across the certification when [quantumcomputingreport.com](https://quantumcomputingreport.com) linked to a [Medium post](https://medium.com/qiskit/learn-more-about-the-ibm-quantum-developer-certification-and-how-to-take-it-for-free-d237f9765dc5)
{: .article_paragraph :}

[Qiskit](https://qiskit.org/) is the purpose-built python library that IBM uses to execute quantum algorithms on their quantum computers.
It's a pretty complete library that enables you to build quantum circuits, apply gates, and measure the results to classical bits.
It also includes many backend simulators so you can test your algorithm. When ready, you can use qiskit to queue your circuit for run on the real hardware.
Being a python library, you also get then entire python ecosystem, including Anaconda, Pandas, and Jupyter Notebooks.
While it stops short of being a fully-fledged new language, it provides all the tools needed to do meaningful work in quantum computing in general,
and especially with IBM hardware in particular.
{: .article_paragraph :}

It's not alone. Microsoft has QSharp. Rigetti has Forrest. There is QASM, Something, and Something. 
Everyone it seems is trying to find the best way to abstract away the linear algebra and give real developers real tools to do real work.
{: .article_paragraph :}

And, in truth, I would be more attracted to something like QSharp over qiskit entirely because I prefer the C-style languages to python.
My day job and background are in more software engineering that data science, and the dynamic nature of python isn't well suited for the kind of work I typically do.
I've used python, of course. I've built little utilities and find it great for its purpose. 
I am an intermediate python developer who prefers to use [Rust](https://rust-lang.org) and [Go](https://go.dev) any chance I get.
{: .article_paragraph :}

But neither of those languages -- or even QSharp and Forrest -- have the one thing I want most: **credentials**.
{: .article_paragraph :}

I am on the journey to change my focus from data engineering to quantum computing. See my [Quantum Computing]({% post_url 2022-05-22-quantum-computing %}) post for more on that.
And, since I don't have any degree or professional experience in Quantum Computing, I am really attracted to the idea of a certification.
Something I can share to show I have at least the basic knowledge and experience needed for a decent job in an exciting new field.
{: .article_paragraph :}

So when I set out in earnest to make it in Quantum Computing, the IBM certification seemed the best first step. 
If nothing else, it offers a structured introduction to topics that will be valuable no matter where I end up.
And its been a lot of fun so far!
{: .article_paragraph :}

The point of the certification (for me) is not just to learn Qiskit, but to learn about quantum computing.
To that end, this series outlines my learning journey on the way to the Qiskit certification (and quantum computing in general) from the ground up.
{: .article_paragraph :}

If you want to follow along or use this resource in your own journey, know that I came from a computer science background.
So, there isn't much computer science foundations here. I am considering a similar series for foundational computer science.
{: .article_paragraph :}

This series will be broken down like so:
{: .article_paragraph :}

1. **Introduction and Outline**: This post.
2. **Prologue and Quantum Computing Exploration**: A selection of the videos and articles I watched over the years to excite and introduce me to Quantum Computing in General.
3. **Foundations**: Some background work I did to catch up on the math and physics theory prerequisites.
4. **Qiskit Part A**: Beginning to look at Qiskit specifically. Qbits, Gates, and Circuits.
5. **Qiskit Part B**: Finishing the Qiskit material. Algorithms and projects.
6. **The Missing Pieces**: There are some certification questions on hardware, OpenQASM, and a few other topics.
7. **Perparing for the Exam**: I took a couple pre-exams. This was my experience.
8. **Conclusion**: My final thoughts and my certificate!

So join me as we go from zero to hero, in (a lot of time) flat!
