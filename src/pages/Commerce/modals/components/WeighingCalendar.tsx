import { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import parse from "date-fns/parse";
import format from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek";
import getDay from 'date-fns/getDay';
import Datepicker from "react-datepicker";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../..';
import { asyncFetchInputWeighingData } from '../../../../stores/commerce.store';
import { ManualInputWeighing } from '../../../../models/ManualInputWeighing';

const locales = {
  "pt-BR": require("date-fns/locale/pt-BR")
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})


export function WeighingCalendar(){
  const { commerce } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(asyncFetchInputWeighingData())
    console.log(inputEvents)
  }, [])

  const inputEvents: any[] = commerce.inputWeighing.map((e: ManualInputWeighing) => ({
    title: e.car_driver,
    start: new Date(e.createdAt!).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
    end: new Date(e.createdAt!).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
  }));

  
    return (
        <div>
           <Calendar
            events={inputEvents}
            startAccessor="start"
            endAccessor="end"
            localizer={localizer}
            style={{height: 450, margin: "50px"}}
          />
        </div>
      )
    }