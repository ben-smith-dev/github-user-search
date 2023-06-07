import { PublicGitHubUser } from '../../services/publicGitHubApi';

export interface UserCardProps {
  user: PublicGitHubUser | null;
}

export const UserCard: React.FC<UserCardProps> = ({ user }: UserCardProps) => {
  const joinedDate = new Date(user?.created_at ?? '0001');
  const joinedYear = joinedDate.getFullYear();

  return (
    <div className="@container w-full h-full p-2 flex justify-center items-center">
      <a
        href={user?.html_url}
        target="_blank"
        rel="noreferrer"
        className="w-full min-w-[10ch] max-w-[60ch] h-fit m-auto p-4 [contain:content]
        rounded-md bg-gray-700 text-white
        transition-transform ease-in-out delay-100
        hover:scale-105 focus:scale-105"
      >
        <div
          className={`h-fit flex flex-col items-center gap-1
          @[36rem]:flex-row @[36rem]:gap-4 @[36rem]:items-end`}
        >
          <img
            src={user?.avatar_url}
            alt="Users GitHub avatar."
            className="h-[6rem] object-contain rounded-md"
          />
          <div
            className={`text-center text-[1.5em] h-fit
            @[36rem]:text-left`}
          >
            <h1>{user?.name}</h1>
            <h2 className="font-light">{user?.login}</h2>
          </div>
        </div>

        <div className="min-h-[8rem] flex justify-center items-center">
          <p>{user?.bio ?? 'No bio available.'}</p>
        </div>

        <div
          className={`flex flex-col items-center gap-2
          @[36rem]:flex-row @[36rem]:gap-4 @[36rem]:justify-between`}
        >
          <p>{`Followers: ${user?.followers ?? 0}`}</p>
          <p>{`Following: ${user?.following ?? 0}`}</p>
          <p>{`Repos: ${user?.public_repos ?? 0}`}</p>
          <p>{`Joined: ${joinedYear}`}</p>
        </div>
      </a>
    </div>
  );
};
