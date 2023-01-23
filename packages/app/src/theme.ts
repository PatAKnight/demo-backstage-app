import { createTheme, genPageTheme, lightTheme, darkTheme, shapes } from "@backstage/theme";

export const customLightTheme = createTheme({
    palette: {
        ...lightTheme.palette,
        primary: {
            main: '#009596'
        },
        navigation: {
            background: '#151515',
            indicator: "#009596",
            color: '#B8BBBE',
            selectedColor: "#009596",
        },
    },
    fontFamily: 'Comic Sans MS',
    defaultPageTheme: 'home',
    pageTheme: {
        home: genPageTheme({ colors: ['#009596'], shape: shapes.wave }),
    },
});

export const customDarkTheme = createTheme({
    palette: {
        ...darkTheme.palette,
        primary: {
            main: '#009596',
        },
    },
    fontFamily: 'Comic Sans MS',
    defaultPageTheme: 'home',
    pageTheme: {
        home: genPageTheme({ colors: ['#009596'], shape: shapes.wave }),
    },
});