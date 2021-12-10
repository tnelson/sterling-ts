import { SterlingTheme } from '@/sterling-theme';

type MessageType =
  | 'action-button-click'
  | 'action-buttons'
  | 'ping'
  | 'pong'
  | 'provider-name'
  | 'trace';

export interface Message {
  type: MessageType;
  version: number;
  payload?: any;
}

export interface ActionButtonClickMessage extends Message {
  type: 'action-button-click';
  payload: string;
}

export interface ActionButtonsMessage extends Message {
  type: 'action-buttons';
}

export interface PingMessage extends Message {
  type: 'ping';
}

export interface ProviderNameMessage extends Message {
  type: 'provider-name';
}

export interface TraceMessage extends Message {
  type: 'trace';
}

export interface Button {
  text: string;
  onClick: string;
}

export interface Trace {
  id: string;
  xml: string;
  theme?: SterlingTheme;
}
