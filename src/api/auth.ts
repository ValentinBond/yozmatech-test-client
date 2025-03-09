import {
  TSignInInput,
  TSignInOutput,
  TSignUpInput,
  TSignUpOutput,
} from '../types/auth.ts';
import apiClient from './apiClient.tsx';

export const signUp = async (data: TSignUpInput) => {
  const res = await apiClient.post<TSignUpOutput>('/auth/sign-up', data);
  return res.data;
};

export const signIn = async (data: TSignInInput) => {
  const res = await apiClient.post<TSignInOutput>('/auth/login', data);
  return res.data;
};
