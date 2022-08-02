import React, { Component } from "react";
import axios from 'axios';
// import PasswordStrengthBar from 'react-password-strength-bar'
// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import toast from 'react-hot-toast'
import '../css/Forms.css'

// const mailer = require('../components/mailer')

export default class CreateUser extends Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            company: '',
            position: ''
        }
    }

    onSubmit(e) {
        e.preventDefault()
        console.log(this.state);

        const userObject = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            company: this.state.company,
            position: this.state.position
        };
        axios.post('http://localhost:4000/users/createInternal', userObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        this.setState({
            name: '',
            username: '',
            email: '',
            password: '',
            position: ''
        })

        alert('User has been created');

    }

    render() {

        return (
            <div className="form">
                <h2 className="text-center"> Create Internal User</h2>
                <form onSubmit={this.onSubmit}>

                    <label>Name:</label>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                        placeholder="Steven"
                        autoFocus
                        required
                    />

                    <label>Username:</label>
                    <input
                        type="text"
                        value={this.state.username}
                        onChange={(e) => this.setState({ username: e.target.value })}
                        placeholder="Steven123"
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
                        placeholder="sample123@gmail.com"
                    />

                    <label>Temporary Password:</label>
                    <input
                        id="password"
                        type="text"
                        required
                        value="abcd1234"
                        onChange={(e) => this.setState({ password: e.target.value })}
                        placeholder="abcd1234"
                        disabled="true"
                    />

                    <label>Company:</label>
                    <input
                        id="company"
                        type="text"
                        required
                        value= "NEXEA"
                        placeholder="NEXEA"
                        disabled="true"
                    />

                    <label>Position:</label>
                    <input
                        id="position"
                        type="text"
                        required
                        value={this.state.position}
                        onChange={(e) => this.setState({ position: e.target.value })}
                        placeholder="Investment Team"
                    />

                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-success btn-block" />
                    </div>
                </form>
            </div>
        )
    }
}