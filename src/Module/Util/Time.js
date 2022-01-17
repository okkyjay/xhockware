import React from 'react';

export default class Time extends React.Component {
    static serverTimeZoneOffset = ((new Date().getTimezoneOffset()) <= 0 ? '+' : '-') + Math.floor((new Date().getTimezoneOffset()) / -60).toString().padStart(2, '0') + ':' + ((new Date().getTimezoneOffset()) % 60).toString().padStart(2, '0');
    static months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    static mths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    static weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    constructor(props) {
        super(props);
    }

    static strToTime = (str) => {
        let time;
        time = Date.parse(str);
        if (!time) {
            str = str + (String(str).match(/:/gi) ? Time.serverTimeZoneOffset : '');
            let a = str.split(/[^0-9]/);
            time = new Date(a[0] + '-' + a[1] + '-' + a[2] + 'T' + a[3] + ':' + a[4] + ':' + a[5] + '.000' + (str.match(/\+/) ? '+' : '-') + a[6] + ':' + a[7]).getTime();
        }
        return time;
    }

    static timeToFriendly = (t, type) => {
        t = typeof t === 'string' && t.match(/[^0-9]/) ? Time.strToTime(t) : parseInt(t);
        t = isNaN(t) ? 0 : t;
        let friendly;
        const wks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const date = new Date(t);
        if (type === 2) {
            friendly = date.getDate() + ' ' + Time.months[date.getMonth()] + ' ' + date.getFullYear();
        } else if (type === 1) {
            friendly = date.getDate() + ' ' + Time.mths[date.getMonth()] + ' ' + date.getFullYear();
        } else {
            let day;
            if (t >= new Date().setHours(0, 0, 0, 0) + (86400000 * 2)) {
                day = wks[date.getDay()] + ', ' + date.getDate() + ' ' + Time.mths[date.getMonth()] + ' ' + date.getFullYear();
            } else if (t >= new Date().setHours(0, 0, 0, 0) + 86400000) {
                day = 'Tomorrow';
            } else if (t >= new Date().setHours(0, 0, 0, 0)) {
                day = 'Today';
            } else if (t >= new Date().setHours(-24, 0, 0, 0)) {
                day = 'Yesterday';
            } else if (t >= new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime()) {
                day = wks[date.getDay()] + ', ' + date.getDate();
            } else if (t >= new Date(new Date().getFullYear(), 0, 1).getTime()) {
                day = wks[date.getDay()] + ', ' + date.getDate() + ' ' + Time.mths[date.getMonth()];
            } else {
                day = wks[date.getDay()] + ', ' + date.getDate() + ' ' + Time.mths[date.getMonth()] + ' ' + date.getFullYear();
            }
            friendly = day + ' ' + (date.getHours() % 12 || 12) + ':' + date.getMinutes().toString().padStart(2, '0') + ' ' + (date.getHours() < 12 ? 'AM' : 'PM');
        }

        return friendly;
    }

    static sTotoHHMMSS = (s) => {
        s = parseInt(s, 10);
        let hours = Math.floor(s / 3600);
        let minutes = Math.floor((s - (hours * 3600)) / 60);
        let seconds = s - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        return hours + ':' + minutes + ':' + seconds;
    }

    static timeAgo = (timestamp) => {
        timestamp = typeof timestamp === 'string' && timestamp.match(/[^0-9]/) ? Time.strToTime(timestamp) : parseInt(timestamp);
        timestamp = isNaN(timestamp) ? 0 : timestamp;
        const secondsAgo = ((new Date()).getTime() - timestamp) / 1000;
        const minutesAgo = secondsAgo / 60;
        const hoursAgo = minutesAgo / 60;
        const daysAgo = hoursAgo / 24;
        const weeksAgo = daysAgo / 7;
        const monthsAgo = weeksAgo / 4.35;
        const yearsAgo = monthsAgo / 12;

        if (secondsAgo < 1) {
            return 'just now';
        } else if (secondsAgo < 2) {
            return 'a second ago';
        } else if (secondsAgo < 60) {
            return Math.floor(secondsAgo) + ' seconds ago';
        } else if (minutesAgo < 2) {
            return 'a minute ago';
        } else if (minutesAgo < 60) {
            return Math.floor(minutesAgo) + ' minutes ago';
        } else if (hoursAgo < 2) {
            return 'an hour ago';
        } else if (hoursAgo < 24) {
            return Math.floor(hoursAgo) + ' hours ago';
        } else if (daysAgo < 2) {
            return 'a day ago';
        } else if (daysAgo < 7) {
            return Math.floor(daysAgo) + ' days ago';
        } else if (weeksAgo < 2) {
            return 'a week ago';
        } else if (weeksAgo < 4) {
            return Math.floor(weeksAgo) + ' weeks ago';
        } else if (monthsAgo < 2) {
            return 'a month ago';
        } else if (monthsAgo < 12) {
            return Math.floor(monthsAgo) + ' months ago';
        } else if (yearsAgo < 2) {
            return 'a year ago';
        } else {
            return Math.floor(yearsAgo) + ' years ago';
        }
    }

    static timeDifference = (startTimestamp, endTimestamp) => {
        startTimestamp = typeof startTimestamp === 'string' && startTimestamp.match(/[^0-9]/) ? Time.strToTime(startTimestamp) : parseInt(startTimestamp);
        startTimestamp = isNaN(startTimestamp) ? 0 : startTimestamp;
        endTimestamp = typeof endTimestamp === 'string' && endTimestamp.match(/[^0-9]/) ? Time.strToTime(endTimestamp) : parseInt(endTimestamp);
        endTimestamp = isNaN(endTimestamp) ? 0 : endTimestamp;
        const seconds = (endTimestamp - startTimestamp) / 1000;
        const minutes = seconds / 60;
        const hours = minutes / 60;
        const days = hours / 24;
        const weeks = days / 7;
        const months = weeks / 4.35;
        const years = months / 12;

        if (seconds < 2) {
            return '1 Second';
        } else if (seconds < 60) {
            return Math.floor(seconds) + ' Seconds';
        } else if (minutes < 2) {
            return '1 Minute';
        } else if (minutes < 60) {
            return Math.floor(minutes) + ' Minutes';
        } else if (hours < 2) {
            return '1 Hour';
        } else if (hours < 24) {
            return Math.floor(hours) + ' Hours';
        } else if (days < 2) {
            return '1 Day';
        } else if (days < 7) {
            return Math.floor(days) + ' Days';
        } else if (weeks < 2) {
            return '1 Week';
        } else if (weeks < 4) {
            return Math.floor(weeks) + ' Weeks';
        } else if (months < 2) {
            return '1 Month';
        } else if (months < 12) {
            return Math.floor(months) + ' Months';
        } else if (years < 2) {
            return '1 Year';
        } else {
            return Math.floor(years) + ' Years';
        }
    }
}
