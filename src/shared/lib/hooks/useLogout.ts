import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useDispatch } from 'react-redux';
import { removeToken } from '@/shared/lib/cookie';
import { logout } from '@/shared/redux/slices/authSlice';
import { toast } from 'sonner';
import { AppDispatch } from '@/shared/redux/store'; 

export default function useLogout(): () => void {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('header.messages');

  const handleLogout = () => {
    removeToken();
    dispatch(logout());
    toast.success(t('logout'));
    router.push(`/${locale}/`);
  };

  return handleLogout;
}
