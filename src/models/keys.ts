export interface TwitterKeys {
  consumerKey: string;
  consumerSecret: string;
  accessToken?: string;
  accessTokenSecret?: string;
}

export interface AccessToken {
  token: string;
  tokenSecret: string;
  userID: number;
  screenName: string;
}

export interface RequestToken {
  oauthToken: string;
  oauthTokenSecret: string;
}