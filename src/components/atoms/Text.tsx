"use client";
import { Subtitle1, Title1 } from "@fluentui/react-components";
import { ReactNode, FC } from "react";

interface BasicTextProps {
  children: ReactNode;
  className?: string;
  as?:
    | "h4"
    | "b"
    | "em"
    | "h1"
    | "h2"
    | "h3"
    | "h5"
    | "h6"
    | "i"
    | "p"
    | "pre"
    | "span"
    | "strong"
    | undefined;
}

export const Header = ({
  children,
  className = "",
  as = "h4",
}: BasicTextProps) => (
  <Title1 className={className} as={as}>
    {children}
  </Title1>
);

export const SubTitle = ({ children, className = "" }: BasicTextProps) => (
  <Subtitle1 className={className}>{children}</Subtitle1>
);

const Capitalize: FC<BasicTextProps> = ({ children, className = " " }) => {
  return <div className={"capitalize" + className}>{children}</div>;
};

export default Capitalize;
