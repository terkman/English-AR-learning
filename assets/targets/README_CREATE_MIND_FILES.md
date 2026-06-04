# วิธีสร้างไฟล์ .mind สำหรับ Part 1.1–1.3

เว็บชุดนี้ตั้งค่าให้ใช้ MindAR image tracking ทั้งหมด ดังนั้นต้องสร้างไฟล์ `.mind` 3 ไฟล์ก่อนเปิดสแกนจริง

ไฟล์ที่ต้องสร้างและวางในโฟลเดอร์นี้:

- `part1-1.mind` สร้างจากภาพใน `assets/images/part1/1.1/targets/`
- `part1-2.mind` สร้างจากภาพใน `assets/images/part1/1.2/targets/`
- `part1-3.mind` สร้างจากภาพใน `assets/images/part1/1.3/targets/`

สำคัญมาก: เรียงภาพตามชื่อไฟล์ `01_...` ถึง `20_...` ก่อนอัปโหลดเข้า compiler เพราะลำดับภาพต้องตรงกับ `targetIndex` ใน JSON

หลังสร้างไฟล์จาก MindAR Compiler ให้เปลี่ยนชื่อไฟล์ที่ดาวน์โหลดมาให้ตรง เช่น `part1-1.mind` แล้วอัปโหลดมาไว้ในโฟลเดอร์ `assets/targets/`
