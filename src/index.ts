import { TwitterClient } from './client/client';
import { readFileSync } from 'fs';

const keys = JSON.parse(readFileSync("./keys.json", { encoding: 'utf-8' }));

const client = new TwitterClient(keys);