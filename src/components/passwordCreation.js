import React, { Component } from "react";
import axios from 'axios';
import '../css/Forms.css'

export default class FinishUser extends Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
        }
    }
    validate() {//To compare if the password entered is same as in the db
        let isValid = true;
        let password = this.state.password
        let cpassword = this.state.confirmPassword

        if (password !== cpassword) {
            isValid = false;
            alert("Passwords don't match.");
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault()

        if (this.validate()) {
            console.log(this.state);

            const userObject = {
                email: this.state.email,
                password: this.state.password,
            };
            axios.post('http://localhost:4000/users/finishUser', userObject)//Update the user account with their password
                .then((res) => {
                    console.log(res.data)
                }).catch((error) => {
                    console.log(error)
                });
            this.setState({
                email: '',
                password: '',
                confirmPassword: '',
            })

            alert('Your account has been created');
            window.location.href = '/'
        }
    }


    render() {

        return (
            <div className="form">
                <h2 className="text-center"> Password Page</h2>
                <form onSubmit={this.onSubmit}>

                    <label>Email:</label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={this.state.email}
                        onChange= {(e) => this.setState({ email: e.target.value })} 
                        placeholder="Enter Your Email"
                    />

                    <label>Password:</label>
                    <input
                        id="password"
                        type="password"
                        required
                        value={this.state.password}
                        onChange= {(e) => this.setState({ password: e.target.value })} 
                        placeholder="Enter Your Password"
                    />

                    <label>Confirm Password:</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        required
                        value={this.state.confirmPassword}
                        onChange= {(e) => this.setState({ confirmPassword: e.target.value })} 
                        placeholder="Confirm Password"
                    />

                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-success btn-block" />
                    </div>
                </form>
            </div>
        )
    }
}