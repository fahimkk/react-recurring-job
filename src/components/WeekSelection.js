import React, { useContext } from 'react';
import styles from './WeekSelection.module.css';
import { WEEKDAYS_MAP } from '../utils/weekConstants';
import { RecurrenceContext } from '../context/recurrence-context';
import { ACTION_TYPES } from '../context/actionTypes';

function WeekSelection(props) {
    const {recurrenceData, dispatch} = useContext(RecurrenceContext);
    const {selectedWeeks, disabled} = recurrenceData;


	const handleWeekDaysChange = checkedDay => {
        const newSelectedDays = selectedWeeks.includes(checkedDay)
			? selectedWeeks.filter(i => i !== checkedDay).sort()
			: selectedWeeks.concat([checkedDay]).sort();
        dispatch({type: ACTION_TYPES.SetSelectedWeeks, payload: newSelectedDays})
	};

	const handleWeekDaySelectChange = (e) => {
		let value = e?.target?.value
		if(value){
			value = Number(value)
			handleWeekDaysChange(value)
		}
	}

	return (
		<div style={props?.styles?.weekContainer}>
		<div className={styles.container}>
			{WEEKDAYS_MAP.map((res, key) => {
				return (
					<div key={key} className={styles.dayContainer}>
						<button
							type="button"
                            disabled={disabled}
							value={res.value}
							className={selectedWeeks.includes(res.value) ? styles.selectedWeekCircle :styles.weekCircle}
							onClick={event => handleWeekDaysChange(res.value)}
						>
							{res.name.slice(0, 3)}
						</button>
					</div>
				);
			})}
		</div>
		<div className={styles.weekCheckBoxContainer}>
			{WEEKDAYS_MAP.map(item => (
				<label >
					<input 
                        disabled={disabled}
						checked={selectedWeeks.includes(item.value)}
						type="checkbox"
						onChange={handleWeekDaySelectChange}
						value={item.value}
					/>
					<span className={styles.checkboxLabel}>
						{item.name}
					</span>
				</label>
			))}

		</div>			
		</div>

	);
}

export default WeekSelection;
