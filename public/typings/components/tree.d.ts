import { SFCWithInstall } from '../index';

export interface ITreeProps {
  nodeKey?: ITreeNodeKey;
  data?: ITreeData[];
  emptyText?: string;
  props?: ITreeProp;
  lazy?: boolean;
  lazyMethod?: (options: { node: ITreeNode, data: ITreeData, resolve: (children: ITreeNode[]) => void }) => void;
  selectable?: boolean;
  highlightSelectionNode?: boolean;
  selectIsolate?: boolean;
  expandOnClickNode?: boolean;
  selectOnClickNode?: boolean;
  accordion?: boolean;
  indent?: number;
  draggable?: boolean;
  defaultExpandAll?: boolean;
  allowDrag?: (options: { node: ITreeNode, data: ITreeData }) => boolean;
  allowDrop?: (options: { node: ITreeNode, data: ITreeData }) => boolean;
}
export type ITreeData = any;
export interface ITreeNode {
  key: ITreeBaseKey;
  label: string;
  selected: boolean;
  loaded: boolean;
  expanded: boolean;
  disabled: boolean;
  children?: ITreeNode[];
  parent?: ITreeNode;
}
export type ITreeBaseKey = string | number | symbol;
export type ITreeNodeKey = ITreeBaseKey & ((options: { data: ITreeData }) => ITreeBaseKey);
export interface ITreeProp {
  key?: string;
  label?: string;
  children?: string;
}

export const V3Tree: SFCWithInstall<ITreeProps>;