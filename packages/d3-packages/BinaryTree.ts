import {VisualObject} from './VisualObject'

interface BinaryTreeParams{
    LeftChild: BinaryTree
    RightChild: BinaryTree
}
export default class BinaryTree{
    LeftChild:BinaryTree
    RightChild:BinaryTree
    constructor(children:BinaryTreeParams){//the more natural definition
        this.LeftChild = children.LeftChild
        this.RightChild = children.RightChild
    }
}