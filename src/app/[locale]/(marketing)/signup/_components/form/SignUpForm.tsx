'use client';
import css from '../../signUp.module.scss';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Form, FormControl, FormField, FormItem } from '@/shared/ui/form';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { useSignUpMutation } from '@/shared/redux/features/authApi';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { getPromo } from '@/shared/lib/cookie';

type FieldErrors = {
  [key: string]: any | undefined;
};

export default function SignUpForm(): JSX.Element {
  const t = useTranslations('signUp');
  const locale = useLocale();

  const formSchema = z
    .object({
      login: z
        .string()
        .min(4, {
          message: t('messages.login.min'),
        })
        .max(30, t('messages.login.max'))
        .refine((value) => !/[\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), {
          message: t('messages.login.valid'),
        }),
      email: z
        .string()
        .min(1, {
          message: t('messages.email.required'),
        })
        .email({ message: t('messages.email.valid') }),
      password: z
        .string()
        .min(4, {
          message: t('messages.password.min'),
        })
        .max(20, t('messages.password.max'))
        .refine((value) => /[a-zA-Z]/.test(value) && /\d/.test(value), {
          message: t('messages.password.valid'),
        }),
      confirmation: z.string(),
      promocode: z.string().optional(),
    })
    .refine(({ password, confirmation }) => password === confirmation, {
      message: t('messages.password.dontMatch'),
      path: ['confirmation'],
    });

  const ref = getPromo();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: '',
      email: '',
      password: '',
      confirmation: '',
      promocode: ref ? ref : '',
    },
  });

  const [isErrorsShown, setIsErrorsShown] = useState<boolean>(false);
  const errors: FieldErrors = form.formState.errors;

  const router = useRouter();
  const [register, { isLoading }] = useSignUpMutation();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const payload = {
      login: data.login,
      email: data.email,
      password: data.password,
      promocode: ref ? ref : data.promocode,
    };
    toast.loading(t('messages.loading'));
    try {
      const response = await register(payload).unwrap();
      toast.success(t('messages.success'));
      form.reset();
      router.push('/');
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
      <form className={css.form} onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => {
            return (
              <FormControl>
                <Input
                  placeholder={t('input.login')}
                  {...field}
                  onKeyDown={handleKeyPress}
                />
              </FormControl>
            );
          }}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormControl>
                <Input
                  type="email"
                  placeholder={t('input.mail')}
                  {...field}
                  onKeyDown={handleKeyPress}
                />
              </FormControl>
            );
          }}
        />
        <div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormControl>
                  <Input
                    className={css.passwordInput}
                    type="password"
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
            name="confirmation"
            render={({ field }) => {
              return (
                <FormControl>
                  <Input
                    className={css.repeatPassword}
                    type="password"
                    placeholder={t('input.repeatPassword')}
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
              );
            }}
          />
        </div>
        <FormField
          control={form.control}
          name="promocode"
          render={({ field }) => {
            return (
              <FormControl>
                <Input
                  placeholder={t('input.promocode')}
                  {...field}
                  onKeyDown={handleKeyPress}
                  disabled={ref ? true : false}
                />
              </FormControl>
            );
          }}
        />
        <Button
          onClick={() => setIsErrorsShown(true)}
          className={'bg-1-gradient'}
          variant={'default'}
        >
          {t('buttonSignUp.text')}{' '}
        </Button>
        <div className={css.linkSignIn}>
          <h1 className="text-1-text-white-100">{t('linkSignIn.text')}</h1>
          <Link
            className={cn(css.link, 'bg-1-gradient')}
            href={`/${locale}/signin`}
          >
            {t('linkSignIn.button')}
          </Link>
        </div>
      </form>
    </Form>
  );
}
