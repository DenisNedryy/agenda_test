import { tasks } from "../../data/tasks.js";

export class Agenda_model {
    constructor() {
        this.stateDateMs = null;
    }

    getDaysInFebruary(year = this.year) {
        if (year === null) throw new Error("Year not set");
        return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
    }

    getFormatForNumbersWidhtZeroBefore(number) {
        return number < 10 ? `0${number}` : number;
    }

    getCurrentDayLetterNum(num) {
        return num === 0 ? 6 : num - 1;
    }

    agendaWeekTurnLeft() {
        this.stateDateMs = this.stateDateMs - (60 * 60 * 24 * 7 * 1000);
    }

    agendaWeekTurnRight() {
        this.stateDateMs = this.stateDateMs + (60 * 60 * 24 * 7 * 1000);
    }


    getAgendaPerWeek(date = false) {
        if (date === false) {
            return this.init();
        }
        const dateArray = date.split('-').map(Number);
        const year = dateArray[0];
        const month = dateArray[1] + 1;
        const dateDate = dateArray[2];
        const dateSelected = new Date(`${year},${month},${dateDate}`);
        const dateSelectedMs = dateSelected.getTime();
        const currentDayLetterNum = this.getCurrentDayLetterNum(dateSelected.getDay());
        const lundiMs = dateSelectedMs - ((60 * 60 * 24 * 1000) * (currentDayLetterNum === 0 ? 7 : currentDayLetterNum));
        const weekDayTasks = [];

        for (let i = 0; i < 7; i++) {
            const dayDateMs = lundiMs + ((60 * 60 * 24 * 1000) * i);
            const dayDate = new Date(dayDateMs);

            const dayYear = new Date(dayDate).getFullYear();
            const dayMonth = new Date(dayDate).getMonth();
            const dayDateNum = new Date(dayDate).getDate();

            const tasksByDay = [];
            const weekDays = { year: dayYear, month: dayMonth, dayDateNum: dayDateNum };

            for (let j = 0; j < tasks.length; j++) {
                const taskDateArray = tasks[j].date.split('-').map(Number);
                if (Number(dayYear) === Number(taskDateArray[0])
                    && Number(dayMonth + 1) === Number(taskDateArray[1])
                    && Number(dayDateNum) === Number(taskDateArray[2])) {
                    tasksByDay.push({ type: tasks[j].type, name: tasks[j].name, date: date, year: Number(dayYear), month: this.getFormatForNumbersWidhtZeroBefore(dayMonth), dateNum: this.getFormatForNumbersWidhtZeroBefore(dayDateNum), dayLetter: dayDate.getDay() });
                }
            }

            weekDayTasks.push({ tasksByDay, weekDays });
        }
        return {
            dateSelected: { year: year, month: month, dateDate: dateDate },
            weekDays: weekDayTasks
        }
    }

    getAgendaPerYear(year = false) {
        if (year === false) year = new Date().getFullYear();
        const daysPerMonths = [31, this.getDaysInFebruary(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const currentDate = new Date();
        const date = `${currentDate.getFullYear()}-${this.getFormatForNumbersWidhtZeroBefore(currentDate.getMonth())}-${this.getFormatForNumbersWidhtZeroBefore(currentDate.getDate())}`;
        this.stateDateMs = currentDate;

        return daysPerMonths.map((myMonth, index) => {
            return {
                year: year,
                month: index + 1,
                days: Array.from({ length: myMonth }, (_, i) => i + 1).map((day) => {
                    return {
                        day: day,
                        task: this.checkIfTask(tasks, year, index + 1, day) || null
                    };
                })
            };
        });
    }

    checkIfTask(tasks, year, month, day) {
        const matchedTasks = tasks.filter((task) => {
            const [taskYear, taskMonth, taskDay] = task.date.split("-").map(Number);
            return (
                Number(taskYear) === Number(year) &&
                Number(taskMonth) === Number(month) &&
                Number(taskDay) === Number(day)
            );
        });

        return matchedTasks.length > 0 ? matchedTasks : null;
    }

    init() {
        const year = new Date().getFullYear();
        const daysPerMonths = [31, this.getDaysInFebruary(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const currentDate = new Date();
        const date = `${currentDate.getFullYear()}-${this.getFormatForNumbersWidhtZeroBefore(currentDate.getMonth())}-${this.getFormatForNumbersWidhtZeroBefore(currentDate.getDate())}`;
        this.stateDateMs = currentDate;
        return this.getAgendaPerWeek(date);
    }
}
