import React, { Component } from "react";
import Main from '../../components/Main'
class Home extends Component {

  componentDidMount = () => {
    let body = document.getElementsByTagName('body')
    body[0].classList.remove('bg-warning')
  }

  render() {
    return (
        <Main>
          <p>Open events...</p>
        </Main>
    );
  }
}

export default Home;
