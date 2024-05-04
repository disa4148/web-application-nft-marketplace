import css from './home.module.scss';

import Page from '@/shared/containers/page';
import Title from '@/shared/ui/title/title';

import TopCollections from './_components/topCollections/top-collections';
import ManyNft from './_components/manyNft/many-nft';
import AboutService from './_components/aboutService/about-service';

import { useTranslations } from 'next-intl';

export default function Home(): React.ReactElement {
  const t = useTranslations('home')
  return (
    <Page>
      <section className={css.wrapper}>
        <Title title={t('topCollections.title')} />
        <TopCollections />

        <ManyNft />
        <Title title={t('aboutOurService.title')} />
        <AboutService />
      </section>
    </Page>
  );
}
