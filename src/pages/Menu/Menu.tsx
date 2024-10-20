import { Heading } from '../../components/Heading/Heading.tsx';
import { Search } from '../../components/Search/Search.tsx';
import styles from './Munu.module.css';
import { PREFIX } from '../../helpers/API.ts';
import { IProduct } from '../../interfaces/product.interface.ts';
import { ChangeEvent, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList.tsx';

const Menu = () => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();
	const [filter, setFilter] = useState<string>();

	useEffect(() => {
		getMenu(filter);
	}, [filter]);

	const getMenu = async (name?: string) => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`, {
				params: {
					name
				}
			});
			setProducts(data);
			setIsLoading(false);
		} catch (e) {
			console.error(e);
			if(e instanceof AxiosError) setError(e.message);
			setIsLoading(false);
			return;
		}
	};


	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	return (
		<>
			<div className={styles['head']}>
				<Heading>Menu</Heading>
				<Search placeholder='Введите блюдо или состав' isValid onChange={updateFilter}/>
			</div>
			<div>
				{error && <>{error}</>}
				{!isLoading && products.length &&  <MenuList products={products}/>}
				{!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
				{isLoading && <>Загружаем продукты</>}
			</div>
		</>
	);
};

export default Menu;