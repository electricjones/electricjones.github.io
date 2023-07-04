D - Pure functions and Actions

Anyway, I've been obsessively in this project writing my own programming language and have had a thought that I wanted to discuss. This will mostly probably be for @Brian , but I'd value any input.
In every programming language I've every seen a function can have a side-effect. It doesn't have to be a "pure function". I'm wondering if there would be value in having the language itself constrain that by creating two types of functions: pure functions (just called function) and actions (just for side-effects).

Here's what I mean:
Take the psuedo function:
function count_leaves() -> int {
    let all_leaves = somehow_get_all_leaves();

    let count = 0;
    for leaf in all_leaves {
      if leaf.is_bad {
        prune_leaf(leaf);
      } else {
        count++;
      }
    }

    return count;
}

That function looks at all the leaves on a tree. It actually prunes any bad leaves and then returns the number of good leaves.

This is a bad function. I would say. It actually changes your data when you wouldn't expect it to. Unless you wrote the function or read a lot of good documentation, you may not know that it actually destroys leaves.
That "prune leaves" is a side-effect.
This is the kind of thing that I'm sure @Brian and I would avoid at all costs, but they creep in.

I"m wondering if there would be value in having the language itself restrict that.

So, if a function has side-effects, it actually has to be typed differently.
Maybe like
function some_pure_function(a) -> int {}
let answer = some_pure_function(3);

This would be a pure function. It guarentees that all the function does is read data, not change data.
And an action could be like:
action @do_something(b) -> bool {
  delete(b);
  return true;
}

@do_something(7); // will delete record 7 from the db

So I know that anytime a function has an @ it will perform some data destruction
I recognize that would be hell to implement and there are a lot of questions. But I'll leave it there. Would that paradigm have value?