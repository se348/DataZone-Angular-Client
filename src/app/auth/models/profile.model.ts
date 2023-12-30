import { User } from "./auth.model";

export interface CompanyProfileRequest{

     CompanyName: string,
     ContactEmail: string,
     CompanyWebsite?: string,
     Address?: string,
     IndustryType?: string
}

export interface CompanyProfileResponse{
    companyEmail : string;
    companyPhoneNumber : string;
    companywebsite : string;
    companyAddress : string;
    profileAdmin: User;
}

export enum IndustryTypes {
    Education = "Education",
    Market = "Market",
    Sports = "Sports",
    Other = "Other"
  }
  