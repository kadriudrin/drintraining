export class ProfileModel {
  description: string;
  id: number;
  name: string;
  phoneNumber: number;
  profileUrl: string;
  surname: string;
  user_id: number;
  session_background_color: string;
  session_color: string;
  activity_background_color: string;
  activity_color: string;
  profile_background_color: string;
  profile_color: string;

  public constructor(init?:Partial<ProfileModel>){
    Object.assign(this, init);
  }
}
