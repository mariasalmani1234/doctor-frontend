export interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  national_code: string;
  specialty: number;
  specialty_name: string;
  city: string;
  area: string;
  experience: number;
  bio: string;
  image: string | null;
  rating: number;
  is_active: boolean;
}