import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './Data/user-data';
// import SearchBar from './SearchBar';


export default class Users extends Component {


    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            input: '',
            usersCollection: []
        };
    }

    onSubmit(e) {
        e.preventDefault()

        const userObject = {
            input: this.state.input,
        };
        axios.post('http://localhost:4000/users/search', userObject)
            .then((res) => {
                this.setState({ usersCollection: res.data })
            }).catch((error) => {
                console.log(error)
            });
        this.setState({
            input: '',
        })
    }

    componentDidMount() {

        axios.get('http://localhost:4000/users')
            .then(res => {
                this.setState({ usersCollection: res.data })
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    dataTable() {
        return this.state.usersCollection.map((data, i) => {
            return <DataTable obj={data} key={i} />
        });
    }

    render() {
        return (

            <div className="wrapper-users">
                <center><h1>LIST OF EXTERNAL USERS</h1>
                    <form onSubmit={this.onSubmit}>
                        <input
                            id="input"
                            type="text"
                            required
                            value={this.state.input}
                            onChange={(e) => this.setState({ input: e.target.value })}
                            placeholder="Search User"
                        /><input type="submit" value="Find" className="btn btn-success btn-block" />
                    </form>
                </center>
                <div className="container">
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <td>Name</td>
                                <td>Email</td>
                                <td>User Type</td>
                                <td>Verified</td>
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