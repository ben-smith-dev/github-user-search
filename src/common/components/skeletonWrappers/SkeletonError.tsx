import { ReactNode } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { SkeletonScheme } from './SkeletonScheme';

export interface SkeletonErrorProps {
  isError: boolean;
  skeletonColor?: string;
  children: ReactNode;
}

export const SkeletonError: React.FC<SkeletonErrorProps> = ({
  isError,
  children,
}) => {
  return (
    <div>
      {!isError ? (
        children
      ) : (
        <div>
          <SkeletonScheme
            lightSchemeChildren={
              <SkeletonTheme
                baseColor={'#dc2626' /*Tailwind red-600 */}
                highlightColor={'none'}
                enableAnimation={false}
              >
                {children}
              </SkeletonTheme>
            }
            darkSchemeChildren={
              <SkeletonTheme
                baseColor={'#991b1b' /*Tailwind red-800 */}
                highlightColor={'none'}
                enableAnimation={false}
              >
                {children}
              </SkeletonTheme>
            }
          />
        </div>
      )}
    </div>
  );
};
