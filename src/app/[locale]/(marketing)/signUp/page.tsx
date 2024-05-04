import { Input } from '@/shared/ui/input';
import css from './signUp.module.scss';
import { useTranslations } from 'next-intl';
import Page from '@/shared/containers/page';
import Logotype from '@/shared/ui/logotype';
import { Button } from '@/shared/ui/button';
import SignImage from '@/shared/ui/signImage/signImage';

interface Props {}

export default function SignUp(props: Props) {
  const t = useTranslations('signUp');
  return (
    <Page>
      <div className={css.wrapper}>
        <div className={css.signUp}>
          <div>
            <p>{t('header.title')}</p>
            <p>{t('header.description')}</p>
          </div>
          <div>
            <Input type="email" placeholder={t('input.login')} />
            <Input type="email" placeholder={t('input.mail')} />
            <div>
              <Input className='w-[190px]' type="email" placeholder={t('input.password')} />
              <Input className='w-[190px]' type="email" placeholder={t('input.repeatPassword')} />
            </div>
            <Input type="email" placeholder={t('input.promocode')} />
            <Button className={css.styleButton} variant={'default'}>{t('buttonSiUp.text')} </Button>
          </div>
        </div>
        <div className={css.signRight}>
          <SignImage style='light'/>
        </div>
      </div>
    </Page>
  );
}
