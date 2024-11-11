const axios = require("axios");


const BACKENED_URL="http://127.0.0.1:3000"

describe("Authentication",()=>{
  test('User SignUp only once',async () => { 
    const userName="madhur"+Math.random();
    const password=123456;
    const res=await axios.post(`${BACKENED_URL}/api/v1/user/signup`,{
      userName,
      password,
      type:"admin"
    })
    expect(res.status).toBe(200);
    //again singup using same data
    const updatedRes=await axios.post(`${BACKENED_URL}/api/v1/user/signup`,{
      userName,
      password,
      type:"admin"
    })
    expect(updatedRes.status).toBe(400);
   })
  
  test("User SignIn with correct cred",async()=>{
    const userName=`madhur${Math.random()}`;
    const password=123456;
    await axios.post(`${BACKENED_URL}/api/v1/user/signup`,{
      userName,
      password,
      type:"admin"
    })
    
    const res=await axios.post(`${BACKENED_URL}/api/v1/user/signin`,{
      userName,
      password,
    })
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  })
})

describe("User Information EndPoiints",()=>{
  let token="";
  let avatarId="";
  beforeAll(async()=>{
    const userName=`madhur${Math.random()}`;
    const password=123456;
    await axios.post(`${BACKENED_URL}/api/v1/user/signup`,{
      userName,
      password,
      type:"admin"
    })
    
    const res=await axios.post(`${BACKENED_URL}/api/v1/user/signin`,{
      userName,
      password,
    })
    token=res.data.token;



    const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, {
      "imageUrl": "https://api.dicebear.com/9.x/avataaars/svg?mouth=smile&seed=Timm",
      "name": "Timm"
  },{
    headers:{
      "Authorization":`Bearer ${token}`
    }
  })
    avatarId=avatarResponse.data.avatarId;

  })

  
  test('User cant update their metaData with a wrong  avatar id', async() => {
    const response = await axios.post(`${BACKENED_URL}/api/v1/user/metadata`, {
      avatarId: "123123123"
  },{
    headers:{
      "Authorization":`Bearer ${token}`
    }
  })

  expect(response.status).toBe(400)
  })

  test('User cant update their metaData with a right  avatar id', async() => {
    const response = await axios.post(`${BACKENED_URL}/api/v1/user/metadata`, {
      avatarId
  },{
    headers:{
      "Authorization":`Bearer ${token}`
    }
  })

  expect(response.status).toBe(200)
  })



})