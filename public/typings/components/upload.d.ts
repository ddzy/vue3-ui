import { SFCWithInstall } from '../index';

export interface IUploadProps {
  action?: string;
  method?: string;
  accept?: string;
  headers?: IUploadHeader;
  params?: Record<string, string>;
  autoUpload?: boolean;
  beforeUpload?: (options: {file: IUploadFile}) => boolean | Promise<boolean>;
  customUpload?: (options: {
    onSuccess: () => void;
    onFailed: () => void;
    onProgress: (progress: number) => void;
    file: IUploadFile;
  }) => void;
  fileList?: IUploadFile[];
  listType?: IUploadListType;
  disabled?: boolean;
  max?: number;
  multiple?: boolean;
  name?: string;
  showPreviewButton?: boolean;
  showDownloadButton?: boolean;
  showRemoveButton?: boolean;
  showRetryButton?: boolean;
  onPreview?: (options: {file: IUploadFile}) => void;
  onRemove?: (options: { file: IUploadFile }) => any;
  onDownload?: (options: { file: IUploadFile }) => void;
  onSuccess?: (options: {file: IUploadFile}) => void;
  onFailed?: (options: {file: IUploadFile}) => void;
  onProgress?: (options: {file: IUploadFile, progress: number}) => void;
  onChange?: (options: {file: IUploadFile}) => void;
}
export type IUploadFile = {
  id: string | number;
  status: IUploadFileStatus;
  name: string;
  type?: string;
  progress?: number;
  size?: number;
  url?: string;
  raw?: File;
};
export type IUploadHeader = Record<string, string>;
export type IUploadListType = 'text' | 'thumb' | 'image-card'
export type IUploadFileStatus = 'pending' | 'uploading' | "success" | 'failed' | 'removed';

export const V3Upload: SFCWithInstall<IUploadProps>;
