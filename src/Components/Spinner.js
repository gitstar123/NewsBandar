import React, { Component } from 'react'
import loading from './Spinner.gif'

export class Spinner extends Component {
    render() {
        return (
            <div className='text-center'>
                <img src = {loading} alt="Loading, please wait"></img>
            </div>
        )
    }
}

export default Spinner
