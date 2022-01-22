import { DatumParsed } from '@/sterling-connection';
import { ComponentType } from 'react';
import { StylesTreeNode } from './StylesTreeNode';
import { DatumNode, StylesTreePanel, TreeNode } from './types';

interface StylesTreeProps {
  datum: DatumParsed<any>;
  tree: TreeNode;
  panel: ComponentType<StylesTreePanel>;
  isOpen: (node: DatumNode) => boolean;
  onToggle: (node: DatumNode) => void;
}

const StylesTree = (props: StylesTreeProps) => {
  const { datum, tree, panel, isOpen, onToggle } = props;
  return (
    <div className='prose prose-sm'>
      <StylesTreeNode
        datum={datum}
        node={tree}
        panel={panel}
        isOpen={isOpen}
        onToggle={onToggle}
      />
    </div>
  );
};

export { StylesTree };
