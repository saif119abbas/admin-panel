import { useSidebar } from "../../context/SidebarContext";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useMarketing } from "../../context/MarketingContext";

export default function LeftSidebar({
  activeTab,
  selectedTemplate,
  handelAddTemplate,
}) {
  const { templates } = useMarketing();
  const { currentView } = useSidebar();
  const [expandedCategories, setExpandedCategories] = useState({});

  // Group templates by category and sort in specific order
  const getTemplatesByCategory = () => {
    const filteredTemplates = templates.filter((t) => {
      switch (activeTab) {
        case "Email":
          return t.type === "email";
        case "SMS":
          return t.type === "sms";
        case "In-App":
          return t.type === "inapp";
        default:
          return false;
      }
    });

    // Group templates by category
    const grouped = {};
    filteredTemplates.forEach((template) => {
      if (!grouped[template.category]) {
        grouped[template.category] = [];
      }
      grouped[template.category].push(template);
    });

    return grouped;
  };

  const getSafeTemplates = () => {
    return templates.filter((t) => t.category === "Custom Templates");
  };

  const safeTemplates =
    currentView === "create-templates"
      ? getSafeTemplates()
      : templates;

  const templatesByCategory = getTemplatesByCategory();
  
  // Get categories and sort them in specific order: General, User, then others
  const getSortedCategories = () => {
    const categories = Object.keys(templatesByCategory);
    
    // Define the desired order
    const categoryOrder = ["General", "User Template", "Custom Templates"];
    
    return categories.sort((a, b) => {
      const indexA = categoryOrder.indexOf(a);
      const indexB = categoryOrder.indexOf(b);
      
      // If both are in the predefined order, sort by that order
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      
      // If only one is in the predefined order, it comes first
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      
      // If neither is in the predefined order, sort alphabetically
      return a.localeCompare(b);
    });
  };

  const categories = getSortedCategories();

  const toggleCategory = (categoryName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  // For create-templates view, show a simple list
  if (currentView === "create-templates") {
    return (
      <div className="w-full md:w-80 bg-gray-50 border border-gray-200 rounded-xl h-auto md:h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Custom Templates
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <button
            onClick={() => handelAddTemplate({ id: "", title: "", type: activeTab })}
            className="w-full bg-primary rounded-full text-white py-2 px-4 text-sm font-medium mb-4"
          >
            Add New Template
          </button>

          <div className="space-y-2">
            {safeTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => handelAddTemplate(template)}
                className={`w-full text-left p-3 rounded-lg border text-sm transition-colors ${
                  selectedTemplate?.id === template.id
                    ? "bg-primary-50 border-primary text-primary"
                    : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                }`}
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // For normal view, show categorized templates
  return (
    <div className="w-full md:w-80 bg-gray-50 border border-gray-200 rounded-xl h-auto md:h-[90vh] flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          All {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Templates
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {categories.map((categoryName) => (
            <div
              key={categoryName}
              className="bg-white rounded-lg border border-gray-200"
            >
              <div className="px-3 pt-2 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-900">
                  {categoryName}
                </h3>
                <button
                  onClick={() => toggleCategory(categoryName)}
                  className="md:hidden"
                >
                  {expandedCategories[categoryName] ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
              </div>

              {/* Desktop: Always show templates */}
              <div className="hidden md:block">
                {templatesByCategory[categoryName].map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handelAddTemplate(template)}
                    className={`w-full text-left border-b border-gray-200 p-3 text-sm transition-colors ${
                      selectedTemplate?.id === template.id
                        ? "bg-primary-50 text-primary"
                        : "text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {template.name}
                  </button>
                ))}
              </div>

              {/* Mobile: Show templates only if category is expanded */}
              <div className="md:hidden">
                {expandedCategories[categoryName] &&
                  templatesByCategory[categoryName].map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handelAddTemplate(template)}
                      className={`w-full text-left border-b border-gray-200 p-3 text-sm transition-colors ${
                        selectedTemplate?.id === template.id
                          ? "bg-primary-50 text-primary"
                          : "text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {template.name}
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