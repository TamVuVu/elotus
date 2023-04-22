import { useDispatch } from "react-redux";
import apiService from "../App/apiService";
import { setIsloading } from "../Reducers";
import { HTTP_METHODS } from "../constant";
import { Error } from "../types";
import { store } from "../Store";

type OptionsType = {
  body?: any;
  options?: {
    isTriggerLoading: boolean;
  };
};
export const ApiClient = async (
  method: HTTP_METHODS,
  path: string,
  payload = {
    body: {},
    options: {
      isTriggerLoading: true,
    },
  } as OptionsType
): Promise<any | Error> => {
  if (payload.options?.isTriggerLoading) store.dispatch(setIsloading(true));
  let res;
  try {
    switch (method) {
      case HTTP_METHODS.GET:
        res = (await apiService.get(path))?.data;
        store.dispatch(setIsloading(false));
        return res;
      case HTTP_METHODS.POST:
        res = (await apiService.post(path, payload))?.data;
        store.dispatch(setIsloading(false));
        return res;
      default:
        break;
    }
  } catch (error) {
    const apiError = error as Error;
    alert(apiError.message as Error);
    store.dispatch(setIsloading(false));
  }
};
