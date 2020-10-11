import React, { Component } from 'react'
import QRCodeGenerator from '../../components/QR_Code/QRCodeGenerator'
import QRCodeReader from '../../components/QR_Code/QRCodeReader'

export default class QRCodeHandler extends Component {
    state = {
        action: true
    }

    changeActionType = () => {
        this.setState({
            action: !this.state.action
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.changeActionType}>Change Action</button>
                { this.state.action ? <QRCodeGenerator /> : <QRCodeReader /> }
            </div>
        )
    }
}
