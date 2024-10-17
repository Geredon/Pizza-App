import { Headling } from '../../components/Headling/Headling.tsx';
import { Search } from '../../components/Search/Search.tsx';
import styles from './Munu.module.css';
import { PREFIX } from '../../helpers/API.ts';
import { IProduct } from '../../interfaces/product.interface.ts';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList.tsx';

const Menu = () => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();


	const getMenu = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`);
			setProducts(data);
			setIsLoading(false);
		} catch (e) {
			console.error(e);
			if(e instanceof AxiosError) setError(e.message);
			setIsLoading(false);
			return;
		}
	};

	useEffect(() => {
		getMenu();
	}, []);

	return (
		<>
			<div className={styles['head']}>
				<Headling>Menu</Headling>
				<Search placeholder='Введите блюдо или состав' isValid/>
			</div>
			<div>
				{error && <>{error}</>}
				{!isLoading && <MenuList products={products}/>}
				{isLoading && <>Загружаем продукты</>}
			</div>
		</>
	);
};

export default Menu;