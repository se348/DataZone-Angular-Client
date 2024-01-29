import { User } from "src/app/auth/models/auth.model";

export interface CompanyProfile {
    id?: string;
    companyName?: string;
    email?: string;
    address?: string;
    phoneNumber?: string;
    profileImage?: string;
    companyDescription?: string;
    companyWebsite?: string;
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
  
  