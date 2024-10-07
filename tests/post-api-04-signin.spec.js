const { test, expect } = require("@playwright/test")
const signinWrongpassword= require('../test-data/post-wrong-password-body.json')

test.describe('Post', () => {
    test('Sign in with wrong Password',async ({request})=>{
        const response = await request.post('https://shop.eco-deals.com/services/api/v1/sign-in',{
            data : signinWrongpassword
        })
        const status = response.status();
        expect(status).toBe(401);
    })
})
