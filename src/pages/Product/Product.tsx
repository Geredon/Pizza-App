import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { IProduct } from '../../interfaces/product.interface.ts';
import { Suspense } from 'react';
import { Button } from '../../components/Buttton/Button.tsx';
import styles from './Product.module.css';

export const Product = () => {
	const data = useLoaderData() as {data: IProduct};
	const navigate = useNavigate();


	return(
		<Suspense
			fallback={'Загружаю...'}
		>
			<Await resolve={data.data}>
				{({ data }: { data: IProduct }) => (
					<>
						<div className={styles['heading']}>
							<button className={styles['back']} onClick={() => navigate('/')}>
								<img src='/back.svg' alt='кнопка назад'/>
							</button>
							<div className={styles['product-name']}>
								{data.name}
							</div>
							<Button onClick={() => navigate('/cart')}>
								В корзину
							</Button>
						</div>
						<div className={styles['product']}>
							<div>
								<img src={data.image} className={styles['pizza']} alt='Изображение пиццы'/>
							</div>
							<div className={styles['description-product']}>
								<div className={styles['line']}>
									<div className={styles['text']}>Цена</div>
									<div className={styles['price']}>{data.price}&nbsp;<span>₽</span></div>
								</div>
								<div className={styles['line']}>
									<div className={styles['text']}>Рейтинг</div>

									<div className={styles['rating']}>
										{data.rating}&nbsp;
										<img src='/star-icon.svg' alt='Иконка звезды' width="14px" height="14px"/>
									</div>
								</div>
								<div className={styles['composition']}>
									<span>Состав:</span>
									<ul>
										{data.ingredients.map((item) => (
											<li>
												{item}
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</>
				)}
			</Await>
		</Suspense>
	);
};