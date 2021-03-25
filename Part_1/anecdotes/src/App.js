import React, { useState} from 'react';



const Anecdote = ({anecdote, votes, handleRandom, handleVote}) => {

  return(
    <div>
      <h1>Anecdote of the Day</h1>
      <div>
        <span>
          {anecdote} <br />- Has {votes} votes
        </span>
      </div>
      <div>
        <span>
          <button type='button' onClick={handleVote}>+1</button>
          <button type='button' onClick={handleRandom}>Random Anecdote</button>
        </span>
      </div>
    </div>
  )
}

const TopAnecdote = ({anecdote, votes}) => {
  return(
    <div>
      <h1>Anecdote With the Most Votes</h1>
      <div>
        {anecdote} <br />- Has {votes} votes
      </div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [favoriteIndex, setIndex] = useState(0)

  const selectRandomAnecdote = () => {
    //Ensure a new anecdote is selected.
    let randInt = -1
    do {
      randInt = Math.floor(Math.random() * Math.floor(anecdotes.length))
    } while(randInt === selected)

    setSelected(randInt)
  }

  const incrementVote = () => {
    let votesCopy = [...votes]
    votesCopy[selected] += 1

    setVotes(votesCopy)
    setIndex(votesCopy.indexOf(Math.max(...votesCopy)))
  }

  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} handleRandom={() => selectRandomAnecdote()} handleVote={() => incrementVote()} />
      <TopAnecdote anecdote={anecdotes[favoriteIndex]} votes={votes[favoriteIndex]} />
    </div>
  )
}

export default App;
