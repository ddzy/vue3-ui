import { SFCWithInstall } from '../index';

export interface IUploadProps {
  action: string;
  method?: string;
  accpet?: string;
  headers?: IUploadHeader;
  autoUpload?: boolean;
  beforeUpload?: (file: IUploadFile) => boolean | Promise<boolean>;
  customUpload?: (options: {
    onSuccess: () => void;
    onFailed: () => void;
    onProgress: (percentage: number) => void;
    file: IUploadFile;
  }) => void;
  fileList?: IUploadFile[];
  listType?: IUploadListType;
  disabled?: boolean;
  max?: number;
  multiple?: boolean;
  name?: string;
  showPreviewButton?: boolean;
  showCancelButton?: boolean;
  showDownloadButton?: boolean;
  showDeleteButton?: boolean;
  showRetryButton?: boolean;
  onPreview?: (file: IUploadFile) => void;
  onDelete?: (file: IUploadFile) => void;
  onSuccess?: (file: IUploadFile) => void;
  onFailed?: (file: IUploadFile) => void;
  onProgress?: (file: IUploadFile) => void;
  onChange?: (file: IUploadFile) => void;
}
export type IUploadFile = File & {
  status?: IUploadFileStatus;
  percentage?: number;
};
export type IUploadHeader = Record<string, string>;
export type IUploadListType = 'text' | 'thumb' | 'image-card'
export type IUploadFileStatus = 'pending' | 'uploading' | "success" | 'failed' | 'removed';

export const V3Upload: SFCWithInstall<IUploadProps>;
