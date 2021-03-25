import React, { useState } from 'react';


const Title = ({title}) => {
  return (
    <h1>{title}</h1>
  )
}

const ButtonBar = ({handleClick, btnNames}) => {
  let btnOne = btnNames[0]
  let btnTwo = btnNames[1]
  let btnThree = btnNames[2]

  return(
    <span>
      <button type='button' onClick={() => handleClick(btnOne)}>{btnOne}</button>
      <button type='button' onClick={() => handleClick(btnTwo)}>{btnTwo}</button>
      <button type='button' onClick={() => handleClick(btnThree)}>{btnThree}</button>
    </span>
  )
}

const Statistic = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  let total = good + neutral + bad
  if(total === 0)
    return(
      <div>
        <Title title='Statistics' />
        <div>No feedback given</div>
      </div>
    )
  else {
    return (
      <div>
        <Title title='Statistics' />
        <table>
          <tbody>
            <Statistic text='Good' value={good}/>
            <Statistic text='Neutral' value={neutral}/>
            <Statistic text='Bad' value={bad}/>
            <Statistic text='Total' value={total}/>
            <Statistic text='Average' value={(good - bad) / total}/>
            <Statistic text='Positive' value={good / total}/>
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const btnNames = ['good', 'neutral', 'bad']

  const handleFeedbackClick = (btnName) => {
    if(btnName === 'good')
      setGood(good + 1)
    else if(btnName === 'neutral')
      setNeutral(neutral + 1)
    else if(btnName === 'bad')
      setBad(bad + 1)
  }

  return (
    <div>
      <Title title='Give Feedback' />
      <ButtonBar handleClick={handleFeedbackClick} btnNames={btnNames} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


export default App;
