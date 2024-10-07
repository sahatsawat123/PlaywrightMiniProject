const { test, expect } = require("@playwright/test")
const signinAPIRequestBody = require('../test-data/post-password-body.json')
let token;
let Productbodyids;

test.describe('Post', () => {
    test('get Favorite favorite',async ({request})=>{
        const Loginresponse = await request.post('https://shop.eco-deals.com/services/api/v1/sign-in',{
            data : signinAPIRequestBody
        });
        const loginData = await Loginresponse.json();
        expect(loginData).toHaveProperty('token');
        token = loginData.token;

        const ProductFavoriteResponse = await request.get('https://shop.eco-deals.com/services/api/v1/product/favorite', {
            headers: {
              'Content-type':'application/json',
              'Cookie' : `jwt=${token}`,
              'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
            }
          });
          const Productbody = await ProductFavoriteResponse.json();
          expect(Productbody[0]).toHaveProperty("id");
          Productbodyids = Productbody[0].id;

        const DeleteFavorriteResponse = await request.delete(`https://shop.eco-deals.com/services/api/v1/product/favorite/${Productbodyids}`, {
            headers: {
              'Content-type':'application/json',
              'Cookie' : `jwt=${token}`,
              'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
            }
          });
          const body = await DeleteFavorriteResponse.json();
          expect(body).toHaveProperty("message","Delete Favorite Sucesssful")
          console.log(body);

          const status = DeleteFavorriteResponse.status();
          expect(status).toBe(200);
    })
})

