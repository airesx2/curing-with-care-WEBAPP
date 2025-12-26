import React, { Component } from "react"
import "./App.css"
import { SearchBar } from "./components/SearchBar"
import { LoginCard } from "./components/LoginCard" 
import { DarkModeToggle } from "./components/DarkModeToggle"

class LambdaDemo extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, msg: null }
  }

  handleClick = api => e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
  }

  render() {
    const { loading, msg } = this.state

    return (
      <p>
        <button onClick={this.handleClick("hello")}>{loading ? "Loading..." : "Goodluck"}</button>
        <button onClick={this.handleClick("async-dadjoke")}>{loading ? "Loading..." : " You gyatt this"}</button>
        <br />
        <span>{msg}</span>
      </p>
    )
  }
}

class App extends Component {
  handleSearch = (query) => {
    console.log('Search query:', query)
    // search logic here
  }

  render() {
    return (
      <div className="App">
        <LoginCard />  {/* Changed this line */}

        <header className="App-header">
          <p>
            Hi Team Awesome Genuises!
          </p>
          <DarkModeToggle />
          <SearchBar onSearch={this.handleSearch} className="w-64" />
          <LambdaDemo />
        </header>
      </div>
    )
  }
}

export default App
