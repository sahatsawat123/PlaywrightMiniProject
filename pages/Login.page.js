import{Page} from "@playwright/test";
export class LoginPage{

    baseURL = 'https://www.saucedemo.com/v1/'

    locatorUsername = '#user-name';
    locatorPassword = '#password';
    locatorButtonLogin = '#id="login-button"';
/**
 * 
 * @param {Page} page 
 */

    constructor(page){
        this.page = page;
    }
    async goto(){
       await this.page.goto(this.baseURL);
    }

    async fillUserPassword(username , password){
        await this.page.locator(this.locatorUsername).fill(username);
        await this.page.locator(this.locatorPassword).fill(password);
    }

    async ClickLogin(){
        await this.page.click(this.locatorButtonLogin);
    }

    async getUsername(){
        return await this.page.locator(this.locatorUsername).inputValue()
    }

    async getPassword(){
        return await this.page.locator(this.locatorPassword).inputValue()
    }
}