import { Input } from '@/shared/ui/input';
import css from './signUp.module.scss';
import { useTranslations } from 'next-intl';
import Page from '@/shared/containers/page';

interface Props {}

export default function SignUp(props: Props) {
  const t = useTranslations('signUp');
  return (
    <Page>
      <div className={css.wrapper}>
        <div>
          <p>{t('header.title')}</p>
          <p>{t('header.description')}</p>
        </div>
        <Input type="email" placeholder={t('input.login')} />
        <Input type="email" placeholder={t('input.mail')} />
        <Input type="email" placeholder={t('input.password')} />
        <Input type="email" placeholder={t('input.repeatPassword')} />
        <Input type="email" placeholder={t('input.promocode')} />
      </div>
    </Page>
  );
}
