//Page to display all the jobs

import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './Data/jobs-data'; //Fetch jobs-data.js to get the data


export default class Jobs extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            input: '',
            jobsCollection: []
        };
    }

    onSubmit(e) {
        e.preventDefault()

        const jobObject = {
            input: this.state.input,
        };
        axios.post('http://localhost:4000/jobs/search', jobObject)//Searching function
            .then((res) => {
                this.setState({ jobsCollection: res.data })
            }).catch((error) => {
                console.log(error)
            });
        this.setState({
            input: '',
        })
    }

    componentDidMount() {
        axios.get('http://localhost:4000/jobs')//Fetch job function
            .then(res => {
                this.setState({ jobsCollection: res.data })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    //To map the data retrieve and insert into object
    dataTable() {
        return this.state.jobsCollection.map((data, i) => {
            return <DataTable
                obj={data}
                key={i}
                pagination
            />
        });
    }

    render() {
        return (
            <div className="wrapper-users">
                <center>
                    <h1>LIST OF STARTUP JOBS</h1>
                    <form onSubmit={this.onSubmit}>
                        <input
                            id="input"
                            type="text"
                            required
                            value={this.state.input}
                            onChange={(e) => this.setState({ input: e.target.value })}
                            placeholder="Search Job"
                        /><input type="submit" value="Find" className="btn btn-success btn-block" />
                    </form>
                </center>
                <div className="container">
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <td>Job Name</td>
                                <td>Country</td>
                                <td>Company</td>
                                <td>Job Type</td>
                                <td>Salary</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {/* To display the data, to edit the data go to jobs-data.js */}
                            {this.dataTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}