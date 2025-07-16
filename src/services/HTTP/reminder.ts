import { postRequest, getRequest } from "./requests";

const baseEndpoint = "/reminders/";

export async function createReminder(message: string) {
  return postRequest(`${baseEndpoint}global`, {message: message});
};
export async function getReminder(){
  return getRequest(`${baseEndpoint}global`);
};

export async function createCollaboratorReminder(idColaborador: string, message: string, ttlSeconds?: number) {
  const body: { message: string; ttlSeconds?: number } = { message };
  if (ttlSeconds) {
    body.ttlSeconds = ttlSeconds;
  }
  return postRequest(`${baseEndpoint}collaborator/${idColaborador}`, body);
}

export async function getCollaboratorReminder(idColaborador: string) {
  return getRequest(`${baseEndpoint}collaborator/${idColaborador}`);
}

