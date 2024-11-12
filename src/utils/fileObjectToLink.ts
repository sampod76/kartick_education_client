/**
 * Note:
 * 1. If src is an object -->
 *     1. Look for cdn, if found merge with path to create url (fast fetching)
 *     2. If no cdn found, use the direct url
 *
 * 2. If src is string / anything other than object --> use the direct src
 *
 * 3. If no src found, use the default image
 *
 */

import { getBaseUrl } from '@/helpers/config/envConfig';

export default function fileObjectToLink(src?: {
  cdn?: string;
  path?: string;
  url?: any;
  server_url?: string;
}) {
  // Backend baseurl
  const backendBaseUrl = getBaseUrl();

  let imageSrc;
  if (src?.cdn) {
    imageSrc = src.cdn + '/' + src.path;
  } else if (typeof src === 'object' && src.url) {
    imageSrc = src.url;
  } else if (src?.server_url) {
    imageSrc = backendBaseUrl + '/' + src.server_url;
  } else if (typeof src === 'string') {
    imageSrc = src;
  } else if (src) {
    imageSrc = src;
  } else {
    imageSrc =
      'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?t=st=1720180742~exp=1720184342~hmac=45367258d48f919941fdf6a910f0fbf3e86f0385c7ad53ec92ecc7b3e7e3c641&w=300';
  }

  return imageSrc;
}
