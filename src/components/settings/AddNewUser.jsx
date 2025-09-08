// src/components/settings/AddNewUser.jsx
import { useState, useEffect } from "react";
import { Camera, ChevronDown } from "lucide-react";
import { useUser } from "../../context/UserContext.jsx";
import InputField from "./InputField.jsx";
import SelectField from "./SelectField.jsx";
import UserRoles from "./UserRoles.jsx";
import Button from "../signIn/Button.jsx";
import AppColors from "../../utils/AppColors.js";
import AppFonts from "../../utils/AppFonts.js";
import { useSettings } from "../../context/SettingsContext.js";
import lookupService from "../../services/lookupService.js";

const AddNewUser = ({ onBack, onSubmit, addUser, updateUser }) => {
  const { selectedUser, validateUserData, error } = useSettings();
  const { clearError } = useUser();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    countryId: "",
    cityId: "",
    mobileNumber: "",
    email: "",
    role: "",
    status: true,
  });

  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryCodeOptions, setCountryCodeOptions] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear error when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  useEffect(() => {
    const fetchCountries = async () => {
      const countryData = await lookupService.getCountries();
      if (countryData && Array.isArray(countryData)) {
        setCountries(countryData);
        const codeOptions = countryData.map(c => ({
          code: c.code.toLowerCase(),
          flag: c.flag,
          phoneCode: c.phoneCode,
          label: c.name
        }));
        setCountryCodeOptions(codeOptions);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedUser && Object.keys(selectedUser).length > 0) {
      let mobile = selectedUser.mobileNumber || '';
      if (selectedUser.mobileNumber && countryCodeOptions.length > 0) {
        const sortedCodes = [...countryCodeOptions].sort((a, b) => (b.phoneCode?.length || 0) - (a.phoneCode?.length || 0));
        const matchedCode = sortedCodes.find(c => c.phoneCode && selectedUser.mobileNumber.startsWith(c.phoneCode));
        if (matchedCode) {
          setSelectedCountryCode(matchedCode.code);
          mobile = selectedUser.mobileNumber.substring(matchedCode.phoneCode.length);
        }
      }

      setFormData({
        firstName: selectedUser.firstName || '',
        lastName: selectedUser.lastName || '',
        birthdate: selectedUser.birthdate || '',
        countryId: selectedUser.country || '',
        cityId: selectedUser.city || '',
        mobileNumber: mobile,
        email: selectedUser.email || '',
        role: selectedUser.role || 0,
        status: selectedUser.status !== undefined ? selectedUser.status : true
      });

      setAvatar(selectedUser.image || null);

      if (selectedUser.country && countries.length > 0) {
        const selectedCountry = countries.find(c => c.id === selectedUser.country);
        if (selectedCountry) {
          setCities(selectedCountry.cities || []);
        }
      }

    } else {
      setFormData({
        firstName: '',
        lastName: '',
        birthdate: '',
        countryId: '',
        cityId: '',
        mobileNumber: '',
        email: '',
        role: 0,
        status: true
      });
      setAvatar(null);
      setCities([]);
    }
  }, [selectedUser, countries]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === 'countryId') {
      const selectedCountry = countries.find(c => c.id === value);
      setCities(selectedCountry ? selectedCountry.cities : []);
      setFormData(prev => ({ ...prev, cityId: '' })); // Reset city
    }

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleStatusToggle = () => {
    if (!isSubmitting) {
      setFormData((prev) => ({
        ...prev,
        status: !prev.status,
      }));
    }
  };
  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          avatar: "Please select a valid image file",
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          avatar: "File size must be less than 5MB",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
        if (errors.avatar) {
          setErrors((prev) => ({
            ...prev,
            avatar: "",
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCountryCodeSelect = (countryCode) => {
    setSelectedCountryCode(countryCode);
    setIsCountryDropdownOpen(false);
  };

  const getSelectedCountryCodeData = () => {
    return countryCodeOptions.find(
      (option) => option.code === selectedCountryCode
    );
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setErrors({});
      console.log("formData", formData);
      const validation = validateUserData(formData);
      if (!validation.isValid) {
        console.log("not valid")
        setErrors(validation.errors);
        return;
      }
      const selectedCountryData = getSelectedCountryCodeData();
      const fullMobileNumber = selectedCountryData?.phoneCode
        ? `${selectedCountryData.phoneCode}${formData.mobileNumber}`
        : formData.mobileNumber;

      const userData = {
        ...formData,
        mobileNumber: fullMobileNumber,
        image: avatar,
        name: `${formData.firstName} ${formData.lastName}`,
        countryDisplay:
          countries.find((c) => c.id === formData.countryId)?.name ||
          formData.countryId,
        city:
          cities.find((c) => c.id === formData.cityId)?.name ||
          formData.cityId,
      };
      userData.status = formData.status ? 1 : 0;
      userData.type = formData.role;
      let savedUser;
      if (selectedUser) {
        savedUser = await updateUser(selectedUser.id, userData);
      } else {
        savedUser = await addUser(userData);
      }

      console.log(
        `User ${selectedUser ? "updated" : "added"} successfully:`,
        savedUser
      );

      if (onSubmit) {
        onSubmit(savedUser);
      }
    } catch (error) {
      console.error("Error saving user:", error);
      setErrors((prev) => ({
        ...prev,
        submit: error.message || "Failed to save user. Please try again.", // Make sure this is a string
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleBackToUsers = () => {
    if (onBack) {
      onBack();
    }
  };

  const getUserDisplayName = () => {
    if (selectedUser && Object.keys(selectedUser).length > 0) {
      if (selectedUser.name) {
        return selectedUser.name;
      }
      return `${selectedUser.firstName || ''} ${selectedUser.lastName || ''}`.trim();
    }
    return 'Add New User';
  };

  const isEditing = selectedUser && Object.keys(selectedUser).length > 0;
  const selectedCountryData = getSelectedCountryCodeData();

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleBackToUsers}
          className="text-gray-600 hover:text-gray-800 cursor-pointer transition-colors"
          style={AppFonts.smSemiBold({ color: AppColors.text })}
        >
          System Users
        </button>
        <span
          className="text-gray-400"
          style={AppFonts.smSemiBold({ color: AppColors.text })}
        >
          /
        </span>
        <span
          className={isEditing ? "text-blue-500" : "text-blue-500"}
          style={AppFonts.smSemiBold({
            color: isEditing ? AppColors.primary : AppColors.primary,
          })}
        >
          {getUserDisplayName()}
        </span>
      </div>

      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h1
          className="text-lg font-bold text-black"
          style={AppFonts.lgBold({ color: AppColors.black })}
        >
          General Details
        </h1>
      </div>

      {/* Form Content */}
      <div className="bg-white">
        <div className="space-y-8">
          {/* User Avatar Section with Status Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div
                className="
                  relative 
                  bg-gray-800 
                  rounded-full 
                  flex items-center justify-center 
                  overflow-hidden
                  flex-shrink-0
                "
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "100px",
                }}
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-8 h-8 text-white" />
                )}
              </div>

              <div>
                <h3
                  className="text-black font-medium"
                  style={AppFonts.smSemiBold({ color: AppColors.black })}
                >
                  User Avatar
                </h3>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                  id="avatar-upload"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="avatar-upload"
                  className={`inline-block mt-2 ${isSubmitting
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                    }`}
                >
                  <span
                    className="
                      px-4 py-2 rounded-full 
                      text-sm font-medium text-white
                      transition-colors
                      hover:opacity-90
                    "
                    style={{
                      backgroundColor: AppColors.primary,
                      ...AppFonts.smMedium({ color: AppColors.white }),
                    }}
                  >
                    {isEditing ? "Change Photo" : "Upload"}
                  </span>
                </label>
              </div>
            </div>

            {/* Status Switch - moved to right side */}
            <div className="flex flex-col items-center">
              <div
                className={`w-24 h-24 bg-green-100 rounded-lg flex flex-col items-center justify-center ${isSubmitting
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                  }`}
                onClick={handleStatusToggle}
              >
                <span
                  className="text-xs font-medium mb-2"
                  style={AppFonts.smMedium({ color: AppColors.black })}
                >
                  Status
                </span>
                <div
                  className={`
                    w-12 h-6 rounded-full relative transition-colors duration-200
                    ${formData.status ? "bg-green-500" : "bg-gray-300"}
                  `}
                >
                  <div
                    className={`
                      w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200
                      ${formData.status ? "translate-x-6" : "translate-x-0.5"}
                    `}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* First Name */}
            <InputField
              label="First Name"
              placeholder="Enter"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              required
              error={errors?.firstName}
              disabled={isSubmitting}
            />

            {/* Last Name */}
            <InputField
              label="Last Name"
              placeholder="Enter"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              required
              error={errors?.lastName}
              disabled={isSubmitting}
            />

            {/* Date of Birth */}
            <InputField
              label="Date of Birth"
              type="date"
              placeholder="Select"
              value={formData.birthdate}
              onChange={(e) => handleInputChange("birthdate", e.target.value)}
              error={errors?.birthdate}
              disabled={isSubmitting}
            />

            {/* Country */}
            <SelectField
              label="Country"
              placeholder="Select"
              value={formData.countryId}
              onChange={(option) => handleInputChange("countryId", option.value)}
              options={countries.map(c => ({ value: c.id, label: c.name }))}
              required
              error={errors?.countryId}
              disabled={isSubmitting}
            />

            {/* City */}
            <SelectField
              label="City"
              placeholder="Select"
              value={formData.cityId}
              onChange={(option) => handleInputChange("cityId", option.value)}
              options={cities.map(c => ({ value: c.id, label: c.name }))}
              required
              error={errors?.cityId}
              disabled={isSubmitting || !formData.countryId} // Disable if no country is selected
            />

            {/* Phone Number with Country Code Dropdown */}
            <div className="flex flex-col">
              <label
                className="mb-2 text-sm font-medium text-black"
                style={AppFonts.smMedium({ color: AppColors.black })}
              >
                Phone Number
                <span className="text-red-500">*</span>
              </label>

              {/* Phone Field Container with consistent width */}
              <div
                className={`
                w-full h-12
                bg-white border rounded-lg
                ${errors?.mobileNumber ? "border-red-500" : "border-gray-200"}
              `}
              >
                <div className="flex h-full p-2">
                  <div className="relative">
                    <div
                      className={`
                        flex items-center px-2 h-full
                        bg-gray-100 rounded-md
                        hover:bg-gray-200
                        ${isSubmitting
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                        }
                      `}
                      onClick={
                        !isSubmitting
                          ? () =>
                            setIsCountryDropdownOpen(!isCountryDropdownOpen)
                          : undefined
                      }
                    >
                      <div
                        className="w-6 h-4 mr-2 overflow-hidden flex items-center justify-center"
                        style={{ borderRadius: "4px" }}
                      >
                        <span className="text-sm">
                          {selectedCountryData?.flag}
                        </span>
                      </div>
                      <span
                        className="text-black font-medium mr-1 text-sm"
                        style={AppFonts.smMedium({ color: AppColors.black })}
                      >
                        {selectedCountryData?.phoneCode}
                      </span>
                      <ChevronDown className="w-3 h-3 text-gray-400" />
                    </div>

                    {isCountryDropdownOpen && !isSubmitting && (
                      <div
                        className="absolute top-full left-0 z-50 mt-1"
                        style={{ minWidth: "200px" }}
                      >
                        <div
                          className="bg-gray-100 rounded-lg shadow-lg"
                          style={{
                            border: "6px solid #f3f4f6",
                            borderRadius: "12px",
                          }}
                        >
                          <div className="bg-white rounded-md overflow-hidden">
                            {countryCodeOptions.map((option) => (
                              <div
                                key={option.code}
                                className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                                onClick={() =>
                                  handleCountryCodeSelect(option.code)
                                }
                              >
                                <div
                                  className="w-6 h-4 mr-2 overflow-hidden flex items-center justify-center"
                                  style={{ borderRadius: "4px" }}
                                >
                                  <span className="text-sm">{option.flag}</span>
                                </div>
                                <span
                                  className="text-black font-medium mr-2"
                                  style={AppFonts.smMedium({
                                    color: AppColors.black,
                                  })}
                                >
                                  {option.phoneCode}
                                </span>
                                <span
                                  className="text-gray-600 text-sm"
                                  style={AppFonts.smRegular({
                                    color: AppColors.gray,
                                  })}
                                >
                                  {option.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Phone Number Input */}
                  <input
                    type="tel"
                    placeholder="Enter"
                    value={formData.mobileNumber}
                    onChange={(e) =>
                      handleInputChange("mobileNumber", e.target.value)
                    }
                    disabled={isSubmitting}
                    className={`
                      flex-1 h-full px-3 ml-2
                      bg-transparent border-none
                      outline-none
                      ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                    style={{
                      ...AppFonts.mdRegular({ color: AppColors.black }),
                    }}
                  />
                </div>
              </div>

              {errors?.mobileNumber && (
                <span
                  className="mt-1 text-sm text-red-500"
                  style={{ color: AppColors.danger }}
                >
                  {errors.mobileNumber}
                </span>
              )}
            </div>

            {/* Email Address */}
            <InputField
              label="Email Address"
              type="email"
              placeholder="Enter"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              error={errors?.emailAddress}
              disabled={isSubmitting}
            />
          </div>

          {/* User Roles Section */}
          <UserRoles
            label="User Roles"
            selectedRole={formData.role}
            onChange={(role) => handleInputChange("role", role)}
            required
            error={errors?.role}
            disabled={isSubmitting}
          />

          {/* Avatar Error */}
          {errors?.avatar && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{errors.avatar}</p>
            </div>
          )}

          {/* Submit Error */}
          {errors?.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Context Error */}
          {error && typeof error === "string" && error.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {error &&
            typeof error === "object" &&
            Object.keys(error).length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                {Object.entries(error).map(([key, value]) => (
                  <p key={key} className="text-red-600 text-sm">
                    {value}
                  </p>
                ))}
              </div>
            )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <div className="w-auto">
              <Button
                onClick={handleCancel}
                backgroundColor={AppColors.white}
                borderColor={AppColors.primary}
                textColor={AppColors.primary}
                showIcon={false}
                fullWidth={false}
                className="px-8 py-3 h-12 rounded-full"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>

            <div className="w-auto">
              <Button
                onClick={handleSubmit}
                backgroundColor={AppColors.primary}
                borderColor={AppColors.primary}
                textColor={AppColors.white}
                showIcon={false}
                fullWidth={false}
                className="px-8 py-3 h-12 rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </div>
                ) : isEditing ? (
                  "Update"
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isCountryDropdownOpen && !isSubmitting && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsCountryDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default AddNewUser;
