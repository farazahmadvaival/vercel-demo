export type UploadFileOnServer = {
  photo: File | null;
  label: string;
};

export type ImgUrlFunParam = { imgFor: string; url: string };

export type FileType = {
  label: string;
  detail: string;
  imgFor: string;
  imgUrl: (imgUrl: ImgUrlFunParam) => void;
  width?:string;
  height?:string
  onlyIcon?:boolean
  editAbleUrl? : string;
  maxFileSize? : number;
};
