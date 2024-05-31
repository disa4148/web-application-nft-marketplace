import css from '../ModalNFtPurchase.module.scss';
import Image from 'next/image';

type Props = {
  image: string;
  title: string;
  description: string;
};

export default function ModalNftCard({title, description, image}: Props): JSX.Element {
  return (
    <div className={css.cardWrapper}>
      <div>
        <Image
          src={image}
          width={63}
          height={63}
          alt="Nft"
        />
      </div>
      <div>
        <h3>{title}</h3>
        <h4>{description}</h4>
      </div>
    </div>
  );
}
