import styles from './Sidebar.module.css'
import Logo from './Logo'
import AppNav from './AppNav'
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function Sidebar() {
  return(
    <div className={styles.sidebar}>
      <Logo/>
      <AppNav/>
      <Outlet/>
      <Footer className=''>&copy; {/* {new Date().getFullYear()} */} by World Wide inc</Footer>
      </div>
  )
}

export default Sidebar;
