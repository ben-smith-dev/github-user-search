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
    <div className="@container w-full min-w-[35ch] min-h-[10rem] my-4">
      <div
        className="flex justify-between items-end p-2
          dark:text-gray-400"
      >
        <h3>
          {title} [{users.length}]
        </h3>

        <button
          onClick={clearContainer}
          disabled={!hasUsers}
          className="rounded-md p-[0.5rem] transition-all ease-in-out bg-transparent border-2
            border-red-600
            hover:bg-red-600 hover:text-white
            focus:bg-red-600 focus:text-white
            disabled:text-gray-700 disabled:border-black disabled:pointer-events-none

            dark:border-red-800
            dark:hover:bg-red-800 dark:hover:text-gray-100
            dark:focus:bg-red-800 dark:focus:text-gray-100
            dark:active:bg-red-700 dark:active:border-red-700
            
            dark:disabled:text-inherit dark:disabled:border-gray-400"
        >
          {clearContainerPrompt}
        </button>
      </div>
      <hr className="dark:border-gray-600" />

      {users.length <= 0 ? (
        <div className="w-fit h-fit my-10 m-auto flex justify-center items-center">
          <p className="text-gray-500 text-xl">Empty</p>
        </div>
      ) : (
        <ol className="w-full grid [grid-template-columns:repeat(auto-fit,_minmax(20ch,_70ch))] justify-center gap-4 my-2">
          {users.map((user) => (
            <li key={user.id} className="w-full">
              <UserCard user={user} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};
