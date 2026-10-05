export interface Patient {

  id: number;

  userId?: number;

  nationalCode: string;

  firstName: string;

  lastName: string;

  fatherName?: string;

  birthDate?: string | null;

  gender?: string;

  address?: string;

  phone?: string;

  guardianship?: string;

  insuranceName?: string;

  insuranceNumber?: string;

  insuranceStatus?: string;

  coverageType?: string;

  relation?: string;

  serviceStatus?: string;

  veteranStatus?: string;

  educationLevel?: string;

  specialDisease?: string;

  profileImage?: string;

  
}