import { API_KEY } from "../App/config";

export enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
}

export const appendApiKey = (path: string, query?: string): string => {
  if (query) return path + `?api_key=${API_KEY}` + query;
  return path + `?api_key=${API_KEY}`;
};
