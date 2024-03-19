export interface DatasetListModel{
    id: string;
    name: string;
    filename: string;
    fileType: string;
    fileSize: string;
    description: string;
    isPrivate: boolean;
    tags: string[];
    isDownloadable?: boolean;
    price?: number;
    termsAndCondition?: string;
    license?: string;
    rating?: number;
    createdAt: string;

}


export interface DatasetUploadRequest{
    name: string;
    description: string;
    tags: string[];
    file: File;
    isPrivate: boolean;
    isDownloadable?: boolean;
    price?: number;
    terms?: string;
    license?: string;

}