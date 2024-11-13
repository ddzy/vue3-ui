import { SFCWithInstall } from "../utils/util";

export interface IPaginationProps {
  page?: number;
  pageSize?: number;
  total?: number;
  pageSizes?: Array<number | { label: string, value: number }>;
  showPageSizePicker?: boolean;
  showPageJumper?: boolean;
  displayOrder?: Array<'pages' | 'page-size-picker' | 'page-jumper'>;
  displayPageCount?: number;
  onPageChange?: (options: { page: number, pageSize: number; total: number }) => void;
  onPageSizeChange?: (options: { page: number; pageSize: number; total: number }) => void;
}


export const V3Pagination: SFCWithInstall<IPaginationProps>;