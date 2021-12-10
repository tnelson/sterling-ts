import { createAction } from '@reduxjs/toolkit';
import { AlloyTrace } from '@/alloy-instance';
import { Button, Trace } from './types';

const connectSterling = createAction<string>('sterling/connect');
const disconnectSterling = createAction('sterling/disconnect');
const receivedActionButtons = createAction<Button[]>(
  'sterling/recActionButtons'
);
const receivedProviderName = createAction<string>('sterling/recProviderName');
const receivedState = createAction<AlloyTrace>('sterling/recState');
const receivedTrace = createAction<Trace>('sterling/recTrace');
const requestedProviderName = createAction('sterling/reqProviderName');
const requestedState = createAction('sterling/reqState');
const requestedTrace = createAction('sterling/reqTrace');
const sterlingConnected = createAction('sterling/connected');
const sterlingConnectionError = createAction<string>(
  'sterling/connectionError'
);
const sterlingDisconnected = createAction('sterling/disconnected');
const sterlingError = createAction<string>('sterling/error');

export {
  connectSterling,
  disconnectSterling,
  receivedActionButtons,
  receivedProviderName,
  receivedState,
  receivedTrace,
  requestedProviderName,
  requestedState,
  requestedTrace,
  sterlingConnected,
  sterlingConnectionError,
  sterlingDisconnected,
  sterlingError
};
