import React, { Component } from 'react';
class DataTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            today : new Date().toISOString().slice(0, 10),
        }
    }

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
                        (this.state.today) < this.props.obj.endDate?
                        <p>Active</p>
                        :
                        <p>Inactive</p>
                    }
                </td>
            </tr>
        );
    }
}
export default DataTable;