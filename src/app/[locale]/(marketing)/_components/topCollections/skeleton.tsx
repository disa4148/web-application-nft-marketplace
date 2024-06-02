import { LoadingSpinner } from "@/shared/ui/loading-spinner"
import css from './topCollections.module.scss';

export default function TopCollectionsSkeleton(): JSX.Element {
  return (
    <div className={css.loadingWrapper}>
        <LoadingSpinner />
    </div>
  )
}
