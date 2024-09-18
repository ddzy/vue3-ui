import { SFCWithInstall } from '../index';

export interface IUploadProps {
  action?: string;
  method?: string;
  accpet?: string;
  headers?: IUploadHeader;
  params?: Record<string, string>;
  autoUpload?: boolean;
  beforeUpload?: (file: IUploadFile) => boolean | Promise<boolean>;
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
  showDeleteButton?: boolean;
  showRetryButton?: boolean;
  onPreview?: (options: {file: IUploadFile}) => void;
  onDelete?: (options: {file: IUploadFile}) => void;
  onSuccess?: (options: {file: IUploadFile}) => void;
  onFailed?: (options: {file: IUploadFile}) => void;
  onProgress?: (options: {file: IUploadFile, progress: number}) => void;
  onChange?: (options: {file: IUploadFile}) => void;
}
export type IUploadFile = {
  status: IUploadFileStatus;
  progress: number;
  raw: File;
};
export type IUploadHeader = Record<string, string>;
export type IUploadListType = 'text' | 'thumb' | 'image-card'
export type IUploadFileStatus = 'pending' | 'uploading' | "success" | 'failed' | 'removed';

export const V3Upload: SFCWithInstall<IUploadProps>;
