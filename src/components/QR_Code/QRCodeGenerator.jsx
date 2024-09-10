import React from 'react'
import QRCode from 'qrcode.react'

const QRCodeGenerator = props => {
    return (
        <div>
            <QRCode
                id='qrcode'
                value='https://bear-burger-builder.web.app/'
                size={290}
                level={'H'}
                includeMargin={true}
            />
        </div>
    )
}

export default QRCodeGenerator