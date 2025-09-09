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


  async getAllTemplates_v2() {
    try {
      const response = await apiService.get('/MarketingTemplate');
      return response.data.map((t) =>
        new TemplateDto(
          t.id,
          t.title,
          t.content,
          this.getTemplateTypeName(t.type),
          this.getTemplateCategoryName(t.category),
          t.variables,
          t.subject
        )
      )
    } catch (error) {
      console.error('Error fetching templates:', error);
      return [];
    }
  }

  async addTemplate(templateDto) {
    try {
      templateDto.type = this.getTemplateTypeNumber(templateDto.type);
      templateDto.category = this.getTemplateCategoryNumber(templateDto.category);
      const response = await apiService.post('/MarketingTemplate', templateDto);
      return response.data;
    } catch (error) {
      console.error('Error adding template:', error);
      return null;
    }
  }

  async updateTemplate(id, templateDto) {
    try {
      templateDto.type = this.getTemplateTypeNumber(templateDto.type);
      templateDto.category = this.getTemplateCategoryNumber(templateDto.category);
      const response = await apiService.put(`/MarketingTemplate/${id}`, templateDto);
      return response.data;
    } catch (error) {
      console.error('Error updating template:', error);
      return null;
    }
  }

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
            t.subject
          )
      )
    );
  }

  async getVariable(name) {
    return [new VariableDto()];
  }

  async sendNotification(data) {
    console.log("send===", data);
    return true;
  }

  async scheduleNotification(data) {
    console.log("send===", data);
    return true;
  }


  getTemplateTypeName = (type) => {
    const typeMap = {
      1: 'email',
      2: 'sms',
      3: 'inapp',
    };
    return typeMap[type] || type;
  }

  getTemplateCategoryName = (category) => {
    const categoryMap = {
      1: 'General',
      2: 'Custom Template',
      3: 'User Template',
    };
    return categoryMap[category] || category;
  }


  getTemplateTypeNumber = (type) => {
    const typeMap = {
      'email': 1,
      'sms': 2,
      'inapp': 3,
    };
    return typeMap[type] || type;
  }

  getTemplateCategoryNumber = (category) => {
    const categoryMap = {
      'General': 1,
      'Custom Template': 2,
      'User Template': 3,
    };
    return categoryMap[category] || category;
  }
}



const marketingService = new MarketingService();
export default marketingService;
