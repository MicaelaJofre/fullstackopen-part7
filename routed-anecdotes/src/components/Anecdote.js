const Anecdote = ({ anecdote }) => {
    return (
        <div>
            <h1>{anecdote.content}</h1>
            <p>Has {anecdote.votes} votes</p>
            <p>For more info {anecdote.info}</p>
        </div>
    )
}

export default Anecdote