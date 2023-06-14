import { styled } from "@mui/material/styles";

import Switch from "@mui/material/Switch";
import { createGlobalStyle } from "styled-components";

const MaterialUISwitch = styled(Switch)(({ theme, darkMode }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: darkMode ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: darkMode ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: darkMode ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export default MaterialUISwitch;

// Theme.js

export const darkTheme = {
  background:
    "linear-gradient(90deg, rgba(20,71,102,1) 3%, rgba(134,182,224,1) 17%, rgba(20,71,102,1) 31%, rgba(121,170,210,1) 44%, rgba(31,82,114,1) 59%, rgba(83,132,169,1) 75%, rgba(31,82,114,1) 90%)",
  textColor: "#FFF",
  // Define more styles as needed
};

export const lightTheme = {
  background:
    "linear-gradient(90deg, rgba(196,245,239,1) 23%, rgba(138,181,221,1) 50%, rgba(92,191,252,1) 84%)",
  textColor: "#000",
  // Define more styles as needed
};

export const GlobalStyle = createGlobalStyle`
    body {
      background: ${({ theme }) => theme.background};
      color: ${({ theme }) => theme.textColor};
      // Apply more styles to the body or other elements
    }
  `;
