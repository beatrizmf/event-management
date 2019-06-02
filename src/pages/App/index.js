import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { logout } from "../../services/auth";

class App extends Component {
  state = {
    message: "App"
  };

  componentDidMount = () => {
    let body = document.getElementsByTagName('body')
    body[0].classList.remove('bg-warning')
  }


  handleLogout = async e => {
    e.preventDefault();
    try {
      this.setState({
        message: "loading..."
      });
      logout();
      this.setState({
        message: "bye"
      });
      this.props.history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
        <form onSubmit={this.handleLogout}>
          {this.state.message && <p>{this.state.message}</p>}
          <hr />
          <button type="submit">Logout</button>
        </form>
    );
  }
}

export default withRouter(App);
