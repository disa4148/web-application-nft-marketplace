import { useLocale } from 'next-intl';
import css from './OwnerCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  img?: string;
  emoji?: string;
  title: string;
  content: string;
  verified: boolean;
  idCollection?: string;
};

export default function OwnerCard({
  img,
  emoji,
  title,
  content,
  verified,
  idCollection,
}: Props): JSX.Element {
  const locale = useLocale();
  return (
    <Link
      href={`/${locale}/collections/${idCollection}`}
      className={css.wrapper}
    >
      <div className={css.item}>
        {img ? (
          <Image
            src={`${img || emoji}`}
            width={45}
            height={45}
            alt="NFT"
            className={css.collectionImg}
          />
        ) : emoji ? (
          <div className="w-[45px] h-[45px]  rounded-[10px] border-[1px] border-[white] flex justify-center items-center">
            <p style={{ fontSize: '30px' }}>{emoji}</p>
          </div>
        ) : null}

        <div>
          <h6>{title}</h6>
          <div>
            <h5>{content}</h5>
            {verified && (
              <Image
                alt="Verified"
                src={'/assets/icons/verified.svg'}
                width={12}
                height={12}
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
