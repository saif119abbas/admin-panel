export class UsersListDto {
    constructor(id,name,email,phone,country,city) {
        this.id = id;
        this.email = email;
        this.phone = phone;
        this.name = name;
        this.country = country;
        this.city = city;
    }
}