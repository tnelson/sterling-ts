import '@fontsource/fira-code/variable.css';
import '@fontsource/fira-code/400.css';
import '@fontsource/inter/variable-full.css';
import React from 'react';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { sterlingTheme } from '@/sterling-ui';
import { Sterling } from './components/Sterling';
import store from './state/store';
import './index.css';

// React 18 update: 
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container!); 
root.render(
  <React.StrictMode>
     <ChakraProvider theme={sterlingTheme}>
       <Provider store={store}>
         <Sterling url={getProviderURL()} />
       </Provider>
     </ChakraProvider>
   </React.StrictMode>
);

// Old React 17:
// ReactDOM.render(
//   <React.StrictMode>
//     <ChakraProvider theme={sterlingTheme}>
//       <Provider store={store}>
//         <Sterling url={getProviderURL()} />
//       </Provider>
//     </ChakraProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

function getProviderURL(): string | undefined {
  const url = process.env.WS;
  return url === 'query' ? undefined : url;
}
