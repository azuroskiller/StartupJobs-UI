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
            type: '',
        }
    }

    onSubmit(e) {
        e.preventDefault()

        const userObject = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            type: this.state.type
        };
        axios.post('http://localhost:4000/users/create', userObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        this.setState({
            name: '',
            username: '',
            email: '',
        })

        alert('User has been created. Please check your email.');
    }

    // }

    render() {

        return (
            <div className="form">
                <h2 className="text-center"> Register Page</h2>
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

                    <label>Account Type:</label>
                    <select id="type" name="type" onChange={(e) => this.setState({ type: e.target.value })}>
                        <option value="" selected disbled hidden>Select Type</option>
                        <option value="User">User</option>
                        <option value="Company">Company</option>
                    </select>




                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-success btn-block" />
                    </div>
                </form>
            </div>
        )
    }
}