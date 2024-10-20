import { Button } from '../../components/Buttton/Button.tsx';
import { useNavigate } from 'react-router-dom';
import styles from './Success.module.css';

export const Success = () => {
	const navigate = useNavigate();

	return (
		<div className={styles['success']}>
			<img src="/pizza.png" alt="Изображение пиццы" style={{ width: '300px', height: '300px', border: '50%' }}/>
			<div className={styles['text']}>Ваш заказ успешно <br/> оформлен!</div>
			<Button appearance="big" onClick={() => navigate('/')}>Сделать новый</Button>
		</div>
	);
    
};