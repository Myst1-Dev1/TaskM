import { View } from "react-native";
import { Calendar as Day, LocaleConfig } from 'react-native-calendars';
import { s } from "./styles";

import { useState } from "react";

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
    const [selectedDate, setSelectedDate] = useState(18);

    return (
        <>
            <View style={s.container}>
                <Day
                    onDayPress={(day:any) => {
                        setSelectedDate(day.dateString);
                    }}
                    markedDates={{
                    [selectedDate]: { selected: true, selectedColor: '#22C55E' },
                    }}
                    theme={{
                    selectedDayBackgroundColor: '#22C55E',
                    todayTextColor: '#22C55E',
                    arrowColor: '#22C55E',
                    }}
                />
            </View>
        </>
    )
}