import { PublicGitHubUser } from '../../services/publicGitHubApi';
import { UserCard } from '../index';

export interface UserCardContainerProps {
  users: PublicGitHubUser[];
  title: string;
  clearContainer: () => void;
  clearContainerPrompt: string;
}

export const UserCardContainer: React.FC<UserCardContainerProps> = ({
  users,
  title,
  clearContainerPrompt,
  clearContainer,
}) => {
  const hasUsers: boolean = 0 < users.length;

  return (
    <div className="@container w-full min-w-[35ch] my-4">
      <div className="flex justify-between items-end p-2">
        <h3>
          {title} [{users.length}]
        </h3>

        <button
          onClick={clearContainer}
          disabled={!hasUsers}
          className="rounded-md p-[0.5rem] transition-all ease-in-out bg-red-600 hover:bg-red-700 active:bg-red-500 
          disabled:bg-gray-300 disabled:text-gray-700"
        >
          {clearContainerPrompt}
        </button>
      </div>
      <hr />
      <div className="w-full grid [grid-template-columns:repeat(auto-fit,_minmax(20ch,_70ch))] justify-center gap-4 my-2">
        {users.map((user) => (
          <div key={user.id} className="w-full">
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};
