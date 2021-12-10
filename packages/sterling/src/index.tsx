import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { sterlingTheme } from '@/sterling-ui';
import { Sterling } from './components/Sterling';
import store from './state/store';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={sterlingTheme}>
      <Provider store={store}>
        <Sterling url='ws://localhost:4000/alloy' />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
