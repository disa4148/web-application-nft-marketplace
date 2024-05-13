import css from './offers.module.scss';
import { Separator } from '@/shared/ui/separator';
import { offerItems } from './offersItems';

export const Offers: React.FC = () => {
  return (
    <div className={css.wrapper}>
      <div>
        <h3>Предложения</h3>
      </div>
      <Separator orientation="horizontal" decorative />
      <div className={css.scroll}>
        <div className={css.gridContainer}>
          <div className={css.textInfo}>
            <h5>Цена</h5>
            <h5>В рублях</h5>
            <h5>Срок действия</h5>
            <h5>От кого</h5>
          </div>
          {offerItems.map((items, index) => (
            <div className={css.textData} key={index}>
              <h4>{items.price}</h4>
              <h4>{items.inRub}</h4>
              <h4>{items.expirationDate}</h4>
              <h4 className={css.colorBy}>{items.by}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
