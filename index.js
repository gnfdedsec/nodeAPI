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
// ตั้งค่า middleware สำหรับอ่าน JSON body
app.use(express.json());


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
  .order('id', { ascending: true }); // เรียงลำดับตาม id จากน้อยไปมาก


  if (error || !data) {
    return res.status(404).json({ message: 'ไม่พบผู้ใช้งาน' });
  }

  res.json(data);
});
app.post('/api/user', async (req, res) => {
  const { name, age } = req.body;

  // เพิ่มผู้ใช้ใหม่ลงในฐานข้อมูล Supabase
  const { data, error } = await supabase
    .from('users')
    .insert([{ name, age }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});

app.patch('/api/user/:id', async (req, res) => {
  const id = parseInt(req.params.id); // รับค่า id จาก URL
  const { name, age } = req.body; // รับข้อมูลจาก request body

  // ตรวจสอบว่าได้ข้อมูลที่ต้องการหรือไม่
  if (!name && !age) {
    return res.status(400).json({ error: 'Invalid request. Name or age is required.' });
  }

  // อัปเดตข้อมูลใน Supabase
  const { data, error } = await supabase
    .from('users')
    .update({ name, age }) // อัปเดตชื่อและอายุ
    .eq('id', id); // เงื่อนไขว่า id ต้องตรงกัน

  if (error) {
    console.error('Database update failed:', error.message); // แสดงข้อความข้อผิดพลาด
    return res.status(500).json({ error: error.message }); // ส่ง response 500 กลับไปถ้าข้อผิดพลาดเกิดขึ้น
  }

  // ส่ง response กลับมาพร้อมกับข้อมูลที่อัปเดต
  res.status(200).json(data);
});

app.delete('/api/user/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(204).json({});
});


app.listen(port, () => {
  console.log(`เซิร์ฟเวอร์ทำงานบนพอร์ต ${port}`);
});
