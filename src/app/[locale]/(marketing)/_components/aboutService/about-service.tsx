import css from './aboutService.module.scss';
import { Button } from '@/shared/ui/button';
import Image from 'next/image';

export default function AboutService(): JSX.Element {
  return (
    <div className={css.wrapper}>
      <div className={css.content}>
        <div>
          <h3>
            NFT JET — торговая площадка для невзаимозаменяемых токенов (NFT).
            Покупайте, продавайте и открывайте для себя эксклюзивные цифровые
            предметы.
          </h3>
          <Button>К каталогу</Button>
        </div>
        <div>
          <Image
            src={'/assets/illustrations/homeIllustration.png'}
            alt="Home Illustration"
            width={600}
            height={450}
          />
        </div>
      </div>
    </div>
  );
}
