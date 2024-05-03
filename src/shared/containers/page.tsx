type Props = {
  children: React.ReactNode;
};

export default function Page({ children, ...props }: Props) {
  return (
    <div
      {...props}
      className="p-[40px] flex justify-center bg-light-main-bg-main dark:bg-dark-main-bg-main"
    >
      {children}
    </div>
  );
}
