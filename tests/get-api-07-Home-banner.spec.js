const { test, expect } = require("@playwright/test")
const signinAPIRequestBody = require('../test-data/post-password-body.json')
let token;

test.describe('Post', () => {
    test('get Home banner',async ({request})=>{
        const Loginresponse = await request.post('https://shop.eco-deals.com/services/api/v1/sign-in',{

            data : signinAPIRequestBody
        });
        const loginData = await Loginresponse.json();
        expect(loginData).toHaveProperty('token');
        token = loginData.token;

        const HomeBannerResponse = await request.get('https://shop.eco-deals.com/services/api/v1/product/banner', {
            headers: {
              'Content-type':'application/json',
              'Cookie' : `jwt=${token}`,
              'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
            }
          });
          const body = await HomeBannerResponse.json();
          expect(body[0]).toHaveProperty("name");
          expect(body[0]).toHaveProperty("description");
          expect(body[0]).toHaveProperty("image");

          const status = HomeBannerResponse.status();
         expect(status).toBe(200);
    })
})

