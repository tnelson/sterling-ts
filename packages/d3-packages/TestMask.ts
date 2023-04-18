import { VisualObject } from './VisualObject';
import * as d3 from 'd3';

export class TestMask extends VisualObject {
  /**
   * Proof of concept for masks
   * 
   * General idea of how to use them
   */
  constructor() {
    super();
  }

  helper(svg: any) {
    const mask = d3
      .select(svg)
      .append('defs')
      .append('mask')
      .attr('id', 'myMask');
    mask //"background" mask. Not sure why this works but it does
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 2000)
      .attr('height', 2000)
      .style('fill', 'white')
      .style('opacity', 1);
    mask
      .append('rect')
      .attr('x', 100)
      .attr('y', 100)
      .attr('width', 100)
      .attr('height', 100); //this is the mask that actually gets added on

    mask
      .append('rect')
      .attr('x', 200)
      .attr('y', 100)
      .attr('width', 30)
      .attr('height', 30); //this is the mask that actually gets added on
  }

  render(svg: any) {
    this.helper(svg);
    d3.select(svg)
      .append('rect')
      .attr('x', 100)
      .attr('y', 100)
      .attr('width', 200)
      .attr('height', 200)
      .attr('mask', 'url(#myMask)');
  }
}
