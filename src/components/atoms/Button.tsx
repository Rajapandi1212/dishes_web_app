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
};
export const Button = ({
  onclick = () => null,
  children,
  appearance = "primary",
}: Props) => (
  <Btn
    size={"small"}
    appearance={appearance}
    onClick={onclick}
    className="cursor-pointer"
  >
    {children}
  </Btn>
);
