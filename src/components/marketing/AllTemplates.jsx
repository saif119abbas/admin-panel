/* eslint-disable no-template-curly-in-string */
import { useState } from "react";
import { Mail, Copy } from "lucide-react";
import Editor from "./Editor2";
import Navbar from "./Navbar";
import LeftSidebar from "./LeftSidebar";
import { useMarketing } from "../../context/MarketingContext";
import NoTemplatesFound from "./NoTemplatesFound";
import { useSidebar } from "../../context/SidebarContext";
const AllTemplates = () => {
  const [activeTab, setActiveTab] = useState("Email");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentView } = useSidebar();

  const { newTemplateData } = useMarketing();
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setEditorContent(template.content || "");
    setIsSidebarOpen(false);
  };

  const handleVariableInsert = (variable) => {
    const variableText = `{{${variable}}}`;
    setEditorContent((prev) => prev + variableText);
  };
  const notFoundTemplate = currentView === "create-templates" && newTemplateData.length === 0;
  return notFoundTemplate ? (
    <NoTemplatesFound />
  ) : (
    <div className="h-screen flex flex-col  overflow-hidden fit-content ">
      {/* Fixed Navbar */}
      <Navbar
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

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
        {/* Left Sidebar - Fixed width and position */}
        <div
          className={`flex-shrink-0 ${
            isSidebarOpen ? "block" : "hidden"
          } md:block md:w-80`}
        >
          <LeftSidebar
            activeTab={activeTab}
            selectedTemplate={selectedTemplate}
            handleTemplateSelect={handleTemplateSelect}
          />
        </div>

        {/* Main Content - Takes remaining space */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          {/* Header - Fixed */}
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
            {selectedTemplate && (
              <div className="flex flex-wrap gap-1 overflow-x-auto">
                {Array.isArray(selectedTemplate.variables) &&
                  selectedTemplate.variables.map((variable) => (
                    <div key={variable} className="flex items-center space-x-1">
                      <button
                        onClick={() => handleVariableInsert(variable)}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        {"${" + variable + "}"}
                      </button>
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(`{{${variable}}}`)
                        }
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
              <div className="flex items-center justify-center py-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 mb-2 mx-auto flex items-center justify-center">
                    <span className="text-white font-bold text-lg">T</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">TipMe</div>
                </div>
              </div>

              {selectedTemplate ? (
                <div className="bg-white r shadow-xs  h-full flex flex-col">
                  {/* Subject Line */}
                  {selectedTemplate.type === "email" && (
                    <div className="flex-shrink-0 p-3 ">
                      <h4 className="block font-bold text-xs font-medium text-gray-700 mb-1">
                        Subject<span className="text-red-500">*</span>
                      </h4>
                      <input
                        type="text"
                        defaultValue={selectedTemplate.subject || ""}
                        placeholder="Enter"
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-transparent text-sm"
                      />
                    </div>
                  )}

                    <Editor value={editorContent} onChange={setEditorContent} />
              

                  {/* Action Buttons - Fixed at bottom */}
                  <div className="flex-shrink-0 p-3">
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <button className="px-4 py-1.5 w-full md:w-[120px] h-[40px] bg-white text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors font-medium text-sm">
                        Reset
                      </button>
                      <button className="px-4 py-1.5 w-full md:w-[120px] h-[40px] bg-white text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors font-medium text-sm">
                        Preview
                      </button>
                      <button className="px-4 py-1.5 w-full md:w-[120px] h-[40px] bg-white text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors font-medium text-sm">
                        Submit
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
