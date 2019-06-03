import React, { Component } from "react";
import Main from "../../../components/Main"
import { Link } from "react-router-dom";
import api from "../../../services/api"

class ConfirmRegistration extends Component {

  state = {
    message: "",
    classMessage: "primary"
  }

  componentDidMount = () => {
    this.handleConfirmRegistration()  
  }
  
  handleConfirmRegistration = async e =>{
    const { idEvent } = this.props.match.params;
    const { idUser } = this.props.match.params;

    try {
      this.setState({
        message: "Loading.."
      })
      
      await api.post(`/subscriptions/confirm/${idEvent}/${ idUser}`);

      this.setState({
        message: "Registration confirmed successfully!",
        classMessage: "success"
      })
    } catch (err){
      console.log(err);
      this.setState({
        message: "Something went wrong.",
        classMessage: "danger"
      })
    }
  }

  render() {
    return (
      <Main>
        <div className="row text-center">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div class={`card mb-4 py-3 border-bottom-${this.state.classMessage}`}>
              <div class="card-body">
                {this.state.message && <p>{this.state.message}</p>}
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <Link to="/">← Back to Home</Link>
          </div>
        </div>
      </Main>
    );
  }
}

export default ConfirmRegistration;
