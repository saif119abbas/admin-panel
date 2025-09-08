// src/components/CustomerSupport/modals/FilterModal.jsx
import { ChevronDown, Calendar } from "lucide-react";
import { useState } from "react";
import ActionButton from "../Users/common/ActionButton";

const FilterModal = ({ isOpen, onClose, onApplyFilters, currentFilters }) => {
  const [filters, setFilters] = useState({
    country: currentFilters.country || "",
    city: currentFilters.city || "",
    startDate: currentFilters.startDate || "",
    endDate: currentFilters.endDate || "",
    status: currentFilters.status || "",
  });

  const countryOptions = ["All Countries", "USA", "UK", "Germany", "UAE", "Poland"];

  const cityOptions = {
    USA: ["New York", "Los Angeles", "Chicago"],
    UK: ["London", "Manchester", "Birmingham"],
    Germany: ["Berlin", "Munich", "Hamburg"],
    UAE: ["Dubai", "Abu Dhabi", "Sharjah"],
    Poland: ["Warsaw", "Krakow", "Gdansk"],
  };

  const statusOptions = ["All Status", "Pending", "In-progress", "Resolved"];

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
      ...(filterType === "country" ? { city: "" } : {}), // reset city if country changes
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleCancel = () => {
    setFilters({
      country: "",
      city: "",
      startDate: "",
      endDate: "",
      status: "",
    });
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="pt-5 px-4 pb-0">
          <h3 className="text-lg font-semibold text-gray-900">Filter</h3>
        </div>

        {/* Filter Options */}
        <div className="flex-1 p-4 pt-2 space-y-6 overflow-y-auto">
          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <div className="relative">
              <select
                value={filters.country}
                onChange={(e) => handleFilterChange("country", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none pr-10"
              >
                <option value="">Select</option>
                {countryOptions.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <div className="relative">
              <select
                value={filters.city}
                onChange={(e) => handleFilterChange("city", e.target.value)}
                disabled={!filters.country}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none pr-10 disabled:bg-gray-100"
              >
                <option value="">Select</option>
                {filters.country &&
                  cityOptions[filters.country]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <div className="flex space-x-2">
              <div className="relative w-1/2">
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) =>
                    handleFilterChange("startDate", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent [&::-webkit-calendar-picker-indicator]:opacity-0"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative w-1/2">
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) =>
                    handleFilterChange("endDate", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent [&::-webkit-calendar-picker-indicator]:opacity-0"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="relative">
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none pr-10"
              >
                <option value="">Select</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="mt-6 flex space-x-3">
            <ActionButton variant="secondary" onClick={handleCancel} fullWidth>
              Cancel
            </ActionButton>
            <ActionButton variant="primary" onClick={handleApply} fullWidth>
              Submit
            </ActionButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;
