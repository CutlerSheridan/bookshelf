# A bookshelf

#### TO-DO NEXT
- store user's data in localStorage

#### TO-DO LATER
###### Features
- sort multiple ways at once?
- how to make things draggable?  not necessary but interesting question
- add ability to only show read or unread books?
###### Behavior
- start with x(3?) shelves then add more as needed
- figure out why the books will go like 6px into the right padding
- focus on title field upon pressing "add book"
###### Style
- add up/down arrows to sort btns
- add signifier for which book was just added; maybe an outline that dissipates
- figure out what read vs. unread should look like (or do they need to look different?  Maybe it only shows you this when you hover over a book?)
- create three (red, green, and blue) color combos for books and randomly assign one to each book object upon creation
- add max- and min-width to books
- handle long titles/authors
    - shorten author and title names by abbreviating probably
    - add popup on hover for shortened info of narrow books
- add credit
###### Other
- add genres?

##### DONE
-*v0.7.02*
- make sort arrow indicate if current sort is forward or backward
- add up/down arrows next to "Sort"
- change color palette
- *v0.7.01*
- add viewport scale tag
- make header sec color and buttons pri
- make "sort by titles" ignore "the" for alphabetizing
- *v0.7.0*
- sort them different ways (alphabetical titles, author first name, last name, page count, read/not read) -- to do this, maybe create a global int variable for currentSortMethod with a function that organizes myBookshelf and re-populates display based on that variable
- fix sort so every call to updateBooksDisplay() doesn't reverse the current sort
- add pages sort
- add sorting capability 
- add sorting options to header
- change color of books
- *v0.6.01*
- figure out why the fuck google's icons are displaying with a width of the words used to summon them (e.g. the "X" icon is as wide as "close_outlined" would be)
- change color of books
- *v0.6.0*
- add "clear shelf" button to menu bar + wire
- wire "remove book" button
- make book controls prettier
- add hover button to remove book from bookshelf
- *v0.5.01*
- add hover border around books
- round corners of book controls
- change read toggle to check mark
- consolidate read/unread to one class to toggle
- make "add book" form stop controls on anterior books from displaying on hover
- make controls bar translucent but controls opaque
- make hover controls stay at the bottom of the book spine
- *v0.5.0*
- add hover button to toggle .read vs. .not-read
- *v0.4.01*
- add basic logic for toggling read vs. unread
- *v 0.4.0*
- collect data from "new book" form upon submission
- dismiss "new book" form upon submission
- add book after "new book" form submission
- clear "new book" form for next time
- research input name vs. id re: labels and fix
- *v 0.3.x*
- dismiss "new book" form when clicking outside form
- wire "new book" form to "add book" button
- ///
- create "new book" form
- add "add book" button
- add placeholder for "sort" button
- add top menu bar (fixed?)
- add .read and .not-read classes to style differently somehow
- currently, smaller books will fill in gaps left by big books on earlier rows; decide if I want it this way -- could be good, or maybe not if I want to keep authors together.  in fact could make filtering harder in general if they're not in a specific order
- reflow books on shelves upon window resize
- make book card width correspond to page count
- learned that arrow functions negate "this" use in function declaration
- figured out new objects have to be instantiated *after* the object prototype methods are defined