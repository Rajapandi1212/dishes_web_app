"use client";
import { Button as Btn } from "@fluentui/react-components";
type Props = {
  onclick: any;
  children: React.ReactNode;
  appearance?:
    | "primary"
    | "secondary"
    | "outline"
    | "subtle"
    | "transparent"
    | undefined;
};
export const Button = ({
  onclick,
  children,
  appearance = "primary",
}: Props) => (
  <Btn appearance={appearance} onClick={onclick} className="cursor-pointer">
    {children}
  </Btn>
);
