import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header, Footer } from '../common/components';
import { Home, PageNotFound } from '../common/pages';
import { SkeletonTheme } from 'react-loading-skeleton';
import { useMediaQuery } from 'usehooks-ts';

const App: React.FC = () => {
  const prefersDarkScheme = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <SkeletonTheme
      highlightColor={prefersDarkScheme ? '#9ca3af' : undefined}
      baseColor={prefersDarkScheme ? '#6b7280' : undefined}
      duration={2}
    >
      <div className="min-w-screen min-h-screen grid grid-rows-[5rem_1fr_5rem] overflow-scroll dark:bg-gray-950">
        <Header />
        <main className="w-auto h-full px-1">
          <BrowserRouter basename="/">
            <Routes>
              <Route path="*" element={<PageNotFound />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </main>
        <Footer />
      </div>
    </SkeletonTheme>
  );
};

export default App;
