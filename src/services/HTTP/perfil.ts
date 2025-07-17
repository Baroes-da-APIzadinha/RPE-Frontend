import { getRequest } from './requests';

export async function getPerfil(params?: Record<string, any>) {
    return await getRequest(`auth/me`, params);
};
