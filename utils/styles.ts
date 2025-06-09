import { Appearance } from "react-native"

let colorScheme = Appearance.getColorScheme()

type theme = {
  primary: string,
  secondary: string,
  alternate: string,
  accent: string,
  text: string,
  inverseText: string,
  danger: string,
  warning: string,
}

export let colors: theme;

colors = {
  primary: 'black',
  secondary: '#525252',
  alternate: '#151616',
  accent: '#007bff',
  text: 'white',
  inverseText: 'white',
  danger: 'red',
  warning: 'gold',
}

//   colors = {
//     alternate: '#F8F8F8',
//     primary: 'white',
//     accent: "#007bff",
//     darkgrey: 'grey',
//     grey: '#bcbec4',
//     red: 'red',
//     warning: 'gold',
//     text: 'black',
//     inverseText: 'white'

// dark grey #636363,