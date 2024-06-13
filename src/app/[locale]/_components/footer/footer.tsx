import css from './footer.module.scss';

import Logotype from '@/shared/ui/logotype';
import LocaleSwitcher from '@/shared/ui/locale-switcher';

import Image from 'next/image';
import Link from 'next/link';

import { useTranslations } from 'next-intl';

export default function Footer(): JSX.Element {
  const t = useTranslations('footer');
  return (
    <footer className={css.wrapper}>
      <div className={css.footer}>
        <div>
          <div className={css.logotypeContainer}>
            <Logotype style="light" />
            <p className="text-1-text-black-60">{t('description')}</p>
          </div>
          <div>
            <Link
              href={'https://web.telegram.org/a/#1234060895'}
              passHref
              target="_blank"
            >
              <Image
                className={css.hoverImg}
                src={'/assets/icons/socials/telegram.svg'}
                alt="Telegram"
                width={21}
                height={18}
              />
            </Link>
          </div>
        </div>
        <div className={css.rightItems}>
          <div>
            <div>
              <h1 className="text-1-text-black-60">
                {t('items.project.title')}
              </h1>
            </div>
            <div>
              <Link className="text-1-text-white-100" href={'/'}>
                {t('items.project.catalogue')}
              </Link>
              <Link className="text-1-text-white-100" href={'/'}>
                {t('items.project.service')}
              </Link>
              <Link className="text-1-text-white-100" href={'/'}>
                {t('items.project.privacyPolicy')}
              </Link>
            </div>
          </div>

          <div>
            <div>
              <h1 className="text-1-text-black-60">
                {t('items.language.title')}
              </h1>
            </div>
            <LocaleSwitcher />
          </div>

          <div>
            <div>
              <h1 className="text-1-text-black-60">
                {t('items.contacts.title')}
              </h1>
            </div>
            <div>
              <Link className="text-1-text-white-100" href={'/'}>
                {t('items.contacts.tg')}
              </Link>
              <Link className="text-1-text-white-100" href={'/'}>
                {t('items.contacts.mail')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
