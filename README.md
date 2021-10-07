# A bookshelf

##### TO-DO NEXT
- research input name vs. id re: labels and fix
- collect data from "new book" form upon submission
- dismiss "new book" form upon submission
- add book after "new book" form submission
- clear "new book" form for next time

(fuck should i just redo all the shelves with flex or is it worth the facility of having the shelf underlines in their proper, exact places?)

##### TO-DO LATER
- start with x(3?) shelves then add more as needed
- add hover button to toggle .read vs. .not-read
- add hover button to remove from bookshelf
- figure out why the books will go like 6px into the right padding
- add max- and min-width to books
- handle long titles/authors
    - shorten author and title names by abbreviating probably
    - add popup on hover for shortened info of narrow books
- by default, organize by author last name
    - sort them different ways (alphabetical titles, author first name, last name, page count, read/not read) -- to do this, maybe create a global int variable for currentSortMethod with a function that organizes myBookshelf and re-populates display based on that variable 
        - createNewBook would have to account for this -- actually it should automatically if "New Book" just pushes book onto array, sorts it, then calls updateBooksDisplay()
    - sort multiple ways at once?
    - how to make things draggable?  not necessary but interesting question
    - add genres?
- add credit

###### DONE
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