/* eslint-disable prettier/prettier */

import {PRIVATKEY, PUBLICKEY} from '../const';
import CryptoJS from 'crypto-js';

export const cleanUrl = (url: string): string => {
  // Usamos una expresión regular para eliminar los parámetros `ts`, `apikey`, y `hash`
  const urlWithoutDynamicParams = url.replace(
    /([&?])(ts|apikey|hash)=[^&]+/g,
    '',
  );
  return urlWithoutDynamicParams;
};

export function getPaginationQueryStringParams(
  maxResults: number,
  page: number,
): {
  limit: string;
  offset: string;
} {
  return {
    limit: maxResults.toString(),
    offset: (page * maxResults).toString(),
  };
}

export function getAuthQueryStringParams(): {
  apikey: string;
  ts: string;
  hash: string;
} {
  const ts = new Date().getTime().toString(); // Marca de tiempo única

  const hash = CryptoJS.MD5(ts + PRIVATKEY + PUBLICKEY).toString();

  return {
    ts: ts,
    apikey: PUBLICKEY,
    hash: hash,
  };
}
