import styles from './Input.module.css';
import { forwardRef } from 'react';
import cn from 'classnames';
import { InputProps } from './Input.props.ts';

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ isValid = true, className, ...props }, ref) {
	return (
		<input ref={ref} className={cn(styles['input'], className, { [styles['invalid']]: isValid })} {...props} />
	);
});