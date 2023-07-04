D - Try, Catch, and Exceptions

Yeah, try/catch is a tough concept, but its super useful.
Essentially (to echo Bernardo) code can go very wrong in a lot of ways. Errors happen. In Javascript an error can also be called an Exception (like an old timey  person saying "I take exception to that!").
When you are running some code -- either your own code or some code from another library -- and you think it may throw an exception (cause an error) you have a couple options:
1.) Let that potential error kill the program
2.) Catch the error and try to fix it, or at least give the user a better error yourself.
:+1:
1


1:16
As an example, say you have some code that takes phone numbers from a user and you want to validate that they gave you something that at least looks like a phone number.
Now, let's say there is some library out there with a function validate_phone_number()  that can take a phone number and tell you if it is valid or not.
1:21
Here is an example of the Try Catch:
let phone_number = ask_user_for_phone_number(); // This gets the user input, but they can type anything!
try {
    let is_valid = validate_phone_number(phone_number); // this will set is_valid to `true` if its valid and `false` if its nonsense
    // If the phone number isn't valid
    if (!is_valid) {
       throw 'That number was invalid';
    }
} catch (error) {
    alert('Sorry, that wasn't a good phone number. Please try again');
    let phone_number = ask_user_for_phone_number(); // This will ask the user for the phone number again.
    let is_valid = validate_phone_number(phone_number);
    if (!is_valid) {
        throw 'Sorry, that phone number also isn't valid. We'll stop here.';
    }
}
// If we made it this far, we must have a valid phone number
save_phone_number(phone_number); // do something with the phone number
1:24
That isn't the best way to validate phone numbers, but it shows us what exceptions can do:
We ask the user for a phone number
Inside the try we validate the phone number
Remember anything inside try can throw an exception
If the phone number was bad, we throw an exception
The catch block only matters if we threw an exception. If we did, then the catch block does its thing.
In this case, if we caught an exception, we try one more time
If the number is invalid this time, we give up and throw another exception.
This time there is no catch block for that exception, so the exception kills the program with the error Sorry, that phone number also isn't valid. We'll stop here.
If either of those phone numbers were valid, we just keep going, In this case we save the phone number.

Michael Wilson  1:24 PM
</my explanation>