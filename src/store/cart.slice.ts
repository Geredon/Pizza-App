import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage.ts';

export const CART_PERSISTENT_STATE = 'cartData';

export interface ICartItem {
    id: number;
    count: number;
}

export interface ICartState {
    items:ICartItem[];
}

const initialState: ICartState = loadState<ICartState>(CART_PERSISTENT_STATE) ?? {
	items: []
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		clean:  (state) => {
			state.items = [];
		},
		delete: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter((i) => i.id !== action.payload);
		},
		remove: (state, action: PayloadAction<number>) => {
			const existed = state.items.find((item) => item.id === action.payload);
			if(!existed) {
				return;
			}
			if (existed.count === 1) {
				state.items = state.items.filter((i) => i.id !== action.payload);
			} else {
				state.items.map((item) => {
					if (item.id===action.payload) {
						item.count -= 1;
					}
					return item;
				});
				return;
			}
		},
		add: (state, action: PayloadAction<number>) => {
			const existed = state.items.find((item) => item.id === action.payload);
			if(!existed) {
				state.items.push({ id: action.payload, count: 1 });
				return;
			} else {
				state.items.map((item) => {
					if (item.id===action.payload) {
						item.count += 1;
					}
					return item;
				});
			}
		}
	}
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;