const { test, expect } = require("@playwright/test")
const signinAPIRequestBody = require('../test-data/post-password-body.json')
let token;
let Addressbodyids;

test.describe('Delete', () => {
    test('Delete Address Address',async ({request})=>{
        const Loginresponse = await request.post('https://shop.eco-deals.com/services/api/v1/sign-in',{
            data : signinAPIRequestBody
        });
        const loginData = await Loginresponse.json();
        expect(loginData).toHaveProperty('token');
        token = loginData.token;

        const addressResponse = await request.get('https://shop.eco-deals.com/services/api/v1/address', {
            headers: {
              'Content-type':'application/json',
              'Cookie' : `jwt=${token}`,
              'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
            }
          });
          const Addressbody = await addressResponse.json();
          expect(Addressbody[0]).toHaveProperty("id");
          Addressbodyids = Addressbody[0].id;

        const DeleteAddressResponse = await request.delete(`https://shop.eco-deals.com/services/api/v1/address/${Addressbodyids}`, {
            headers: {
              'Content-type':'application/json',
              'Cookie' : `jwt=${token}`,
              'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
            }
          });
          const body = await DeleteAddressResponse.json();
          expect(body).toHaveProperty("message","Delete Address Sucesssful")

          const status = DeleteAddressResponse.status();
          expect(status).toBe(200);
    })
})

