import React, { Component } from "react";
import axios from 'axios';
import '../css/JobForms.css'

export default class EditJob extends Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            id:'',
            jobName: '',
            country: '',
            company: '',
            salary: '',
            skills: '',
            jobType: '',
            jobDesc: '',
            jobReq: '',
            jobRes: '',
            industry: '',
            datePosted: '',
            startDate: '',
            endDate: '',
            companyID: '',
        };
    }
    
    //Function that runs when page load, to diplay the job for edit
    componentDidMount() {

        const jobObject = {
            tempid: localStorage.getItem('jobID'),
        };
        axios.post('http://localhost:4000/jobs/getJob', jobObject)
            .then((res) => {
                const jobinfo = res.data

                this.setState({
                    id: jobinfo.id,
                    jobName: jobinfo.jobName,
                    country: jobinfo.country,
                    company: jobinfo.company,
                    salary: jobinfo.salary,
                    skills: jobinfo.skills,
                    jobType: jobinfo.jobType,
                    jobDesc: jobinfo.jobDesc,
                    jobReq: jobinfo.jobReq,
                    jobRes: jobinfo.jobResponsibility,
                    industry: jobinfo.industry,
                    datePosted: jobinfo.datePosted,
                    startDate: jobinfo.startDate,
                    endDate: jobinfo.endDate,
                    companyID: jobinfo.companyID,

                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault()

        const jobObject = {
            id:this.state.id,
            jobName: this.state.jobName,
            country: this.state.country,
            company: localStorage.getItem('user'), //Refer login.js
            salary: this.state.salary,
            skills: this.state.skills,
            jobType: this.state.jobType,
            jobDesc: this.state.jobDesc,
            jobReq: this.state.jobReq,
            jobResponsibility: this.state.jobRes,
            industry: this.state.industry,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
        };
        axios.post('http://localhost:4000/jobs/updateJob', jobObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        this.setState({
            jobName: '',
            country: '',
            salary: '',
            skills: '',
            jobType: '',
            jobDesc: '',
            jobReq: '',
            jobRes: '',
            industry: '',
            startDate: '',
            endDate: '',
            companyID: '',
        })

        alert('Job has been updated');
    }

    render() {

        return (
            <div className="formJ">
                <h2 className="text-center">Edit Job</h2>
                <form onSubmit={this.onSubmit}>
                    <label>Job Name:</label>
                    <input
                        type="text"
                        value={this.state.jobName}
                        onChange={(e) => this.setState({ jobName: e.target.value })}
                        placeholder=" Data Analyst "
                        autoFocus
                        required
                    />

                    <label>Country:</label>
                    <input
                        type="text"
                        value={this.state.country}
                        onChange={(e) => this.setState({ country: e.target.value })}
                        placeholder="Singapore"
                        autoFocus
                        required
                    />

                    <label>Salary:</label>
                    <input
                        type="text"
                        required
                        value={this.state.salary}
                        onChange={(e) => this.setState({ salary: e.target.value })}
                        placeholder=" 3000 - 5000 SGD "
                    />

                    <label>Skills Required:</label>
                    <input
                        type="text"
                        required
                        value={this.state.skills}
                        onChange={(e) => this.setState({ skills: e.target.value })}
                        placeholder=" MongoDB , PotgresSQL "
                    />

                    <label>Job Type:</label>
                    <select id="jobType" name="jobType" onChange={(e) => this.setState({ jobType: e.target.value })}>
                        <option value="" selected disbled hidden>Select Type</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Temporary">Temporary</option>
                    </select>

                    <label>Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        selected={this.state.startDate}
                        value={this.state.startDate}
                        onChange={(e) => this.setState({ startDate: e.target.value })}
                        dateFormat="MM/dd/yyyy"
                    />

                    <label>End Date:</label>
                    <input
                        type="date"
                        name="endDate"
                        selected={this.state.endDate}
                        value={this.state.endDate}
                        onChange={(e) => this.setState({ endDate: e.target.value })}
                        dateFormat="MM/dd/yyyy"
                    />

                    <label>Job Description:</label>
                    <textarea
                        required
                        value={this.state.jobDesc}
                        onChange={(e) => this.setState({ jobDesc: e.target.value })}
                        placeholder="Job Descriptions"
                    />


                    <label>Job Requirements:</label>
                    <textarea
                        required
                        value={this.state.jobReq}
                        onChange={(e) => this.setState({ jobReq: e.target.value })}
                        placeholder="Job Requirements"
                    />

                    <label>Job Responsibility:</label>
                    <textarea
                        required
                        value={this.state.jobRes}
                        onChange={(e) => this.setState({ jobRes: e.target.value })}
                        placeholder="Job Responsibility"
                    />

                    <label>Industry:</label>
                    <input
                        type="text"
                        required
                        value={this.state.industry}
                        onChange={(e) => this.setState({ industry: e.target.value })}
                        placeholder=" Analytics , Business Development , Corporate Support "
                    />


                    <div className="form-group">
                        <input type="submit" value="Update Job" className="btn btn-success btn-block" />
                    </div>
                </form>
            </div>
        )
    }
}
