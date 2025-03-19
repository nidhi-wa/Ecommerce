
import { Navigate, Outlet } from 'react-router-dom';
import UserChatComponent from './users/UserChatComponent';

export default function ProtectedRoutesComponent({admin}) {
    if(admin){
      const adminAuth = false;
      return adminAuth ? <Outlet/> : <Navigate to="login"/>
    }else{
      const userAuth = true;
      return userAuth ? (
          <> <UserChatComponent/> <Outlet/></>
        ):(
          <Navigate to="/login"/>
        )

      
    }
}
