/* eslint-disable no-template-curly-in-string */
import { useState, useEffect } from "react";
import { Mail, Copy } from "lucide-react";
import Editor from "./Editor2";
import Navbar from "./Navbar";
import LeftSidebar from "./LeftSidebar";
import { useMarketing } from "../../context/MarketingContext";
import NoTemplatesFound from "./NoTemplatesFound";
import { useSidebar } from "../../context/SidebarContext";
import MarketingServices from "../../services/marketingServices";
import logoImage from '../../assets/images/TipMe.png';

const AllTemplates = () => {
  const [activeTab, setActiveTab] = useState("Email");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [subject, setSubject] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNewTemplate, setIsNewTemplate] = useState(false); // Track if it's a new template
  const [loading] = useState(false);
  const [variables, setVariables] = useState([]); 
  
  const { currentView } = useSidebar();
  const { templates } = useMarketing();

  // Get variables based on whether it's a new template or existing template
  const getVariables = () => {
    if (isNewTemplate) {
      return variables.map((v)=>v.name); 
    } else if (selectedTemplate && Array.isArray(selectedTemplate.allowedVariabels)) {
      return selectedTemplate.allowedVariabels; // Use template's allowed variables
    }
    return []; // Fallback to empty array
  };

  const variableTemplate = getVariables();

  useEffect(() => {
    const fetchVariables = async () => {
      if (isNewTemplate) {
        try {
          const variablesData = await MarketingServices.getVariable(activeTab);
          setVariables(variablesData);
        } catch (error) {
          console.error("Error fetching variables:", error);
          setVariables([]);
        }
      }
    };

    fetchVariables();
  }, [activeTab, isNewTemplate]);

  const handleTemplateSelect = async (template) => {
    if (template.id === "new-template") {
      // Handle new template creation
      setIsNewTemplate(true);
      setSelectedTemplate({
        id: "new-template",
        name: "New Template",
        subject: "",
        type: activeTab,
        content: "",
        allowedVariabels: []
      });
      setEditorContent("");
      setSubject("");
      
      // Fetch variables for the new template
      try {
        const variablesData = await MarketingServices.getVariable(activeTab);
        setVariables(variablesData);
      } catch (error) {
        console.error("Error fetching variables:", error);
        setVariables([]);
      }
    } else {
      // Handle existing template selection
      setIsNewTemplate(false);
      setSelectedTemplate(template);
      setEditorContent(template.content || "");
      setSubject(template.subject || "");
    }
    setIsSidebarOpen(false);
  };

  const handelSubmit = async () => {
    if (isNewTemplate) {
      return await handleAddTemplate();
    }
    return await handleUpdateTemplate();
  };

  const handleUpdateTemplate = async () => {
    const content = editorContent;
    const updatedTemplate = {
      ...selectedTemplate,
      content,
      subject: subject || selectedTemplate.subject
    };
    const res = await MarketingServices.updateTemplate(selectedTemplate.id, updatedTemplate);
    console.log(res);
  };

  const handleAddTemplate = async () => {
    const content = editorContent;
    const newTemplateData = {
      name: subject || "New Template",
      subject: subject || "New Template Subject",
      type: activeTab,
      allowedVariabels: variables, // Use the variables from API
      category: "Custom Templates",
      content
    };
    const res = await MarketingServices.addTemplate(newTemplateData);
    console.log(res);
    
    // Reset after adding
    if (res.success) {
      setIsNewTemplate(false);
      setSelectedTemplate(null);
      setEditorContent("");
      setSubject("");
    }
  };

  const handleVariableInsert = (variable) => {
    const variableText = `\${${variable}}`;
    setEditorContent((prev) => prev + variableText);
  };

  const notFoundTemplate = currentView === "create-templates" && templates.length === 0;

  if (loading) return <></>;

  return notFoundTemplate ? (
    <NoTemplatesFound />
  ) : (
    <div className="h-screen flex flex-col overflow-hidden fit-content">
      {/* Fixed Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Mobile toggle button */}
      <div className="md:hidden flex-shrink-0 p-4 border-b border-gray-200 bg-white">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium"
        >
          {isSidebarOpen ? "Hide Templates" : "Show Templates"}
        </button>
      </div>
      
      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar */}
        <div className={`flex-shrink-0 ${isSidebarOpen ? "block" : "hidden"} md:block md:w-80`}>
          <LeftSidebar
            activeTab={activeTab}
            selectedTemplate={selectedTemplate}
            handelAddTemplate={handleTemplateSelect}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          {/* Header */}
          <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4">
            <div className="mb-3">
              <h2 className="text-lg font-semibold text-gray-900">
                Template Editor
              </h2>
              <p className="text-lg text-gray-500 mt-1">
                Template Variables that can be used in the Email. Example:{"${variable}"}
              </p>
            </div>

            {/* Template Variables */}
            {selectedTemplate && variableTemplate.length > 0 && (
              <div className="flex flex-wrap gap-1 overflow-x-auto">
                {variableTemplate.map((variable) => (
                  <div key={variable} className="flex items-center space-x-1">
                    <button
                      onClick={() => handleVariableInsert(variable)}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {"${" + variable + "}"}
                    </button>
                    <button
                      onClick={() => navigator.clipboard.writeText(`\${${variable}}`)}
                      className="p-0.5 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Copy size={10} className="text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-auto">
            <div className="p-4 h-full">
              {/* Logo Container */}
              <div className="flex items-center justify-center py-4 mb-4">
                <img 
                  src={logoImage} 
                  alt="TipMe Logo" 
                  className="h-16 w-auto" 
                />
              </div>

              {selectedTemplate ? (
                <div className="bg-white shadow-xs h-full flex flex-col">
                  {/* Subject Line */}
                  {selectedTemplate.type === "email" && (
                    <div className="flex-shrink-0 p-3">
                      <h4 className="block font-bold text-xs font-medium text-gray-700 mb-1">
                        Subject<span className="text-red-500">*</span>
                      </h4>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter subject"
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-transparent text-sm"
                      />
                    </div>
                  )}

                  <Editor value={editorContent} onChange={setEditorContent} />

                  {/* Action Buttons */}
                  <div className="flex-shrink-0 p-3">
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <button className="px-4 py-1.5 w-full md:w-[120px] h-[40px] bg-white text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors font-medium text-sm">
                        Reset
                      </button>
                      <button className="px-4 py-1.5 w-full md:w-[120px] h-[40px] bg-white text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors font-medium text-sm">
                        Preview
                      </button>
                      <button 
                        onClick={handelSubmit}
                        className="px-4 py-1.5 w-full md:w-[120px] h-[40px] bg-white text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors font-medium text-sm"
                      >
                        {isNewTemplate ? "Create" : "Update"}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-xs border border-gray-200 h-full flex items-center justify-center p-4 min-h-[400px]">
                  <div className="text-center">
                    <Mail size={32} className="text-gray-300 mx-auto mb-2" />
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      No Template Selected
                    </h3>
                    <p className="text-xs text-gray-500">
                      Choose a template from the sidebar to get started
                    </p>
                    <button
                      onClick={() => setIsSidebarOpen(true)}
                      className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium md:hidden"
                    >
                      Show Templates
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTemplates;