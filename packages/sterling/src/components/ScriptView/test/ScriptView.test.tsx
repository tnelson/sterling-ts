/**
 * @jest-environment jsdom
 */


// Saving for consideration later

// jest.mock('react-monaco-editor', () => ({
//     __esModule: true,
//     default: jest.fn(() => <div data-testid="mock-monaco-editor"></div>)
//   }));

// Lets us send queries
import { screen, render, act } from '@testing-library/react';
// Lets us send user events
import userEvent from '@testing-library/user-event';

//import {ScriptView} from '../ScriptView'
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';

import store from '../../../state/store';
//import { startMockProvider, stopMockProvider} from './mocks/server'


import { sterlingTheme } from '@/sterling-ui';
import { Sterling } from '../../Sterling';
//import { dataReceived } from '@/sterling-connection';
import { parseAlloyDatum } from 'sterling-connection/src/parse/alloy';
import { ttt1 } from './mocks/data/ticTacToe';
import { dataReceived } from 'sterling-connection/src/actions';

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

// import {Sterling} from '../components/Sterling'
// import { sterlingTheme } from '@/sterling-ui';

// function getProviderURL(): string | undefined {
//     const url = process.env.WS;
//     return url === 'query' ? undefined : url;
//   }

beforeAll(() => { 
  //startMockProvider(['ttt1'])
})
//afterAll(() => stopMockProvider())

test('script view basic rendering', async () => {
  
    // ...in this context, we don't even want a server
    render(
      <ChakraProvider theme={sterlingTheme}>
        <Provider store={store}>
          {/* <ScriptView/> */}
          {/* <Sterling url="ws://localhost:17100"/> */}
          <Sterling />
        </Provider>
      </ChakraProvider>
    )

      // TODO: scripteditor import issues w/ Monaco

    // Manufacture a mock datum and dispatch its contents to the store
    // This needs to be wrapped in act(), since it updates state.
    act( () => 
      store.dispatch(dataReceived(
      {enter: 
        [parseAlloyDatum({id: "1000000", format: "alloy", "data": ttt1})], 
       update: [], 
       exit: []})))

    // Is the datum rendered, after a reasonable wait?
    // const svdElements: HTMLElement[] = await screen.findAllByTestId('script-view-datum')
    // expect(svdElements[0]).toBeInTheDocument()

})