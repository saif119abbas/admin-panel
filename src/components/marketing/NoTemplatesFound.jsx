import { FileText } from 'lucide-react';

const NoTemplatesFound = ({ onAddNewTemplate }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border border-gray-200 h-full min-h-[400px]">
      <div className="text-center max-w-md mx-auto">
        {/* Icon */}
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText size={32} className="text-gray-400" />
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Templates Found
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-500 mb-6">
          You haven't created any templates yet. Get started by adding your first template.
        </p>
        
        {/* Add New Template Button */}
        <button
          onClick={onAddNewTemplate}
          className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-full font-medium transition-colors"
        >
          Add New Template
        </button>
      </div>
    </div>
  );
};

export default NoTemplatesFound;