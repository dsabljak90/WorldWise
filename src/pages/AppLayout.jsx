import Sidebar from '../components/Sidebar';
import Map from '../components/Map';
import style from './AppLayout.module.css'
//import User from '../components/User';
//import AppNav from '../components/Sidebar';

function AppLayout() {
  return(
    <div className={style.app}>
      <Sidebar/>
      <Map/>
      {/* <User/> */}
      </div>
  )
}

export default AppLayout;
