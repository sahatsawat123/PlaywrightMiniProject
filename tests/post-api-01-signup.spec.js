//Load playwright module
const { test, expect  } = require("@playwright/test")
const signupAPIRequestBody = require('../test-data/post-email-body.json');

// Write a test
test.describe('Post', () => {
    test('User can sign up successfully',async ({request})=>{
        const postAPIresponse = await request.post('https://shop.eco-deals.com/services/api/v1/sign-up',{
            data : signupAPIRequestBody
        })

        // validate status code
        expect(postAPIresponse.status()).toBe(200);

        // validate Json APi response
        const postAPIresponseBody = await postAPIresponse.json();
        expect(postAPIresponseBody).toHaveProperty("message","Sign-Up Successfully")
        
    })
})