import logo from './logo.svg';
import './App.css';
import NewsList from './component/NewsList';
import Header from './component/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <NewsList />
      </main>
    </div>
  );
}

export default App;
