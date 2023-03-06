import { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../..';
import { asyncFetchInputWeighingData, asyncFetchOutputWeighingData, setInputWeighingRows, setOutputWeighing, setOutputWeighingRows } from '../../../../stores/commerce.store';

import moment from 'moment';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { InputWeighingRow } from '../../../../models/InputWeighingRow';
import { OutputWeighingRow } from '../../../../models/OutputWeighingRow';




moment.locale('pt-BR');
const localizer = momentLocalizer(moment);


export function WeighingCalendar() {
  const { commerce, seasons } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()
  const [inputEvents, setInputEvents] = useState<any[]>([]);
  const [outputEvents, setOutputEvents] = useState<any[]>([]);
  const [showInputEventsModal, setShowInputEventsModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(asyncFetchInputWeighingData(seasons?.selectedSeason?.id));
    dispatch(asyncFetchOutputWeighingData(seasons?.selectedSeason?.id));
  }, []);

  useEffect(() => {
    setInputEvents(
      commerce?.inputWeighing?.map((e: InputWeighingRow[]) => {
        return {
          title: `ENTRADA: ${e?.length} ${e?.length > 1 ? 'pesagens' : 'pesagem'}`,
          start: new Date(e[0]?.weighing_date!),
          end: new Date(e[0]?.weighing_date!),
          weighings: e,
          type: 'INPUT'
        }
      })
    );
    setOutputEvents(
      commerce?.outputWeighing?.map((e: OutputWeighingRow[]) => {
        return {
          title: `SAÍDA: ${e?.length} ${e?.length > 1 ? 'pesagens' : 'pesagem'}`,
          start: new Date(e[0].weighing_date!),
          end: new Date(e[0].weighing_date!),
          weighings: e,
          type: 'OUTPUT'
        }
      })
    )
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
          events={inputEvents.concat(outputEvents)}
          startAccessor="start"
          endAccessor="end"
          localizer={localizer}
          style={{ height: 450, margin: "50px" }}
          selectable={true}
          onSelectEvent={(e) => {
            switch (e.type) {
              case 'INPUT': {
                dispatch(setInputWeighingRows(e.weighings));
                navigate("commerce/weighing/input");
              } break;
              case 'OUTPUT': {
                dispatch(setOutputWeighingRows(e.weighings));
                navigate("commerce/weighing/output");
            } break;
          }}}
        />
      </div>
    </Container>
  )
}