import React, { useState } from 'react';


const Course = ({course}) => {
  return(
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const Header = ({name}) => {
  return (
    <h2>{name}</h2>
  )
}

const Content = ({parts}) => {
  return(
    <div>
      {parts.map(part => <Part key={part.id} part={part}/> )}
    </div>
  )
}

const Part = ({part, id}) => {
  return(
    <p >
      {part.name} {part.exercises}
    </p>
  )
}

const Total = ({parts}) => {
  return(
    <div>
      <span>
        <b>
          Total of {parts.reduce((total, part) => total + part.exercises, 0 )} exercises.
        </b>
      </span>
    </div>
  )
}

export default Course