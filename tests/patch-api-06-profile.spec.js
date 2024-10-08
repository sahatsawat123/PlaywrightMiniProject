const { test, expect } = require("@playwright/test")
const signinAPIRequestBody = require('../test-data/post-password-body.json')
const PatchAPIRequestBody = require('../test-data/patch-api-profile.json')
let token;

test.describe('Patch', () => {
    test('get token and patch data profile',async ({request})=>{
        const Loginresponse = await request.post('https://shop.eco-deals.com/services/api/v1/sign-in',{
            data : signinAPIRequestBody
        });
        const loginData = await Loginresponse.json();
        expect(loginData).toHaveProperty('token');
        token = loginData.token;

        const patchprofileResponse = await request.patch('https://shop.eco-deals.com/services/api/v1/profile', {
            headers: {
              'content-type':'application/json',
              'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
            },
            data : PatchAPIRequestBody
          });
          const body = await patchprofileResponse.json();
          expect(body).toHaveProperty("message","Update Profile Sucesssful")

          const status = patchprofileResponse.status();
          expect(status).toBe(200);
    })
})

