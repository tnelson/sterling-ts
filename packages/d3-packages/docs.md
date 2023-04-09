# D3FX Helpers

The D3FX helpers library was designed as an interface between sterling users and the D3 library in Javascript. Because D3 is a very big library, it can be hard to pick up on a whim, especially with the restricted use of instance visualization. 

Because of this, a library of useful shapes and objects has been created. This library requires some knowledge of javascript, but it's object-oriented design is meant to be more user-friendly for those without much experience in the language. 

## The Stage and VisualObjects

Everything on the screen will is represented in the form of a `VisualObject`, which includes shapes like squares or circles, and more complicated objects like grids or trees. 

To render visual objects, a `Stage` object needs to be created to contain them. After creating, the user can call `stage.add(...)` to contain a visual object. To render all added VisualObjects, call `stage.render(...)`. 

## Primitive Objects

### `TextBox`

Textboxes render text to the screen at a given location, taking in a `TextBoxProps` object, of the following form:
```
interface TextBoxProps {
    text? : string,
    coords?: Coords,
    color?: string,
    fontSize?: number
}
```
Here is an example `TextBox` using these props:
```
let text = new TextBox({
    text: 'hello',
    coords: {x: 50, y:50},
    color: 'black',
    fontSize: 12
})
```
All parameters can be changed after initiation with corresponding setter methods. 

### `Rectangle`

Rectangles take in a pair of coordinates corresponding to the top left corner of the shape, along with a width and height. The parameters object is of the following form:
```
interface RectangleProps extends ShapeProps {
    height: number,
    width: number,
    labelLocation: string,
    coords?: Coords,
    color?: string,
    borderWidth?: number,
    borderColor?: string,
    label?: string,
    labelColor?: string,
    labelSize?: number,
    opacity?: number
}
```
The value of `label-location` can be `"center"` (default), .Here is an example `Rectangle` using these props:
```
let rect = new Rectangle({

})
```

