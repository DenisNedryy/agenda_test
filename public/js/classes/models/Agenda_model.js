import { tasks } from "../../data/tasks.js";

export class Agenda_model {
    constructor() {}

    getDaysInFebruary(year = this.year) {
        if (year === null) throw new Error("Year not set");
        return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
    }

    getAgendaPerYear(year, daysPerMonths, tasks) {
        return daysPerMonths.map((myMonth, index) => {
            return {
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

    init(year) {
        const daysPerMonths = [31, this.getDaysInFebruary(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return this.getAgendaPerYear(year, daysPerMonths, tasks);
    }
}
