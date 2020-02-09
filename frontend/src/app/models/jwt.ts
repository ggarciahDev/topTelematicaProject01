export class Jwt {
    auth: boolean;
    token: string;

    constructor(){
        this.auth = false;
        this.token = '';
    }
}
