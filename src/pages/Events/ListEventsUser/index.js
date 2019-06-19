import React, { Component } from "react";
import io from 'socket.io-client'
import api from '../../../services/api';
import dateFns from 'date-fns';

import Main from '../../../components/Main';

class ListOpenEvents extends Component {

  state = {
    openEvents: [],
    userId: '',
  }

  componentDidMount = () => {
    this.getUserId();
    this.handleSocket();
    this.handleGetOpenEvents();
  }

  handleSocket = async () => {
    const socket = io('https://event-management-api.herokuapp.com', { transports: ['websocket'] })

    await socket.on('event', () => {
      this.handleGetOpenEvents()
    })

    await socket.on('subscription', () => {
      this.handleGetOpenEvents()
    })
  }

  getUserId = async () => {
    try {
      const response = await api.get('/users/getId');
      const userId = response.data;
      this.setState({ userId: userId })
    } catch (err) {
      console.log(err)
    }
  }

  handleGetOpenEvents = async e => {
    try {
      const response = await api.get('/users/events');
      this.setState({ openEvents: response.data });
    } catch (err) {
      console.log(err);
    }
  }

  handleSubscribeStatus = (event) => {
    try {
      let userErrolled = false;
      let userErrolledConfirmed = false;

      event.enrolleds.map(enrolled => {
        if (enrolled == this.state.userId) {
          userErrolled = true;
        }
      })

      event.confirmedEnrolleds.map(enrolled => {
        if (enrolled == this.state.userId) {
          userErrolledConfirmed = true;
        }
      })

      if (userErrolled && !userErrolledConfirmed) {
        return (
          <button
            className={`col-sm-12 col-md-6 col-lg-6 btn btn-warning text float-right mt-sm-1 mt-lg-0`}
          >
            <span className="icon text-white-50"><i className="fas fa-exclamation"></i></span> Waiting Confirmation
          </button>
        );
      } else if (userErrolled && userErrolledConfirmed) {
        return (
          <button
            className={`col-sm-12 col-md-6 col-lg-6 btn btn-success text float-right mt-sm-1 mt-lg-0`}
          >
            <span className="icon text-white-50"><i className="fas fa-check"></i></span> Subscribtion Confirmed
          </button>
        );
      } else {
        return (
          <button
            className={`col-sm-12 col-md-6 col-lg-4 btn btn-primary text float-right mt-sm-1 mt-lg-0`}
            onClick={() => (this.handleSubscribeEvent(event._id))}
          >
            <span className="icon text-white-50"><i className="fas fa-plus"></i></span> Subscribe
          </button>
        );
      }

    } catch (err) {
      console.log(err)
    }
  }

  handleSubscribeEvent = async (idEvent) => {
    try {
      await api.post(`/subscriptions/${idEvent}`);
      this.handleGetOpenEvents()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <Main>

        <div className="row">
          <div className="col-sm-12 mb-5 text-center">
            <h1>Your events! ;)</h1>
            <hr />
          </div>
          {
            this.state.openEvents.map(event => (
              <>
                <div className="col-sm-6 col-lg-4">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-primary">{event.name}</h6>
                    </div>
                    <div className="card-body">
                      <button className="col-sm-12 col-md-6 col-lg-4 btn btn-info text" data-toggle="modal" data-target={`#eventDetails-${event._id}`}>
                        <span className="icon text-white-50"><i className="fas fa-info-circle"></i></span> Details
                    </button>
                      {this.handleSubscribeStatus(event)}
                    </div>
                  </div>
                </div>
                <div className="modal fade" id={`eventDetails-${event._id}`} tabindex="-1" role="dialog" aria-labelledby={`eventDetailsModal-${event._id}`} aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id={`eventDetailsModal-${event._id}`}>{event.name}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        {event.value > 0
                          ? (
                            <>
                              <p><span className="font-weight-bolder">Value:</span> US$ {event.value}</p>
                              <hr />
                            </>
                          ) : (
                            <>
                              <p className="bg-success text-white text-center">Free</p>
                              <hr />
                            </>
                          )}
                        <p>{event.description}</p>
                        <hr />
                        <p><span className="font-weight-bolder">Stars in:</span> {dateFns.format(event.startsIn, 'MM/DD/YYYY, HH:mm')}</p>
                        <p><span className="font-weight-bolder">Ends in:</span> {dateFns.format(event.endsIn, 'MM/DD/YYYY, HH:mm')}</p>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))
          }
        </div>
      </Main>
    );
  }
}

export default ListOpenEvents;

