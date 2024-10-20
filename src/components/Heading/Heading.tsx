import { HeadingProps } from './Heading.props.ts';
import cn from 'classnames';
import styles from './Heading.module.css';

export const Heading = function Input({ children, className, ...props }: HeadingProps) {
	return (
		< h1 className={cn(className, styles['h1'])} {...props}>
			{children}
		</h1>
	);
};