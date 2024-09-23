import { SFCWithInstall } from '../index';

export interface ITreeProps {
  data?: any[];
  nodeKey?: ITreeNodeKey;
  emptyText?: string;
  props?: ITreeProp;
  lazy?: boolean;
  lazyMethod?: (options: { node: ITreeNode, resolve: (children: ITreeNode[]) => void }) => void;
  selectable?: boolean;
  highlightSelectionNode?: boolean;
  selectIsolate?: boolean;
  expandOnClickNode?: boolean;
  selectOnClickNode?: boolean;
  accordion?: boolean;
  indent?: number;
  draggable?: boolean;
  allowDrag?: (options: { node: ITreeNode }) => boolean;
  allowDrop?: (options: { node: ITreeNode }) => boolean;
}
export interface ITreeNode {
  key: ITreeBaseKey;
  label?: string;
  selected?: boolean;
  loaded?: boolean;
  expanded?: boolean;
  disabled?: boolean;
  parent?: ITreeNode;
  children?: ITreeNode[];
}
export type ITreeBaseKey = string | number | symbol;
export type ITreeNodeKey = ITreeBaseKey & ((options: { node: ITreeNode }) => ITreeBaseKey);
export interface ITreeProp {
  key?: string;
  label?: string;
  children?: string;
}

export const V3Tree: SFCWithInstall<ITreeProps>;