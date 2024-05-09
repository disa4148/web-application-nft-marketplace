import css from './home.module.scss';

import Page from '@/shared/containers/page';
import Title from '@/shared/ui/title/title';

import TopCollections from './_components/topCollections/top-collections';
import ManyNft from './_components/manyNft/many-nft';
import AboutService from './_components/aboutService/about-service';
import AboutServiceMobile from './_components/aboutService/about-service-mobile';
import UnderHeader from './_components/underHeader/under-header';
import { useTranslations } from 'next-intl';

export default function Home(): React.ReactElement {
  const t = useTranslations('home');
  return (
    <Page>
      <section className={css.wrapper}>
        <UnderHeader />
        <div className={css.topCollections}>
          <Title title={t('topCollections.title')} />
          <TopCollections />
        </div>
        <ManyNft />
        <div className={css.aboutOurService}>
          <Title title={t('aboutOurService.title')} />
        <AboutService />
        </div>
        <div className={css.aboutOurServiceMobile}>
          <AboutServiceMobile />
        </div>
      </section>
    </Page>
  );
}
