import React, { Component, PropTypes } from 'react'

export const Timer = ({
    seconds = 0,
    isRunning = false,
    startTimer,
    stopTimer,
    resetTimer
}) => {
    return (
        <div>
            <button
                onClick={startTimer}
                disabled={isRunning}
            >
                Start
            </button>
            <button
                onClick={stopTimer}
                disabled={!isRunning}
            >
                Stop
            </button>
            <button
                onClick={resetTimer}
                disabled={seconds == 0}
            >Reset</button>
            <div>{seconds}</div>
        </div>
    )
};