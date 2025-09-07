export class TemplateDto {
    constructor(id,name,content,type,category,allowedVariabels,subject) {
        this.id = id;
        this.name = name;
        this.content = content;
        this.type = type;
        this.category = category;
        this.allowedVariabels = allowedVariabels;
        this.subject = subject;
    }
}