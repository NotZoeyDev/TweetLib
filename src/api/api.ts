/**
 * @file Handles api calls to Twitter
 * @author Zoey <zoey@panties.moe> 2020
 */

import querystring from 'querystring';
import axios, { AxiosResponse } from 'axios';
import { AuthHelper } from './auth';

const BASE_URL = "api.twitter.com";

export class TwitterAPI {
  constructor(private consumerKey: string, private consumerSecret: string, private accessToken = "", private accessTokenSecret = "") {}

  /**
   * Call the Twitter API with the proper headers and signature
   */
  private async request(method: string, endpoint: string, params: Record<string, string> = {}, body: Record<string, string> = {}): Promise<AxiosResponse> {
    const helper = new AuthHelper(
      this.consumerKey,
      this.consumerSecret,
      this.accessToken,
      this.accessTokenSecret
    );

    if (body !== null) {
      params = {
        ...params,
        ...body
      };
    }

    // Base url for the reqest and url with parameters
    const baseUrl = `https://${BASE_URL}/${endpoint}`;
    const paramsUrl = this.fixUrl(baseUrl, params);

    // Create our signature and header
    const signature = helper.getSignature(method, baseUrl, params);
    const oauthHeader = helper.getAuthHeader(signature);

    // Set our headers
    const headers: Record<string, string> = {
      "Authorization": oauthHeader,
    };

    let response: AxiosResponse;

    try {
      if (method === "POST") {
        response = await axios.post(paramsUrl, body, {
          headers
        });
      } else {
        response = await axios.get(paramsUrl, {
          headers
        });
      }
    }
    catch(e) {
      console.log(e.response?.data);
      throw Error();
    }

    return response;
  }

  private fixUrl(url: string, params: Record<string, string>): string {
    let query = querystring.encode(params);

    if (url.split("?")[1] !== undefined) {
      query += url.split("?")[1];
    }

    const basePath = url.split("?")[0];

    return `${basePath}?${query}`
  }

  /**
   * Do a post Request to Twitter
   */
  async post(endpoint: string, params: Record<string, string> = {}, body: Record<string, string> = {}): Promise<AxiosResponse> {
    return await this.request("POST", endpoint, params, body);
  }

  /**
   * Do a get Request to Twitter
   */
  async get(endpoint: string, params: Record<string, string> = {}): Promise<AxiosResponse> {
    return await this.request("GET", endpoint, params);
  }
}