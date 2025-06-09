import { Appearance } from "react-native"

let colorScheme = Appearance.getColorScheme()

type theme = {
  calendarColor: string,
  agendaColor: string,
  accent: string,
  darkgrey: string,
  grey: string,
  red: string,
  warning: string,
  text: string,
  inverseText: string,

}

export let colors: theme;

if (colorScheme === 'light') {
  colors = {
    calendarColor: '#F8F8F8',
    agendaColor: 'white',
    accent: "#007bff",
    darkgrey: 'grey',
    grey: '#bcbec4',
    red: 'red',
    warning: 'gold',
    text: 'black',
    inverseText: 'white'
  }
}
else {
  colors = {
    calendarColor: '#151616',
    agendaColor: 'black',
    accent: '#007bff',
    darkgrey: 'grey',
    grey: '#bcbec4',
    red: 'red',
    warning: 'gold',
    text: 'white',
    inverseText: 'white'
  }
}

colors = {
  calendarColor: '#151616',
  agendaColor: 'black',
  accent: '#007bff',
  darkgrey: 'grey',
  grey: '#bcbec4',
  red: 'red',
  warning: 'gold',
  text: 'white',
  inverseText: 'white'
}

// darkgrey: '#636363',
// grey = subtle