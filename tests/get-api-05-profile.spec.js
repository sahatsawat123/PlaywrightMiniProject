const { test, expect } = require("@playwright/test")
const signinAPIRequestBody = require('../test-data/post-password-body.json')
let token;

test.describe('Get', () => {
    test('get token and get profile',async ({request})=>{
        const Loginresponse = await request.post('https://shop.eco-deals.com/services/api/v1/sign-in',{

            data : signinAPIRequestBody
        });
        const loginData = await Loginresponse.json();
        expect(loginData).toHaveProperty('token');
        token = loginData.token;
        console.log(token);

        const profileResponse = await request.get('https://shop.eco-deals.com/services/api/v1/profile', {
            headers: {
              'Content-type':'application/json',
              'Cookie' : `jwt=${token}`,
              'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
            }
          });
          const body = await profileResponse.json();
          expect(body[0]).toHaveProperty("first_name");
          expect(body[0]).toHaveProperty("last_name");
          expect(body[0]).toHaveProperty("mobile");
          expect(body[0]).toHaveProperty("sex");
          expect(body[0]).toHaveProperty("status");
          expect(body[0]).toHaveProperty("image");
          expect(body[0]).toHaveProperty("user_id");

          const status = profileResponse.status();
         expect(status).toBe(200);
    })
})

