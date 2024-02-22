# User Experience Design

This repository contains instructions and files for two assignments that together comprise the user experience design phase of a web app.

Replace the contents of this file with the completed assignments, as described in:

- [app map & wireframe instructions](instructions-0a-app-map-wireframes.md).
- [prototype instructions](instructions-0b-prototyping.md)

# Wireframe Annotations/Descriptions

### Log In

![Alt Text](images/login.png "Log In After Sign Up")

A simple login page that asks a user for a `Username` and `Password`. If the user does not have a profile, they can click `Sign Up` or `Login with third-party apps`.

### Sign-up/New Profile

![Alt Text](images/NewProfile.png "Create new profile")  

A simple page Sign-up page for new users where they can add their `First`, `Last` name, `Email`, and `Password`. If they have an account, they go back to `Login`.

### Homepage

![Alt Text](images/Homepage.png "Homepage")  

- [Homepage is personalized to the user as it contains their current reads and suggestion for the reader
based on the genres,authors,etc they have read before. Not only this but the homepage also displays the user's
friends current reads and the top 10 books of the week. The homepage is also where the navbar is first presented
to the user, allowing them access to go between pages.]
Notes:
- [each section moves horizontally based on how much data there is]

### Profile view

![Alt Text](images/ProfileView.png "Create new profile")

### Book page

![Alt Text](images/BookPage.png "Page to view a book")

- I added two screens.
1: Books read which showcases the books you have read, a photo of the cover , and the title and author.
2: Books want to read which showcases the books you want to read, a photo of the cover , and the title and author.

### Friend's Book view

![Alt Text](images/FriendBookView.png "View a friend's books")

- Friend's book view is accessed once the user clicks on one of their friend's current reads that is
displayed on the Homepage. Once the user clicks one of the books, they will be shown a screen that
gives further details of that friend's current book -- including their reading progress, overall star rate
of the book and a description of the book.
Notes:
- The book and info page move vertically to display more info as the user swipes down.

### Friends List

![Alt Text](images/FriendsList.png "List of Friends")

- Friends List view is accessed through the navbar 'friends' option that is displayed. Once the user
clicks on this, the display will show a list of their friends with their name and the book they are currently
reading along with the author's name underneath.
