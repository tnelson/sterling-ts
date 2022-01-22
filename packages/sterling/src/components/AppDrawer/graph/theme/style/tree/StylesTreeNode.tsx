import { DatumParsed } from '@/sterling-connection';
import { ComponentType } from 'react';
import { DatumNode, isDatumNode, StylesTreePanel, TreeNode } from './types';

interface StylesTreeNodeProps {
  datum: DatumParsed<any>;
  node: TreeNode;
  panel: ComponentType<StylesTreePanel>;
  isOpen: (node: DatumNode) => boolean;
  onToggle: (node: DatumNode) => void;
}

const Spacer = ({ depth }: { depth: number }) => {
  return (
    <div className='flex'>
      {[...Array(depth)].map((e, i) => (
        <div key={i} className='pl-4 border-r' />
      ))}
    </div>
  );
};

const HLine = ({ hidden }: { hidden?: boolean }) => {
  return hidden ? (
    <div className='self-center w-2 border-b mr-1 border-transparent' />
  ) : (
    <div className='self-center w-2 border-b mr-1' />
  );
};

const StylesTreeNode = (props: StylesTreeNodeProps) => {
  const { datum, node, panel, isOpen, onToggle } = props;
  const open = isDatumNode(node) && isOpen(node);
  const level = node.level;
  const text = node.text;
  const Panel = panel;

  return (
    <>
      <div
        className='flex items-stretch border-l cursor-pointer hover:bg-blue-500 hover:text-white'
        onClick={() => {
          if (isDatumNode(node)) onToggle(node);
        }}
      >
        <Spacer depth={level} />
        <HLine hidden={level === 0} />
        <div>{text}</div>
      </div>
      {open && (
        <div className='bg-slate-100 border-t border-b shadow-inner'>
          <Panel datum={datum} id={node.id} />
        </div>
      )}
      {node.children?.map((child, index) => (
        <StylesTreeNode
          key={index}
          datum={datum}
          node={child}
          panel={panel}
          isOpen={isOpen}
          onToggle={onToggle}
        />
      ))}
    </>
  );
};

export { StylesTreeNode };
