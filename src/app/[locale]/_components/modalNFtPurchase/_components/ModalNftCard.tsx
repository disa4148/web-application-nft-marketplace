import css from '../ModalNFtPurchase.module.scss';
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';

type Props = {
  image: string;
  title: string;
  description: string;
};

export default function ModalNftCard({
  title,
  description,
  image,
}: Props): JSX.Element {
  return (
    <div
      className={cn(
        css.cardWrapper,
        'border border-solid border-1-bg-black-50',
      )}
    >
      <div>
        <Image src={image} width={63} height={63} alt="Nft" />
      </div>
      <div>
        <h3 className="text-1-text-white-100">{title}</h3>
        <h4 className="text-1-text-black-60">{description}</h4>
      </div>
    </div>
  );
}
