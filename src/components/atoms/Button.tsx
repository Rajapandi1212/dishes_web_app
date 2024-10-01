"use client";
import { Button as Btn } from "@fluentui/react-components";
type Props = {
  children?: React.ReactNode;
  onclick?: any;
  appearance?:
    | "primary"
    | "secondary"
    | "outline"
    | "subtle"
    | "transparent"
    | undefined;
  size?: "small" | "medium" | "large";
};
export const Button = ({
  onclick = () => null,
  children,
  appearance = "primary",
  size = "small",
}: Props) => (
  <Btn
    size={size}
    appearance={appearance}
    onClick={onclick}
    className="cursor-pointer"
  >
    {children}
  </Btn>
);
