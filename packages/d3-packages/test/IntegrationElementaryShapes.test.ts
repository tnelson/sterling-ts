/*
 * Proof of concept that we are able to simulate a DOM and inspect its elements
*/

import { Circle } from '../Circle';
import { Rectangle } from '../Rectangle'
import { Stage } from '../Stage'
import {  CreateMockSVG, VerifyObjectCharacteristics } from './IntegrationTestEngine'

describe('Rendering Elementary Shapes', () => {
  it('Can render a single circle', () => {
    const stage: Stage = new Stage()
    let svg = CreateMockSVG()

    const exp_cx = 150, exp_cy = 160, exp_r = 30;
    const c1: Circle = new Circle({ center: {x : exp_cx, y : exp_cy}, radius: exp_r })
    stage.add(c1)
    stage.render(svg)
    
    const circles: HTMLCollectionOf<SVGCircleElement> = svg.getElementsByTagName('circle')
    expect(circles.length).toBe(1)
    for(const circle of circles)
    {
      expect(VerifyObjectCharacteristics(circle, {
        cx: exp_cx.toString(),
        cy: exp_cy.toString(),
        r: exp_r.toString()
      })).toBe(true)
    }
  })
  it('Can render a single rectangle', () => {
    const stage: Stage = new Stage()
    let svg = CreateMockSVG()

    const exp_x = 150, exp_y = 200, exp_h = 123, exp_w = 4213;
    const r1: Rectangle = new Rectangle( { width: exp_w, height: exp_h, 
                                        center: {x: exp_x, y : exp_y} } )
    stage.add(r1)
    stage.render(svg)

    const rects: HTMLCollectionOf<SVGRectElement> = svg.getElementsByTagName('rect');
    expect(rects.length).toBe(1)
    for(const rect of rects)
    {
      expect(VerifyObjectCharacteristics(rect, {
        x: exp_x.toString(),
        y: exp_y.toString(),
        height: exp_h.toString(),
        width: exp_w.toString()
      })).toBe(true)
    }
  })
})
