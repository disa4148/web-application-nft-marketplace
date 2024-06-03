import css from './page.module.scss';
import Page from '@/shared/containers/page';
import dynamic from 'next/dynamic';
import TopCollectionsSkeleton from '../_components/topCollections/skeleton';

export default function MyCollections(): JSX.Element {
  const NftForm = dynamic(() => import('./_components/nftForm/nft-form'), {
    ssr: false,
    loading: () => <TopCollectionsSkeleton />,
  });

  return (
    <Page padding>
      <div className={css.blockInfo}>
        <div className={css.blockNft}>
          <NftForm />
        </div>
      </div>
    </Page>
  );
}
