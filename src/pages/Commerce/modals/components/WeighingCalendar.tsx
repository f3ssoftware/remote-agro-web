import moment from 'moment'
import { useState } from 'react';
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { ManualInputWeighing } from '../../../../models/ManualInputWeighing';


// const Calendar: ManualInputWeighing = () => {
//     const [events, setEvents] = useState<any[]>([]);

export function WeighingCalendar(){
    return (
        <div>
          {/* <BigCalendar
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
          /> */}
        </div>
      )
    }