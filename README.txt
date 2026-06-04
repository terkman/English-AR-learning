ชุดไฟล์แก้ปัญหา Part 3 Start Camera / Home Button

ให้วางทับไฟล์ตาม path นี้:

1) part3/index.html
2) style.css

สิ่งที่แก้:
- แก้ Part 3 ให้ Start Camera ทำงานได้
- ตัด error จากตัวแปร cy ที่ไม่ได้ประกาศ
- ทำให้ปุ่ม Home กดได้แม้หน้า Start ยังครอบอยู่
- ใช้ชื่อหน้าแบบ minimal: Mission Wheel
- ไม่แก้ไฟล์ .mind, JSON, รูปภาพ หรือระบบ Part อื่น

หลังวางทับแล้วให้ทดสอบ:
- เข้า Part 3
- กด Home ต้องกลับหน้าแรกได้
- กด Start Camera ต้องขออนุญาตกล้องหรือเริ่มสถานะ Scanning
