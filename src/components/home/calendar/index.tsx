import { View } from "react-native";
import { Calendar as Day, LocaleConfig } from 'react-native-calendars';
import { s } from "./styles";

import { useState } from "react";
import { Tasks } from "../tasks";
import { useTasks } from "@/hooks/useTasks";
import { TaskSkeleton } from "../taskSkeleton";
import { useThemeMode } from "@/hooks/useThemeMode";

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

export function Calendar() {
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });

    const { tasks, isFetching } = useTasks();
    const { theme, mode } = useThemeMode();
    
    const filteredTasks = tasks?.filter((task:any) => {
        const taskDate = task.createdAt.split('/').reverse().join('-');
        return taskDate === selectedDate;
    });

    const markedDates = tasks?.reduce((acc:any, task:any) => {
        const taskDate = task.createdAt.split('/').reverse().join('-');
      
        if (!acc[taskDate]) {
          acc[taskDate] = {
            dots: [{ color: '#22C55E' }],
          };
        }
      
        return acc;
      }, {} as Record<string, any>);
      
      const safeMarkedDates = markedDates || {};

      safeMarkedDates[selectedDate] = {
        ...(safeMarkedDates[selectedDate] || {}),
        selected: true,
        selectedColor: '#22C55E',
      };

    return (
        <>
          <View style={[s.container, { backgroundColor: theme.background, flex: 1 }]} >
              {/* <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'flex-end'}}>
                <IconCalendar onPress={() => setIsExpanded(!isExpanded)} size={25} color={colors.gray[400]} />
              </View> */}
              <Day
                  style={{marginTop:10}}
                  key={theme.background}
                  onDayPress={(day: any) => {
                      setSelectedDate(day.dateString);
                  }}
                  markedDates={safeMarkedDates}
                  markingType="multi-dot"
                  theme={{
                      selectedDayBackgroundColor: '#22C55E',
                      todayTextColor: '#22C55E',
                      arrowColor: '#22C55E',
                      dayTextColor: theme.text,
                      monthTextColor: theme.text,
                      calendarBackground: theme.background,
                  }}
              />
                {isFetching ? <TaskSkeleton data = {filteredTasks} /> : <Tasks tasks={filteredTasks} />}
            </View>
        </>
    )
}