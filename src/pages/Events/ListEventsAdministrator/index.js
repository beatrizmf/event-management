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
				{
					this.state.events.map(event => (
						<>
							<div className="card border-left-primary shadow">
								<div className="card-body">
									<div className="no-gutters align-items-center">
										<div className="text-xs font-weight-bold text-primary text-uppercase mb-1">{dateFns.format(event.startsIn, 'MM/DD/YYYY HH:mm')}</div>
										<div className="h5 mb-0 font-weight-bold text-gray-800">{event.name}</div>
										<div className="row">
											<div className="mt-2 mx-2">
												<button className="btn btn-primary btn-icon-split btn-block" data-toggle="modal" data-target="#enrolledsList">
													<span className="icon text-white-50">
														<i className="fas fa-check"></i>
													</span>
													<span className="text">Enrolled</span>
												</button>
											</div>
											<div className="mt-2 mx-2">
												<button className="btn btn-success btn-icon-split btn-block" data-toggle="modal">
													<span className="icon text-white-50">
														<i className="fas fa-info-circle"></i>
													</span>
													<Link className="text-decoration-none text text-white" to={`admin/subscriptions/presents/${event._id}`}>Attendance</Link>
												</button>
											</div>
											<div className="mt-2 mx-2">
												<button className="btn btn-danger btn-icon-split btn-block" data-toggle="modal" data-target="#modalDelete">
													<span className="icon text-white-50">
														<i className="fas fa-trash"></i>
													</span>
													<span className="text">Delete</span>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="modal fade" id="modalDelete" tabIndex="-1" role="dialog" aria-labelledby="eventsDetails" aria-hidden="true">
								<div className="modal-dialog modal-dialog-centered" role="document">
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title" id="exampleModalLongTitle">Delete Event</h5>
											<button type="button" className="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div className="modal-body">
											Do you really want to delete the event?
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-success" data-dismiss="modal">Confirm</button>
											<button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
										</div>
									</div>
								</div>
							</div>

							<div className="modal fade bd-example-modal-xl" id="enrolledsList">
								<div className="modal-dialog modal-dialog-centered modal-xl" role="document">
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title" id="exampleModalLongTitle">Enrolleds List</h5>
											<button type="button" className="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div className="modal-body">
											<table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0" role="grid" aria-describedby="dataTable_info">
												<thead >
													<tr role="row" >
														<th className="sorting_asc" tabIndex="0" aria-controls="dataTable" rowSpan="1" colSpan="1">Name</th>
														<th className="sorting" tabIndex="0" aria-controls="dataTable" rowSpan="1" colSpan="1">E-mail</th>
														<th className="sorting" tabIndex="0" aria-controls="dataTable" rowSpan="1" colSpan="1">Status</th>
													</tr>
												</thead>
												<tfoot>
													<tr>
														<th rowSpan="1" colSpan="1">Name</th>
														<th rowSpan="1" colSpan="1">E-mail</th>
														<th rowSpan="1" colSpan="1">Status</th>
													</tr>
												</tfoot>
												<tbody>
													{
														this.state.events.map(event => (
															event.enrolleds.map(enrolled => (
																<tr role="row" className="odd">
																	<td className="sorting_1">{enrolled}</td>
																	<td>{enrolled}</td>
																	<td>{enrolled}</td>
																</tr>
															))
														))
													}
												</tbody>
											</table>
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
										</div>
									</div>
								</div>
							</div>
							<br />
						</>
					))
				}
			</Main>
		);
	}
}

export default ListEventsAdministrator;