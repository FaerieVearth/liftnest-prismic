import clsx from "clsx";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

export default function Bounded({
  as: Comp = "section",
  className,
  children,
  ...restProps
}: BoundedProps) {
  return (
    <Comp
      className={clsx(
        "px-4 py-2 md:px-6 lg:py-4",
        className,
      )}
      {...restProps}
    >
      <div className={clsx("mx-auto flex w-full max-w-[1450px] flex-col items-center", className)}>
        {children}
      </div>
    </Comp>
  );
}
