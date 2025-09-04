const emailTemplates = [
  {
    name: "General",
    templates: [
      {
        id: "reg-client",
        title: "Registration / Client",
        description: "Welcome email for new client registrations",
        category: "General",
        type: "email",
        variables: ["user_name", "company_name", "reset_link"],
        subject: "Welcome to {{company_name}}!",
        content:
          "Hello {{user_name}}, welcome to {{company_name}}! Please click {{reset_link}} to get started.",
      },
      {
        id: "reg-pt",
        title: "Registration / PT",
        description: "Welcome email for personal trainers",
        category: "General",
        type: "email",
        variables: ["user_name", "company_name"],
        subject: "Welcome to the team!",
        content: "Hi {{user_name}}, welcome to {{company_name}} team!",
      },
      {
        id: "forgot-pwd",
        title: "Forgot Password",
        description: "Password reset request email",
        category: "General",
        type: "email",
        variables: ["reset_link", "user_name"],
        subject: "Reset your password",
        content:
          "Hello {{user_name}}, click {{reset_link}} to reset your password.",
      },
    ],
  },
  {
    name: "User Template",
    templates: [
      {
        id: "reset-mfa",
        title: "Reset Multi Factor Authentication",
        description: "MFA reset notification",
        category: "User Template",
        type: "email",
        variables: ["user_name", "reset_link"],
        subject: "MFA Reset Required",
        content:
          "Hi {{user_name}}, your MFA has been reset. Use {{reset_link}} to set up again.",
      },
      {
        id: "confirm-email",
        title: "Confirm Email",
        description: "Email address confirmation",
        category: "User Template",
        type: "email",
        variables: ["user_name", "confirmation_link"],
        subject: "Please confirm your email",
        content:
          "Hello {{user_name}}, please confirm your email by clicking {{confirmation_link}}.",
      },
    ],
  },
  {
    name: "Customer Template",
    templates: [
      {
        id: "tip-received",
        title: "You Just Got Tipped!",
        description: "Tip notification for service providers",
        category: "Customer Template",
        type: "email",
        variables: ["user_name", "tip_amount", "client_name"],
        subject: "New tip received!",
        content:
          "Great news {{user_name}}! You received a {{tip_amount}} tip from {{client_name}}.",
      },
      {
        id: "tip-reminder",
        title: "Forget to Tip? There's Still Time!",
        description: "Gentle reminder for tipping",
        category: "Customer Template",
        type: "email",
        variables: ["user_name", "service_provider"],
        subject: "Don't forget to show your appreciation",
        content:
          "Hi {{user_name}}, don't forget to tip {{service_provider}} for their great service!",
      },
    ],
  },
];

const smsTemplates = [
  {
    name: "General",
    templates: [
      {
        id: "sms-welcome",
        title: "Welcome SMS",
        description: "Welcome message for new users",
        category: "General",
        type: "sms",
        variables: ["user_name"],
        content: "Welcome {{user_name}}! Thanks for joining us.",
      },
    ],
  },
];

const inappTemplates = [
  {
    name: "General",
    templates: [
      {
        id: "inapp-notification",
        title: "General Notification",
        description: "In-app notification template",
        category: "General",
        type: "inapp",
        variables: ["user_name", "message"],
        content: "Hi {{user_name}}, {{message}}",
      },
    ],
  },
];
export default function LeftSidebar({
  activeTab,
  selectedTemplate,
  handleTemplateSelect,
}) {
  const getCurrentTemplates = () => {
    switch (activeTab) {
      case "email":
        return emailTemplates;
      case "sms":
        return smsTemplates;
      case "inapp":
        return inappTemplates;
      default:
        return [];
    }
  };
  const currentTemplates = getCurrentTemplates();
  const safeTemplates = Array.isArray(currentTemplates) ? currentTemplates : [];

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 rounded-lg h-[100vh] flex flex-col overflow-hidden">
      <h1>{selectedTemplate?.title}</h1>
      {/* Template Categories */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {safeTemplates.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-lg shadow-xs border border-gray-200"
            >
              <div className="px-3 py-2 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">
                  {category.name}
                </h3>
              </div>
              <div className="p-1">
                {Array.isArray(category.templates) &&
                  category.templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateSelect(template)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedTemplate?.id === template.id
                          ? "bg-cyan-50 text-cyan-700 border border-cyan-200"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <div className="font-medium text-sm">
                        {template.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {template.description}
                      </div>
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
