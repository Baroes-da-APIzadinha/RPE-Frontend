import { postRequest, getRequest } from "./requests";

const baseEndpoint = "/reminders/";

export async function createReminder(message: string) {
  return postRequest(`${baseEndpoint}global`, {message: message});
};
export async function getReminder(){
  return getRequest(`${baseEndpoint}global`);
};