'use client';
import Authorized from './Authorized';
import Unauthorized from './Unauthorized';
import { useAuth } from '@/shared/lib/hooks/useAuth';

const HeaderLayout = () => {
  const { isSignedIn } = useAuth();
  return <>{isSignedIn ? <Authorized /> : <Unauthorized />}</>;
};

export default HeaderLayout;
