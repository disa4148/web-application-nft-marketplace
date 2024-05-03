'use client';
import css from './topCollections.module.scss';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import SortingBar from '@/shared/ui/sortingBar/sorting-bar';
import MiniNft from '@/shared/ui/miniNft/mini-nft';
import { nftItems } from './nftItems';

export default function TopCollections(): JSX.Element {
  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <div className={css.select}>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Популярное" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">In Progress</SelectItem>
              <SelectItem value="dark">In Progress</SelectItem>
              <SelectItem value="system">In Progress</SelectItem>
            </SelectContent>
          </Select>
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
          />
        ))}
      </div>
    </div>
  );
}
