import React, { useContext, useState } from 'react'
import styles from './Frequency.module.css'
import { RecurrenceContext } from '../context/recurrence-context';
import { ACTION_TYPES } from '../context/actionTypes';

const repeatOptions = ['weekly', 'monthly']


function Frequency(props) {
  const {recurrenceData, dispatch} = useContext(RecurrenceContext);
  const {repeat, showFrequency, frequency, disabled} = recurrenceData

  const handleRepeatClick = (event) => {
    dispatch({type: ACTION_TYPES.SetRepeat, payload: event?.target?.value})
  }

  const handleFrequencyChange = (event) => {
    dispatch({type: ACTION_TYPES.SetFrequency, payload: event?.target?.value})
  }


  return (
    <div className={styles.mainContainer} style={props?.styles?.frequencyContainer}>
      <div>
        <label className={styles.labelRepeat} >Repeat</label>
        <select
          disabled={disabled}
          value={repeat}
          className={styles.selectRepeat}
          name='repeat'
          id='repeat'
          onChange={handleRepeatClick}
        >
          {repeatOptions.map(item => (
            <option value={item}>{item}</option>
          ))}
        </select>
      </div>
      {showFrequency &&
      <div className={styles.frequencyContainer}>
        <label className={styles.labelEvery} >Every</label>
        <input 
            disabled={disabled}
            className={styles.input}
            value={frequency}
            onChange={handleFrequencyChange}
            type='number'
            min={1}
            defaultValue={1}
          />
        <label className={styles.labelResult}>{repeat.slice(0,-2)}(s)</label>
      </div> 
      }
    </div>
  )
}


export default Frequency