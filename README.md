# Calculator

I started by adding event listeners to all of the buttons. When each is clicked, it gets run through a function that's mostly a bunch of if/else statements that define what type of button it is, followed by the respective logic.

If it's a number, it either replaces the zero, or appends the number to the main input

If it's an action button, it figures out of it's an operator, decimal, or clear button type, and then performs the operation

The rest of the code is blocking edge case situations, like when someone just presses an operator or the equal button repeatedly with no numbers entered, or the logic for running an equation after one has already been run.

The trickiest part about this project was deciding whether to break the logic into more functions. I started by doing that, but it seemed to be more confusing than helpful.
