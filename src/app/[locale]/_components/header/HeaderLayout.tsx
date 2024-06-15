'use client';
import { RootState } from '@/shared/redux/store';
import Authorized from './Authorized';
import Unauthorized from './Unauthorized';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMeQuery } from '@/shared/redux/features/authApi';
import { setUser } from '@/shared/redux/slices/authSlice';
import { getUser } from '../../(marketing)/messenger/axios/axios';
import { useEffect } from 'react';

const HeaderLayout = () => {
  const dispatch = useDispatch();

  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>{isSignedIn && user ? <Authorized user={user} /> : <Unauthorized />}</>
  );
};

export default HeaderLayout;
