import React, { Component } from "react";
import api from '../../../services/api';
import dateFns from 'date-fns';

class ListOpenEvents extends Component {

  state = {
    openEvents: [],
    userId: '5cf59c107f7d1300179d1e01',
    status: {
      text: 'Subscribe',
      className: 'success'
    }
  }

  componentDidMount = () => {
    this.handleGetOpenEvents();
  }

  handleGetOpenEvents = async () => {
    try {
      const response = await api.get('/events');
      this.setState({ openEvents: response.data });
    } catch (err) {
      console.log(err)
    }
  }

  handleSubscribeStatus = async (event) => {
    try {
      event.enrolleds.map(enrolled => {
        if (enrolled == this.state.userId) {
          let status = { text: 'Cancel', className: 'danger' };
          return status;
        }
      })

      let status = { text: 'Subscription', className: 'success' };
      return status;
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
      <div className="row">
        {
          this.state.openEvents.map(event => (
            dateFns.isFuture(event.startsIn) ?
              <>
                {/*() => this.setState({ status: this.handleSubscribeStatus(event)}) */
                  console.log(this.handleSubscribeStatus(event))
                }
                <div className="col-sm-6 col-lg-4">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-primary">{event.name}</h6>
                    </div>
                    <div className="card-body">
                      <button className="col-sm-12 col-md-6 col-lg-4 btn btn-info text" data-toggle="modal" data-target={`#eventDetails-${event._id}`}>
                        <span className="icon text-white-50"><i className="fas fa-info-circle"></i></span> Details
                    </button>
                      <button
                        className={`col-sm-12 col-md-6 col-lg-4 btn btn-${this.state.status.className} text float-right mt-sm-1 mt-lg-0`}
                        onClick={() => (this.handleSubscribeEvent(event._id))}
                      >
                        <span className="icon text-white-50"><i className="fas fa-plus"></i></span> {this.state.status.text}
                      </button>
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
                        <p><span className="font-weight-bolder">Stars in:</span> {dateFns.format(event.startsIn, 'MM/DD/YYYY HH:mm')}</p>
                        <p><span className="font-weight-bolder">Ends in:</span> {dateFns.format(event.endsIn, 'MM/DD/YYYY HH:mm')}</p>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
              : <>('')</>
          ))
        }
      </div>
    );
  }
}

export default ListOpenEvents;

