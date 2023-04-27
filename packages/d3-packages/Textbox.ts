import { require as d3require } from 'd3-require';
import * as d3 from 'd3';
import {
  DEFAULT_COLOR,
  DEFAULT_FONT_SIZE,
  DEFAULT_TEXT_COLOR
} from './Constants';
import { VisualObject } from './VisualObject';
import { BoundingBox, Coords, toFunc } from './Utility';

export interface TextBoxProps {
  text?: string | (() => string);
  coords?: Coords | (() => Coords);
  color?: string | (() => string);
  fontSize?: number | (() => number);
}

export class TextBox extends VisualObject {
  text: () => string;
  fontSize: () => number;
  color: () => string;

  /**
   * Displays given text.
   * @param text text to display
   * @param coords location for center of text
   * @param color text color
   * @param fontSize size of the text
   */
  constructor(props: TextBoxProps) {
    super(props.coords);
    this.text = toFunc('', props.text);
    this.fontSize = toFunc(DEFAULT_FONT_SIZE, props.fontSize);
    this.color = toFunc(DEFAULT_TEXT_COLOR, props.color);
  }

  boundingBox(): BoundingBox {
    console.log('getting textBox bounding box');
    return {
      top_left: {
        // No easy solution here. Just returning a square of the text's size.
        x: this.center().x - this.fontSize() / 2,
        y: this.center().y - this.fontSize() / 2
      },
      bottom_right: {
        // No easy solution here. Just returning a square of the text's size.
        x: this.center().x + this.fontSize() / 2,
        y: this.center().y + this.fontSize() / 2
      }
    };
  }

  setText(text: string | (() => string)) {
    this.text = toFunc(this.text(), text);
  }
  setFontSize(fontSize: number | (() => number)) {
    this.fontSize = toFunc(this.fontSize(), fontSize);
  }
  setTextColor(color: string | (() => string)) {
    this.color = toFunc(this.color(), color);
  }

  override render(svg: any, parent_masks: BoundingBox[]) {

    let maskIdentifier: string = '';

    let render_masks: BoundingBox[];
    if (parent_masks) {
      render_masks = this.masks.concat(parent_masks);
    } else {
      render_masks = this.masks;
    }
    maskIdentifier = this.addMaskRender(render_masks, svg);

    d3.select(svg)
      .append('text')
      .attr('x', this.center().x)
      .attr('y', this.center().y)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'central')
      .attr('font-size', this.fontSize)
      .attr('mask', `url(#${maskIdentifier})`)
      .attr('fill', this.color)
      .text(this.text);
    super.render(svg);
  }
}
