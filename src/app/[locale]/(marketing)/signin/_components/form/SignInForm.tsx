'use client';
import css from '../../signIn.module.scss';

import { useTranslations, useLocale } from 'next-intl';

import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Form, FormControl, FormField, FormItem } from '@/shared/ui/form';

import Link from 'next/link';
import { toast } from 'sonner';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useSignInMutation } from '@/shared/redux/features/authApi';
import { useRouter } from 'next/navigation';
import { setToken } from '@/shared/lib/cookie';

import { UserData } from '@/shared/lib/localstorage';
import { useDispatch } from 'react-redux';
import { logout, setAuthInfo } from '@/shared/redux/slices/authSlice';
import { cn } from '@/shared/lib/utils';

type FieldErrors = {
  [key: string]: any | undefined;
};

type Tokens = {
  accessToken: string,
  refreshToken: string
}

interface ResponseData {
  tokens: Tokens;
  user: UserData;
}

export default function SignInForm(): JSX.Element {
  useEffect(() => {
    window.localStorage.removeItem("reduxState");
    dispatch(logout());
  },[])
  const t = useTranslations('signIn');
  const locale = useLocale();
  const dispatch = useDispatch();
  const formSchema = z.object({
    login: z.string().min(1, {
      message: t('messages.login'),
    }),
    password: z.string().min(1, {
      message: t('messages.password'),
    }),
    remember: z.boolean().default(false),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: '',
      password: '',
      remember: false,
    },
  });

  const router = useRouter();
  const [isErrorsShown, setIsErrorsShown] = useState<boolean>(false);
  const errors: FieldErrors = form.formState.errors;
  const [auth, { isLoading }] = useSignInMutation();
    


  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const payload = {
      login: data.login,
      password: data.password,
      remember: data.remember,
    };
    try {
      const response = (await auth(payload).unwrap()) as ResponseData;
      toast.success(t('messages.success'));
      setToken(response.tokens.accessToken, response.tokens.refreshToken);
      dispatch(setAuthInfo({user: response.user, isSignedIn:true}))
      form.reset();
      router.push(`/`);
    } catch (e: any) {
      if (e.data && e.data.message) {
        toast.error(e.data.message);
      }
    } finally {
      toast.dismiss();
    }
  };
  useEffect(() => {
    if (!isErrorsShown) return;
    for (const field in errors) {
      const errorMessage = errors[field]?.message;
      if (errorMessage) {
        toast.error(errorMessage, { position: 'bottom-right' });
      }
    }
    setIsErrorsShown(false);
  }, [isErrorsShown, errors]);

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={css.form}>
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input placeholder={t('input.login')} {...field} onKeyDown={handleKeyPress} />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormControl>
                <Input
                  type="password"
                  className={css.password}
                  placeholder={t('input.password')}
                  {...field}
                  onKeyDown={handleKeyPress}
                />
              </FormControl>
            );
          }}
        />
        <FormField
          control={form.control}
          name="remember"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <div className={css.checkbox}>
                    <Checkbox
                      id="terms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor="terms"
                      className="text-1-text-white-100 text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('input.rememberMe')}
                    </label>
                  </div>
                </FormControl>
              </FormItem>
            );
          }}
        />
        <Button
          onClick={() => setIsErrorsShown(true)}
          type="submit"
          className={'bg-1-gradient'}
          variant={'default'}
        >
          {t('buttonSignIn.text')}{' '}
        </Button>
        <div className={css.linkSignUp}>
          <h1 className='text-1-text-white-100'>{t('linkSignUp.text')}</h1>
          <Link className={cn(css.link, 'bg-1-gradient')} href={`/${locale}/signup`}>
            {t('linkSignUp.button')}
          </Link>
        </div>
      </form>
    </Form>
  );
}
