const { test, expect } = require("@playwright/test")
const signinAPIRequestBody = require('../test-data/post-password-body.json')
const favoriteAPIInputBody = require('../test-data/post-favorite-body.json')
let token;

test.describe('Patch', () => {
    test('post favorite body',async ({request})=>{
        const Loginresponse = await request.post('https://shop.eco-deals.com/services/api/v1/sign-in',{
            data : signinAPIRequestBody
        });
        const loginData = await Loginresponse.json();
        expect(loginData).toHaveProperty('token');
        token = loginData.token;

        const PostfavoriteResponse = await request.post('https://shop.eco-deals.com/services/api/v1/product/favorite', {
            headers: {
              'content-type':'application/json',
              'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
            },
            data : favoriteAPIInputBody
          });
          const body = await PostfavoriteResponse.json();
          expect(body).toHaveProperty("message","Create Favorite Successful")
          console.log(body);

          const status = PostfavoriteResponse.status();
          expect(status).toBe(200);
    })
})

