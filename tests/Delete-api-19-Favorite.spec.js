const { test, expect } = require("@playwright/test")
require('dotenv').config();
const token = process.env.TOKEN;
let Productbodyids;

test.describe('Delete', () => {
    test('get Favorite favorite',async ({request})=>{
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

          const status = DeleteFavorriteResponse.status();
          expect(status).toBe(200);
    })
})

