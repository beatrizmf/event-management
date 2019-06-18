import React, { Component } from "react";
import api from '../../../services/api';
import Main from '../../../components/Main';

class CreateEvents extends Component {

	state = {
		message: null,
		name: '',
		description: '',
		value: '',
		startsIn: '',
		endsIn: ''
	}

	handleCreateEvent = async (e) => {
		e.preventDefault();
		try {
			await api.post('/events', {
				"name": this.state.name,
				"description": this.state.description,
				"value": this.state.value,
				"startsIn": this.state.startsIn,
				"endsIn": this.state.endsIn
			});

			this.setState({ message: 'deu certo' })

		} catch (err) {
			this.setState({ message: 'deu certo não' })
			console.log(err);
		}



	}

	setEventName = (e) => { this.setState({ name: e.target.value }) }
	setEventDescription = (e) => { this.setState({ description: e.target.value }) }
	setEventValue = (e) => { this.setState({ value: e.target.value }) }
	setEventStartsIn = (e) => { this.setState({ startsIn: e.target.value }) }
	setEventEndsIn = (e) => { this.setState({ endsIn: e.target.value }) }

	render() {
		return (
			<Main>
				<div className="card o-hidden border-0 shadow-lg my-5">
					<div className="card-body p-0">
						<div className="row">
							<div className="col-lg-12">
								<div className="p-5">
									<div className="text-center">
										<h1 className="h4 text-gray-900 mb-4">Create an Event!</h1>
										{this.state.message && (<p>{this.state.message}</p>)}
									</div>
									<form className="user" onSubmit={this.handleCreateEvent}>
										<input
											type="text" className="form-control form-control-user mb-3" required
											placeholder="Event Name" value={this.state.name} onChange={this.setEventName}
										/>

										<div className="form-group">
											<textarea className="form-control" rows="5"
												placeholder="Describe about your event here..."
												value={this.state.description} onChange={this.setEventDescription}
											></textarea>
										</div>
										<div className="form-group row">
											<div className="col-sm-4 mb-3 mb-sm-0">
												<label htmlFor="valueEvent">Value:</label>
												<input
													type="text" className="form-control form-control-user"
													id="valueEvent" value={this.state.value} onChange={this.setEventValue}
												/>
											</div>
											<div className="col-sm-4 mb-3 mb-sm-0">
												<label htmlFor="startsIn">Starts in:</label>
												<input
													type="date" className="form-control form-control-user" id="startsIn"
													value={this.state.startsIn} onChange={this.setEventStartsIn}
													required />
											</div>
											<div className="col-sm-4">
												<label htmlFor="endsIn">Ends In:</label>
												<input
													type="date" className="form-control form-control-user" id="endsIn"
													value={this.state.endsIn} onChange={this.setEventEndsIn}
													required />
											</div>
										</div>
										<button type="submit" className="btn btn-primary btn-user btn-block">Register Event</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Main>
		);
	}
}

export default CreateEvents;