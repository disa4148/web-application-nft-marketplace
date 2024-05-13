import css from './priceHistory.module.scss';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CustomTooltip } from './CustomTooltip';
import { historyData } from './historyData';
import { Separator } from '@/shared/ui/separator';

export const PriceHistory: React.FC = () => {
  return (
    <div className={css.wrapper}>
      <h2>История цены</h2>
      <Separator orientation="horizontal" decorative />
      <div className={css.chart}>
        <p className={css.volume}>Объём</p>
        <div className={css.chartItem} >
          <ResponsiveContainer>
            <BarChart
              data={historyData}
            >
              <Tooltip content={<CustomTooltip/>}/>
              <CartesianGrid vertical={false} />
              <XAxis fontSize={12} dataKey="date" />
              <YAxis tickLine={false} fontSize={12} yAxisId="left" orientation="left" stroke="#979797" />
              <YAxis tickLine={false} fontSize={12} yAxisId="right" orientation="right" stroke="#979797" />
              <Bar maxBarSize={24} yAxisId="left" radius={[5, 5, 0, 0]} dataKey="volume" fill="#ffffff" />
              <Bar maxBarSize={24} yAxisId="right" radius={[5, 5, 0, 0]} dataKey="avgCost" fill="#ffffff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className={css.avgCost}>Средняя стоимость (ETH)</p>
      </div>
    </div>
  );
};