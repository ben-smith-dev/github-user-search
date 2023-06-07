import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header, Footer } from '../common/components';
import { Home, PageNotFound } from '../common/pages';

const App: React.FC = () => {
  return (
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
  );
};

export default App;
