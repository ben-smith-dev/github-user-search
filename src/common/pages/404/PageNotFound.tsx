import { useNavigate } from 'react-router';

export const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
  };

  return (
    <div className="w-full h-full grid justify-center items-center">
      <div className="w-fit grid justify-center">
        <div className="font-bold text-[3em] text-center mb-4">
          <h1>{'OOPS'}</h1>
          <h2>404: Page not found.</h2>
        </div>
        <button
          className="text-[2em] px-[2em] py-[1em] mx-auto border-2 border-black rounded-md 
          hover:bg-gray-400 active:bg-gray-300
            transition-all ease-in-out"
          onClick={navigateHome}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};
