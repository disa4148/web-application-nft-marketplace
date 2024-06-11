import css from './newsNft.module.scss';
import { cn } from '@/shared/lib/utils';

type Props = {
  title: string;
  description: string;
};

const NewsNft = ({ title, description }: Props): JSX.Element => {

  return (
    <div className={cn(css.wrapper, 'bg-1-bg-black-90')}>
      <p className='text-1-text-white-100'>{title}</p>
      <p className='text-1-text-white-100'>{description}</p>
    </div>
  );
};

export default NewsNft;
