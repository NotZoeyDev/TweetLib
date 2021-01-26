import { User } from "./user";

import { Base } from "./base";
import { Entities } from "./entities";

export interface Tweet extends Base {
  text: string;
  source: string;
  truncated: boolean;

  in_reply_to_status_id?: number;
  in_reply_to_status_id_str?: string;
 
  in_reply_to_user_id?: number;
  in_reply_to_user_id_str?: string;

  in_reply_to_screen_name?: string;

  user: User;

  quoted_status_id?: number;
  quoted_status_id_str?: string;
  is_quote_status: boolean;
  quoted_status?: Tweet;

  retweeted_status?: Tweet;

  quote_count?: number;
  reply_count?: number;
  retweet_count?: number;
  favorite_count?: number;

  entities?: Entities;
  //extended_entities?: Entities;

  favorited?: boolean;
  retweeted?: boolean;
  possibly_sensitive?: boolean;
  
  filter_level?: string;
  lang?: string;
}