import { Coords, BoundingBox } from './Utility';
import {mid_point} from './geometricHelpers';

let strtorpos:Map<string, (obj1pos: Coords, obj2pos: Coords, textSize:BoundingBox)=>Coords> = new Map<string, ()=>Coords>
let strtolpos:Map<string, (obj1pos:Coords, obj2pos:Coords)=>Coords> = new Map<string, ()=>Coords>

strtolpos.set('center', mid_point);

function setRight(obj1pos:Coords, obj2pos:Coords, textSize:BoundingBox):Coords{
  //align the inputted text with the y-center of the inputted textbox
  const lineAngle = Math.atan(
    Math.abs(obj2pos.x - obj1pos.x) / 
    Math.abs(obj2pos.y - obj1pos.y)
  )
  const textBoxHeight = Math.abs(textSize.top_left.y - textSize.bottom_right.y);
  const textBoxWidth = Math.abs(textSize.top_left.x - textSize.bottom_right.x);
  
  return{
    x: (textBoxHeight/2) / Math.tan(lineAngle) + textBoxWidth/2,
    y:0
  };
}
//x right-tol
//y up-tod

strtorpos.set('right', setRight);

export interface TextToPosArgs{
  p1: Coords,
  p2: Coords,
  size: BoundingBox,
  rpos?: string, //relative position (gives offset)
  lpos?: string, //line position
  angle ?: number
}

export function TextToPos(args:TextToPosArgs):Coords{

  let lfunc: (obj1pos:Coords, obj2pos:Coords)=>Coords;
  if(!args.lpos){
    const f = strtolpos.get('center')
    if(f){
      lfunc = f;
    }
    else{
      throw "center not initialized properly. Sidney issue in TextToPos.ts"
    }
  }
  else{
    const proposedLineFunc = strtolpos.get(args.lpos);
    if(proposedLineFunc){
      lfunc = proposedLineFunc;
    }
    else{
      throw `Undefined lpos param ${args.lpos}`
    }
  }

  let rfunc: (obj1pos:Coords, obj2pos:Coords, textSize:BoundingBox)=>Coords;
  if(!args.rpos){
    const f = strtorpos.get('right')
    if(f){
      rfunc = f;
    }
    else{
      throw "center not initialized properly. Sidney issue in TextToPos.ts"
    }
  }
  else{
    const proposedRelFunc = strtorpos.get(args.rpos);
    if(proposedRelFunc){
      rfunc = proposedRelFunc;
    }
    else{
      throw `Undefined rpos param ${args.rpos}`
    }
  }
  

  return {
    x:lfunc(args.p1,args.p2).x + rfunc(args.p1,args.p2, args.size).x,
    y:lfunc(args.p1,args.p2).y + rfunc(args.p1,args.p2, args.size).y,
    }
}