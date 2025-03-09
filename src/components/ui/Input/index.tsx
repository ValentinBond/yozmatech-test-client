import styles from './Input.module.css';

export const Input = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input className={`${styles.input} ${className}`} {...props} />;
};
