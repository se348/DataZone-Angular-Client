import { User } from "./auth.model";


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
  