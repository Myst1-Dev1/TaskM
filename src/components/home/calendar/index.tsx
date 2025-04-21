import { View } from "react-native";
import { Calendar as Day, LocaleConfig } from 'react-native-calendars';
import { s } from "./styles";

import { useState } from "react";
import { TasksType } from "@/app/home";
import { Tasks } from "../tasks";

LocaleConfig.locales['pt'] = {
    monthNames: [
      'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
      'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
    ],
    monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
    today: 'Hoje'
  };
  LocaleConfig.defaultLocale = 'pt';

interface CalendarProps {
    tasks: TasksType[] | any;
    isLoading: boolean;
}

export function Calendar({ tasks, isLoading }:CalendarProps) {
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // formato '2025-04-21'
    });
    
    const filteredTasks = tasks.filter((task:any) => {
        const taskDate = task.createdAt.split('/').reverse().join('-'); // de "20/04/2025" → "2025-04-20"
        return taskDate === selectedDate;
    });

    const markedDates = tasks.reduce((acc:any, task:any) => {
        const taskDate = task.createdAt.split('/').reverse().join('-');
      
        if (!acc[taskDate]) {
          acc[taskDate] = {
            dots: [{ color: '#22C55E' }],
          };
        }
      
        return acc;
      }, {} as Record<string, any>);
      
      // Garante que o dia selecionado esteja marcado em verde
      markedDates[selectedDate] = {
        ...(markedDates[selectedDate] || {}),
        selected: true,
        selectedColor: '#22C55E',
    };      

    return (
        <>
            <View style={s.container}>
            <Day
                onDayPress={(day: any) => {
                    setSelectedDate(day.dateString);
                }}
                markedDates={markedDates}
                markingType="multi-dot" // <- importante para exibir pontinhos
                theme={{
                    selectedDayBackgroundColor: '#22C55E',
                    todayTextColor: '#22C55E',
                    arrowColor: '#22C55E',
                }}
            />
            </View>
            {isLoading ? 'Carregando...' : <Tasks tasks={filteredTasks} />}
        </>
    )
}