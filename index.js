const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 5000;

// ตั้งค่า Supabase
const supabaseUrl = 'https://crfvyrhqnavnghakvhtd.supabase.co'; // เปลี่ยนเป็น URL ของคุณ
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyZnZ5cmhxbmF2bmdoYWt2aHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4MDg5NTQsImV4cCI6MjA0MjM4NDk1NH0.jrS_o_31vqZSPcBxO-zumdRlrilDNeeHpoQ77ZPiP64'; // เปลี่ยนเป็น API Key ของคุณ
const supabase = createClient(supabaseUrl, supabaseKey);

// ใช้งาน cors middleware
app.use(cors());

// เส้นทางหลัก (root path)
app.get('/', (req, res) => {
  res.send('Hello from the Node.js backend form supabase!');
});

// เส้นทางสำหรับ API
app.get('/api/users', async (req, res) => {
  const { data, error } = await supabase
    .from('users') // ชื่อตารางใน Supabase
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  
  res.json(data);
});

app.get('/api/user/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return res.status(404).json({ message: 'ไม่พบผู้ใช้งาน' });
  }

  res.json(data);
});

app.listen(port, () => {
  console.log(`เซิร์ฟเวอร์ทำงานบนพอร์ต ${port}`);
});
