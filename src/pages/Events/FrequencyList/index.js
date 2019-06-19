import React, { Component } from "react";
import io from 'socket.io-client'
import Main from "../../../components/Main";
import api from "../../../services/api";

class FrequencyList extends Component {
  state = {
    message: "",
    event: [],
    idEvent: ''
  };

  componentDidMount = async () => {
    const { idEvent } = this.props.match.params;
    this.setState({ idEvent })

    const response = await api.get(`/events/${this.state.idEvent}`);

    this.setState({ event: response.data })

    this.handleFrequencyList();
  };

  handleSocket = async () => {
    const socket = io('https://event-management-api.herokuapp.com', {transports: ['websocket']})

    await socket.on('presence', () => {
      this.handleFrequencyList()
    })
  }

  handleConfirmPresence = async (userId) => {
    try{
      await api.post(`/subscriptions/presents/${this.state.idEvent}/${userId }`)

    } catch(err){
      console.log(err);
    }
  }

  handleFrequencyStatus = (userId) => {

  }

  handleFrequencyList = async e => {
    try {
      if (this.state.event.confirmedEnrolleds.length < 1) {
        this.setState({ message: "Empty list! :(" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <Main>
        {
          console.log(this.state.event.confirmedEnrolleds)
          /*this.state.event.confirmedEnrolleds.map( user => (
            <p>{user.email}</p>
            // {this.handleFrequencyStatus(user._id)}
          ))*/
        }
      </Main>
    );
  }
}

export default FrequencyList;
