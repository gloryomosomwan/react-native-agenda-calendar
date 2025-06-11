type theme = {
  primary: string,
  secondary: string,
  tertiary: string,
  accent: string,
  text: string,
  inverseText: string,
  danger: string,
  warning: string,
}

export const lightTheme: theme = {
  primary: 'white',
  secondary: '#F8F8F8',
  tertiary: '#bcbec4',
  accent: "#007bff",
  text: 'black',
  inverseText: 'white',
  danger: 'red',
  warning: 'gold',
}

export const darkTheme: theme = {
  primary: 'black',
  secondary: '#151616',
  tertiary: '#525252',
  accent: '#007bff',
  text: 'white',
  inverseText: 'black',
  danger: 'red',
  warning: 'gold',
}