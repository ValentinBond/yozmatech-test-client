import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { signIn, signUp } from '../api/auth.ts';
import {
  TSignInInput,
  TSignInOutput,
  TSignUpInput,
  TSignUpOutput,
} from '../types/auth.ts';

export const useSignInMutation = ({
  options = {},
}: {
  options?: UseMutationOptions<TSignInOutput, Error, TSignInInput>;
} = {}) => {
  return useMutation<TSignInOutput, Error, TSignInInput>({
    mutationFn: (data) => signIn(data),
    ...options,
    onSuccess: (data, ...rest) => {
      localStorage.setItem('token', data.token);
      options?.onSuccess?.(data, ...rest);
    },
  });
};

export const useSignUpMutation = ({
  options = {},
}: {
  options?: UseMutationOptions<TSignUpOutput, Error, TSignUpInput>;
} = {}) => {
  return useMutation<TSignUpOutput, Error, TSignUpInput>({
    mutationFn: (data) => signUp(data),
    ...options,
    onSuccess: (data, ...rest) => {
      localStorage.setItem('token', data.token);
      options?.onSuccess?.(data, ...rest);
    },
  });
};
