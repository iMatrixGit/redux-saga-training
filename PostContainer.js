/*eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Timer } from './Timer'
import Gallery from './Gallery'
import LoginForm from './LoginForm'
import {
    fetchPosts,
    cancelFetch,
    startTimer,
    stopTimer,
    resetTimer
} from './actions'

const PostContainer = ({
    userId,
    id,
    title,
    body,
    fetchPosts,
    cancelFetch,
    isLoading,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
    seconds
    }) => {

    const nextPostId = id + 1;
    return (
        <div>
            <button onClick={
            () => fetchPosts(`http://jsonplaceholder.typicode.com/posts/${nextPostId}`)}>
                Fetch data
            </button>
            {' '}
            <button onClick={cancelFetch}>
                Cancel
            </button>
            <hr />
            <ul>
                <li>UserId: {userId}</li>
                <li>id: {id}</li>
                <li>title: {title}</li>
                <li>body: {body}</li>
            </ul>
            <Timer
                seconds={seconds}
                isRunning={isRunning}
                startTimer={startTimer}
                stopTimer={stopTimer}
                resetTimer={resetTimer}
            />
            <Gallery />
            <LoginForm />
        </div>
    );
};


PostContainer.propTypes = {
  userId: PropTypes.number,
  fetchPosts: PropTypes.func
};

PostContainer.contextTypes = {
    store: PropTypes.object
};

export default connect(
    state => ({
        userId: state.userId,
        id: state.id,
        title: state.title,
        body: state.body,
        isRunning: state.isRunning,
        seconds: state.seconds
    }),
    dispatch => bindActionCreators({
        fetchPosts,
        cancelFetch,
        startTimer,
        stopTimer,
        resetTimer
    }, dispatch)
)(PostContainer);
