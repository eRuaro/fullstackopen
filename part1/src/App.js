// const Hello = (props) => {
//   return (
//     <div>
//       <p> Hello {props.name}, you are {props.age} years old </p>
//     </div>
//   );
// }

import React, { useState } from 'react'

function sum (numbers) {
  let total = 0
  numbers.forEach(element => {
    total += element.exercises
  })

  return total
}

const App = () => {
  const [counter, setCounter] = useState(0)

  // setTimeout(
  //   () => setCounter(counter + 1),
  //   1000
  // )

  const handleClick = () => {
    console.log('clicked')
    setCounter(counter + 1)
  }

  const resetCounter = () => {
    console.log('reset')
    setCounter(0)
  }

  const course = "Half Stack application development"
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    }
  ]

  let total = sum(parts)

  return (
    <div>
      <Header course={course}/>
      <Hello name={"Neil"} age={17}/>
      <Content part={parts}/>
      <Total total={total}/>
      <Display counter={counter}/>
      <Button text={'Plus'} onClick={handleClick}/>
      <Button text={'Reset'} onClick={resetCounter}/>
    </div>
  );
}

const Display = ({counter}) => {
  return (
    <div> counter: {counter} </div>
  )
}

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}> {text}</button>
  )
}

const Hello = ({name, age}) => {
  // const name = props.name 
  // const age = props.age

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>
        So you were probably born in {bornYear()}
      </p>
    </div>
  );
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
}

const Content = (props) => {
  // const part1 = "Fundamentals of React"
  // const exercises1 = 10
  // const part2 = "Using props to pass data"
  // const exercises2 = 7
  // const part3 = "State of a component"
  // const exercises3 = 14

  return (
    <div>
      <Part part={props.part[0].name} exerciseNumber={props.part[0].exercises}/>
      <Part part={props.part[1].name} exerciseNumber={props.part[1].exercises}/>
      <Part part={props.part[2].name} exerciseNumber={props.part[2].exercises}/>
    </div>
  );
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exerciseNumber}
      </p>
    </div>
  );
}

const Total = (props) => {
  return (
    <div>
      <p> Number of exercises {props.total} </p>
    </div>
  );
}

export default App;
