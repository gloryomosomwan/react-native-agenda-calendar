import { Appearance } from "react-native"

let colorScheme = Appearance.getColorScheme()

type theme = {
  // alternate
  calendarColor: string,
  primary: string,
  secondary: string,
  accent: string,
  darkgrey: string,
  red: string,
  warning: string,
  text: string,
  inverseText: string,

}

export let colors: theme;

// if (colorScheme === 'light') {
//   colors = {
//     calendarColor: '#F8F8F8',
//     primary: 'white',
//     accent: "#007bff",
//     darkgrey: 'grey',
//     grey: '#bcbec4',
//     red: 'red',
//     warning: 'gold',
//     text: 'black',
//     inverseText: 'white'
//   }
// }
// else {
//   colors = {
//     calendarColor: '#151616',
//     primary: 'black',
//     accent: '#007bff',
//     darkgrey: 'grey',
//     grey: '#bcbec4',
//     red: 'red',
//     warning: 'gold',
//     text: 'white',
//     inverseText: 'white'
//   }
// }

colors = {
  calendarColor: '#151616',
  primary: 'black',
  secondary: '#bcbec4',
  accent: '#007bff',
  darkgrey: 'grey',
  red: 'red',
  warning: 'gold',
  text: 'white',
  inverseText: 'white'
}

// darkgrey: '#636363',