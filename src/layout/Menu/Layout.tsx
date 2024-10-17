import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import { Button } from '../../components/Buttton/Button.tsx';
import cn from 'classnames';

export const Layout = () => {
	const navigate = useNavigate();

	const logOut = () => {
		localStorage.removeItem('jwt');
		navigate('/auth/login');
	};

	return (
		<div className={styles['layout']}>
			<div className={styles['sidebar']}>
				<div className={styles['user']}>
					<img src='/avatar.png' alt='menu' className={styles['avatar']}/>
					<div className={styles['name']}>Иван Сидоров</div>
					<div className={styles['email']}>yana56@yandex.ru</div>

				</div>
				<div className={styles['menu']}>
					<NavLink to='/' className={({ isActive }) => cn(styles['link'], { [styles.active]: isActive })}>
						<img src='/menu.svg' alt='menu' />
						Меню
					</NavLink>
					<NavLink to='/cart' className={({ isActive }) => cn(styles['link'], { [styles.active]: isActive })}>
						<img src='/cart.svg' alt='menu'/>
						Корзина
					</NavLink>
				</div>
				<Button className={styles['exit']} onClick={logOut}>
					<img className={styles['exit_icon']} src='/exit.svg' alt='Иконка выхода'/>
					Выход
				</Button>
			</div>
			<div className={styles['content']}>
				<Outlet />
			</div>
		</div>

	);
};