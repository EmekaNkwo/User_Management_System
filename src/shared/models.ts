export interface UserContact {
  email: string;
  phoneNumber: string;
  linkedInUrl?: string;
  fax?: string;
}

export interface UserAddress {
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface UserAcademics {
  pastSchools: string[];
}

export interface UserProfile {
  id?: string;
  firstName: string;
  lastName: string;
  dob: string;
  occupation: string;
  gender: "Male" | "Female" | "Other";
  contact: UserContact;
  address: UserAddress;
  academics: UserAcademics;
  profilePhoto: string;
}
