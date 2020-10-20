import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'

import classes from './ContactData.css'

export default class ContactData extends Component {
    state = {
        name: 'Hùng Gấu',
        phone: '0903074656',
        address: {
          street: '23 PVD',
          ward: 'HBC',
          district: 'TD',
          city: 'HCM'
        }
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input className={classes.Input} type='text' name='tel' placeholder='Your Phone Number' />
                    <input className={classes.Input} type='text' name='name' placeholder='Your Name' />
                    <input className={classes.Input} type='text' name='street' placeholder='Street' />
                    <input className={classes.Input} type='text' name='ward' placeholder='Ward' />
                    <input className={classes.Input} type='text' name='district' placeholder='District' />
                    <input className={classes.Input} type='text' name='city' placeholder='City' />
                    <Button btnType='Success'>ORDER</Button>
                </form>       
            </div>
        )
    }
}
