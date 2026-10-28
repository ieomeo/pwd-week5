import axios from 'axios';
import type {
  ApiResponse, CreateRestaurantInput, CreateSubmissionInput, EntityId,
  Restaurant, Submission, SubmissionStatus, UpdateRestaurantInput, UpdateSubmissionInput,
} from '../types';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  timeout: 60000, // Render 무료 서버가 깨어나는 시간 고려
});

export const restaurantAPI = {
  getRestaurants: () =>
    http.get<ApiResponse<Restaurant[]>>('/api/restaurants').then((r) => r.data),
  getRestaurantById: (id: EntityId) =>
    http.get<ApiResponse<Restaurant>>(`/api/restaurants/${id}`).then((r) => r.data),
  getPopularRestaurants: () =>
    http.get<ApiResponse<Restaurant[]>>('/api/restaurants/popular').then((r) => r.data),
  createRestaurant: (payload: CreateRestaurantInput) =>
    http.post<ApiResponse<Restaurant>>('/api/restaurants', payload).then((r) => r.data),
  updateRestaurant: (id: EntityId, payload: UpdateRestaurantInput) =>
    http.put<ApiResponse<Restaurant>>(`/api/restaurants/${id}`, payload).then((r) => r.data),
  deleteRestaurant: (id: EntityId) =>
    http.delete(`/api/restaurants/${id}`).then((r) => r.status),
};

export const submissionAPI = {
  createSubmission: (payload: CreateSubmissionInput) =>
    http.post<ApiResponse<Submission>>('/api/submissions', payload).then((r) => r.data),
  listSubmissions: (status?: SubmissionStatus) =>
    http.get<ApiResponse<Submission[]>>('/api/submissions', { params: { status } }).then((r) => r.data),
  updateSubmission: (id: EntityId, payload: UpdateSubmissionInput) =>
    http.put<ApiResponse<Submission>>(`/api/submissions/${id}`, payload).then((r) => r.data),
  deleteSubmission: (id: EntityId) =>
    http.delete(`/api/submissions/${id}`).then((r) => r.status),
};

export default restaurantAPI;
