import React, { Component } from "react";
import io from 'socket.io-client'
import Main from "../../../components/Main";
import api from "../../../services/api";

class FrequencyList extends Component {
  state = {
    message: "",
    event: [],
    totalConfirmed: null,
    pendingPresences: null,
    confirmedPresences: null
  };

  componentDidMount = async () => {
    const { idEvent } = this.props.match.params;

    const response = await api.get(`/events/${idEvent}`);

    this.setState({ event: response.data })
    this.handleFrequencyList();
    this.setTotalConfirmeds(this.state.event.confirmedEnrolleds);
    this.setPendingPresences(this.state.event);
    this.setConfirmedPresences(this.state.event);
    
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

  setTotalConfirmeds = (eventInformation) => {
    try{
      let totalConfirmed = 0;
      eventInformation.map(() => totalConfirmed++);
      
      this.setState({ totalConfirmed: totalConfirmed })

    } catch (err) {
      console.log(err)
    } 
  } 

  setPendingPresences = (event) => {
    try{
        if(event.presents == ""){
          this.setState({ pendingPresences: this.state.totalConfirmed })
        } else {
          this.setState({ pendingPresences: (this.state.totalConfirmed - this.state.confirmedPresences )})
        }
      } catch (err) {
      console.log(err);
    }
  }

  setConfirmedPresences = (event) => {
    try{

      if(event.presents == ""){
        this.setState({ confirmedPresences: 0 })
      }else{
        //this.setState({ confirmedPresences:  })
      }

    } catch(err){
      console.log(err);
    }
  }

  handleFrequencyStatus = (eventInformation) => {
    try{
      console.log(eventInformation)

    
    } catch(err){
      console.log(err)
    }
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
          </div>

          <div className="row">
            <div className="col-xl-6 col-md-6 mb-4">
              <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Pending Presences</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.pendingPresences}</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-exclamation-triangle fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Confirmed Presences</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.confirmedPresences}</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-check-double fa-2x text-gray-300"></i>
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
                    {this.handleFrequencyStatus(this.state.event.confirmedEnrolleds)}
                  </div>
                  <div className="col-xl-4 col-md-4 mb-2 mt-2 ">
                    status
                  </div>
                  <div className="col-xl-4 col-md-4 mb-2 mt-2">
                    <button className="btn btn-block btn-info" onClick={() => this.handleConfirmPresence()}>Confirm Presence</button>
                  </div>
                </div>
              
            </div>
          </div>  
          {/*
          console.log(this.state.event.confirmedEnrolleds)
          this.state.event.confirmedEnrolleds.map( user => (
            <p>{user.email}</p>
            // {this.handleFrequencyStatus(user._id)}
          ))*/
        }
      </Main>
    );
  }
}

export default FrequencyList;
