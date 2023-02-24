import { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../..';
import { asyncFetchInputWeighingData } from '../../../../stores/commerce.store';
import { ManualInputWeighing } from '../../../../models/ManualInputWeighing';
import moment from 'moment';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



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
      commerce?.inputWeighing?.map((e: ManualInputWeighing) => ({
        title: e.field.name,
        start: new Date(e.weighing_date!),
        end: new Date(e.weighing_date!)
      }))
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
        onSelectEvent={() => {
          navigate("commerce/weighing/inputEvents");
        }}
      />
    </div>
    </Container>
  )
}