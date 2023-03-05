import { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../..';
import { asyncFetchInputWeighingData, setInputWeighingRows } from '../../../../stores/commerce.store';

import moment from 'moment';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { InputWeighingRow } from '../../../../models/InputWeighingRow';



moment.locale('pt-BR');
const localizer = momentLocalizer(moment);


export function WeighingCalendar() {
  const { commerce, seasons } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()
  const [inputEvents, setInputEvents] = useState<any[]>([])
  const [showInputEventsModal, setShowInputEventsModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(asyncFetchInputWeighingData(seasons?.selectedSeason?.id))
  }, []);

  useEffect(() => {
    setInputEvents(
      commerce?.inputWeighing?.map((e: InputWeighingRow[]) => {
        return {
          title: `${e?.length} ${e?.length > 1 ? 'pesagens': 'pesagem'}`,
          start: new Date(e[0].weighing_date!),
          end: new Date(e[0].weighing_date!),
          weighings: e,
        }
      })
    );
  }, [commerce]);


  return (
    <Container>
      <div>
        <Calendar
          messages={{
            allDay: 'Dia Inteiro',
            previous: 'Anterior',
            next: 'Próximo',
            today: 'Hoje',
            month: 'Mês',
            week: 'Semana',
            day: 'Dia',
            agenda: 'Agenda',
            date: 'Data',
            time: 'Hora',
            event: 'Evento',
            showMore: (total) => `+ (${total}) Eventos`
          }}
          events={inputEvents}
          startAccessor="start"
          endAccessor="end"
          localizer={localizer}
          style={{ height: 450, margin: "50px" }}
          selectable={true}
          onSelectEvent={(e) => {
            dispatch(setInputWeighingRows(e.weighings));
            navigate("commerce/weighing/input");
          }}
        />
      </div>
    </Container>
  )
}