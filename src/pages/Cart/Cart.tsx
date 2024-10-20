import { Heading } from '../../components/Heading/Heading.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store.ts';
import { CartItem } from '../../components/CartItem/CartItem.tsx';
import { useEffect, useState } from 'react';
import { IProduct } from '../../interfaces/product.interface.ts';
import axios from 'axios';
import { PREFIX } from '../../helpers/API.ts';
import styles from './Cart.module.css';
import { Button } from '../../components/Buttton/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart.slice.ts';

const DELIVERY_FEE = 169;

export const Cart = () => {
	const [cartProducts, setCardProducts] = useState<IProduct[]>([]);
	const items = useSelector((state:RootState) => state.cart.items);
	const jwt = useSelector((state:RootState) => state.user.jwt);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		loadAllItems();
	}, [items]);

	const getItem = async (id: number) => {
		const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItems = async() => {
		const res = await Promise.all(items.map((i) => getItem(i.id)));
		setCardProducts(res);
	};

	const total = items.map((i) => {
		const product = cartProducts.find((p) => p.id === i.id);
		if (!product) return 0;

		return i.count * product.price;
	}).reduce((acc, i) => acc += i, 0);

	const checkout = async () => {
		await axios.post(`${PREFIX}/order`, {
			products: items
		}, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
		dispatch(cartActions.clean());
		navigate('/success');
	};

	return(
		<>
			<Heading className={styles['heading']}>Корзина</Heading>
			{items.map((i) => {
				const product = cartProducts.find((p) => p.id === i.id);
				if (!product) return;

				return <CartItem key={product.id} count={i.count} {...product}/>;
			})}
			<div className={styles['line']}>
				<div className={styles['text']}>Итог</div>
				<div className={styles['price']}>{total}&nbsp;<span>₽</span></div>
			</div>
			<hr className={styles['hr']}/>
			<div className={styles['line']}>
				<div className={styles['text']}>Доставка</div>
				<div className={styles['price']}>{DELIVERY_FEE}&nbsp;<span>₽</span>
				</div>
			</div>
			<hr className={styles['hr']}/>
			<div className={styles['line']}>
				<div className={styles['text']}>
					Итог
					&nbsp;
					<span className={styles['total-count']}>({items.length})</span></div>
				<div className={styles['price']}>
					{total + DELIVERY_FEE}&nbsp;
					<span>₽</span>
				</div>
			</div>
			<div className={styles['checkout']}>
				<Button appearance="big" onClick={checkout}>оформить</Button>
			</div>
		</>
	);
};