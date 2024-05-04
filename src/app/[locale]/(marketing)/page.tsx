import Page from '@/shared/containers/page';
import Title from '@/shared/ui/title/title';
import css from './home.module.scss';
import TopCollections from './_components/topCollections/top-collections';
import ManyNft from './_components/manyNft/many-nft';

export default function Home(): React.ReactElement {
  return (
    <Page>
      <section className={css.wrapper}>
        <Title title="Топ коллекций" />
        <TopCollections />
        <Title title="Больше о NFT" />
        <ManyNft />
        <Title title="О нашем сервисе" />
      </section>
    </Page>
  );
}
