import css from './sortingBar.module.scss';

export default function SortingBar(): JSX.Element {
  return (
    <div className={css.wrapper}>
        <div className={css.active}>1 день</div>
        <div>7 дней</div>
        <div>30 дней</div>
        <div>Всё время</div>
    </div>
  );
}
