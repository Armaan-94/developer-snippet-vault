import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const getSnippets = () => API.get("/snippets");

export const createSnippet = (data) =>
  API.post("/snippets", data);

export const deleteSnippet = (id) =>
  API.delete(`/snippets/${id}`);

export const updateSnippet = (id, data) =>
  API.put(`/snippets/${id}`, data);