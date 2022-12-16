import {VisualObject, Coords} from './VisualObject'


export class ConjoinedObject extends VisualObject{
    /**
     * Note: this code is untested!
     */

    objects:VisualObject[]
    constructor(Children?:VisualObject[]){
        super()
        this.objects = []
        if(Children){
            Children.forEach(child => {
                this.add(child)
            });
        }
    }

    addOrdered(obj:VisualObject, index:number){
        /**
         * Given an arbitrary visual object, inserts that object at the given
         * index. If the index is greater than the length of objects +1 an error is thrown
         */

        if(index > this.objects.length){
            throw `Index larger than current number of objects stored plus 1. Add an index between 0 and ${this.objects.length}`
        }

        this.objects.splice(index, 0, obj);
    }

    add(obj:VisualObject){
        /**
         * Ease of access feature by which the visual object that we want to add is added to the front of the visualization
         */
        this.addOrdered(obj,0)
    }

    override setCenter(coords:Coords){
        /**
         * Align all the objects in the conjoined object to a single center
         */
        this.objects.forEach(obj => {
            obj.setCenter(coords)
        })
    }

    override render(svg:any){
        /**
         * We render each of our objects. Note that this is done in inverse order of the list,
         * as the first element in the list should be the frontmost element
         */

        for(let i = this.objects.length-1; i >= 0; i--){
            this.objects[i].render(svg)
        }
    }
}