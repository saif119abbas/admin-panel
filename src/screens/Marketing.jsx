import { useSidebar } from "../context/SidebarContext";
import AllTemplates from "../components/marketing/AllTemplates";
import NotificationTemplate from "../components/marketing/NotificationTemplate";
export default function Marketing() 
{
    const { currentView } = useSidebar();
    console.log(currentView);
    return( 
    <>
        {currentView==="all-templates" && <AllTemplates />}
         {currentView==="send-notifications" && <NotificationTemplate />}
    </>
    )
}