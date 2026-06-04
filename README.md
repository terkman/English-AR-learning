# English AR Learning — Minimal Part Names

ชุดนี้เป็นไฟล์โค้ดสำหรับวางทับ repo `English-AR-learning` โดยตรง

## ไฟล์ที่ต้องวางทับ

วางไฟล์นี้ทับไฟล์เดิมที่ root ของ repo:

```text
script.js
```

## สิ่งที่แก้

- Part หลักยังมีเลข Part 1–4
- Part ย่อยไม่แสดงเลขแบบ 1.1, 1.2, 2.1, 4.1 แล้ว
- ปรับชื่อและคำอธิบายให้เรียบง่าย minimal
- แก้เฉพาะข้อความที่ผู้ใช้เห็นบนหน้าเว็บ

## ไม่ได้แก้

- ระบบกล้อง
- MindAR
- ไฟล์ `.mind`
- JSON
- รูปภาพ / โมเดล 3D
- logic การสแกน AR

## วิธีใช้งาน

1. แตก ZIP
2. นำ `script.js` ไปวางทับไฟล์เดิมในโฟลเดอร์หลักของ repo
3. commit และ push ขึ้น GitHub

```bash
git add script.js
git commit -m "Update minimal part names"
git push
```
