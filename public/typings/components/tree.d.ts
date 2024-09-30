import { SFCWithInstall } from '../index';

export interface ITreeProps {
  nodeKey?: ITreeNodeKey;
  data?: ITreeData[];
  emptyText?: string;
  props?: ITreeProp;
  lazy?: boolean;
  lazyMethod?: (options: { node: ITreeNode, data: ITreeData, resolve: (children: ITreeData[]) => void }) => void;
  selectable?: boolean;
  highlightFocusedNode?: boolean;
  selectIsolate?: boolean;
  expandOnClickNode?: boolean;
  selectOnClickNode?: boolean;
  accordion?: boolean;
  indent?: number;
  draggable?: boolean;
  defaultExpandAll?: boolean;
  block?: boolean;
  allowDrag?: (options: { node: ITreeNode, data: ITreeData }) => boolean;
  allowDrop?: (options: { node: ITreeNode, data: ITreeData }) => boolean;
}
export type ITreeData = any;
export interface ITreeNode {
  key: ITreeBaseKey;
  label: string;
  selected: boolean;
  indeterminate: boolean;
  loaded: boolean;
  loading: boolean;
  expanded: boolean;
  disabled: boolean;
  data: ITreeData;
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