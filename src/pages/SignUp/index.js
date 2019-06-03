import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";
import { login } from "../../services/auth";

class SignUp extends Component {
  state = {
    fullName: "",
    email: "",
    password: "",
    message: ""
  };

  componentDidMount = () => {
    let body = document.getElementsByTagName('body')
    body[0].classList.add('bg-warning')
  }

  handleSignUp = async e => {
    e.preventDefault();
    const { fullName, email, password } = this.state;
    if (!fullName || !email || !password) {
      this.setState({ message: "Fill in all the fields to register!" });
    } else {
      try {
        this.setState({
          message: "Loading..."
        });
        const response = await api.post("/users", {
          fullName,
          email,
          password
        });
        login(response.data.token);
        this.props.history.push("/home");
      } catch (err) {
        console.log(err);
        this.setState({
          message: "An account with this email already exists."
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
                  <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5 mt-2 mb-2 ">
                      <div className="text-center">
                        <h1 className="h2 text-gray-900 mb-4">Event Management</h1>
                        <hr />
                        <h1 className="h4 text-gray-900 mb-4">Create an account!</h1>
                        {this.state.message && <span className="btn btn-light btn-sm mb-4">{this.state.message}</span>}
                      </div>
                      <form className="user" onSubmit={this.handleSignUp}>
                        <div className="form-group">
                          <div className="mb-3 mb-sm-0">
                            <input type="text" className="form-control form-control-user" placeholder="Full Name" onChange={e => this.setState({ fullName: e.target.value })} />
                          </div>
                        </div>
                        <div className="form-group">
                          <input type="email" className="form-control form-control-user" placeholder="Email" onChange={e => this.setState({ email: e.target.value })} />
                        </div>
                        <div className="form-group">
                          <div className="mb-3 mb-sm-0">
                            <input type="password" className="form-control form-control-user" placeholder="Password" onChange={e => this.setState({ password: e.target.value })} />
                          </div>
                        </div>
                        <button type="submit" className="btn btn-warning btn-user btn-block">Register Account</button>
                      </form>
                      <div className="text-center mt-4">
                        <Link to="/"><span className="small" >Already have an account? Login!</span></Link>
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

export default withRouter(SignUp);
