import React from 'react'
import QRCode from 'qrcode.react'

const QRCodeGenerator = props => {
    return (
        <div>
            <QRCode
                id='qrcode'
                value='https://viblo.asia/u/tranchien'
                size={290}
                level={'H'}
                includeMargin={true}
            />
        </div>
    )
}

export default QRCodeGenerator