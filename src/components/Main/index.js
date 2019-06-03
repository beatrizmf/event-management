import React, { Component } from "react";
import Sidebar from '../Sidebar';
import Footer from '../Footer';

class Main extends Component {

  componentDidMount = () => {
    let body = document.getElementsByTagName('body')
    body[0].classList.remove('bg-warning')
  }

  render() {
    return (
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container-fluid mt-5">
              {this.props.children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Main;
