export class Agenda_view {
    constructor() {
        this.type = "week";
        this.year = [];
    }

    render(type, year) { // le type d'agenda (semaine ou année)  et year = un tableau de mois
        this.type = type;
        this.year = year;


    }
}