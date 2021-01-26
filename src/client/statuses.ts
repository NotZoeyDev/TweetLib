/**
 * @file Twitter endpoints related to statuses
 * @author Zoey <zoey@panties.moe> 2021
 */

import { TwitterAPI } from "../api/api";
import { homeTimelineParams, lookupParams, mentionsTimelineParams, showParams, updateParams, userTimelineParams } from "../models/params";
import { Tweet } from "../models/tweet";

const BASE_URL = "1.1/statuses";

export class TwitterStatuses {
  constructor(private twitter: TwitterAPI) {}

  /**
   * Returns a collection of the most recent Tweets and Retweets posted by the authenticating user and the users they follow.
   * The home timeline is central to how most users interact with the Twitter service.
   */
  async getHomeTimeline(params: homeTimelineParams): Promise<Tweet[]> {
    try {
      const response = await this.twitter.get(`${BASE_URL}/home_timeline.json`, params);

      console.log(response.data);
    } catch(err) {
      return null;
    }
  }

  /**
   * Returns the 20 most recent mentions (Tweets containing a users's @screen_name) for the authenticating user.
   */
  async getMentionsTimeline(params: mentionsTimelineParams): Promise<Tweet[]> {
    try {
      const response = await this.twitter.get(`${BASE_URL}/mentions_timeline.json`, params);

      console.log(response.data);
    } catch(err) {
      return null;
    }
  }

  /**
   * Returns a collection of the most recent Tweets posted by the user indicated by the screen_name or user_id parameters.
   */
  async getUserTimeline(params: userTimelineParams): Promise<Tweet[]> {
    try {
      const response = await this.twitter.get(`${BASE_URL}/user_timeline.json`, params);

      console.log(response.data);
    } catch(err) {
      return null;
    }
  }

  /**
   * Updates the authenticating user's current status, also known as Tweeting.
   */
  async tweet(params: updateParams): Promise<Tweet> {
    const response = await this.twitter.post(`${BASE_URL}/update.json`, params);
  
    return response.data;
  }

  /**
   * Returns a single Tweet, specified by the id parameter. The Tweet's author will also be embedded within the Tweet.
   */
  async getTweet(params: showParams): Promise<Tweet> {
    const response = await this.twitter.get(`${BASE_URL}/show.json`, params);
  
    console.log(response.data);

    return null;
  }

  /**
   * Returns fully-hydrated Tweet objects for up to 100 Tweets per request, as specified by comma-separated values passed to the id parameter.
   */
  async getTweets(params: lookupParams): Promise<Tweet[]> {
    const response = await this.twitter.get(`${BASE_URL}/lookup.json`, params);
  
    console.log(response.data);

    return null;
  }

  /**
   * Destroys the status specified by the required ID parameter.
   * The authenticating user must be the author of the specified status.
   * Returns the destroyed status if successful.
   */
  async deleteTweet(id: string): Promise<void> {
    const response = await this.twitter.post(`${BASE_URL}/destroy/${id}.json`);

    console.log(response.data);
  }

  /**
   * Retweets a tweet.
   * Returns the original Tweet with Retweet details embedded.
   */
  async retweetTweet(id: string): Promise<void> {
    const response = await this.twitter.post(`${BASE_URL}/retweet/${id}.json`);
  
    console.log(response.data);
  }

  /**
   * Untweets a retweeted status.
   * Returns the original Tweet with Retweet details embedded.
   */
  async unretweetTweet(id: string): Promise<void> {
    const response = await this.twitter.post(`${BASE_URL}/unretweet/${id}.json`);
  
    console.log(response.data);
  }
}
