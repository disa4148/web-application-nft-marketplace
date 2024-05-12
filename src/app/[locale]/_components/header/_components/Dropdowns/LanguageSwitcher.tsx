"use client";
import css from './Dropdowns.module.scss'

import { Button } from "@/shared/ui/button";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useLocale } from "next-intl";

import Cookies from "js-cookie";

export default function LanguageSwitcher() {
   const [isPending, startTransition] = useTransition();
   const router = useRouter();
   const localActive = useLocale();

   const Switcher = (nextLocale: string) => {
      if (!isPending) {
         startTransition(() => {
            router.replace(`/${nextLocale}`);
            Cookies.set("selectedLocale", nextLocale);
         })
      }
   }
   return (
      <Button
         size='icon'
         variant='ghost'
         onClick={() => Switcher(localActive === "en" ? "ru" : "en")}
         className={css.switcher}
      >
        {localActive === "ru" ? "Русский" : "English"}
      </Button>
   )
}
