const axios = require('axios');
const FormData = require('form-data');

async function test() {
  const api = axios.create({ baseURL: 'http://localhost:3000' });
  
  // 1. Create
  const form = new FormData();
  form.append('description', 'Test desc');
  form.append('yearExp', 5);
  form.append('totalProj', 10);
  
  let res = await api.post('/api/abouts', form, { headers: form.getHeaders() });
  console.log('Created:', res.data);
  const id = res.data.id;
  
  // 2. Edit (Update yearExp to 8)
  const form2 = new FormData();
  form2.append('description', 'Test desc edited');
  form2.append('yearExp', 8);
  form2.append('totalProj', 15);
  
  res = await api.put(`/api/abouts/${id}`, form2, { headers: form2.getHeaders() });
  console.log('Updated:', res.data);
  
  res = await api.delete(`/api/abouts/${id}`);
}

test().catch(console.error);
