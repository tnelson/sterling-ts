import { DatumParsed } from '@/sterling-connection';

export interface HeaderNode {
  type: 'header';
  text: string;
  level: number;
  children?: TreeNode[];
}

export interface DatumNode {
  type: 'datum';
  id: string;
  text: string;
  level: number;
  children?: TreeNode[];
}

export type TreeNode = HeaderNode | DatumNode;

// export interface TreeNode {
//   id: string;
//   level: number;
//   children?: TreeNode[];
// }

export interface StylesTreePanel {
  datum: DatumParsed<any>;
  id: string;
}

export function isHeaderNode(node: TreeNode): node is HeaderNode {
  return node.type === 'header';
}

export function isDatumNode(node: TreeNode): node is DatumNode {
  return node.type === 'datum';
}
