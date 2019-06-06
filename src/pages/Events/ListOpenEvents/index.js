import React, { Component } from "react";
import api from '../../../services/api';
/*import {
  parseISO,
  format,
  formatRelative,
  formatDistance,
} from 'date-fns';

import { pt } from 'date-fns/locale' */

class ListOpenEvents extends Component {

  state = {
    openEvents: []
  }

  componentDidMount = () => {
    this.handleGetOpenEvents();
  }

  handleGetOpenEvents = async () => {
    const response = await api.get('/events');

    this.setState({ openEvents: response.data });
    console.log(this.state.openEvents);
  }

  render() {
    return (
      <div className="row">
        {
          this.state.openEvents.map(event => (
            <>
            <div className="col-sm-6 col-lg-4">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">{event.name}</h6>
                </div>
                <div className="card-body">

                  <button className="col-sm-12 col-md-6 col-lg-4 btn btn-info text" data-toggle="modal" data-target="#eventDetails">
                    <span className="icon text-white-50"><i className="fas fa-info-circle"></i></span> Details
                  </button>

                  <button className="col-sm-12 col-md-6 col-lg-4 btn btn-success text float-right mt-sm-1 mt-lg-0">
                    <span className="icon text-white-50"><i className="fas fa-plus"></i></span> Subscribe
                  </button>

                </div>
              </div>
            </div>
            <div className="modal fade" id="eventDetails" tabindex="-1" role="dialog" aria-labelledby="eventDetailsModal" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="eventDetailsModal">{event.name}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>{event.description}</p>
                    <hr />
                    <p>{event.startsIn}</p>
                    <p>{event.endsIn}</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    {/*<button type="button" className="btn btn-primary">Salvar mudanças</button>*/}
                  </div>
                </div>
              </div>
            </div>
            </>
          ))
        }
      </div>
    );
  }
}

export default ListOpenEvents;

