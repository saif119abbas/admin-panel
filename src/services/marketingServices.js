import { TemplateDto } from "../dtos/marketingDto/templateDto";
import { VariableDto } from "../dtos/marketingDto/variableDto";
import { UsersListDto } from "../dtos/marketingDto/usersListDto";
import { apiService } from "../api/apiService";


const mockUsers = [
  new UsersListDto(
    1,
    "Lourdee Quintero",
    "tienlopspktnd@gmail.com",
    "+1 613 555 0143",
    "Poland",
    "Cincinnati (OH)",
  ),
  new UsersListDto(
    2,
    "Leatrice Handler",
    "tramthuy.nute@gmail.com",
    "+1 202 555 0125",
    "Saudi Arabia",
    "Aurora (IL)",
  ),
  new UsersListDto(
    3,
    "Johnsie Jock",
    "manhhoakt08@gmail.com",
    "+65 1552 4968",
    "South Africa",
    "Naltchik",
  ),
  new UsersListDto(
    4,
    "Hannah Burress",
    "trungkienspktnd@gmail.com",
    "+1 613 555 0188",
    "Palestine, State of",
    "Cologne",
  ),
  new UsersListDto(
    5,
    "Rachel Foose",
    "binhan628@gmail.com",
    "+65 9860 0772",
    "Guinea",
    "Volzhsky",
  ),
  new UsersListDto(
    6,
    "Tyra Dhillon",
    "thuhang.nute@gmail.com",
    "+1 202 555 0107",
    "Réunion",
    "La Plata",
  ),
  new UsersListDto(
    7,
    "Merci Senter",
    "donghoscnd76@gmail.com",
    "+1 613 555 0175",
    "Israel",
    "North Las Vegas (NV)",
  ),
];

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

    async getUsers(name)
  {
    return mockUsers
  }
  async sendNotification(data)
  {
    console.log("send===",data)
    return true

  async sendNotification(data) {
    console.log("send===", data);
    return true;
  }

  async scheduleNotification(data) {
    console.log("send===", data);
    return true;
  }

  async addTemplate(templateDto) {
    console.log(templateDto);
    return true;
  }

  async updateTemplate(id, template) {
    console.log("update template=", template);
    return true;
  }
}

const marketingService = new MarketingService();
export default marketingService;
