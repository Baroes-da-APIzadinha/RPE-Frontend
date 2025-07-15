import { postRequest, getRequest } from "./requests";

const baseEndpoint = "/reminder/";

export const createReminder = async (message: string) => {
  return postRequest(`${baseEndpoint}global`, {message: message});
};
export const getReminder = async () => {
  return getRequest(`${baseEndpoint}global`);
};