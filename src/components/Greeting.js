import React, { Component } from 'react'

export class Greeting extends Component {
  constructor(){
    super()
    this.state={
      name: ""
    }
  }
  nameChange = (e) =>{
      this.setState({ name: e.target.value })
      console.log(e)
    }
  render() {
    return (
      <form>
        <input type='text' value={this.state.name} onChange={this.nameChange}></input>
      </form>
    )
  }
}

export default Greeting