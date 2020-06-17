import {LocationModel} from '../location/location.model';
import {ProfileModel} from '../profile/profile.model';

export interface Users {
  created_at: string;
  email: string;
  id: number;
  is_active_account: boolean;
  location: LocationModel | undefined;
  name: string;
  profile: ProfileModel | undefined;
  role: string;
  session: any;
  updated_at: string;
  full_name: string;
}

