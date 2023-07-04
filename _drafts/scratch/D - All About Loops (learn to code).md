D - All About Loops (learn to code)

> CS 101

Let's start w/o loops. Let's say that you are doing a banking application and you want to add $100 dollars to your savings account every month (good for you). And you want to do this for six months. Maybe your code would look something like this:

```javascript
let savings_balance = 200; // This is what we start with

savings_balance = savings_balance + 100; // For January
savings_balance = savings_balance + 100; // For February
savings_balance = savings_balance + 100; // For March
savings_balance = savings_balance + 100; // For April
savings_balance = savings_balance + 100; // For May
savings_balance = savings_balance + 100; // For June

console.log(savings_balance); // This will output 800. Because we added 100, 6 times.
```

Now, that works great! We add 100 to our savings every month for six months. But now let's say that something changes and we want to do that for only 4 months. We need to change our code:

```javascript
let savings_balance = 200; // This is what we start with
savings_balance = savings_balance + 100; // For January
savings_balance = savings_balance + 100; // For February
savings_balance = savings_balance + 100; // For March
savings_balance = savings_balance + 100; // For April
// savings_balance = savings_balance + 100; // For May -- DON'T DO THIS NOW
// savings_balance = savings_balance + 100; // For June -- DON'T DO THIS NOW
console.log(savings_balance); // This will output 600. Because we added 100, 4 times.
```

So, you can see that we are doing the same thing over and over. This line savings_balance = savings_balance + 100 is repeated. Sometimes 4 times. Sometimes six.

This can work as long as you know how many times you need to do it when you write your code. If when writing the code you know that you'll only need to add to saving 4 times, you can do it this way.

But now, what if we wanted to ask the user how many times to add to savings? Let's say our app was allowing people to see how much money they have after a certain period of saving. We want them to be able to test 4 months or 6 months or any number of months.

We can no longer do it line by line because when we're writing the code we don't know how many lines we'll have to write. That won't be known until runtime (the time when the code is being executed.

So, let's setup the problem a little differently:

```javascript
let savings_balance = 200;
// Don't worry about what this does, let's just say that it sets number_of_months to the number of months the user wants
let number_of_months = ask_user(); 
// Now this is where we have to do `savings_balance = savings_balance + 100;` how ever many times`let_number_of_months` is set to
console.log(savings_balance);
```

This is where loops are useful. We have to do the same thing some number of times, but we don't know how many times when we run the code. When we run the code, sometimes it'll be 2 times or 100 times, depending on what the user says.

This is how a basic loop works in javascript:

```javascript
for (i = 0; i < number_of_months; i++) {
  savings_balance = savings_balance + 100;
}
```

That's how you will normally see it written. But let's write the same thing with some more useful names and a little more readable:

```javascript
for (counter = 0; counter < number_of_months; counter = counter + 1) {
  savings_balance = savings_balance + 100;
}
```
Believe it or not, those two are doing the same thing.


Let's break it down.
The loop skeleton is:

```
for () {
    // Some code here
}
```

Notice the space between for and (). That's important.

What this is saying is:

```
for (how ever many times I tell you) {
    // do this code
}
```

So the first line is telling the computer how many times to do the thing.

Whatever code you have in between the `{` and `}` is what it will actually do each time.

The tricky part is the "how ever many times I tell you". So ignore that for the moment. 

The "for as many times as I tell you" works like this:


```
for (before_statement; continue_statement; after_statement;) {
```

There are three "statements" or things that go inside the (). Each thing ends with a `;`. Each statement does something different.

**before_statement** happens before the loop starts doing anything. It only happens one time. You can think of this like a "setup" or "get yourself ready, we're about to loop"

**continue_statement** is the important part. It tells the loop "should I do another turn or should I stop now"?

**after_statement** is run after every loop.

So, the way this works is we want a counter. We want to know how many times we've actually "done the thing" (whatever code is inside the { }, right? And we want to keep looping (doing the thing) until the counter matches the number of times we want to do the thing.

Since we want a counter, we do that in the before_statement. We just make a new variable called counter (or sometimes called i or index. We can call this variable anything we want. It's just a normal variable. It just holds a number that tells us how many times we've gone through the loop.

Like this:

```
for (var counter=0; continue_statement; after_statement;) {
```
We start counter with 0 because we have gone through the loop 0 times.

The `continue_statement` is the thing that tells the loop to keep going. It does this by answering true (yes do another loop) or false (stop the loop, we're done).

This is done with the normal `<` less than,  `>` greater than, `<=`  less than or equal to, and `>=` greater than or equal to.

What we want to do is look at the counter variable and the variable that tells us how many loops we want. If the counter variable is less than the number of times we want to loop, then we want to keep looping, right?

So, if your variable that tells us "loop 10 times" is `let number_of_months = 10`, then our loop would look like:

```
for (var counter=0; counter < number_of_months; after_statement;) {
```

This is saying
> "before the loop starts, make a counter variable and start it at zero.
"now, at the beginning of every loop, see if the counter variable is less than the_number_of_months. If it is less than, then do another loop. If it is greater than or equal to number_of_months then stop looping. We're done.

We'll step through the loop in a second and you'll see it all come together.

For now, let's look at the last part. The after_statement. This is something that happens after the continue_statement says "yes, do another loop" and after the code in the { } has done its thing.
What we want to do here is update our counter. We just finished a loop, so the counter needs to track that we did a loop. This can be done with counter++ or counter = counter + 1. They're the same thing.

Altogether, or loop looks like

```
for (var counter=0; counter < number_of_months; counter = counter + 1;) {
```

Before the loop starts at all, give me a counter of 0 so we can track how many loops we've done
Every time we start a new loop, check to see if we are done. If the counter (number of times we've looped) is less than the number_of_months, then do another loop.

After we've done a loop, update our counter.
Then steps 2 and 3 get repeated until the continue_statement tells the loop to stop.

Okay, let's go through an entire example:

```javascript
// Our savings account starts with $200
let savings_balance = 200;

// We'll ask the user how many months to add $100
let number_of_months = ask_user(); // Let's say the user says "3"

// Now, lets add $100 however many times we're told
for (var counter=0; counter < number_of_months; counter++) {
    savings_balance = savings_balance + 100;
}

// And spit out how much money we have
console.log(savings_balance);
```

Piece by piece, here is what the computer is doing:
1. List itemStarting savings of 200 -> let savings_balance = 200
2. Ask how many months to loop -> let number_of_months = ask_user();
3. Let's say the user says "3" so, let number_of_months = 3
4. See that we are doing a loop -> for () {}
5. Do the "before_statement", which only happens 1 time before anything else happens -> var counter=0
	a. Now, counter = 0, we have done the loop zero times.
6. Check to see if we should do our first loop -> counter < number_of_months.
	a. counter = 0 and number of months = 3.
	b. 0 is less than 3, so this is true . We should do this loop
7. Execute the code inside the loop
	a. savings_balance = savings_balance + 100
	b. Now savings_balance = 300
8. Do the after_statement -> counter++
	a. This adds 1 to the counter variable
	b. So, counter = 1. We have done this loop 1 time
9. Now we try to go through the loop again. Same as step 6
10. Check to see if we should do our first loop -> counter < number_of_months.
	a. counter = 1 and number of months = 3.
	b. 1 is less than 3, so this is true . We should do this loop
11. Execute the code inside the loop
	a. savings_balance = savings_balance + 100
	b. Now savings_balance = 400
12. Do the after_statement -> counter++
	a. This adds 1 to the counter variable
	b. So, counter = 2.
13. Check to see if we should do our first loop -> counter < number_of_months.
	a. counter = 2 and number of months = 3.
	b. 2 is less than 3, so this is true . We should do this loop
14. Execute the code inside the loop
	a. savings_balance = savings_balance + 100
	b. Now savings_balance = 500
15. Do the after_statement -> counter++
	a. This adds 1 to the counter variable
	b. So, counter = 3.
16. Check to see if we should do our first loop -> counter < number_of_months.
	a. counter = 3 and number of months = 3
	b. 3 is NOT less than 3, so false. Stop doing loops
17. We do not execute the code.
18. We do not do the after statement.
19. We're done with our loop.
20. Move onto whatever is after the loop
21. Log the savings_balance -> console.log(savings_balance); which should be 500.
22. The program is over. We're done

Another great resource is https://www.w3schools.com/js/js_loop_for.asp which explains this and has some things you can use to test the knowledge and play with it.

Loops are hard to wrap your head around, but once you do they are super powerful!