/**
 * @file Helper functions for the Twitter API
 * @author Zoey <zoey@panties.moe> 2021
 */

import { TwitterAPI } from "../api/api";
import { TwitterKeys } from "../models/keys";
import { TwitterFavorites } from "./favorites";
import { TwitterOAuth } from "./oauth";
import { TwitterStatuses } from "./statuses";

export class TwitterClient{
  private twitter: TwitterAPI;

  statuses: TwitterStatuses;
  favorites: TwitterFavorites;
  oauth: TwitterOAuth;

  constructor(keys: TwitterKeys) {
    this.twitter = new TwitterAPI(keys.consumerKey, keys.consumerSecret, keys.accessToken ?? "", keys.accessTokenSecret ?? "");
    
    this.favorites = new TwitterFavorites(this.twitter);
    this.statuses = new TwitterStatuses(this.twitter);
    this.oauth = new TwitterOAuth(this.twitter);
  }
}