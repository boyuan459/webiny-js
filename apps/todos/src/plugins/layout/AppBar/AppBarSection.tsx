import * as React from "react";
import {
  TopAppBarSection as RmwcAppBarSection,
  TopAppBarSectionProps as RmwcAppBarSectionProps
} from "@webiny/ui/TopAppBar";

export type AppBarSectionProps = RmwcAppBarSectionProps & {
  /**
   * Element children
   */
  children: React.ReactNode[] | React.ReactNode;

  /**
   * Style object.
   */
  style?: React.CSSProperties;

  /**
   * CSS class name.
   */
  className?: string;
};

const AppBarSection = (props: AppBarSectionProps) => {
  const { children, ...rest } = props;
  return <RmwcAppBarSection {...rest}>{children}</RmwcAppBarSection>
}

export default AppBarSection;
