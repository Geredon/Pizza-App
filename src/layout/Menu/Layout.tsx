import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import { Button } from '../../components/Buttton/Button.tsx';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store.ts';
import { getProfile, userActions } from '../../store/userSlice.ts';
import { useEffect } from 'react';

export const Layout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const profile = useSelector((state:RootState) => state.user.profile);

	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);

	const logOut = () => {
		dispatch(userActions.logOut());
		navigate('/auth/login');
	};

	return (
		<div className={styles['layout']}>
			<div className={styles['sidebar']}>
				<div className={styles['user']}>
					<img src='/avatar.png' alt='menu' className={styles['avatar']}/>
					<div className={styles['name']}>{profile?.name}</div>
					<div className={styles['email']}>{profile?.email}</div>

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