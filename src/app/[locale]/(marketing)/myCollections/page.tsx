import css from './page.module.scss';
import Page from '@/shared/containers/page';
import dynamic from 'next/dynamic';
import TopCollectionsSkeleton from '../_components/topCollections/skeleton';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const {locale} = params
  const t = await getTranslations({ locale , namespace: 'metadata'});

  return {
    title: t('mycollections'),
  };
}

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
