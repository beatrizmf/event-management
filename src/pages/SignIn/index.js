import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { login } from "../../services/auth";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    message: ""
  };

  componentDidMount = () => {
    let body = document.getElementsByTagName('body')
    body[0].classList.add('bg-warning')
  }

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({
        message: "Fill in the email and password to continue!"
      });
    } else {
      try {
        this.setState({
          message: "Loading..."
        });
        const response = await api.post("/sessions", {
          email,
          password
        });
        login(response.data.token);
        this.props.history.push("/");
      } catch (err) {
        console.log(err);
        this.setState({
          message: "Check your credentials."
        });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5 mt-5 mb-5">
                      <div className="text-center">
                        <h1 className="h2 text-gray-900 mb-4">Event Management <i className="rotate-n-15 fas fa-calendar-check"></i></h1>
                        <hr/>
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                        {this.state.message && <span className="btn btn-light btn-sm mb-4">{this.state.message}</span>}
                      </div>
                      <form className="user" onSubmit={this.handleSignIn}>
                        <div className="form-group">
                          <input type="email" className="form-control form-control-user" placeholder="Email" onChange={e => this.setState({
                            email: e.target.value
                          })} />
                        </div>
                        <div className="form-group">
                          <input type="password" className="form-control form-control-user" placeholder="Password" onChange={e => this.setState({ password: e.target.value })} />
                        </div>
                        <button type="submit" className="btn btn-warning btn-user btn-block">Login</button>
                      </form>
                      <div className="text-center mt-4">
                        <Link to="/signup"><span className="small">Create an account!</span></Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
