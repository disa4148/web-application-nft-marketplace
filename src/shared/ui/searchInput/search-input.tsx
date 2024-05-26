import css from './searchInput.module.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type Props = {
  placeholder: string
}

export default function SearchInput({placeholder}: Props): JSX.Element {
  const t = useTranslations('header');
  return (
    <div className={css.wrapper}>
      <Image
        src={'/assets/icons/Loupe.svg'}
        width={18}
        height={18}
        alt="Loupe"
      />
      <input type="text" placeholder={placeholder}  />
    </div>
  );
}
