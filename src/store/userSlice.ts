import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage.ts';
import axios, { AxiosError } from 'axios';
import { ILoginResponse } from '../interfaces/auth.interface.ts';
import { PREFIX } from '../helpers/API.ts';
import { IProfile } from '../interfaces/user.interface.ts';
import { RootState } from './store.ts';

export const JWT_PERSISTENT_STATE = 'userData';

export interface IUserPersistentState {
	jwt: string | null
}

export interface IUserSlice {
    jwt: string | null;
	loginErrorMessage?: string;
	registerErrorMessage?: string;
	profile?: IProfile;
}

const initialState: IUserSlice = {
	jwt: loadState<IUserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
};

export const getLogin = createAsyncThunk('user/login',
	async (params: {email: string, password: string}) => {
		try {
			const { data } = await axios.post<ILoginResponse>(`${PREFIX}/auth/login`, {
				email: params.email,
				password: params.password
			});
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	});

export const register = createAsyncThunk('user/register',
	async (params: {email: string, password: string, name: string}) => {
		try {
			const { data } = await axios.post<ILoginResponse>(`${PREFIX}/auth/register`, {
				email: params.email,
				password: params.password,
				name: params.name
			});
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	});

export const getProfile = createAsyncThunk<IProfile, void, {state: RootState}>('user/getProfile',
	async (_, thunkAPI) => {
		const jwt = thunkAPI.getState().user.jwt;
		const { data } = await axios.get<IProfile>(`${PREFIX}/user/profile`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
		return data;
	
	});

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logOut: (state) => {
			state.jwt = null;
		},
		clearLoginError: (state) => {
			state.loginErrorMessage = undefined;
		},
		clearRegisterError: (state) => {
			state.registerErrorMessage = undefined;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getLogin.fulfilled, (state, action) => {
			if (!action.payload) return;

			state.jwt = action.payload.access_token;
		});
		builder.addCase(getLogin.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message;
		});
		builder.addCase(getProfile.fulfilled, (state, action) => {
			state.profile = action.payload;
		});
		builder.addCase(register.fulfilled, (state, action) => {
			if (!action.payload) return;

			state.jwt = action.payload.access_token;
		});
		builder.addCase(register.rejected, (state, action) => {
			state.registerErrorMessage = action.error.message;
		});
	}
});

export default userSlice.reducer;
export const userActions = userSlice.actions;