# Mr Yum Take Home Test

This repo is for a toy robot that operates on a 5x5 grid. This includes UI to update the position on the robot and visulaise it's position.
*Current Functionality*
- Ability to change the direction of robot `North, East, West, South`
- Ability to move robot one square
- Ability to shift robot's direction left or right
- Ability to see in UI where robot is location on grid
- Guarding where user is unable and will be alerted when trying to push robot off grid. 




https://github.com/j-b0/toy-robot/assets/47814145/9912790f-305b-42ff-bd74-8af8e01e8cea




## Getting started

1. Clone Repo and install npm packages
2. To build and serve UI run the below and go to [http://localhost:3000](localhost:3000)
```
npm start
```
3. To run the unit tests set up run 
```
npm run test
```

_NB: the main functionality sits within src/components/Robot.tsx_

## Stack 
I have built this using Typescript, with a _very_ basic react UI. Built on top of a stripped down next.js [boilerplate](https://github.com/ixartz/Next-js-Boilerplate). I additionally used jest to implement unit tests.

The main benefit of using next.js to spin up this UI is because it is vastly simplifies routing and compling, as apposed to express solution etc.
I additionally used tailwind for some very basic styling, tailwind allows the oppertunity to use a lot of out the box styling to quickly build this solution.
I chose typescript as this is the language I'm most confident in, but also the static typing allowed me to mainitain a high code quality and rapid development.

## Solution / Tradeoffs 
The functionality for this robot prodomenently relies on 3 react states where the position and direction of the robot is stored, this is a very simple solution however could become challenging if multiple components need to track the location, in this case a observable react state or redux value could be more helpful to keep a central value of the robots location.

The functions to update the location of the robot are all simple switch statements, eg if direction is right + 1 to x state. One drawback to this is scalability, should we choose to ad the option for `North west` etc that switch statment could become bloated and hard to maintain. We could instead implement an array of x and y distortations based on directions. However, I felt this would be overcomplex for the situation at hand, and is additionally somewhat unclear  where as a simple switch statement is very readable, example of alternate solution :

```
const directionMappings = {
  north: { x: 0, y: 1 },
  ....
};

const move = (newDirection) {
    const newX += directionMappings[newDirection].x;

```

The task requested a 5x5 grid, however the number of grid items is dynamic, we could simply change it to 2x2 etc, the benefit of this is its really scalable. However this could be seen as overcomplex if we are confident in the premese the grid size would never change.

The tests could be expanded so that they do not rely on the understanding the North will always be the default position. 

