import { Headling } from '../../components/Headling/Headling.tsx';
import { Input } from '../../components/Input/Input.tsx';
import { Button } from '../../components/Buttton/Button.tsx';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API.ts';
import { ILoginResponse } from '../../interfaces/auth.interface.ts';

export type ILoginForm = {
	email: {
		value: string;
	}
	password: {
		value: string;
	}
};

export const Login = () => {
	const [error, setError] = useState<string | null>();
	const navigate = useNavigate();

	const submit = (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		const target = e.target as typeof e.target & ILoginForm;
		const { email, password } = target;

		sendLogin(email.value, password.value);
	};

	const sendLogin = async (email: string, password: string) => {
		try {
			const { data } = await axios.post<ILoginResponse>(`${PREFIX}/auth/login`, {
				email,
				password
			});
			localStorage.setItem('jwt', data.access_token);
			navigate('/');
		} catch (e) {
			if(e instanceof AxiosError) {
				setError(e.response?.data.message);
			}
		}

	};

	return (
		<div className={styles['login']}>
			<Headling>Вход</Headling>
			{error && <div className={styles['error']}>{error}</div>}
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