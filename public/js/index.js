import { Agenda_model } from "./classes/models/Agenda_model.js";
import { Agenda_view } from "./classes/views/Agenda_view.js";

// // per year: 
// const agendaModel = new Agenda_model();
// const dataForYear = agendaModel.getAgendaPerYear(2028);

// const agendaView = new Agenda_view();
// agendaView.renderCalendarYear(dataForYear);


// per week:
const agendaModel = new Agenda_model();
const dataForWeek = agendaModel.getAgendaPerWeek();
console.log(dataForWeek);

const agendaView = new Agenda_view();
agendaView.renderCalendarWeek(dataForWeek);
