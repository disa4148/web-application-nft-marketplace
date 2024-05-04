import css from './topCollections.module.scss';

import SortingBar from '@/shared/ui/sortingBar/sorting-bar';
import CustomSelect from '@/shared/ui/customSelect/custom-select';
import MiniNft from '@/shared/ui/miniNft/mini-nft';
import ButtonLoadMore from '@/shared/ui/buttonLoadMore/button-load-more';

import { nftItems } from './nftItems';

import { useTranslations } from 'next-intl';

export default function TopCollections(): JSX.Element {
  const t = useTranslations('home.topCollections');
  const keys: string[] = ['select.popular', 'select.inTime', 'select.alphabetically'];

  interface SelectItem {
    value: string;
    title: string;
  }

  const selectItems: SelectItem[] = keys.map((key) => ({
    value: t(`${key}.value`),
    title: t(`${key}.title`),
  }));

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <div className={css.select}>
          <CustomSelect placeholder={t('select.popular.title')} items={selectItems} />
        </div>
        <div>
          <SortingBar />
        </div>
      </div>
      <div className={css.cards}>
        {nftItems.map((item, index: number) => (
          <MiniNft
            key={index}
            name={item.name}
            percentage={item.percentage}
            price={item.price}
            total={item.total}
            image={item.image}
          />
        ))}
      </div>
      <div>
        <ButtonLoadMore>{t('cards.btn')}</ButtonLoadMore>
      </div>
    </div>
  );
}
