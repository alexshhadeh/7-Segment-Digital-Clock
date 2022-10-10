class Clock {
    constructor() {
        this.today = new Date();
    }
    setTime(time) {
        window.sessionStorage.setItem('miliseconds', (time - new Date()))
        //this.today = time ? time : new Date()
    }
    getTime() {
        return this.today;
    }
    changeTime() {
        //Set time so that the time added by user isn't being added every time the interval resets
        this.today = new Date();
        //Check if user added time before, if not set to 0
        if (isNaN(parseInt(window.sessionStorage.getItem('miliseconds'))))
            window.sessionStorage.setItem('miliseconds', 0);
    
        //Add time set by user
        this.today = new Date(this.today.getTime() + parseInt(window.sessionStorage.getItem('miliseconds')));
    
        //Extract time from date
        let hour = this.today.getHours()
        let minute = this.today.getMinutes()
        let second = this.today.getSeconds()

        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = weekday[this.today.getDay()];
    
        let date = this.today.getDate();
    
        const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let month =  monthArr[this.today.getMonth()];

        let pre12hour = hour;
        //Check if user wants the 12-hour clock and convert
        if(document.getElementById("clockType").checked) {
            hour = (hour > 12) ? hour - 12 : hour;
            hour = (hour == 0) ? 12 : hour;
        }

        //Add 0 if time is < 10 (single digit)
        hour = (hour < 10) ? '0' + hour : hour;
        minute = (minute < 10) ? '0' + minute : minute;
        second = (second < 10) ? '0' + second : second;
    
        document.getElementById("hour-1").setAttribute("class","num-" + hour.toString().substr(0,1));
        document.getElementById("hour-2").setAttribute("class","num-" + hour.toString().substr(1,1));
        document.getElementById("minute-1").setAttribute("class","num-" + minute.toString().substr(0,1));
        document.getElementById("minute-2").setAttribute("class","num-" + minute.toString().substr(1,1));
        document.getElementById("second-1").setAttribute("class","num-" + second.toString().substr(0,1));
        document.getElementById("second-2").setAttribute("class","num-" + second.toString().substr(1,1));
        document.getElementById('timeOfDay').innerHTML = document.getElementById("clockType").checked ? ((pre12hour < 12 || pre12hour == 0) ? "AM" : "PM") : "";
        document.getElementById('day').innerHTML = day + ',&nbsp';
        document.getElementById('month').innerHTML =  month + '&nbsp';
        document.getElementById('date').innerHTML = date;
    }
    //Saving time to sessionStorage if user clicks a button
    addHour() {
        window.sessionStorage.setItem('miliseconds', parseInt(window.sessionStorage.getItem('miliseconds'))+3600000);
    }
    addMinute() {
        window.sessionStorage.setItem('miliseconds', parseInt(window.sessionStorage.getItem('miliseconds'))+60000);
    }
    addSecond() {
        window.sessionStorage.setItem('miliseconds', parseInt(window.sessionStorage.getItem('miliseconds'))+1000);
    } 
    substractHour() {
        window.sessionStorage.setItem('miliseconds', parseInt(window.sessionStorage.getItem('miliseconds'))-3600000);
    }
    substractMinute() {
        window.sessionStorage.setItem('miliseconds', parseInt(window.sessionStorage.getItem('miliseconds'))-60000);
    }
    substractSecond() {
        window.sessionStorage.setItem('miliseconds', parseInt(window.sessionStorage.getItem('miliseconds'))-1000);
    } 
}

const clock = new Clock();

//Set time to Thu Mar 22 2012 09:11:22 GMT+0100 (Central European Standard Time)
//UNCOMMENT LINE BELOW TO SET THE TIME
//clock.setTime(1332403882588);

setInterval(() => {
    clock.changeTime();
}, 1000); 