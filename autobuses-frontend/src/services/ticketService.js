import {api} from './api';

var Route = import.meta.env.VITE_B
export const ticketService = {
    getAll: () => api.get(Route),
};