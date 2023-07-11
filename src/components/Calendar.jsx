import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import Month from './Month';

const CalendarGrid = () => {
    const [days, setDays] = useState({});


    async function getDateFromAPI() {
        let { data } = await axios.get('https://dpg.gg/test/calendar.json');
        return data;
    };

    async function getAllDays() {
        const today = new Date();
        const startDate = new Date();
        startDate.setDate(today.getDate() - 357);
        let daysObj = {};
        let currentDate = new Date(startDate);
        const daysArr = [];
        for (let i = 0; i < 357; i++) {
            daysArr.push(format(new Date(currentDate), 'yyyy-MM-dd'));
            currentDate.setDate(currentDate.getDate() + 1);
        };
        // console.log(daysArr);
        daysArr.forEach(day => daysObj[day] = 0);
        // console.log(daysObj);
        let daysData = await getDateFromAPI();
        daysObj = Object.entries(Object.assign(daysObj, daysData)).sort((a, b) => {
            const dateA = new Date(a[0]);
            const dateB = new Date(b[0]);
            return dateA - dateB;
        });
        // console.log(daysObj);
        const months = {
            '01': 'Jan',
            '02': 'Feb',
            '03': 'Mar',
            '04': 'Apr',
            '05': 'May',
            '06': 'Jun',
            '07': 'Jul',
            '08': 'Aug',
            '09': 'Sep',
            '10': 'Oct',
            '11': 'Nov',
            '12': 'Dec'
        };

        let monthsObj = {};

        daysObj.forEach(item => {
            let key = months[item[0].split('-')[1]];
            // console.log(key);
            if(monthsObj[key]) {
                monthsObj[key].push(item);
            } else {
                monthsObj[key] = [item, ]
            };
        });



        console.log(monthsObj);

        setDays(daysObj);
    };



    useEffect(() => {
        getAllDays();
    }, []);

    // console.log(days);

  return (
    <Month />
  );
};

export default CalendarGrid;
