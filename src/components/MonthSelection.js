import React, {useContext} from 'react'
import styles from './MonthSelection.module.css';
import { WEEKDAYS_MAP } from '../utils/weekConstants';
import { RecurrenceContext } from '../context/recurrence-context';
import { ACTION_TYPES } from '../context/actionTypes';

const daysArr = [...Array(32).keys()].filter(x => x !== 0);
const OrderOptions = ['First', 'Second', 'Third','Fourth', 'Last']

function MonthSelection(props) {
    const {recurrenceData, dispatch} = useContext(RecurrenceContext);
    const {
        monthOption,
        selectedMonthDate,
        selectedMonthDayOrder,
        selectedMonthDay,
        disabled
    } = recurrenceData

    const handleMonthOptionChange = (event) => {
        dispatch({type: ACTION_TYPES.SetMonthOption, payload: event?.target?.value})
    }
    const handleMonthDateChange = (event) => {
        dispatch({type: ACTION_TYPES.SetMonthDate, payload: event?.target?.value})
    }
    const handleMonthDayChange = (event) => {
        dispatch({type: ACTION_TYPES.SetMonthDay, payload: event?.target?.value})
    }
    const handleMonthDayOrderChange = (event) => {
        dispatch({type: ACTION_TYPES.SetMonthDayOrder, payload: event?.target?.value})
    }

    const weekDaysOptions = () => {
		let options = [...WEEKDAYS_MAP];
		options = options.concat([
			{name: 'Day', value: 'Day'},
			{name: 'Weekday', value: 'Weekday'}
		]);
		return options;
	};


    return (
        <div className={styles.mainContainer}>
            <label className={styles.onLabel}>on</label>

        <div className={styles.container}>
            <div className={styles.standardContainer}>
            <input 
                disabled={disabled}
                value='standard'
                name='monthOption'
                checked={monthOption === 'standard'}
                type="radio"
                onChange={handleMonthOptionChange}
            />
            <select 
                disabled={disabled || monthOption !== 'standard'}
                value={selectedMonthDate}
                className={styles.dateSelector}
                onChange={handleMonthDateChange}
            >
                {daysArr.map(item => (
                    <option value={item}>{item}</option>
                ))}
            </select>
            <label 
                style={{color: `${monthOption !== 'standard' || disabled ? 'gray': ''}`}}
                className={styles.dayLabel}
            >
                day
            </label>
            </div>

            <label className={styles.orLabel}>or</label>

            <div className={styles.customContainer}>
            <input
                disabled={disabled}
                value='custom'
                name='monthOption'
                checked={monthOption === 'custom'}
                type="radio"
                onChange={handleMonthOptionChange}
            />
            <select 
                disabled={disabled || monthOption !== 'custom'}
                value={selectedMonthDayOrder}
                className={styles.daySelector}
                onChange={handleMonthDayOrderChange}
            >
                {OrderOptions.map(item => {
                    const optionDisable = !['First', 'Last'].includes(item) && selectedMonthDay === 'Weekday'
                    return <option disabled={optionDisable} value={item}>{item}</option>
                })}
            </select>
            <select 
                disabled={disabled || monthOption !== 'custom'}
                value={selectedMonthDay}
                className={styles.daySelector}
                onChange={handleMonthDayChange}
            >
                {weekDaysOptions().map(item => {
                    const optionDisable = item.name === 'Weekday' && !['First', 'Last'].includes(selectedMonthDayOrder)
                    return <option disabled={optionDisable} value={item.name}>{item.name}</option>
                })}
            </select>
            </div>
        </div>
        </div>
    )
}


export default MonthSelection