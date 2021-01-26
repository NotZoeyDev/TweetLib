import { TwitterAPI } from "../api/api";
import { listFavoritesParams } from "../models/params";

const BASE_URL = "1.1/favorites";

export class TwitterFavorites {
  constructor(private twitter: TwitterAPI) {}

  /**
   * Favorites (likes) the Tweet specified in the ID parameter as the authenticating user.
   * Returns the favorite Tweet when successful.
   */
  async favorite(id: string): Promise<void> {
    try {
      const response = await this.twitter.post(`${BASE_URL}/create.json`, { id });

      console.log(response);
    } catch(err) {
      return null;
    }
  }

  /**
   * Unfavorites (un-likes) the Tweet specified in the ID parameter as the authenticating user.
   * Returns the un-liked Tweet when successful.
   */
  async unfavorite(id: string): Promise<void> {
    try {
      const response = await this.twitter.post(`${BASE_URL}/destroy.json`, { id });

      console.log(response);
    } catch(err) {
      return null;
    }
  }

  async list(params: listFavoritesParams): Promise<Text[]> {
    try {
      const response = await this.twitter.post(`${BASE_URL}/list.json`, params);

      console.log(response);
    } catch(err) {
      return null;
    }
  }
}