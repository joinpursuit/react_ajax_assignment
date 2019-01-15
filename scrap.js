codesandbox:   https://codesandbox.io/s/n0qw21xrl4
codeshare:   https://codeshare.io/alx7DB
//----------------
Xavier [6:56 PM]
- https://reactjs.org/tutorial/tutorial.html
  reactjs.org
  Tutorial: Intro to React – React
//----------------
formik
look at diff react projects

//----------------


ComponentDidMount

three(3) main stages:
1. loading: preloading/ will mount - not yet mounted contennt to screen. but state has been initialized.
2. component finishes running. constructor functionn called. rendering contentn to screen.
3. on monunting - ...naviging away from component and ... will take that componentn away from screen.


component didmonunt: when component successfull loads, i want o execute this life cycle method (comDidMount)

when page loads, want deck id and use taht deck id in bunch of event listeners.

wehn loads, has deck id and save deck id in state variable (not global variable.)
set state to deck id.
repeat: when page loads, fire off this request. instead of deck id saved to global variable. now just using the stae of this component.store deck id in state using setState (line 20)

why seeing two console.logs: (for 2 reasons)
1. component successfully loads: loading info but nothing shows on screen.
2. finsh loadeing and displays content to screen - mount stage.

life cycle method: component did mount. when component successfully mounts, I should call component didMount


Component DidUpdate: compaores old to new and if there is an update, it will update.

Component ShouldUpdate: similar - but wih greater control for when rerenders - allows you a condition. returns true or false, if true,it will Update, if false, it will not.
ShouldUpdate given teh condition that someone enters birthdate as Oct 1 st 1991.


ComponentWillUnmount - if never hit stop button and just navigate from page, will create huge memory leak. Create React App is really nice - it will warn you.


//--------------
NoteChecking: seeing and understaing what causes errors. can be fixed with an if/else. cant load null when trying to load deck id when doesnt exist (at first). even if it loads it later (when fetched), it will still crash.

//---------------

never set the new state ... it opens you up to bugs.
you are not modifying the old stae, you are replacing the entire old state. return a new object with the keys with NEW values.

//----------------

follow the creator of codesandbox on twitter.

//---------------
Corey:

aceCount
add aces as 11
add total
while(aceCount > 0 && total > 21) {
  total -= 10
}

[Ace, 5 , Ace]
AceCount = 2
total = 27 --> total = 17

Draw another card:
[Ace, 5 , Ace, 9]
AceCount = 2
total = 36 --> get a loop:
        26
        16

Draw another card again:
[Ace, 5 , Ace, 9, 8]
AceCount = 2
total = 44 --> get a loop:
        34
        24 --> while loop breaks
