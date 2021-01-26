/**
 * @file Params definition for the Twitter client
 * @author Zoey <zoey@panties.moe> 2021
 */

/**
 * Favorites
 */
interface listFavoritesParams {
  [key: string]: any;
  user_id?: number;
  screen_name?: string;
  count?: number;
  since_id?: number;
  max_id?: number;
  include_entities?: boolean;
}

/**
 * Statuses
 */
interface homeTimelineParams {
  [key: string]: any;
  count?: number;
  since_id?: number;
  max_id?: number;
  trim_user?: boolean;
  exclude_replies?: boolean;
  include_entities?: boolean;
}

interface mentionsTimelineParams {
  [key: string]: any;
  count?: number;
  since_id?: number;
  max_id?: number;
  trim_user?: boolean;
  include_entities?: boolean;
}

interface userTimelineParams {
  [key: string]: any;
  user_id?: number;
  screen_name?: string;
  since_id?: number;
  count?: number;
  max_id?: number;
  trim_user?: boolean;
  exclude_replies?: boolean;
  include_rts?: boolean;
}

interface showParams {
  [key: string]: any;
  id: string;
  trim_user?: boolean;
  include_my_retweet?: boolean;
  include_entities?: boolean;
  include_ext_alt_text?: boolean;
  include_card_uri?: boolean;
}

interface updateParams {
  [key: string]: any;
  status: string;

  in_reply_to_status_id?: number;
  auto_populate_reply_metadata?: boolean;
  exclude_reply_user_ids?: string;
  attachment_url?: string;
  media_ids?: string;
  possibly_sensitive?: boolean;

  lat?: number;
  long?: number;
  display_coordinates?: boolean;

  place_id?: string;
  trim_user?: boolean;

  enable_dmcommands?: boolean;
  fail_dmcommands?: boolean;

  card_uri?: string;
}

interface lookupParams {
  [key: string]: any;
  id: string;
  include_entities?: boolean;
  trim_user?: boolean;
  map?: boolean;
  include_ext_alt_text?: boolean;
  include_card_uri?: boolean;
}

interface destroyParams {
  [key: string]: any;
  id: string;
  trim_user?: boolean;
}

export {
  listFavoritesParams,
  
  homeTimelineParams,
  mentionsTimelineParams,
  userTimelineParams,

  updateParams,
  showParams,
  lookupParams,
  destroyParams
}