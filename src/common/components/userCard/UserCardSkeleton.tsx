import Skeleton from 'react-loading-skeleton';
import { SkeletonError } from '../skeletonWrappers/SkeletonError';

interface UserCardSkeletonProps {
  isError?: boolean;
  enableAnimation?: boolean;
}

export const UserCardSkeleton: React.FC<UserCardSkeletonProps> = ({
  enableAnimation = true,
  isError = false,
}) => {
  return (
    <SkeletonError isError={isError}>
      <div className="@container w-full h-full p-2 flex justify-center items-center">
        <div
          className={`w-full min-w-[10ch] max-w-[60ch] h-fit m-auto p-4 [contain:content] bg-transparent rounded-md border-2
        ${!isError ? 'border-black' : ' border-red-600'}
        ${
          !isError
            ? 'dark:text-gray-400 dark:border-gray-400'
            : 'dark:border-red-800'
        }
          transition-transform ease-in-out delay-200
          hover:scale-105 hover:shadow-lg
          focus:scale-105 focus:shadow-lg`}
        >
          <div
            className={`h-fit flex flex-col items-center gap-1
          @[36rem]:flex-row @[36rem]:gap-4 @[36rem]:items-end`}
          >
            <div className="h-[6rem] w-[6rem] object-contain rounded-md">
              <Skeleton
                width="100%"
                height="100%"
                enableAnimation={enableAnimation}
              />
            </div>
            <div
              className={`w-[50%] min-w-[12ch] text-center text-[1.5em] h-fit
            @[36rem]:text-left`}
            >
              <h1>
                <Skeleton count={2} enableAnimation={enableAnimation} />
              </h1>
            </div>
          </div>

          <div className="min-h-[8rem] flex justify-center items-center">
            <div className="h-fit w-full">
              <p>
                <Skeleton count={4} enableAnimation={enableAnimation} />
              </p>
            </div>
          </div>

          <div
            className={`flex flex-col items-center gap-2
          @[36rem]:flex-row @[36rem]:gap-4 @[36rem]:justify-between`}
          >
            <p>
              <Skeleton
                width={100}
                height={20}
                containerClassName="flex-1"
                enableAnimation={enableAnimation}
              />
            </p>
            <p>
              <Skeleton
                width={100}
                height={20}
                containerClassName="flex-1"
                enableAnimation={enableAnimation}
              />
            </p>
            <p>
              <Skeleton
                width={100}
                height={20}
                containerClassName="flex-1"
                enableAnimation={enableAnimation}
              />
            </p>
            <p>
              <Skeleton
                width={100}
                height={20}
                containerClassName="flex-1"
                enableAnimation={enableAnimation}
              />
            </p>
          </div>
        </div>
      </div>
    </SkeletonError>
  );
};
