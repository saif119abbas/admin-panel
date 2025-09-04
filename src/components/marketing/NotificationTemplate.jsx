import { useState } from 'react';
import { Mail } from 'lucide-react';
import Editor from './Editor';
import Navbar from './Navbar';
import LeftSidebar from './LeftSidebar';

const NotificationTemplate = () => {
  const [activeTab, setActiveTab] = useState('email');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editorContent, setEditorContent] = useState('');

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setEditorContent(template.content || '');
  };



  return (
    <div className="flex flex-col h-full bg-gray">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main content area */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
       <LeftSidebar 
          activeTab={activeTab}
          selectedTemplate={selectedTemplate}
          handleTemplateSelect={handleTemplateSelect}
       />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          {/* Header */}


            <div className="flex-1 p-4">
             <div className="flex items-center justify-center py-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mb-2 mx-auto flex items-center justify-center">
                      <span className="text-white font-bold text-lg">T</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">TipMe</div>
                  </div>
             </div>
            {selectedTemplate ? (
              <div className="bg-white rounded-lg shadow-xs h-full flex flex-col">
                {/* Subject Line */}
                {selectedTemplate.type === 'email' && (
                  <div className="p-3">
                    <h4 className="block text-xs font-medium text-gray-700 mb-1">
                      Subject<span className="text-red-500">*</span>
                    </h4>
                    <input
                      type="text"
                      defaultValue={selectedTemplate.subject || ''}
                      placeholder="Enter"
                      className="w-full px-2 py-1.5 border border-gray rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-transparent text-sm"
                    />
                  </div>
                )}
               <div className='border-2 border-gray-200 rounded-xl '>
                  <Editor value={editorContent}  onChange={setEditorContent}/>
                </div>
              
                {/* Action Buttons */}
                <div className="p-3">
                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-1.5 w-[120px] h-[40px]  bg-white  text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors font-medium text-sm">
                      Reset
                    </button>
                    <button className="px-4 py-1.5 w-[120px] h-[40px]  bg-white text-primary border border-primary  rounded-full hover:bg-primary hover:text-white transition-colors font-medium text-sm">
                      Preview
                    </button>
                    <button className="px-4 py-1.5  w-[120px] h-[40px]  bg-white  text-primary border border-primary  rounded-full hover:bg-primary hover:text-white transition-colors font-medium text-sm">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-xs border border-gray-200 h-full flex items-center justify-center">
                <div className="text-center">
                  <Mail size={32} className="text-gray-300 mx-auto mb-2" />
                  <h3 className="text-sm font-medium text-gray-900 mb-1">No Template Selected</h3>
                  <p className="text-xs text-gray-500">Choose a template from the sidebar to get started</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationTemplate;