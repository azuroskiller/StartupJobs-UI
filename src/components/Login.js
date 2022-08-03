import React, { Component } from 'react';
import axios from 'axios'
import { Button } from './Button';
import '../css/Forms.css'

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    forgotPassword = () => {
        window.location.href = '/passwordCreation'
    }

    onSubmit(e) {
        e.preventDefault()

        const userObject = {
            username: this.state.username,
            password: this.state.password,
        };
        axios.post('http://localhost:4000/users/login', userObject)
            .then((res) => {
                const data = res.data

                if (data.token) {
                    //Store the current user's information by using localstorage method
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('user', data.user)
                    localStorage.setItem('type', data.type)
                    localStorage.setItem('uname', data.username)
                    localStorage.setItem('level', data.level)
                    localStorage.setItem('id', data.id)
                    alert('Login successful')
                    window.location.href = '/'
                }
            }).catch((error) => {
                console.log(error)
            });
        this.setState({
            username: '',
            password: '',
        })


    }

    render() {

        return (
            <div className="form">
                <h2 className="text-center"> Login</h2>
                <form onSubmit={this.onSubmit}>

                    <label>Username:</label>
                    <input
                        type="text"
                        value={this.state.username}
                        onChange={(e) => this.setState({ username: e.target.value })}
                        placeholder="Steven123"
                        autoFocus
                        required
                    />

                    <label>Password:</label>
                    <input
                        id="password"
                        type="password"
                        required
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                        placeholder="••••••"
                    />

                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-success btn-block" />
                    </div>

                    <Button onClick={this.forgotPassword}
                        className='btnsForgot'
                        buttonStyle='btn--forgot'
                        buttonSize='btn--small'
                        buttonColour='red'
                    >
                        Forgot Password
                    </Button>
                </form>
            </div>
        )
    }

}