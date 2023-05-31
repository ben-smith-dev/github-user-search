import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header, Footer } from '../common/components';
import { Home, PageNotFound } from '../common/pages';
import './app.css';

const App: React.FC = () => {
  return (
    <div className="appContainer">
      <Header />
      <main>
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
