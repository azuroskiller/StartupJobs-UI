import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './Data/jobs-data';


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
        axios.post('http://localhost:4000/jobs/search', jobObject)
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
        axios.get('http://localhost:4000/jobs')
            .then(res => {
                this.setState({ jobsCollection: res.data })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

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
                            {this.dataTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}