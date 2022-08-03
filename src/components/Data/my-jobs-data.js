//For data display

import React, { Component } from 'react';
import { Button } from '../Button';
import axios from 'axios';

class DataTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            today: new Date().toISOString().slice(0, 10),
        }
    }

    //Delete job function
    deleteJob = () => {
        const jobObject = {
            id: this.props.obj._id,
        };

        axios.post('http://localhost:4000/jobs/deleteJob/', jobObject)
            .then((res) => {
            })
            .catch(function (error) {
                console.log(error);
            })

        alert('Job Deleted')
        window.location.reload()
    }
    editJob = () => {
        localStorage.setItem("jobID", this.props.obj._id)
        console.log(this.props.obj._id)
        window.location.href = '/edit-job'
    }//Edit job function, redirecting to editjob page

    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.jobName}
                </td>
                <td>
                    {this.props.obj.country}
                </td>
                <td>
                    {this.props.obj.company}
                </td>
                <td>
                    {this.props.obj.jobType}
                </td>
                <td>
                    {this.props.obj.salary}
                </td>
                <td>
                    {
                        (this.state.today) < this.props.obj.endDate ? //To compare today date and date job ending if true display active
                            <p>Active</p>
                            :
                            <p>Inactive</p>
                    }
                </td>
                <td>
                    <Button onClick={this.editJob}
                        className='btnsEdit'
                        buttonStyle='btn--edit'
                        buttonSize='btn--small'
                        buttonColour='red'
                    >
                        EDIT
                    </Button>
                    {"  "}
                    <Button onClick={this.deleteJob}
                        className='btnsDelete'
                        buttonStyle='btn--delete'
                        buttonSize='btn--small'
                        buttonColour='red'
                    >
                        DELETE
                    </Button>
                </td>
            </tr>
        );
    }
}
export default DataTable;