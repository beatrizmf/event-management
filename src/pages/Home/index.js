import React, { Component } from "react";
import Sidebar from '../../components/Sidebar'

class Home extends Component {

  componentDidMount = () => {
    let body = document.getElementsByTagName('body')
    body[0].classList.remove('bg-warning')
  }

  render() {
    return (
        <div id="wrapper">
          <Sidebar />
        </div>
    );
  }
}

export default Home;
