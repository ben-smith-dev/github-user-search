import { useNavigate } from 'react-router';

export const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
  };

  return (
    <div className="w-full h-full grid justify-center items-center">
      <div className="w-fit grid justify-center">
        <div className="font-bold text-[3em] text-center mb-4 dark:text-gray-400">
          <h1>{'OOPS'}</h1>
          <h2>404: Page not found.</h2>
        </div>
        <button
          className="text-[2em] px-[2em] py-[1em] mx-auto border-2 rounded-md transition-all ease-in-out
           border-black
           hover:bg-gray-400 active:bg-gray-300
           focus:bg-gray-400
           dark:border-gray-400 dark:text-gray-400
           dark:hover:bg-gray-900 dark:focus:bg-gray-900 dark:active:bg-gray-800"
          onClick={navigateHome}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};
