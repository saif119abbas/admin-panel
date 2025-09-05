import { useSidebar } from "../../context/SidebarContext";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useMarketing } from "../../context/MarketingContext";
export default function LeftSidebar({
  activeTab,
  selectedTemplate,
  handleTemplateSelect,
}) {

  const { newTemplateData,emailTemplates,smsTemplates,inappTemplates } = useMarketing();
  const getCurrentTemplates = () => {
    switch (activeTab) {
      case "Email":
        return emailTemplates.concat(newTemplateData);
      case "SMS":
        return smsTemplates.concat(newTemplateData);
      case "In-App":
        return inappTemplates.concat(newTemplateData);
      default:
        return [];
    }
  };
  
  const { currentView } = useSidebar();
  const [expandedCategories, setExpandedCategories] = useState({});
  const currentTemplates = getCurrentTemplates();
  
  const safeTemplates =
    currentView === "create-templates"
      ? newTemplateData
      : Array.isArray(currentTemplates)
      ? currentTemplates
      : [];

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  return (
    <div className="w-full md:w-80 bg-gray-50 border border-gray-200 rounded-xl h-auto md:h-[90vh] flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          All {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Templates
        </h2>
      </div>

      {/* Template Categories */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3 pb-4 mt-2">
          {safeTemplates.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-lg border border-gray-200"
            >
              <div className="px-3 pt-2 flex justify-between items-center">
                {currentView === "create-templates" ? (
                  <button
                    onClick={() => handleTemplateSelect({ id: 'new-template', title: 'New Template' })}
                    className="w-full bg-primary rounded-full text-white py-2 px-4 text-sm font-medium mb-4"
                  >
                    Add New Template
                  </button>
                ) : (
                  <>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {category.name}
                    </h3>
                    <button 
                      onClick={() => toggleCategory(category.name)}
                      className="md:hidden"
                    >
                      {expandedCategories[category.name] ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>
                  </>
                )}
              </div>
              
              {/* Mobile: Show templates only if category is expanded */}
              <div className="hidden md:block">
                {Array.isArray(category.templates) &&
                  category.templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateSelect(template)}
                      className={`w-full text-left border-b border-gray p-4 text-sm transition-colors ${
                        selectedTemplate?.id === template.id
                          ? " text-primary"
                          : "text-text hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {template.title}
                    </button>
                  ))}
              </div>
              
              {/* Mobile: Collapsible content */}
              <div className="md:hidden">
                {expandedCategories[category.name] && 
                  Array.isArray(category.templates) &&
                  category.templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateSelect(template)}
                      className={`w-full text-left border-b border-gray p-4 text-sm transition-colors ${
                        selectedTemplate?.id === template.id
                          ? " text-primary"
                          : "text-text hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {template.title}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}