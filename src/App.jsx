import React, { Component } from "react"
import "./App.css"
import { SearchBar } from "./components/SearchBar"
import { LoginCard } from "./components/LoginCard" 
import { DarkModeToggle } from "./components/DarkModeToggle"
import { FeaturedArticle } from "./components/FeaturedArticle"
import { Tabs } from "@radix-ui/themes";

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
        

        <header className="App-header">
          <Tabs.Root defaultValue="account">
            <Tabs.List>
              <Tabs.Trigger value="account">Account</Tabs.Trigger>
              <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
              <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="account">
              <LoginCard />
            </Tabs.Content>
            <Tabs.Content value="documents">
              <FeaturedArticle />
            </Tabs.Content>
            <Tabs.Content value="settings">
              <DarkModeToggle />
              <SearchBar onSearch={this.handleSearch} className="w-64" />
            </Tabs.Content>
          </Tabs.Root>
          <p>
            Hi Team Awesome Genuises!
          </p>
          
          <LambdaDemo />
          
        </header>
      </div>
    )
  }
}

export default App
