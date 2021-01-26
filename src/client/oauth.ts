/**
 * @file Twitter endpoints related to oAuth
 * @author Zoey <zoey@panties.moe> 2021
 */

import { stringify } from "querystring";
import { TwitterAPI } from "../api/api";
import { AccessToken, RequestToken } from "../models/keys";

const BASE_URL = "oauth";

export class TwitterOAuth {
  constructor(private twitter: TwitterAPI) {}

  /**
   * Convert a Twitter oauth response into an object
   * (value=key&value=key) => {value: key, value: key}
   */
  private responseToMap(response: string): Record<string, string> {
    const output: Record<string, string> = {};
    const pairs = response.split("&");

    pairs.forEach((pair) => {
      const [k, v] = pair.split("=");
      output[k] = v;
    });

    return output;
  }

  /**
   * Allows a Consumer application to obtain an OAuth Request Token to request user authorization.
   */
  async getRequestToken(): Promise<RequestToken> {
    try {
      const response = await this.twitter.post(`${BASE_URL}/request_token`, {
        "oauth_callback": "oob"
      });

      const data = this.responseToMap(response.data);

      return {
        oauthToken: data.oauth_token,
        oauthTokenSecret: data.oauth_token_secret,
      };
    } catch(err) {
      console.log(err);
      return null;
    }
  }

  /**
   * Return the link used to authenficiate an user
   */
  getAuthorizationUrl(oauthToken: string): string {
    return `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}`;
  }

  /**
   * Allows a Consumer application to exchange the OAuth Request Token for an OAuth Access Token.
   */
  async getAccessToken(oauthToken: string, oauthVerifier: string): Promise<AccessToken> {
    try {
      const response = await this.twitter.post(`${BASE_URL}/access_token`, {
        "oauth_token": oauthToken,
        "oauth_verifier": oauthVerifier
      });

      const data = this.responseToMap(response.data);

      return {
        token: data.oauth_token,
        tokenSecret: data.oauth_token_secret,
        userID: Number(data.user_id),
        screenName: data.screen_name
      };
    } catch(err) {
      return null;
    }
  }
  
  /**
   * Log into Twitter using the xAuth APIs
   */
  async getAccessTokenViaXauth(username: string, password: string): Promise<AccessToken> {
    try {
      const response = await this.twitter.post(`${BASE_URL}/access_token`, {}, {
        "x_auth_mode": "client_auth",
        "x_auth_password": password,
        "x_auth_username": username
      });

      console.log(response);
    } catch(err) {
      return null;
    }
  }
}