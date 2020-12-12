import React, { Component } from 'react'

// import Button from '../../components/UI/Button/Button'
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
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h3>Scan with your phone for responsive views :D</h3>
                {/* <Button btnType='Success' onClick={this.changeActionType}>Change Action</Button> */}
                { this.state.action ? <QRCodeGenerator /> : <QRCodeReader /> }
            </div>
        )
    }
}
