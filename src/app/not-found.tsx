'use client';
import { Button } from '@/shared/ui/button';
export default function LocaleLayout() {
  return (
    <html>
      <title>404. Page not found</title>
      <body className="text-[#ffffff]">
        <div className="w-screen flex flex-col justify-center items-center h-full">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-[48px] font-black">404</h1>
            <p>Page not found</p>
          </div>
          <Button variant={'default'}>Go back</Button>
        </div>
      </body>
    </html>
  );
}
