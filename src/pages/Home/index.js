import React, { Component } from "react";
import Main from '../../components/Main'
import ListOpenEvents from '../Events/ListOpenEvents';

class Home extends Component {

  componentDidMount = () => {
    let body = document.getElementsByTagName('body')
    body[0].classList.remove('bg-warning')
  }

  render() {
    return (
        <Main>
          <ListOpenEvents />
        </Main>
    );
  }
}

export default Home;
