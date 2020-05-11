import React, { Component } from 'react'
import { Container, Jumbotron } from 'react-bootstrap';

class Notice extends Component {
  render() {
    return (
      <Container style={{ padding: "10px" }}>
        <Jumbotron style={{ height: "500px", overflow: "auto" }}>

        </Jumbotron>
      </Container>
    )
  }
}

export default Notice;