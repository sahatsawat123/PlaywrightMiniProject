//Load playwright module
const { test, expect  } = require("@playwright/test")
const signupAPIDuplicate = require('../test-data/post-email-duplicated.json');

// Write a test
test.describe('Post', () => {
    test('Duplicate sign up error',async ({request})=>{
        const postAPIresponseDuplicate = await request.post('https://shop.eco-deals.com/services/api/v1/sign-up',{
            data : signupAPIDuplicate
        })
        // validate status code
        expect(postAPIresponseDuplicate.status()).toBe(400);

        // validate Json APi response
        const postAPIresponseBody = await postAPIresponseDuplicate.json();
        expect(postAPIresponseBody).toHaveProperty("message","email duplicate")
        
    })
})