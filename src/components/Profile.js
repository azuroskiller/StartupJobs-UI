import React, { Component } from "react";
import axios from 'axios';
import '../css/Forms.css'
import { Button } from './Button';


export default class Profile extends Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            company: '',
            position: '',
            id: ''
        }
    }

    changePassword = () => {
        window.location.href = '/passwordCreation'
    }

    componentDidMount() {

        const userObject = {
            username: localStorage.getItem('uname'),
        };
        axios.post('http://localhost:4000/users/getUser', userObject)
            .then((res) => {
                const userinfo = res.data

                this.setState({
                    id: userinfo.id,
                    name: userinfo.name,
                    username: userinfo.username,
                    email: userinfo.email,
                    company: userinfo.company,
                    position: userinfo.position

                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    onSubmit(e) {
        e.preventDefault()

        const userObject = {
            id: this.state.id,
            name: this.state.name,
            username: this.state.username,
            company: this.state.company,
            position: this.state.position,
            password: this.state.password
        };
        axios.post('http://localhost:4000/users/updateUser', userObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        this.setState({
            name: '',
            username: '',
            password: '',
            company: '',
            position: ''
        })

        alert('Profile Updated');
        window.location.reload()

    }

    render() {

        return (
            <div className="form">
                <h2 className="text-center"> My Profile</h2>
                <form onSubmit={this.onSubmit}>

                    <label>Name:</label>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                        autoFocus
                        required
                    />

                    <label>Username:</label>
                    <input
                        type="text"
                        value={this.state.username}
                        onChange={(e) => this.setState({ username: e.target.value })}
                        autoFocus
                        required
                    />

                    <label>Email:</label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                        disabled="true"
                    />

                    <label>Password:</label>
                    <input
                        id="password"
                        type="password"
                        required
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                        placeholder="Enter Password"
                    />

                    {/* <label>Company:</label>
                    <input
                        id="company"
                        type="text"
                        required
                        value={this.state.company}
                        onChange={(e) => this.setState({ company: e.target.value })}
                    />

                    <label>Position:</label>
                    <input
                        id="position"
                        type="text"
                        required
                        value={this.state.position}
                        onChange={(e) => this.setState({ position: e.target.value })}
                    /> */}

                    <div className="form-group">
                        <input type="submit" value="Update Profile" className="btn btn-success btn-block" />
                    </div>
                    <Button onClick={this.changePassword}
                        className='btnsEdit'
                        buttonStyle='btn--forgot'
                        buttonSize='btn--small'
                        buttonColour='red'
                    >
                        Change Password
                    </Button>
                </form>
            </div>
        )
    }
}