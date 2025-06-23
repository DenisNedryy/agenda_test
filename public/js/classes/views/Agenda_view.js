export class Agenda_view {
    constructor() {
        this.calendarView = "week";
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
        this.daysLetters = [
            "Lundi",
            "Mardi",
            "Mercredi",
            "Jeudi",
            "Vendredi",
            "Samedi",
            "Dimanche"
        ];
    }

    getCurrentDayLetter(num) {
        return num === 0 ? this.daysLetters[6] : this.daysLetters[num - 1];
    }
    getCurrentDayLetterNum(num) {
        return num === 0 ? 6 : num - 1;
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
        const agendaEl = document.createElement("div");
        agendaEl.className = "agendaWeek";
        const currentYear = data[0].year;
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentDayNum = currentDate.getDate();
        const currentDayLetter = this.getCurrentDayLetter(currentDate.getDay());
        const currentDayLetterNum = this.getCurrentDayLetterNum(currentDate.getDay());
        const boxWeek = document.createElement("div");
        for (let i = 0; i < 7; i++) {
            const dayHeader = document.createElement("div");
            dayHeader.className = "dayHeader";
            dayHeader.textContent = `${this.daysLetters[i]} ${currentDayNum}`;
            boxWeek.appendChild(dayHeader);
        }


        agendaEl.appendChild(boxWeek);
        el.appendChild(agendaEl);
    }

    renderYearView(data, el) {
        const agendaEl = document.createElement("div");
        agendaEl.className = "agendaYear";
        const year = data[0].year;
        data.forEach((month, index) => {
            const myMonth = this.yearMonth[index];
            const monthBox = document.createElement("div");
            monthBox.className = "agendaYear__monthBox";
            // header
            const monthBoxHeader = document.createElement("div");
            monthBoxHeader.classList = "agendaYear__monthBox__header";
            const monthBoxHeaderContent = document.createElement("p");
            monthBoxHeaderContent.textContent = this.yearMonth[index];
            monthBoxHeader.appendChild(monthBoxHeaderContent);
            monthBox.appendChild(monthBoxHeader);

            // table
            const table = document.createElement('table');
            // theader
            const thead = document.createElement('thead');
            const theadTr = document.createElement('tr');

            const lundi = document.createElement('th');
            lundi.setAttribute("data-letters", 'lundi');
            lundi.textContent = "L";
            const mardi = document.createElement('th');
            mardi.setAttribute("data-letters", 'mardi');
            mardi.textContent = "M";
            const mercredi = document.createElement('th');
            mercredi.setAttribute("data-letters", 'mercredi');
            mercredi.textContent = "M";
            const jeudi = document.createElement('th');
            jeudi.setAttribute("data-letters", 'jeudi');
            jeudi.textContent = "J";
            const vendredi = document.createElement('th');
            vendredi.setAttribute("data-letters", 'vendredi');
            vendredi.textContent = "V";
            const samedi = document.createElement('th');
            samedi.setAttribute("data-letters", 'samedi');
            samedi.textContent = "S";
            const dimanche = document.createElement('th');
            dimanche.setAttribute("data-letters", 'dimanche');
            dimanche.textContent = "D";

            theadTr.appendChild(lundi);
            theadTr.appendChild(mardi);
            theadTr.appendChild(mercredi);
            theadTr.appendChild(jeudi);
            theadTr.appendChild(vendredi);
            theadTr.appendChild(samedi);
            theadTr.appendChild(dimanche);
            thead.appendChild(theadTr);
            table.appendChild(thead);

            // tbody
            const tbody = document.createElement('tbody');
            // Obtenir le mois numérique (index + 1 car JS commence à 0 pour les mois)
            const monthIndex = index;
            const firstDay = new Date(year, monthIndex, 1);
            const lastDay = new Date(year, monthIndex + 1, 0); // hack, day=0 => le dernier jour du mois précédent.
            const firstWeekday = (firstDay.getDay() + 6) % 7; // pour commencer lundi = 0 (on décale les colonnes)
            const totalDays = lastDay.getDate();

            let currentDay = 1;
            let weekRow = document.createElement('tr');

            // Remplir les cellules vides au début (si le mois ne commence pas un lundi)
            for (let i = 0; i < firstWeekday; i++) {
                const emptyCell = document.createElement('td');
                weekRow.appendChild(emptyCell);
            }

            // Remplir les jours du mois
            for (let day = 1; day <= totalDays; day++) {
                const cell = document.createElement('td');
                cell.textContent = day;
                cell.setAttribute('data-date', `${year}-${this.getFormatForNumbersWidhtZeroBefore(monthIndex)}-${this.getFormatForNumbersWidhtZeroBefore(day)}`);
                weekRow.appendChild(cell);

                // Si on arrive à dimanche (7 colonnes), on termine la ligne
                if ((firstWeekday + day) % 7 === 0) {
                    tbody.appendChild(weekRow);
                    weekRow = document.createElement('tr');
                }
            }

            // Compléter la dernière ligne si incomplète
            if (weekRow.children.length > 0) {
                while (weekRow.children.length < 7) {
                    const emptyCell = document.createElement('td');
                    weekRow.appendChild(emptyCell);
                }
                tbody.appendChild(weekRow);
            }

            table.appendChild(tbody);



            monthBox.appendChild(table);

            // fin
            agendaEl.appendChild(monthBox);
        });
        el.appendChild(agendaEl);
    }

    getFormatForNumbersWidhtZeroBefore(number) {
        return number < 10 ? `0${number}` : number;
    }

    render(calendarData) {
        console.log(calendarData);
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