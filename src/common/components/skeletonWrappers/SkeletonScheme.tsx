import { ReactNode } from 'react';
import { useMediaQuery } from 'usehooks-ts';

export interface SkeletonSchemeProps {
  lightSchemeChildren: ReactNode;
  darkSchemeChildren: ReactNode;
}

export const SkeletonScheme: React.FC<SkeletonSchemeProps> = ({
  lightSchemeChildren,
  darkSchemeChildren,
}) => {
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return <div>{!isDarkMode ? lightSchemeChildren : darkSchemeChildren}</div>;
};
