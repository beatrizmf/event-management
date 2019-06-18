import React, { Component } from "react";
import Main from '../../../components/Main';
import api from "../../../services/api";

class FrequencyList extends Component {
	state = {
        message: "",
        confirmedList: []
	}

    componentDidMount = () => {
        this.handleFrequencyList()
    }

    handleFrequencyList = async e => {
        const { idEvent } = this.props.match.params;

        try{
            const response = await api.post(`/subscriptions/presents/${idEvent}`);
            response.confirmedEnrolleds.map( participant => {
                    this.setState({confirmedList: participant})
            })

            this.setState({ 
                message: "Your frequency list stay here! "
            })

        } catch (err) {
            console.log(err);
            this.setState({ message: "Something went wrong" })
        }
    }
    


	render() {
		return (
			<Main>
				{
					<>
					</>
				}
			</Main>
		);
	}
}

export default FrequencyList;