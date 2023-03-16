/**
 * @jest-environment jsdom
 */


// jest.mock('react-monaco-editor', () => ({
//     __esModule: true,
//     default: jest.fn(() => <div data-testid="mock-monaco-editor"></div>)
//   }));

// Lets us send queries
import { screen } from '@testing-library/react';
// React 18 way to render
import { createRoot, Root } from 'react-dom/client';
// Lets us send user events
import userEvent from '@testing-library/user-event';
// Lets us check whether an element is within another element
//import {within} from '@testing-library/dom'
// Lets us use 'toBeInTheDocument()' 
//import '@testing-library/jest-dom'

import {ScriptView} from '../ScriptView'
//import { createSelector } from '@reduxjs/toolkit';
//import createSelector from '@reduxjs/toolkit';
//import { createSelector } from '@reduxjs/toolkit/src';


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

// test('sterling renders without Provider', () => {
//   render(
//     // <React.StrictMode>
//         <ChakraProvider theme={sterlingTheme}>
//           {/* <Provider store={store}> */}
//             <Sterling url={getProviderURL()} />
//           {/* </Provider> */}
//         </ChakraProvider>
//     //   </React.StrictMode>
//       );
    
//     //const buttonElement = screen.getByText(new RegExp(TEXT_try_button_text));  
//     //expect(buttonElement).toBeInTheDocument();
//     // That's not very selective, though. We'll do better in the next test.
//   });


let root: Root | undefined = undefined
beforeEach(() => {
   document.body.innerHTML = '<div id="app"></div>'
   const container = document.getElementById('app');
   root = createRoot(container!);
})

test('script view basic rendering', async () => {        
    root!.render(<ScriptView/>)
    // Is the datum rendered?
    const svdElements: HTMLElement[] = screen.getAllByTestId('script-view-datum')
    expect(svdElements[0]).toBeInTheDocument()

})