import { Heading } from '../../components/Heading/Heading.tsx';
import { Input } from '../../components/Input/Input.tsx';
import { Button } from '../../components/Buttton/Button.tsx';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store.ts';
import { getLogin, userActions } from '../../store/userSlice.ts';

export type ILoginForm = {
	email: {
		value: string;
	}
	password: {
		value: string;
	}
};

export const LoginForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { jwt, loginErrorMessage } = useSelector((state:RootState) => state.user);


	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt,navigate]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLoginError());
		const target = e.target as typeof e.target & ILoginForm;
		const { email, password } = target;

		await sendLogin(email.value, password.value);
	};

	const sendLogin = async (email: string, password: string) => {
		dispatch(getLogin({ email, password }));
	};

	return (
		<div className={styles['login']}>
			<Heading>Вход</Heading>
			{loginErrorMessage && <div className={styles['error']}>{loginErrorMessage}</div>}
			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor="email">Ваш email</label>
					<Input id="email" name='email' placeholder='Email'/>
				</div>
				<div className={styles['field']}>
					<label htmlFor="password">Ваш пароль</label>
					<Input id="password" type="password" name='password' placeholder='Пароль'/>
				</div>
				<Button appearance="big">Вход</Button>
			</form>
			<div className={styles['links']}>
				<div>Нет аккаунта?</div>
				<Link to="/auth/register">Зарегестрироваться</Link>
			</div>
		</div>
	);

};