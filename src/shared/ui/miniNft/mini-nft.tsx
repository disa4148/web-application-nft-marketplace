import css from './miniNft.module.scss';
import Image from 'next/image';
export default function MiniNft(): JSX.Element {
  return (
    <div className={css.wrapper}>
        <div className={css.leftItems}>
            <Image src={'/assets/forTest/tgNft.png'} alt='NFT' width={65} height={60}/>
        </div>
        <div className={css.middleItems}>
            <div>
                <h3>Telegram Usernames</h3>
                <Image src={'/assets/icons/verified.svg'} alt='Verified' width={11} height={11}/>
            </div>
            <div>
                <h4>Цена</h4>
                <h4>0.4 ETH</h4>
            </div>
        </div>
        <div className={css.rightItems}>
            <div>
                <h4>
                    2.223 <span>ETH</span>
                </h4>
            </div>
            <div>
                <p>+57%</p>
            </div>
        </div>
    </div>
  )
}
