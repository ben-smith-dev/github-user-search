import { ReactNode } from 'react';
import { SkeletonStyleProps } from 'react-loading-skeleton';
import { SkeletonScheme } from './SkeletonScheme';

export interface SkeletonErrorProps {
  isError: boolean;
  children: ReactNode;
}

const errorLightModeStyle: SkeletonStyleProps = {
  baseColor: '#dc2626', //Tailwind red-600
  highlightColor: 'none',
  enableAnimation: false,
};

const errorDarkModeStyle: SkeletonStyleProps = {
  baseColor: '#991b1b', //Tailwind red-800
  highlightColor: 'none',
  enableAnimation: false,
};

export const SkeletonError: React.FC<SkeletonErrorProps> = ({
  isError,
  children,
}) => {
  return (
    <>
      {isError ? (
        <SkeletonScheme
          lightModeStyle={errorLightModeStyle}
          darkModeStyle={errorDarkModeStyle}
          children={children}
        />
      ) : (
        <SkeletonScheme children={children} />
      )}
    </>
  );
};
