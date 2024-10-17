import { Await, useLoaderData } from 'react-router-dom';
import { IProduct } from '../../interfaces/product.interface.ts';
import { Suspense } from 'react';

export const Product = () => {
	const data = useLoaderData() as {data: IProduct};


	return(
		<Suspense
			fallback={'Загружаю...'}
		>
			<Await resolve={data.data}>
				{({ data }: { data: IProduct }) => (
					<>Product-{data.name}</>
				)}
			</Await>
		</Suspense>
	);
};