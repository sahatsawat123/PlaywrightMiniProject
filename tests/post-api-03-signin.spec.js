const { test, expect } = require("@playwright/test")
const signinAPIRequestBody = require('../test-data/post-password-body.json')

test.describe('Post', () => {
    test('Sign in successfully',async ({request})=>{
        const response = await request.post('https://shop.eco-deals.com/services/api/v1/sign-in',{
            data : signinAPIRequestBody
        })
        const status = response.status();
        expect(status).toBe(200);

        const header = response.headers();
        console.log(header['content-type']);
        expect(header['content-type']).toContain('application/json');

        const body = await response.json();
        expect(body).toHaveProperty('token');

    })
})
