import { timingSafeEqual } from 'crypto';
import { httpClient, HttpMethod, HttpMessageBody } from '@activepieces/pieces-common';

async function call<T = unknown>({ apiKey, method, path, body }: CallParams): Promise<T> {
  const response = await httpClient.sendRequest<HttpMessageBody>({
    method,
    url: `${BASE_URL}${path}`,
    headers: { Authorization: `Bearer ${apiKey}`, Accept: 'application/json', 'Content-Type': 'application/json' },
    body,
  });
  return unwrap<T>(response.body);
}

function unwrap<T>(body: unknown): T {
  if (body !== null && typeof body === 'object' && 'data' in body) {
    return (body as { data: T }).data;
  }
  return body as T;
}

function verifySecret({ given, secret }: { given: string | undefined; secret: string }): boolean {
  const a = Buffer.from(given ?? '');
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

function id(value: string): string {
  return encodeURIComponent(value.trim());
}

export const BASE_URL = 'https://tekservix.com/waservix/api';

export const waservixApi = { call, verifySecret, id };

type CallParams = {
  apiKey: string;
  method: HttpMethod;
  path: string;
  body?: unknown;
};
