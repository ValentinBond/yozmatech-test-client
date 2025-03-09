import { Button, Card, CardContent, Input } from '../ui';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import styles from './AuthPage.module.css';
import { useSignInMutation, useSignUpMutation } from '../../queries';
import { useNavigate } from 'react-router-dom';
import { getMainPagePath } from '../../constants/paths.ts';

export const Auth = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  const onSuccessHandler = () => {
    navigate(getMainPagePath());
  };

  const { mutate: signIn, isPending: isSignInLoading } = useSignInMutation({
    options: { onSuccess: onSuccessHandler },
  });
  const { mutate: signUp, isPending: isSignUpLoading } = useSignUpMutation({
    options: { onSuccess: onSuccessHandler },
  });

  const isLoading = isSignInLoading || isSignUpLoading;

  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
    name: string;
  }>();

  const submit = handleSubmit(({ email, name, password }) => {
    if (isSignUp) {
      signUp({ email, name, password });
      return;
    }

    signIn({ name, password });
  });

  return (
    <section className={styles.container}>
      <Card className={styles.card}>
        <CardContent>
          <h2 className={styles.title}>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
          <form onSubmit={submit}>
            <span className={styles.label}>Name</span>
            <Input
              type="name"
              {...register('name', { required: true })}
              className={styles.input}
            />
            {isSignUp && (
              <>
                <span className={styles.label}>Email</span>
                <Input
                  type="email"
                  {...register('email', { required: true })}
                  className={styles.input}
                />
              </>
            )}
            <span className={styles.label}>Password</span>
            <Input
              type="password"
              {...register('password', { required: true })}
              className={styles.input}
            />
            <Button
              type="submit"
              className={styles.button}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>
          <button
            className={styles.toggleButton}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? 'Already have an account? Sign In'
              : "Don't have an account? Sign Up"}
          </button>
        </CardContent>
      </Card>
    </section>
  );
};
