import './App.css';
import NewsList from './component/NewsList';
import Header from './component/Header';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NewsDetails from './component/NewsDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<NewsList />} />
            <Route path="/news/:id" element={<NewsDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
