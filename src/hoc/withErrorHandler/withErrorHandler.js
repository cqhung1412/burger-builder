import React, { useEffect, useState } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  const WithErrorHandler = props => {
    const [error, setError] = useState(null);
    // Will mount
    const requestInterceptor = axios.interceptors.request.use(
      req => {
        setError(null);
        return req;
      }
    );
    const responseInterceptor = axios.interceptors.response.use(
      res => res,
      error => {
        setError(error);
        console.log('WithErrorHandler: ', error);
        return Promise.reject(error);
      }
    );

    useEffect(
      () => { // Unmount
        return () => {
          axios.interceptors.request.eject(requestInterceptor);
          axios.interceptors.response.eject(responseInterceptor);
        };
      },
      [requestInterceptor, responseInterceptor]
    );

    return <>
      <Modal
        show={error}
        onBackdropClick={() => setError(null)}
      >
        <h3>Something didn't work @@</h3>
        {error && error.message}
      </Modal>
      <WrappedComponent {...props} />
    </>
  };
  return WithErrorHandler;
};

export default withErrorHandler;