export class Agenda_view {
    constructor() {
        this.calendarView = "year";
        this.calendarData = [];
        this.yearMonth = [
            "Janvier",
            "Février",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Août",
            "Septembre",
            "Octobre",
            "Novembre",
            "Décembre"
        ];
    }

    switchViewToWeek() {
        this.calendarView = "week";
        this.render(this.calendarData);
    }

    switchViewToYear() {
        this.calendarView = "year";
        this.render(this.calendarData);
    }

    renderWeekView(data, el) {

    }

    renderYearView(data, el) {
        const agendaEl = document.createElement("div");
        agendaEl.className = "agenda";
        data.forEach((month, index) => {
            console.log(this.yearMonth[index]);

            const monthBox = document.createElement("div");
            monthBox.className = "agenda__monthBox";
            const monthBoxHeader = document.createElement("div");
            monthBoxHeader.classList = "agenda__monthBox__header";
            const monthBoxHeaderContent = document.createElement("p");
            monthBoxHeaderContent.textContent = this.yearMonth[index];
            monthBoxHeader.appendChild(monthBoxHeaderContent);
            monthBox.appendChild(monthBoxHeader);

            agendaEl.appendChild(monthBox);
        });
        el.appendChild(agendaEl);
    }

    render(calendarData) {
        this.calendarData = calendarData;
        const el = document.querySelector("#root");
        if (el) {
            el.innerHTML = "";
            switch (this.calendarView) {
                case "week":
                    this.renderWeekView(this.calendarData, el);
                    break;

                case "year":
                    this.renderYearView(this.calendarData, el);
                    break;

                default: throw new Error("calendar view unselected");
            }
        }

    }
}