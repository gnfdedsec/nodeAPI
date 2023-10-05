const express = require('express');
const app = express();
const port = 5000;

// ข้อมูลสมมุติ
const data = [
  { id: 1, name: 'John', lastname: 'Doe2' },
  { id: 2, name: 'Jane', lastname: 'Smith' }
];

app.get('/api/users', (req, res) => {
  res.json(data);
});

app.get('/api/user/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = data.find(user => user.id === id);
  
  if (!user) {
    res.status(404).json({ message: 'ไม่พบผู้ใช้งาน' });
  } else {
    res.json(user);
  }
});

app.listen(port, () => {
  console.log(`เซิร์ฟเวอร์ทำงานบนพอร์ต ${port}`);
});
