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
    datetime: string;

}