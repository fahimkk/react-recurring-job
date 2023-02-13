import React, { useContext } from 'react'
import { ACTION_TYPES } from '../context/actionTypes';
import { RecurrenceContext } from '../context/recurrence-context';
import styles from './DateSelection.module.css';

function DateSelection() {
    const {recurrenceData, dispatch} = useContext(RecurrenceContext);
    const {selectedEndType, startDate, endDate, endCount, disabled} = recurrenceData

    const handleEndTypeChange = (event) => {
        dispatch({type: ACTION_TYPES.SetEndType, payload: event?.target?.value})
    }
    const handleStartDateChange = (event) => {
        dispatch({type: ACTION_TYPES.SetStartDate, payload: event?.target?.value})
    }
    const handleEndDateChange = (event) => {
        dispatch({type: ACTION_TYPES.SetEndDate, payload: event?.target?.value})
    }
    const handleEndCountChange = (event) => {
        dispatch({type: ACTION_TYPES.SetEndCount, payload: event?.target?.value})
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.startContainer}>
            <label for="start">Start</label>
            <input
                disabled={disabled}
                value={startDate}
                onChange={handleStartDateChange}
                className={styles.startDate}
                type="date"
                id="start"
                name="start"
            />
            </div>
            <div className={styles.endContainer}>
            <label>End</label>
            <select 
                disabled={disabled}
                value={selectedEndType}
                className={styles.endTypeSelector}
                onChange={handleEndTypeChange}
            >
                <option value='noend'>no end date</option>
                <option value='date'>on this day</option>
                <option value='count'>after</option>
            </select>
            {selectedEndType === 'date' ? 
                <input 
                    disabled={disabled}
                    value={endDate}
                    onChange={handleEndDateChange}
                    className={styles.endDate}
                    type="date"
                    id="end"
                    name="end"
                />
            :(selectedEndType === 'count' ? 
                <>
                    <input 
                        disabled={disabled}
                        value={endCount}
                        onChange={handleEndCountChange}
                        className={styles.input}
                        type='number'
                        min={1}
                        defaultValue={10}
                    />
                    <label style={{marginLeft: 10}}>occurance</label>
                </>
                :null
            )}
            </div>
            </div>
    )
}

export default DateSelection