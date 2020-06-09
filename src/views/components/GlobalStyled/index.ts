import WebFontLoader from 'webfontloader';
import { createGlobalStyle, keyframes } from 'styled-components';

WebFontLoader.load({
  google: {
    families: ['IBM Plex Sans Condensed:400,500,600,700'],
  },
});

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`;

export const GlobalStyled = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'IBM Plex Sans Condensed', serif;
    background-color: #f0f2f5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .ant-layout {
    height: 100vh;
    animation: ${fadeInAnimation} ease 3s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  .ant-layout-header {
    text-align: center;
    background: #48484A;
  }
  
  .ant-layout-header h1 {
    color: #ffffff;
  }
  
  .ant-layout-content {
    padding: 16px 0 0 0;
  }
  
  .ant-layout-footer {
    text-align: center;
  }

  .ant-spin-spinning {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 50%);
  }
`;
