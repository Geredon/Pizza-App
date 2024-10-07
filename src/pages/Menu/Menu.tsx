import { Headling } from '../../components/Headling/Headling.tsx';
import { Search } from '../../components/Search/Search.tsx';
import styles from './Munu.module.css';
import { ProductCard } from '../../components/ProductCard/ProductCard.tsx';

export const Menu = () => {
	return (
		<>
			<div className={styles['head']}>
				<Headling>Menu</Headling>
				<Search placeholder="Введите блюдо или состав"/>
			</div>
			<div>
				<ProductCard
					id={1}
					title='Наслаждение'
					description='Солями, руккола, помидоры, оливки'
					image='/product-demo.png'
					price={400}
					rating={4.5}
				/>
			</div>
		</>
	);
};