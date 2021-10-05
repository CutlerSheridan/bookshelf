# A bookshelf

##### TO-DO NEXT
- start with x(3?) shelves then add more as needed

- fuck should i just redo all the shelves with flex or is it worth the facility of having the shelf underlines in their proper, exact places?

##### TO-DO LATER
- add hover button to toggle .read vs. .not-read
- add hover button to remove from bookshelf
- figure out why the books will go like 6px into the right padding
- add max- and min-width to books
- handle long titles/authors
    - shorten author and title names by abbreviating probably
    - add popup on hover for shortened info of narrow books
- by default, organize by author last name
    - sort them different ways (alphabetical titles, author first name, last name, page count, read/not read)
        - sort multiple ways at once?
    - how to make things draggable?  not necessary but interesting question
    - add genres?

###### DONE
- add .read and .not-read classes to style differently somehow
- currently, smaller books will fill in gaps left by big books on earlier rows; decide if I want it this way - could be good, or maybe not if I want to keep authors together.  in fact could make filtering harder in general if they're not in a specific order
- reflow books on shelves upon window resize
- make book card width correspond to page count
- learned that arrow functions negate "this" use in function declaration
- figured out new objects have to be instantiated *after* the object prototype methods are defined