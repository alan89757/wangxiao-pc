export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface RequestOptions {
  // Splicing request parameters to url
  joinParamsToUrl?: boolean;
  // Format request parameter time
  formatDate?: boolean;
  // Whether to process the request result
  isTransformResponse?: boolean;
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?: boolean;
  // Whether to join url
  joinPrefix?: boolean;
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string;
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode;
  // Whether to add a timestamp
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  // Whether to send token in header
  withToken?: boolean;
}

interface pageType {
  pages: number;
  total: number;
  if_start?: boolean;
  if_end?: boolean;
}
interface msgType {
  content?: string; //针对系统开发人员使用
  alert?: string; //针对用户层提示用
  stack_trace?: string; //具体的错误信息，开发测试环境使用方便错误快速定位，生产环境不适用
}
export interface Result<T = any> {
  code: number;
  type?: 'success' | 'error' | 'warning';
  msg: msgType;
  // bizBody: T;
  page?: pageType;
  errorMsg?: string; //错误信息
  body: T;
}

// multipart/form-data: upload file
export interface UploadFileParams {
  // Other parameters
  // data?: Recordable;
  // File parameter interface field name
  name: string;
  // file name
  // eslint-disable-next-line no-undef
  file: File | Blob;
  // file name
  // filename?: string;
  [key: string]: any;
  formData: any;
}
