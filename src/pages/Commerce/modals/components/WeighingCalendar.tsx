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
  }, [])

  const inputEvents: any = []

  commerce.inputWeighing.forEach((e) =>{
    inputEvents.push([e.car_driver, new Date(e.createdAt!), new Date(e.createdAt!)])
  })

    inputEvents.map((i: any) =>{
      title: {i.car_driver}
      start: new Date(i.createdAt!)
      end: new Date(i.createdAt!)
    })

    
    // {
    //   title: "teste",
    //   start: new Date(2023,2,1),
    //   end: new Date (2023,2,1)
    // },
    // {
    //   title: "teste1",
    //   start: new Date(2023,2,4),
    //   end: new Date(2023,2,4)
    // },
    // {
    //   title: "teste2",
    //   start: new Date(2023,2,3),
    //   end: new Date(2023,2,3)
    // }
  
  
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