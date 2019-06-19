import React, { Component } from "react";
import api from '../../../services/api';
import Main from '../../../components/Main';
import { Link } from 'react-router-dom';
import dateFns from 'date-fns';


class ListEventsAdministrator extends Component {
  state = {
    events: [],
  }

  componentDidMount() {
    this.handleListEventsAdministrator();
  }

  handleListEventsAdministrator = async () => {
    try {
      const response = await api.get('/admin/events')
      this.setState({ events: response.data })

    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <Main>
        <div className="row">
          {
            this.state.events.map(event => (
              <div className="col-lg-6 card border-left-primary shadow">
                <div className="card-body">
                  <div className="no-gutters align-items-center">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Starts in: {dateFns.format(event.startsIn, 'MM/DD/YYYY HH:mm')}</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{event.name}</div>
                    <p>{event.description}</p>
                  </div>
                  <div className="row">
                    <button className="btn btn-secondary mr-1">
                      <span className="text">Enrolleds</span>
                    </button>
                    <button className="btn btn-secondary mr-1">
                      <span className="text">Confirmed Enrolleds</span>
                    </button>
                    <button className="btn btn-secondary mr-1">
                      <span className="text">Details</span>
                    </button>
                    <button className="btn btn-secondary mr-1">
                      <span className="text">Edit</span>
                    </button>
                    <button className="btn btn-danger mr-1">
                      <span className="text">Delete</span>
                    </button>
                    <button className="btn btn-success">
                      <Link className="text-decoration-none text text-white" to={`/admin/events/frequency/${event._id}`}>Attendance</Link>
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </Main>
    );
  }
}

export default ListEventsAdministrator;
