import { cn } from "../lib/utils";
import css from './page.module.scss'

type Props = {
  children: React.ReactNode;
};

export default function Page({ children, ...props }: Props) {
  return (
    <div
      {...props}
      className={cn(css.wrapper, "bg-light-main-bg-main dark:bg-dark-main-bg-main")}
    >
      {children}
    </div>
  );
}
