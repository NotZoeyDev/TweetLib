import { ExecSyncOptionsWithBufferEncoding } from "child_process";

/**
 * Twitter entities
 */
export interface Entities {
  hashtags?: HashtagEntity[];
  urls?: UrlEntity[];
  user_mentions?: UserMentionEntity[];
  media?: MediaEntity[];
  symbols?: SymbolEntity[];
  polls?: PollEntity[];
}

/**
 * Twitter Hashtag
 */
export interface HashtagEntity {
  indices: number[];
  text: string;
}

/**
 * Twitter Media
 */
export interface MediaEntity {
  id: number;
  id_str: string;

  indices: number[];
  
  display_url: string;
  expanded_url: string;
  media_url: string;
  media_url_https: string;

  sizes: MediaSizes;

  source_status_id?: number;
  source_status_id_str?: string;

  type: "photo" | "video" | "animated_gif";
  url: string;
}

/**
 * Twitter Sizes
 */
export interface MediaSizes {
  thumb: MediaSize;
  large: MediaSize;
  medium: MediaSize;
  small: MediaSize;
}

/**
 * Twitter Size
 */
export interface MediaSize {
  w: number;
  h: number;
  resize: string;
}

export interface UrlEntity {
  indices: number[];

  display_url: string;
  expanded_url: string;
  url: string;
}

export interface UserMentionEntity {
  indices: number[];

  id: number;
  id_str: string;

  name: string;
  screen_name: string;
}

export interface SymbolEntity {
  indices: number[];
  text: string;
}

export interface PollEntity {
  options: Option[];
  end_datetime: string;
  duration_minutes: string;
}

export interface Option {
  position: number;
  text: string;
}