import css from './priceHistory.module.scss';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CustomTooltip } from './CustomTooltip';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils';
import { Separator } from '@/shared/ui/separator';

type PriceHistory = {
  price: number;
  date: string; 
}

type Props = {
  priceHistory: PriceHistory[] | undefined;
}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Intl.DateTimeFormat('ru-RU', options).format(new Date(dateString));
}

export default function PriceHistory({ priceHistory }: Props): JSX.Element {
  const t = useTranslations('nftCard.tabs.historyPrice');

  const formattedPriceHistory = priceHistory?.map(entry => ({
    ...entry,
    date: formatDate(entry.date),
  }));

  return (
    <div className={cn(css.wrapper, 'bg-1-bg-black-90')}>
      <h2 className='text-1-text-white-100'>{t('title')}</h2>
      <Separator orientation="horizontal" decorative />
      <div className={css.chart}>
        <p className={cn(css.volume, 'text-1-text-white-100')}>{t('avgCost')} (ETH)</p>
        <div className={css.values}>
          <p className='text-1-text-white-100'>{t('avgCost')} (ETH)</p>
        </div>
        <div className={css.chartItem}>
          <ResponsiveContainer>
            <BarChart data={formattedPriceHistory}>
              <Tooltip content={<CustomTooltip />} />
              <CartesianGrid vertical={false} />
              <XAxis fontSize={12} dataKey="date" />
              <YAxis
                tickLine={false}
                fontSize={12}
                yAxisId="left"
                orientation="left"
                stroke="#979797"
              />
              <YAxis
                tickLine={false}
                fontSize={12}
                yAxisId="right"
                orientation="right"
                stroke="#979797"
              />
              <Bar
                maxBarSize={24}
                yAxisId="left"
                radius={[5, 5, 0, 0]}
                dataKey="price"
                fill="#ffffff"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
