const express = require('express');
const cors = require('cors'); // นำเข้า cors
const app = express();
const port = 5000;

// ใช้งาน cors middleware
app.use(cors());

// ข้อมูลสมมุติ
const data = [
  { id: 1, name: 'John', lastname: 'Doe' },
  { id: 2, name: 'Jane', lastname: 'Smithsxx' }
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
