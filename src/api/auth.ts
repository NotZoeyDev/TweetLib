/**
 * @file Implements oAuth for the Twitter API
 * @author Zoey <zoey@panties.moe> 2020
 */

import crypto from 'crypto';

// Allowed character codes by Twitter/RFC 3986
const allowedBytes: number[] = [
  0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, // 0-9
  0x41, 0x42, 0x43, 0x44, 0x45,0x46, 0x47, 0x48, 0x49, 0x4A, 0x4B,0x4C, 0x4D, 0x4E, 0x4F, 0x50, 0x51,0x52, 0x53, 0x54, 0x55, 0x56, 0x57,0x58, 0x59, 0x5A, // A-Z
  0x61, 0x62, 0x63, 0x64, 0x65,0x66, 0x67, 0x68, 0x69, 0x6A, 0x6B,0x6C, 0x6D, 0x6E, 0x6F, 0x70, 0x71,0x72, 0x73, 0x74, 0x75, 0x76, 0x77,0x78, 0x79, 0x7A, // a-z
  0x2D, 0x2E, 0x5F, 0x7E // - . _ ~
];

// Type of keys used (Twitter for Android, custom keys, etc)
export enum KeyType {
  Android,
  Mac,
  iPad,
  Other
}

/**
 * Class that will handle all the oAuth requets
 */
export class AuthHelper {
  private signatureMethod = "HMAC-SHA1";
  private version = "1.0";

  private nonce: string;
  private timestamp: string;

  private consumerKey: string;
  private consumerSecret: string;
  private accessToken: string;
  private accessTokenSecret: string;

  type: KeyType;

  constructor(consumerKey: string, consumerSecret: string, accessToken = "", accessTokenSecret = "") {
    this.nonce = this.getNonce();
    this.timestamp = this.getTimestamp();

    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.accessToken = accessToken;
    this.accessTokenSecret = accessTokenSecret;

    this.type = this.getType();
  }

  /**
   * Generate a Nonce string
   */
  private getNonce(): string {
    // Generate a random base64 string
    const nonce = crypto.randomBytes(32).toString('base64');

    // Strip non alpha-numeric characters
    return nonce.replace(/[^A-Za-z]/g, '');
  }

  /**
   * Generate a timestamp
   */
  private getTimestamp(): string {
    // Seconds since epoch
    const timestamp = Math.round(new Date().getTime() / 1000);

    return timestamp.toString();
  }

  /**
   * Get the type of keys used
   */
  private getType(): KeyType {
    const androidHash = "047d48bc1ccbcea9df6c7d05bb6fcd01";
    const macHash = "c3547a189cb4db7e8b55ac50f0c86a22";
    const ipadHash = "471a51fb991734e83c4436375bc650e9";

    const compareHash = `${this.consumerKey}_${this.consumerSecret}`;
    const hash = crypto.createHash('md5').update(compareHash).digest('hex');

    switch (hash) {
      case androidHash:
        return KeyType.Android;

      case macHash:
        return KeyType.Mac;

      case ipadHash:
        return KeyType.iPad;

      default:
        return KeyType.Other;
    }
  }

  /**
   * Percent encode a string
   * (https://developer.twitter.com/en/docs/authentication/oauth-1-0a/percent-encoding-parameters)
   */
  percentEncode(input: string): string {
    let encoded = "";

    // Loop through the input characters
    for (let i = 0; i < input.length; i++) {
      const code = input.charCodeAt(i);

      // If the code isn't allowed, percent encode it
      if (!allowedBytes.includes(code)) {
        encoded += String.fromCharCode(0x25);

        const hexCode = code.toString(16).toUpperCase();
        encoded += hexCode.charAt(0);
        encoded += hexCode.charAt(1);
      } else {
        encoded += String.fromCharCode(code);
      }
    }

    return encoded;
  }

  /**
   * Generate the oAuth headers
   */
  getAuthHeader(signature: string): string {
    const encodeHeaderString = (key: string, value: string): string => {
      const header = `${this.percentEncode(key)}="${this.percentEncode(value)}"`;
      return header;
    }

    const headers = [
      encodeHeaderString("oauth_consumer_key", this.consumerKey),
      encodeHeaderString("oauth_nonce", this.nonce),
      encodeHeaderString("oauth_signature", signature),
      encodeHeaderString("oauth_signature_method", this.signatureMethod),
      encodeHeaderString("oauth_timestamp", this.timestamp),
    ];

    if (this.accessToken != "") {
      headers.push(encodeHeaderString("oauth_token", this.accessToken));
    }

    headers.push(encodeHeaderString("oauth_version", this.version));

    return `OAuth ${headers.join(", ")}`;
  }

  /**
   * Generate an oAuth signature
   */
  getSignature(method: string, url: string, params: Record<string, string>): string {
    // Require parameters
    let oauthParams: Record<string, string> = {
      "oauth_consumer_key": this.consumerKey,
      "oauth_nonce": this.nonce,
      "oauth_signature_method": this.signatureMethod,
      "oauth_timestamp": this.timestamp
    };

    // Add oauth_token if needed
    if (this.accessToken != "") {
      oauthParams["oauth_token"] = this.accessToken;
    }

    oauthParams["oauth_version"] = this.version;

    // Add our params
    oauthParams = {
      ...oauthParams,
      ...params
    };

    // Encode the params
    const encodedParams: string[] = [];

    for (const [key, value] of Object.entries(oauthParams)) {
      encodedParams.push(`${this.percentEncode(key)}=${this.percentEncode(value)}`);
    }

    encodedParams.sort();

    // Create our parameter string
    const parameterString = encodedParams.join("&");
    
    // Get the base URl
    const baseUrl = url.split("?")[0];
    
    // Create our siganture base
    let signatureBase = "";
    signatureBase += method.toUpperCase() + "&";
    signatureBase += this.percentEncode(baseUrl) + "&";
    signatureBase += this.percentEncode(parameterString);

    // Create our signing key
    let signingKey = "";

    signingKey += this.percentEncode(this.consumerSecret) + "&";

    if (this.accessTokenSecret != "") {
      signingKey += this.percentEncode(this.accessTokenSecret);
    }
    
    // Sign everything using hmac-sha1
    const signature = crypto
      .createHmac('sha1', Buffer.from(signingKey, 'utf8'))
      .update(signatureBase, 'utf8')
      .digest('base64');

    return signature;
  }
}