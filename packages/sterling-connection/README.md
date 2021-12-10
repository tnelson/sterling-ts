# sterling-connection

The `sterling-connection` package is a Redux middleware that maintains a
WebSocket connection between Sterling and a data provider such as Alloy or
Forge.

## Communication Protocol

All messages between a data provider and the `sterling-connection` middleware
are in JSON format, and are structured as follows:

```json
{
  type: "message-type",
  version: 1
  payload: ...
}
```

The `type` field is a string that identifies the shape of the `payload` field,
and the `version` field is an integer identifying the version of the
communication protocol. The `payload` field contains any data associated with
the message type. In some cases there is no data associated with a message,
and so the `payload` field can be omitted.

There are exactly two exceptions to this rule. The `ping` and `pong` messages,
which are used to keep the WebSocket connection alive, are simply the strings
"ping" and "pong".

## Send

This section defines the messages that `sterling-connection` will send to a data
provider, either automatically or based on user input.

### action-button-click

Notify data provider that an action button was clicked by the user.

**Types**
* `type`: `"action-button-click"`
* `payload`: `string`

**Example**
```json
{
  type: "action-button-click",
  version: 1,
  payload: "next"
}
```

### action-buttons

Request the action buttons to display in the Sterling navigation bar. This
message is sent to the provider when the connection is established (or
re-established).

```json
{
  type: "action-buttons",
  version: 1
}
```

### ping

A message used to keep the WebSocket connection alive. Respond in turn with
[pong](#pong).

```json
"ping"
```

### provider-name

Request the name of the data provider. This message is sent to the provider
when the connectin is established (or re-established).

```json
{
  type: "provider-name",
  version: 1
}
```

### traces

Request the current traces.

```json
{
  type: "traces",
  version: 1
}
```

## Receive

This section defines the messages that `sterling-connection` is able to parse
when received from a data provider.

### action-buttons

The buttons to display in the Sterling navigation bar. Buttons are displayed in
order from left to right based on their order in the payload. When one of these
buttons is clicked by the user, an [action-button-click](#action-button-click)
message will be sent to the provider, with the button's `onClick` string as
payload.

**Types**
* `type`: `"action-buttons"`
* `payload`: [`Button[]`](#Button)

**Example**
```json
{
  type: "action-buttons",
  version: 1,
  payload: [
    { text: "Next", onClick: "next" }
  ]
}
```

### pong

Response to a [ping](#ping) message.

```json
"pong"
```

### provider-name

The name of the data provider, which will be displayed in the hover text of the
connection status in the Sterling status bar.

**Types**
* `type`: `"provider-name"`
* `payload`: `string`

**Example**

```json
{
  type: "provider-name",
  version: 1,
  payload: "Alloy"
}
```

### traces

The current trace, whose data will be displayed in the various Sterling views.

```json
{
  type: "traces",
  version: 1,
  payload: Trace
}
```

## Types

This section includes common types used throughout the communication protocol.

### Button

```typescript
{
  text: string;
  onClick: string;
}
```

### Trace

```typescript
{
  id: string;
  xml: string;
  actions?: Button[];
  evaluator?: boolean;
  theme?: SterlingTheme;
}
```