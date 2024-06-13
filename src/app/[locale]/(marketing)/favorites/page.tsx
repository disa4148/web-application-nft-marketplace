import css from './page.module.scss';
import NftForm from './_components/nftForm/nft-form';
import Page from '@/shared/containers/page';
import { getTranslations } from 'next-intl/server';
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const {locale} = params
  const t = await getTranslations({ locale , namespace: 'metadata'});

  return {
    title: t('favorites'),
  };
}
export default function FavoritesNft() {
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
