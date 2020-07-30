import React, { Component } from 'react'

import Modal from '../../components/UI/Modal/Modal'
import Auxiliary from '../Auxiliary/Auxiliary'


const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }
    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({ error: null })
      })

      axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error })
      })
    }

    errorConfirmHandler = () => {
      this.setState({ error: null })
    }

    render() {
      return (
        <Auxiliary>
          <Modal 
            show={this.state.error}
            onBackdropClick={this.errorConfirmHandler}
          >
            <h3>Something didn't work @@</h3>
            {this.state.error && this.state.error.message}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxiliary>
      )
    }
  }
}

export default withErrorHandler
