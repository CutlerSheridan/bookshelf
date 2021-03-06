# Bookshelf
## Keep track of your books.
Add books.  Sort them.  See how their sizes compare.  Keep track of what you haven't read yet.

Mobile- and desktop-friendly.  Use the same device and your library will persist.  Hover over any abbreviated title to see the full name.

#### TO-DO NEXT
#### TO-DO LATER
###### Features
- sort multiple ways at once?
- make things draggable?  not necessary and probably won't work for this but interesting question
- add ability to only show read or unread books?
###### Behavior
- fix on mobile how, after tapping a few books, the outline stops showing up
###### Style
- create three (red, green, and blue) color combos for books and randomly assign one to each book object upon creation?
###### Other
- add genres?
----------------------
##### DONE
- *v1.0.02*
- fix header restructuring on wider computer monitors because the header is naturally taller so triggers the switch when it shouldn't
- change book width algorithm to scale logarithmically
- *v1.0.01*
- fix localStorage GET error
- *v1.0.00*
- figure out what read vs. unread should look like (or do they need to look different?  Maybe it only shows you this when you hover over a book? _changed title underline thickness_)
- add more starting books
- adjust credit style
- fix form on landscape mobile
- *v0.8.04*
- set background-color so extra space when pulling too low or high isn't white
- get rid of vertical white sidebars on landscape iOS Safari
- stop window resize listener from triggering on mobile when address bar hides
- fix "add a book" form on mobile so it covers entire page or doesn't allow scrolling when active
- fix mobile control so books deselect when you click elsewhere
- fix credit link
- add credit
- *v0.8.03*
- change cursor over buttons
- make Book.hasRead persist between sessions
- focus on title field upon pressing "add book"
- why doesn't "toggleReadState" work anymore lol _(stored books were reloading as objects thus incompatible with that function)_
- fix books so they don't reorder when the same sorting method is called twice in a row
- add signifier for which book was just added; maybe an outline that dissipates
- add wood texture to bookshelf? _TRIED IT-LOOKED BAD_
- *v0.8.02*
- get media breakpoint precise for header button moving -- actually changed so header button moves when header height increases/decreases
- add border to books
- adjust book arrangement
- choose fonts
- adjust header style
- *v0.8.01*
- make header mobile-friendly
- prevent bookshelf array from accepting duplicates
- *0.8.0*
- store user's data in localStorage
- *0.7.08*
- make titles/authors shrink once before abbreviating, then grow back if abbreviation is still needed, then shrink if the abbreviation is too big
- *0.7.07*
- start with x(3?) shelves then add more as needed
- figure out why the books will go like 6px into the right padding (hadn't accounted for the additional book gap for the new book)
- change book hover outline color
- *v0.7.06*
- Dismiss "clear" confirmation message when clicking elsewhere
- adjust color palette
- *v0.7.05*
- adjust style
- improve text-abbreviating function
- *v0.7.04*
- add min-width to books
- program height of titles to auto-adjust if abbreviating isn't enough and the text gets too tall
- *v0.7.03*
- make abbreviated titles have spaces between letters but not abbreviated authors
- add popup on hover for shortened info of narrow books
- shorten author and title names by abbreviating
- *v0.7.02*
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