import { UserSchema } from "../schema/get-user-data.schema";
import { CreateUserschema } from "../schema/Create-user-data.schema";
const { test, expect } = require("@playwright/test");
const Ajv = require('ajv');
const { type } = require("os");
const ajv = new Ajv();

const baseURL = 'https://reqres.in'

  
test.describe( 'GET', ()=>{
    test( 'Get User Data' , async({request})=>{
       const Response = await request.get(`${baseURL}/api/users/2`);
       console.log(await Response.json());

       const Status = Response.status();
       console.log(Status);
       expect(Status).toBe(200);
       
       const Header = Response.headers();
       console.log(Header['content-type']);
       expect(Header['content-type']).toContain('application/json');
       
       const body = await Response.json();
       expect(body).toHaveProperty("data");

       const Validate = ajv.compile(UserSchema);
       expect(Validate(body)).toBe(true);
    }
    )   
});


test.describe( 'POST', ()=>{
    test('Post Data User' ,async({request})=>{
        const user = {
            "name": "morpheus",
            "job": "leader"
        }
        const Response = await request.post(`${baseURL}/api/users`,{
            data: user
        });
        console.log(Response.json())

        const Status = Response.status();
       console.log(Status);
       expect(Status).toBe(201);

       const Header = Response.headers();
       console.log(Header['content-type']);
       expect(Header['content-type']).toContain('application/json');

       //schema check
        const body = await Response.json();
        const Validate = ajv.compile(CreateUserschema);
       expect(Validate(body)).toBe(true);
       //Value check
       expect(body).toEqual(expect.objectContaining(user));
    })
});

/*
describe( 'PUT', ()=>{

});
describe( 'DELETE', ()=>{

});
*/