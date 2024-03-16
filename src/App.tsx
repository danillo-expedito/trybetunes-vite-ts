import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Search from './pages/search';
import Musics from './components/musics';
import Layout from './components/layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/" element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Musics /> } />
      </Route>
    </Routes>
  );
}

export default App;
