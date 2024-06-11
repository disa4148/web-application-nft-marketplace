import css from './searchInput.module.scss';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type Props = {
  placeholder: string;
};

export default function SearchInput({ placeholder }: Props): JSX.Element {
  const t = useTranslations('header');
  return (
    <div className={cn(css.wrapper, 'bg-1-text-black-80')}>
      <Image
        src={'/assets/icons/Loupe.svg'}
        width={18}
        height={18}
        alt="Loupe"
      />
      <input
        className="
        bg-1-bg-black-80 
        text-1-text-white-100 
        hover:placeholder:text-1-text-white-100 
        transition-all"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
}
