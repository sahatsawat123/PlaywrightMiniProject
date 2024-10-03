import { test as base } from "@playwright/test"
import { LoginPage } from "./Login.page"

type basefixtures = {
    loginPage : LoginPage;
}

export const test = base.extend<basefixtures>({
    loginPage : async ({ page }, use) => {
        await use(new LoginPage(page));
    }

})