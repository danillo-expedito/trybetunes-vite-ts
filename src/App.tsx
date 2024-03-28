import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Search from './pages/search';
import Album from './pages/album';
import Layout from './components/layout';
import Favorites from './pages/favorites';
import Profile from './pages/profile';
// import ProfileEdit from './pages/profile-edit';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/" element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/profile/edit" element={ <Profile /> } />
      </Route>
    </Routes>
  );
}

export default App;
