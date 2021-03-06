import React from "react";
import { Helmet } from "react-helmet";

import useShop from "@dastkari/hooks/useShop";

interface WindowTitleProps {
  title: string;
}

export const WindowTitle: React.FC<WindowTitleProps> = ({ title }) => {
  const shop = useShop();

  return shop === undefined || !title ? null : (
    <Helmet title={`${title} | ${shop.name}`} />
  );
};
