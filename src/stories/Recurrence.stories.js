import { Recurrence } from '../components/Recurrence';

export default {
    title: 'Recurrence - Schedule',
    compoenent: 'Recurrence',
    argTypes: {
        repeat: {
            options: ['weekly', 'monthly'],
            control: {type: 'radio'}
        },
        selectedEndType: {
            options: ['noend', 'date', 'count'],
            control: {type: 'radio'}
        }
    }
};

const Template = (args) => <Recurrence {...args} />;

const commonArgs = {
    disabled: false,
    showFrequency: true,
    frequency: 2,
    startDate: '2022-02-05',
    endDate: '2022-07-05',
    selectedEndType: 'date',
    endCount: 10,
    cronExpression: '',
    showCronExpression: true,
    onChange: (val) => {console.log("==> change val: ", val)}, 
    styles: {
        root: { },
        frequencyContainer: {},
        repeat: {},
        frequency: {},
        weekContainer:{},
        monthContainer:{},
        dateContainer:{},
        cronExpression: {},
    }
}

export const Weekly = Template.bind({});
Weekly.args = {
    repeat: 'weekly',
    ...commonArgs,
}

export const Monthly = Template.bind({});
Monthly.args = {
    repeat: 'monthly',
    ...commonArgs,
}