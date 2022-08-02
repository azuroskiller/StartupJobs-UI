import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './Data/user-internal-data';

export default class UsersInternal extends Component {


    constructor(props) {
        super(props);
        this.state = { usersCollection: [] };
    }
    componentDidMount() {

        axios.get('http://localhost:4000/users/internal')
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
                <center><h1>LIST OF INTERNAL USERS</h1></center>
                <div className="container">
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Company</td>
                                <td>Position</td>
                                <td>User Level</td>
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