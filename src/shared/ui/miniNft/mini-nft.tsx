import css from './miniNft.module.scss';
import Image from 'next/image';

type Props = {
  name: string;
  price: number;
  total: number;
  percentage: number;
};

export default function MiniNft({
  name,
  percentage,
  price,
  total,
}: Props): JSX.Element {
  return (
    <div className={css.wrapper}>
      <div className={css.leftItems}>
        <Image
          src={'/assets/forTest/tgNft.png'}
          alt="NFT"
          width={65}
          height={60}
        />
      </div>
      <div className={css.middleItems}>
        <div>
          <h3>{name}</h3>
          <Image
            src={'/assets/icons/verified.svg'}
            alt="Verified"
            width={11}
            height={11}
          />
        </div>
        <div>
          <h4>Цена</h4>
          <h4>{price} ETH</h4>
        </div>
      </div>
      <div className={css.rightItems}>
        <div>
          <h4>
            {total} <span>ETH</span>
          </h4>
        </div>
        <div>
          <p>+{percentage}%</p>
        </div>
      </div>
    </div>
  );
}
