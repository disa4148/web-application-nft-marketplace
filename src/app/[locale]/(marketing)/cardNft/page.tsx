import Page from '@/shared/containers/page';
import css from './page.module.scss';
import { Button } from '@/shared/ui/button';
import Image from 'next/image';

export default function CardNft() {
  return (
    <Page>
      <div className={css.wrapper}>
        <div>
          <div>
            <Image
              src={'/assets/forTest/cardNft.png'}
              width={442}
              height={443}
              alt=""
            />
          </div>
          <div className={css.blockText}>
            <div>
              <Button className={css.buttonSale}>На продаже</Button>
              <Image
                src={'/assets/icons/heart.svg'}
                width={19.48}
                height={17}
                alt=""
              />
            </div>
            <div>
              <div>
                <p>Telegram Username</p>
                <p>
                  NFT, который посвящен аватару в вашем телеграмм аккаунте.
                  Приобрести можно на этой странице
                </p>
              </div>
              <div className={css.priceBlock}>
                <div>
                  <p>Цена</p>
                  <div>
                    <p>1 000 ETH</p>
                    <p>5 680$ (527 010 Р)</p>
                  </div>
                </div>
                <div>
                  <Button className={css.buy}>Купить</Button>

                  <Button className={css.proposal}>
                    {' '}
                    <Image
                      src={'/assets/icons/label.svg'}
                      width={19.48}
                      height={17}
                      alt=""
                    />
                    Свое предложение
                  </Button>
                </div>
              </div>
              <div className={css.offers}>
                <div className={css.slid}>
                  <p>Предложения</p>
                  <p>История цены</p>
                </div>
                <div className={css.ownerColl}>
                  <div className={css.collections}>
                    <div>
                    <Image
                      src={'/assets/forTest/cardNft.png'}
                      width={39}
                      height={39}
                      alt=""
                    />
                    </div>
                    <div>
                      <p>Коллекция</p>
                      <div>
                        <p>Telegram Usernames</p>
                        <Image
                          src={'/assets/icons/verified.svg'}
                          alt="Verified"
                          width={9}
                          height={9}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={css.owner}>
                    <div>
                    <Image
                      src={'/assets/forTest/owner.png'}
                      width={39}
                      height={39}
                      alt=""
                    />
                    </div>
                    <div>
                      <p>Владелец</p>
                      <div>
                        <p>BunnyMP3</p>
                        <Image
                          src={'/assets/icons/verified.svg'}
                          alt="Verified"
                          width={9}
                          height={9}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
