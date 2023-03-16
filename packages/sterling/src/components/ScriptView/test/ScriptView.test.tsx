/**
 * @jest-environment jsdom
 */


// Saving for consideration later

// jest.mock('react-monaco-editor', () => ({
//     __esModule: true,
//     default: jest.fn(() => <div data-testid="mock-monaco-editor"></div>)
//   }));

// Lets us send queries
import { screen, render } from '@testing-library/react';
// Lets us send user events
import userEvent from '@testing-library/user-event';

import {ScriptView} from '../ScriptView'
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';

import store from '../../../state/store';

import { sterlingTheme } from '@/sterling-ui';

/*
   The problem:

   webpack looks at package.json fields that Node ignores.
   Node won't look and see "ah, you're telling me that if I want an ESM version to go <here>"

   So @reduxjs/toolkit/src _works_ in Jest (because Node) but the other doesn't.
*/

/*

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
*/

// import { Provider } from 'react-redux';
// import { ChakraProvider } from '@chakra-ui/react';
// import {Sterling} from '../components/Sterling'
// import { sterlingTheme } from '@/sterling-ui';
// import store from '../state/store';

// function getProviderURL(): string | undefined {
//     const url = process.env.WS;
//     return url === 'query' ? undefined : url;
//   }


test('script view basic rendering', async () => {        
    render(
      <ChakraProvider theme={sterlingTheme}>
        <Provider store={store}>
          <ScriptView/>
        </Provider>
      </ChakraProvider>
    )

    // Is the datum rendered, after a reasonable wait?
    const svdElements: HTMLElement[] = await screen.findAllByTestId('script-view-datum')
    expect(svdElements[0]).toBeInTheDocument()

})