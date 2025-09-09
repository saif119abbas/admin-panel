import { useSidebar } from "../context/SidebarContext";
import AllTemplates from "../components/marketing/AllTemplates";
import NotificationTemplate from "../components/marketing/NotificationTemplate";
import { useState, useEffect } from "react";
import { useMarketing } from "../context/MarketingContext";
import MarketingServices from "../services/marketingServices";
export default function Marketing() {
  const { currentView } = useSidebar();
  const [loading, setLoading] = useState(false);
  const { setTemplates } = useMarketing();

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      try {
        const templatesData = await MarketingServices.getAllTemplates_v2();
        console.log("templatesData", templatesData);
        setTemplates(templatesData);
      } catch (error) {
        console.error("Error loading tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);
  if (loading) return <></>;
  return (
    <>
      {(currentView === "all-templates" || currentView === "create-templates") && 
          <AllTemplates />
      }
      {currentView === "send-notifications" && <NotificationTemplate />}
    </>
  );
}
