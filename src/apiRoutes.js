export const LOCAL_HOST = "http://localhost:5000";

export const GET_NOTE_BY_ID = (id) => `${LOCAL_HOST}/api/notes/${id}`;
export const GET_ALL_NOTES = `${LOCAL_HOST}/api/notes/`;
export const ADD_NOTE = `${LOCAL_HOST}/api/notes`;
export const UPDATE_NOTE = (id) => `${LOCAL_HOST}/api/notes/${id}`;
export const DELETE_NOTE = (id) => `${LOCAL_HOST}/api/notes/${id}`;
export const GET_ACTIVE_NOTES = `${LOCAL_HOST}/api/notes/active`;
export const GET_ARCHIVED_NOTES = `${LOCAL_HOST}/api/notes/archived`;
export const ARCHIVE_NOTE = (id) => `${LOCAL_HOST}/api/notes/${id}/archive`;
export const UNARCHIVE_NOTE = (id) => `${LOCAL_HOST}/api/notes/${id}/unarchive`;
