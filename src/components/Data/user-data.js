//For data display

import React, { Component } from 'react';
import { Button } from '../Button';
import axios from 'axios';

class DataTable extends Component {

    //Delete user function
    deleteUser = () => {
        const userObject = {
            id: this.props.obj._id,
        };

        axios.post('http://localhost:4000/users/deleteUser/', userObject)
            .then((res) => {
            })
            .catch(function (error) {
                console.log(error);
            })

        alert('User Deleted')
        window.location.reload()
    }

    //Verify user function
    verifyUser = () => {

        console.log(this.props.obj._id)
        const userObject = {
            id: this.props.obj._id,
        };

        axios.post('http://localhost:4000/users/verifyUser/', userObject)
            .then((res) => {
            })
            .catch(function (error) {
                console.log(error);
            })

        alert('User Verified')
        window.location.reload()
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.name}
                </td>
                <td>
                    {this.props.obj.email}
                </td>
                <td>
                    {this.props.obj.type}
                </td>
                <td>
                    {
                        this.props.obj.verified !== false ? //If user not verified, display pending

                            <p>Yes</p>
                            :
                            <p>Pending</p>
                    }
                </td>
                <td>
                    {
                        this.props.obj.verified !== false ? //If user not verified, display verify button

                            <Button onClick={this.deleteUser}
                                className='btnsDelete'
                                buttonStyle='btn--delete'
                                buttonSize='btn--small'
                                buttonColour='red'
                            >
                                DELETE
                            </Button>
                            :
                            <>
                                <Button onClick={this.verifyUser}
                                    className='btnsVerify'
                                    buttonStyle='btn--outline'
                                    buttonSize='btn--small'
                                >
                                    VERIFY
                                </Button>
                                {"  "}
                                <Button onClick={this.deleteUser}
                                    className='btnsDelete'
                                    buttonStyle='btn--delete'
                                    buttonSize='btn--small'
                                    buttonColour='red'
                                >
                                    DELETE
                                </Button>
                            </>
                    }
                </td>
            </tr>
        );
    }
}
export default DataTable;