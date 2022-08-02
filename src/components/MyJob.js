import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './Data/my-jobs-data';


export default class MyJob extends Component {
    constructor(props) {
        super(props);
        this.state = { jobsCollection: [] };
    }
    componentDidMount() {
        const compObject = {
            id: localStorage.getItem('id'),
        };

        axios.post('http://localhost:4000/jobs/myJobs', compObject)
            .then(res => {
                this.setState({ jobsCollection: res.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    dataTable() {
        return this.state.jobsCollection.map((data, i) => {
            return <DataTable
                obj={data}
                key={i}
            />
        });
    }
    render() {
        return (
            <div className="wrapper-users">
                <center><h1>LIST OF JOB POSTED</h1></center>
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
                                <td>Action</td>
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