import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changePassword, logIn } from './actions'

const LoginForm = ({
    password,
    changePassword,
    logIn
}) => {
    let input;
    return (
        <div>
            <input
                ref={node => input = node}
                type="password"
                value={password}
                onChange={() => changePassword(input.value)}
            />
            <button
                type="submit"
                onClick={() => logIn(input.value)}
            >Log in</button>
    }
    </div>
    )
};

export default connect(
    state => ({
        password: state.password
    }),
    dispatch => bindActionCreators({
            changePassword,
            logIn
        }, dispatch
    )
)(LoginForm)