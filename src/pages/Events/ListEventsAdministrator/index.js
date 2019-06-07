import React, { Component } from "react";
import api from '../../../services/api';
import Main from '../../../components/Main';

class ListEventsAdministrator extends Component {
	state = {
		myEvents: []
		
	}

	handleListEventsAdministrator = async () => {
		try{
			const response = await api.get('/events')
			this.setState({ myEvents: response.data })

		} catch (err) {
			console.log(err);
		}
	}

	render() {
		return (
			<Main>
				{
					<>
						<div className="card border-left-primary shadow">
							<div className="card-body">
								<div className="no-gutters align-items-center">
									<div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Date Event</div>
									<div className="h5 mb-0 font-weight-bold text-gray-800">Name Event</div>
									<div className="row">
										<div className="mt-2 mx-2">
											<button className="btn btn-primary btn-icon-split btn-block" data-toggle="modal" data-target="">
												<span className="icon text-white-50">
													<i className="fas fa-check"></i>
												</span>
												<span className="text">Enrolled</span>
											</button>
										</div>
										<div className="mt-2 mx-2">
											<button className="btn btn-success btn-icon-split btn-block" data-toggle="modal" data-target="">
												<span className="icon text-white-50">
													<i className="fas fa-info-circle"></i>
												</span>
												<span className="text">Attendance</span>
											</button>
										</div>
										<div className="mt-2 mx-2">
											<button className="btn btn-danger btn-icon-split btn-block" data-toggle="modal" data-target="modalDelete">
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
										<h5 className="modal-title" id="exampleModalLongTitle">Delete</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										Do you really want to delete the event?
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
										<button type="button" className="btn btn-primary">Save changes</button>
									</div>
								</div>
							</div>
						</div>
					</>
				}
			</Main>
		);
	}
}

export default ListEventsAdministrator;