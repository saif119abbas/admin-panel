import { TemplateDto } from "../dtos/marketingDto/templateDto";
import { VariableDto } from "../dtos/marketingDto/variableDto";
import { apiService } from "../api/apiService";
const templateData = {
  newTemplateData: [
    {
      name: "Custom Templates",
      templates: [
        {
          id: "tip-received",
          title: "You Just Got Tipped!",
          description: "Tip notification for service providers",
          category: "Custom Templates",
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
          category: "Custom Templates",
          type: "email",
          variables: ["user_name", "service_provider"],
          subject: "Don't forget to show your appreciation",
          content:
            "Hi {{user_name}}, don't forget to tip {{service_provider}} for their great service!",
        },
        {
          id: "more's-tip",
          title: "Wnats More Tips? Here's How!",
          description: "Gentle reminder for tipping",
          category: "Custom Templates",
          type: "email",
          variables: ["user_name", "service_provider"],
          subject: "Don't forget to show your appreciation",
          content:
            "Hi {{user_name}}, don't forget to tip {{service_provider}} for their great service!",
        },
      ],
    },
  ],
  inappTemplates: [
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
  ],
  smsTemplates: [
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
  ],
  emailTemplates: [
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
  ],
};
class MarketingService {
  constructor() {}

  async getAllTemplates() {
    const { newTemplateData, inappTemplates, smsTemplates, emailTemplates } =
      templateData;

    // Combine all arrays into one
    const allGroups = [
      ...newTemplateData,
      ...inappTemplates,
      ...smsTemplates,
      ...emailTemplates,
    ];

    // Flatten templates and map to TemplateDto
    return allGroups.flatMap((group) =>
      group.templates.map(
        (t) =>
          new TemplateDto(
            t.id,
            t.title,
            t.content,
            t.type,
            t.category,
            t.variables,
            t.subjuct
          )
      )
    );
    /*  try {
            const pageNumber = filters.pageNumber || 1;
            const pageSize = filters.pageSize || 10;
            const response = await apiService.post(`/TipReceiver?pageNumber=${pageNumber}&pageSize=${pageSize}`, filters);
            return response.data;
        } catch (error) {
            console.error('Error fetching tip receivers:', error);
            return [];
        }*/
  }
  async getVariable(name)
  {
    return [new VariableDto()]
  }
  async sendNotification(data)
  {
    console.log("send===",data)
    return true
  }

   async scheduleNotification(data)
  {
    console.log("send===",data)
    return true
  }
  async addTemplate(templateDto)
  {
    console.log(templateDto)
    return true
  }
  async updateTemplate(id, template) {
    console.log("update template=", template);
    return true;
    /*  try {
            const response = await apiService.put(`/TipReceiver/PaymentInfo/${id}`, {
                accountHolderName: paymentInfoDto.accountHolderName,
                IBAN: paymentInfoDto.IBAN,
                bankName: paymentInfoDto.bankName,
                bankCountryId: paymentInfoDto.countryId
            });
            if (response.success) {
                return true;
            } else {
                console.error('Error updating payment info by tip receiver ID:', response.message);
                return false;
            }
        } catch (error) {
            console.error('Error updating payment info by tip receiver ID:', error);
            return false;
        }*/
  }
}

export default new MarketingService();
