import { Agenda_model } from "./classes/models/Agenda_model.js";
import { Agenda_view } from "./classes/views/Agenda_view.js";

const agendaModel = new Agenda_model();
const year2025 = agendaModel.init(2025);


const agendaView = new Agenda_view();
agendaView.render(year2025);


