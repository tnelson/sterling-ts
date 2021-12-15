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
        <Sterling url={getProviderURL()} />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

function getProviderURL(): string | undefined {
  const url = process.env.WS;
  return url === 'query' ? undefined : url;
}
