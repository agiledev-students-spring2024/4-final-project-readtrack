# Guide to Contributing

#### Core Team Members
* [Kiara Chombo](https://github.com/k1arac)
* [Connor DeLeon](https://github.com/cnnrdel)
* [Hannah Horiuchi](https://github.com/hah8236)
* [Ellis Pinsky](https://github.com/ellispinsky)
* [Jeffery Saeteros](https://github.com/jeffreysaeteros)

## Team Norms

#### General Project Norms

- Each sprint will take approximately 2-3 weeks, with a total of 5 sprints over the course of the semester.
- Daily standups will occur 2-3 times per sprint, with at least a couple of days in between each meeting to allow for development time.
- Each sprint will begin with a group meeting, where we will decide on the most important tasks and divide work as we see fit.
- Actively communicate in the Discord, keeping teammates updated on your progress and any concerns/questions that may arise. 
- Ideally, meet at least one time in person per sprint, with at least 3 members present.
- Hold at least 1-2 (depending on the length of the sprint) synchronous Zoom calls per sprint with all members in attendance.

#### Development and Git Workflow Norms

- Use VS Code for development.
- Follow the agile workflow.
- Make changes on your own branch or another branch intended for development. 
- When you create a pull request, inform the group of the changes you have made. 
- When possible, have at least 2 other group members look at and approve of a pull request before it is officially approved.
- Only create a pull request for working code.
- Include descriptive and concise commit comments.


## Rules of Contributing

- As you are working on your contributions, remember to commit your changes regularly with descriptive and concise comments.
- Always work on and push your changes to your own branch.
- Once your all of changes are ready, open a pull request to the master branch. 
- In your pull request, describe the changes you have made to the project and add images for anything that impacts visual aspects. 
- Be open to questions and critiques from the core project members. Remember to be communicative with us and keep communications positive.
- When adding an additional feature, create tests to ensure that it is working properly.
- Follow the general style guidelines shown within the original project.

## Instructions...

### for setting up the local development environment

First, make sure to install Git, npm, and Node.js.

Once those are installed, begin by forking the original repository, then cloning that forked repository to your local machine. 

Then you are ready to create a new branch and begin development (using VS Code).

### for building and testing the project

#### To build the project,

On your branch, navigate to the root of the project directory.

Run the following command to install dependencies:

```
npm install
```

Then, run the following command to begin running the project

```
npm start
```

#### To test the project,

Navigate to the `back-end` directory.

```
cd back-end
```

Then, run the following command to begin running the unit tests:
```
npm test
```