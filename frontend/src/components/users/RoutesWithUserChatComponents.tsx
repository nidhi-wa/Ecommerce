

import UserChatComponent from "./UserChatComponent";
import { Outlet } from 'react-router-dom';

export default function RoutesWithUserChatComponents() {
  return (
   <>
   <UserChatComponent/>
   <Outlet/>
   </>
  )
}
