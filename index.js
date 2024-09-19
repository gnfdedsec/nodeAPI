const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// ใช้งาน cors middleware
app.use(cors());

// ข้อมูลสมมุติ
const data = [
 
{
  id: 1,
  name: 'Alice',
  age: 28,
  skills: ["JavaScript", "React", "Node.js"],
  projects: [
      {
          title: "Website Redesign",
          status: "completed",
          technologies: ["HTML", "CSS", "JavaScript"]
      },
      {
          title: "Mobile App",
          status: "in progress",
          technologies: ["React Native", "Firebase"]
      }
  ]
},
{
  id: 2,
  name: 'Bob',
  age: 35,
  skills: ["Python", "Django", "Machine Learning"],
  projects: [
      {
          title: "Data Analysis",
          status: "completed",
          technologies: ["Python", "Pandas", "NumPy"]
      },
      {
          title: "AI Model",
          status: "in progress",
          technologies: ["TensorFlow", "Keras"]
      }
  ]
}
];

// เส้นทางหลัก (root path)
app.get('/', (req, res) => {
  res.send('Hello from the Node.js backend!');
});

// เส้นทางสำหรับ API
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


