export type IUploadFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};
export type IFileAfterUpload = {
  server_url?: string;
  url?: string;
  path: string;
  mimetype: string;
  filename?: string;
  cdn?: string;
  platform: string;
  createdAt?: string;
  updatedAt?: string;
  // fileId: Types.ObjectId | string | IFileUploade;
};

/* 
  {
  fieldname: 'image',
  originalname: 'download.png',
  encoding: '7bit',
  mimetype: 'image/png',
  destination: 'C:\\Users\\Sampod\\Desktop\\choutamar-UAA\\uploadFile\\images\\',
  filename: 'download-1711100541497.png',
  path: 'C:\\Users\\Sampod\\Desktop\\choutamar-UAA\\uploadFile\\images\\download-1711100541497.png',
  size: 349777
}
  
  */

export type I_YN = 'yes' | 'no';
export type I_STATUS = 'active' | 'inactive' | 'disable' | 'block';
