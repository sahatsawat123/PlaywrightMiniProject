const { test, expect } = require("@playwright/test")
const AddressBodyInput = require('../test-data/post-address-body.json')
require('dotenv').config();
const token = process.env.TOKEN;

test.describe('Post', () => {
    test('Post Address address',async ({request})=>{
        const AddressBodyResponse = await request.post('https://shop.eco-deals.com/services/api/v1/address', {
            headers: {
              'content-type':'application/json',
              'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
            },
            data : AddressBodyInput
          });
          const body = await AddressBodyResponse.json();
          expect(body).toHaveProperty("message","Create Address Successful");

          const status = AddressBodyResponse.status();
          expect(status).toBe(200);
    })
})

