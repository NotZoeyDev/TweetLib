import { Base } from "./base";

export interface User extends Base {
  name: string;
  screen_name: string;

  location?: string;
  url?: string;
  description?: string;
  protected: boolean;
  verified: boolean;

  followers_count: number;
  friends_count: number;
  listed_count: number;
  favourites_count: number;
  statuses_count: number;
  
  profile_banner_url: string;
  profile_image_url_https: string;
  default_profile: boolean;
  default_profile_image: boolean;

  withheld_in_countries?: string[];
  withheld_scope?: string;
}