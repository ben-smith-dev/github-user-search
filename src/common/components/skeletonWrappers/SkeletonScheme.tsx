import { ReactNode } from 'react';
import { SkeletonStyleProps, SkeletonTheme } from 'react-loading-skeleton';
import { useMediaQuery } from 'usehooks-ts';

export interface SkeletonSchemeProps {
  lightModeStyle?: SkeletonStyleProps;
  darkModeStyle?: SkeletonStyleProps;
  children: ReactNode;
}

const defaultDarkModeStyle: SkeletonStyleProps = {
  baseColor: '#374151', //Tailwind gray 700
  highlightColor: '#6b7280', // Tailwind gray 500
};

const defaultLightModeStyle: SkeletonStyleProps = {
  baseColor: '#9ca3af', // Tailwind gray 500
  highlightColor: '#d1d5db', // Tailwind gray 300
};

export const SkeletonScheme: React.FC<SkeletonSchemeProps> = ({
  lightModeStyle,
  darkModeStyle,
  children,
}) => {
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <div>
      {!isDarkMode ? (
        <SkeletonTheme
          {...defaultLightModeStyle}
          {...lightModeStyle}
          children={children}
        />
      ) : (
        <SkeletonTheme
          {...defaultDarkModeStyle}
          {...darkModeStyle}
          children={children}
        />
      )}
    </div>
  );
};
