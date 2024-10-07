import { HeadlingProps } from './Headling.props.ts';
import cn from 'classnames';
import styles from './Healding.module.css';

export const Headling = function Input({ children, className, ...props }: HeadlingProps) {
	return (
		< h1 className={cn(className, styles['h1'])} {...props}>
			{children}
		</h1>
	);
};