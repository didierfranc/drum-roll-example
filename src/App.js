import React, { Component } from 'react'
import { createFetcher, Fetcher } from 'drum-roll'

const getUser = createFetcher(username =>
  fetch(`https://api.github.com/users/${username}`).then(r => r.json()),
)

class App extends Component {
  state = {
    username: null,
  }
  handleClick = () => {
    const { value: username } = this.el
    this.setState({ username })
  }
  render() {
    const { username } = this.state
    return (
      <div>
        <input ref={el => (this.el = el)} />
        <button onClick={this.handleClick}>load</button>
        <pre>
          {username && (
            <Fetcher fetcher={getUser(username)} delay={100}>
              {(data, loading, error) =>
                data ? JSON.stringify(data, null, 2) : error ? '💥' : '⏳'
              }
            </Fetcher>
          )}
        </pre>
      </div>
    )
  }
}

export default App
