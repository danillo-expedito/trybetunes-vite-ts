import { Outlet } from 'react-router-dom';
import Header from '../header';
import './styles.css';

function Layout() {
  return (
    <div className="main-layout">
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
