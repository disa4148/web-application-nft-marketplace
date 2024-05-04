import css from './manyNft.module.scss';

import NewsNft from '@/shared/ui/newsNft/newsNft';
import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/carousel';

import { useTranslations } from 'next-intl';

export default function ManyNft (): JSX.Element {
  const t = useTranslations('home.moreAboutNft.slider');
  const keys: string[] = ['nftJet', 'ton', 'nft', 'wallet', 'howBuy', 'questions'];

  interface News {
    title: string;
    description: string;
  }

  const newsItems: News[] = keys.map((key) => ({
    title: t(`${key}.title`),
    description: t(`${key}.description`),
  }));

  return (
    <div className={css.wrapper}>
      <Carousel className="w-full " orientation="horizontal">
        <CarouselContent className="-ml-1">
          {newsItems.map((e, index: number) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/6"
            >
              <div>
                <NewsNft title={e.title} description={e.description} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
