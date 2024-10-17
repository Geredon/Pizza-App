import styles from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props.ts';
import { Link } from 'react-router-dom';

export const ProductCard = (props: ProductCardProps) => {
	return (
		<Link to={`/product/${props.id}`} className={styles['link']}>
			<div className={styles['card']}>
				<div className={styles['head']} style={{
					backgroundImage: `url(${props.image})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat'
				}}>
					<div className={styles['price']}>
						{props.price}&nbsp;
						<span className={styles['currency']}>₽</span>
					</div>
					<button className={styles['add-to-cart']}>
						<img src='/card-button-icon.svg' alt='Добавить в корзину'/>
					</button>
					<div className={styles['rating']}>
						{props.rating}&nbsp;
						<img src='/star-icon.svg' alt='Иконка звезды' width="14px" height="14px"/>
					</div>
				</div>
				<div className={styles['footer']}>
					<div className={styles.title}>{props.name}</div>
					<div className={styles.description}>{props.description}</div>
				</div>
			</div>
		</Link>
	);
};