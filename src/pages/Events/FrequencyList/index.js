import React, { Component } from "react";
import io from 'socket.io-client'
import Main from "../../../components/Main";
import api from "../../../services/api";

class FrequencyList extends Component {
  state = {
    message: "",
    event: [],
    totalConfirmed: 0,
    totalPresents: 0,
    confirmedEnrolleds: []
  };

  componentDidMount = async () => {
    const { idEvent } = this.props.match.params;

    const response = await api.get(`/events/${idEvent}`);

    this.setState({ event: response.data })
    this.setState({ confirmedEnrolleds: this.state.event.confirmedEnrolleds })

    this.handleFrequencyList();
    this.setTotalConfirmeds(this.state.event.confirmedEnrolleds);
    this.setTotalPresents(this.state.event.presents);

  };

  handleSocket = () => {
    const socket = io('https://event-management-api.herokuapp.com', {transports: ['websocket']})

    socket.on('presence', () => {
      this.handleFrequencyList()
      this.setTotalConfirmeds(this.state.event.presents)
      this.setTotalPresents(this.state.event.presents)
      this.renderListConfirmedEnrolleds()

    })
  }

  handleConfirmPresence = async (userId) => {
    try{
      await api.post(`/subscriptions/presents/${this.state.event._id}/${userId }`)

    } catch(err){
      console.log(err);
    }
  }

  setTotalConfirmeds = (confirmedEnrolleds) => {
    try{
      let totalConfirmed = 0;
      confirmedEnrolleds.map(() => totalConfirmed++);

      this.setState({ totalConfirmed })

    } catch (err) {
      console.log(err)
    }
  }

  setTotalPresents = (presents) => {
    try{
      let totalPresents = 0;
      presents.map(() => totalPresents++);

      this.setState({ totalPresents })

    } catch (err) {
      console.log(err)
    }
  }


  handleFrequencyStatus = (userId) => {
    try{
      let isPresent = false

      this.state.event.presents.map(present => {
        if(present._id === userId){
          isPresent = true
        }
      })

      return isPresent ?
      <button className="btn btn-success">Confirmed</button>
      : <button className="btn btn-info" onClick={() => this.handleConfirmPresence(userId)}>Confirm Presence</button>

    } catch(err){
      console.log(err)
    }
  }

  handleFrequencyList = () => {
    try {
      if (this.state.event.confirmedEnrolleds.length < 1) {
        this.setState({ message: "Empty list! :(" });
      }


    } catch (err) {
      console.log(err);
    }
  };

  renderListConfirmedEnrolleds = () => {
    return(
      this.state.confirmedEnrolleds.map(enrolled => (
        <>
        <div className="row">
          <p className="mr-5">{enrolled.email}</p>
          {this.handleFrequencyStatus(enrolled._id)}
        </div>
        <hr />
        </>
      ))
    )
  }

  render() {
    return (
      <Main>
          <h1 className="text-center mb-5">{this.state.event.name}</h1>
          <div className="row">
            <div className="col-xl-12 col-md-12 mb-4">
              <div className="card border-left-info shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Total Confirmed</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.totalConfirmed}</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-info-circle fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12 col-md-12 mb-4">
              <div className="card border-left-info shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Total Presents</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.totalPresents}</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-info-circle fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Frequency List</h6>
            </div>
            <div className="card-body">
                <div className="row">
                  <div className="col-xl-4 col-md-4 mb-2 mt-2">
                    {this.renderListConfirmedEnrolleds()}
                  </div>
                </div>

            </div>
          </div>
      </Main>
    );
  }
}

export default FrequencyList;
