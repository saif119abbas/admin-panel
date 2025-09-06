import { useState } from "react";
import { ChevronDown } from "lucide-react";
import AppColors from "../utils/AppColors";

export default function TicketDetails() {
  const [status, setStatus] = useState("In Progress");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const statusOptions = ["In Progress", "Open", "Resolved", "Closed"];

  const getStatusStyle = (statusValue) => {
    switch (statusValue) {
      case "In Progress":
        return {
          backgroundColor: AppColors.status.inProgress.background,
          color: AppColors.status.inProgress.text,
        };
      case "Open":
        return {
          backgroundColor: AppColors.status.pending.background,
          color: AppColors.status.pending.text,
        };
      case "Resolved":
      case "Closed":
        return {
          backgroundColor: AppColors.status.active.background,
          color: AppColors.status.active.text,
        };
      default:
        return {
          backgroundColor: AppColors.status.pending.background,
          color: AppColors.status.pending.text,
        };
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="bg-gray rounded-xl p-6  border border-gray-100">
        <h2 className="text-lg  bg-gray font-semibold text-gray-900 mb-6">
          Ticket Details
        </h2>
        <div className="grid grid-cols-1 bg-gray md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Ticket Number
            </label>
            <p className="font-semibold text-gray-900">#TCK-00123</p>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Created On
            </label>
            <p className="font-medium text-gray-900">25 Jul 2025, 4:00 PM</p>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Resolved On
            </label>
            <p className="font-medium text-gray-900">-</p>
          </div>

          {/* Second Row */}
          <div className="bg-gray">
            <label className="block text-sm text-gray-600 mb-1">
              Started By
            </label>
            <p className="font-medium text-gray-900">Barbara Gordon</p>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Issue Type
            </label>
            <p className="font-medium text-gray-900">Tip Issue</p>
          </div>

          <div className="flex items-end justify-between">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Status</label>
              <div className="relative">
                <button
                  onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                  style={getStatusStyle(status)}
                >
                  {status}
                  <ChevronDown size={14} />
                </button>

                {isStatusDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                    {statusOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setStatus(option);
                          setIsStatusDropdownOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button className="ml-4 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Reason & Message Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Reason & Message
        </h2>

        <div className="space-y-4">
          <p className="text-gray-600 text-sm leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting.
          </p>

          <p className="text-gray-600 text-sm leading-relaxed">
            Remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
    </div>
  );
}
