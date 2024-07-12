import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {}

export function Input({ ...props }: InputProps) {
  return (
    <input
      {...props}
      className="w-40 flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
    />
  );
}
