import Page from '@/shared/containers/page';
import Title from '@/shared/ui/title/title';
import css from './home.module.scss';
import TopCollections from './_components/topCollections/top-collections';

export default function Home(): React.ReactElement {
  return (
    <Page>
      <section className={css.wrapper}>
        <Title title="Топ коллекций" />
        <TopCollections />
      </section>
    </Page>
  );
}
