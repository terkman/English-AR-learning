# English AR Learning

เว็บไซต์สื่อการสอนภาษาอังกฤษแบบ WebAR สำหรับใช้งานบนโทรศัพท์มือถือและแท็บเล็ต ผู้เรียนเลือกกิจกรรมจากหน้าแรก แล้วเรียนรู้ภาษาอังกฤษผ่านการสแกนภาพ, คำถามปลายเปิด, วงล้อภารกิจ และฉาก 3D Interactive

โปรเจกต์นี้ออกแบบให้ใช้กับ GitHub Pages ได้โดยตรง ไม่ต้องมี Backend และไม่ต้องใช้ API Key

---

## ภาพรวมกิจกรรม

| Part | ชื่อกิจกรรม | สีประจำ Part | แนวคิดหลัก |
|---|---|---|---|
| Part 1 | Word Hunter AR | Cyan | สแกนภาพ แล้วเรียนรู้คำศัพท์ |
| Part 2 | Question Quest AR | Yellow | สแกนภาพ แล้วตอบคำถามภาษาอังกฤษ |
| Part 3 | Mission Spin AR | Pink | สแกนภาพ แล้วหมุนวงล้อภารกิจ |
| Part 4 | 3D Word Detective | Green | สำรวจฉาก 3D แล้วตรวจคำศัพท์ |

---

## Part 1 — Word Hunter AR

Part 1 ใช้ MindAR Image Tracking เพื่อให้ผู้เรียนสแกนภาพเป้าหมาย แล้วแสดงคำศัพท์หรือภาพผลลัพธ์ตามกิจกรรมย่อย

### 1.1 Word Scanner

- สแกนภาพโลโก้หรือป้าย
- แสดงคำศัพท์ภาษาอังกฤษแบบ AR
- มีเสียงอ่านภาษาอังกฤษ
- ใช้ข้อมูลจาก `assets/data/part1-1.json`
- ใช้ target จาก `assets/targets/part1-1.mind`

### 1.2 Picture Reveal

- สแกนภาพข้อความที่เตรียมไว้
- แสดงภาพผลลัพธ์ที่เกี่ยวข้องกับข้อความนั้น
- ไม่ใช่ OCR และไม่อ่านตัวอักษรจากกล้องโดยตรง
- ใช้ข้อมูลจาก `assets/data/part1-2.json`
- ใช้ target จาก `assets/targets/part1-2.mind`

### 1.3 Open Question

- สแกนภาพ แล้วแสดงคำถามภาษาอังกฤษแบบ AR
- คำถามสั้น เหมาะกับการฝึกพูดตอบ
- ใช้ข้อมูลจาก `assets/data/part1-3.json`
- ใช้ target จาก `assets/targets/part1-3.mind`

---

## Part 2 — Question Quest AR

Part 2 เน้นการฝึกคิดและตอบคำถามภาษาอังกฤษจากภาพเป้าหมาย

### 2.1 Open Question

- สแกนภาพ แล้วแสดงคำถามปลายเปิด
- ผู้เรียนอ่าน ฟัง และฝึกตอบด้วยตนเอง
- ใช้ข้อมูลจาก `assets/data/part2-1.json`
- ใช้ target จาก `assets/targets/part2-1.mind`

### 2.2 Word Choice / Context Question

- สแกนภาพ แล้วแสดงคำศัพท์หรือประโยคที่เกี่ยวข้องกับบริบท
- เหมาะสำหรับฝึกเลือกคำที่เหมาะสมกับสถานการณ์
- ใช้ข้อมูลจาก `assets/data/part2-2.json`
- ใช้ target จาก `assets/targets/part2-2.mind`

---

## Part 3 — Mission Spin AR

Part 3 ใช้การสแกนภาพร่วมกับวงล้อภารกิจ เพื่อสุ่มวิธีตอบคำถาม เช่น ถามเพื่อน, มองรอบตัว, แสดงท่าทาง, สะกดคำ หรือใช้พจนานุกรม

- ใช้ข้อมูลจาก `assets/data/part3-1.json`
- ใช้ target จาก `assets/targets/part3-1.mind`
- ใช้สีประจำ Part เป็น Pink
- ออกแบบให้ผู้เรียนได้ฝึกตอบคำถามหลายรูปแบบ

---

## Part 4 — 3D Word Detective

Part 4 เป็นกิจกรรม 3D Interactive ผู้เรียนหมุน/ซูมฉาก แตะป้ายคำศัพท์ในฉาก แล้วตรวจว่าคำนั้นถูกหรือไม่ หากคิดว่าผิดสามารถแก้ไขและยืนยันคำตอบได้

### 4.1 Market Word Check

- ฉาก 3D ร้านค้า / ตลาด
- ใช้ข้อมูลจาก `assets/data/part4-1.json`
- ใช้โมเดลจาก `assets/models/part4/supermarket.glb`

### 4.2 School Word Check

- ฉาก 3D โรงเรียน
- ใช้ข้อมูลจาก `assets/data/part4-2.json`
- ใช้โมเดลจาก `assets/models/part4/school.glb`

ระบบจะแสดงเฉพาะคะแนนรวม ไม่เฉลยว่าข้อใดถูกหรือผิด เพื่อให้ครูสามารถนำไปใช้พูดคุยต่อในชั้นเรียนได้

---

## โครงสร้างไฟล์หลัก

```text
English-AR-learning/
├── index.html
├── style.css
├── script.js
├── README.md
│
├── part1/
│   ├── index.html
│   ├── 1.1/index.html
│   ├── 1.2/index.html
│   └── 1.3/index.html
│
├── part2/
│   ├── index.html
│   ├── 2.1/index.html
│   └── 2.2/index.html
│
├── part3/
│   └── index.html
│
├── part4/
│   ├── index.html
│   ├── 4.1/index.html
│   └── 4.2/index.html
│
└── assets/
    ├── data/
    │   ├── part1-1.json
    │   ├── part1-2.json
    │   ├── part1-3.json
    │   ├── part2-1.json
    │   ├── part2-2.json
    │   ├── part3-1.json
    │   ├── part4-1.json
    │   └── part4-2.json
    │
    ├── targets/
    │   ├── part1-1.mind
    │   ├── part1-2.mind
    │   ├── part1-3.mind
    │   ├── part2-1.mind
    │   ├── part2-2.mind
    │   └── part3-1.mind
    │
    ├── images/
    │   ├── part1/
    │   ├── part2/
    │   └── part3/
    │
    └── models/
        └── part4/
            ├── school.glb
            └── supermarket.glb
```

---

## ไฟล์ข้อมูลที่ใช้จริง

| ไฟล์ | ใช้กับ |
|---|---|
| `assets/data/part1-1.json` | Part 1.1 |
| `assets/data/part1-2.json` | Part 1.2 |
| `assets/data/part1-3.json` | Part 1.3 |
| `assets/data/part2-1.json` | Part 2.1 |
| `assets/data/part2-2.json` | Part 2.2 |
| `assets/data/part3-1.json` | Part 3 |
| `assets/data/part4-1.json` | Part 4.1 Market |
| `assets/data/part4-2.json` | Part 4.2 School |

ไฟล์เก่าอย่าง `vocab.json`, `questions.json`, และ `missions.json` อาจยังอยู่ใน repo เพื่ออ้างอิงย้อนหลัง แต่หน้าเว็บชุดล่าสุดใช้ไฟล์แบบแยก Part เป็นหลัก

---

## ระบบสี UI

สีประจำ Part ควรถูกควบคุมจาก `style.css`

```css
:root {
  --c1: #00d4ff; /* Part 1 Cyan */
  --c2: #ffd60a; /* Part 2 Yellow */
  --c3: #ff3b8f; /* Part 3 Pink */
  --c4: #06d6a0; /* Part 4 Green */
}
```

แนวทางใช้งานสี:

- Part 1 ใช้ Cyan สำหรับ Scan / Word
- Part 2 ใช้ Yellow สำหรับ Question / Think
- Part 3 ใช้ Pink สำหรับ Mission / Wheel
- Part 4 ใช้ Green สำหรับ 3D / Detective / Game
- สีม่วงไม่ควรเป็นสีหลักของ Part ใดแล้ว ใช้ได้เฉพาะเป็นสีตกแต่งรองเท่านั้น

---

## วิธีใช้งานสำหรับผู้เรียน

1. เปิดเว็บไซต์ผ่าน GitHub Pages หรือ HTTPS
2. เลือก Part จากหน้าแรก
3. อนุญาตให้เว็บไซต์ใช้กล้อง เมื่อเป็นกิจกรรม AR
4. สแกนภาพ target ที่เตรียมไว้
5. อ่าน ฟัง ตอบคำถาม หรือทำภารกิจตามกิจกรรม
6. สำหรับ Part 4 ให้รอโหลดฉาก 3D แล้วแตะคำศัพท์ในฉาก

---

## การเตรียม Target Images และไฟล์ `.mind`

กิจกรรม Part 1–3 ใช้ MindAR Image Tracking จึงต้องมีไฟล์ `.mind` ให้ตรงกับภาพ target และข้อมูล JSON

ตัวอย่างการจับคู่:

```text
assets/images/part1/1.1/targets/  → assets/targets/part1-1.mind → assets/data/part1-1.json
assets/images/part1/1.2/targets/  → assets/targets/part1-2.mind → assets/data/part1-2.json
assets/images/part2/2.1/targets/  → assets/targets/part2-1.mind → assets/data/part2-1.json
assets/images/part3/3.1/targets/  → assets/targets/part3-1.mind → assets/data/part3-1.json
```

เมื่อต้องเพิ่มหรือลด target ต้อง compile `.mind` ใหม่ และตรวจให้ index ใน JSON ตรงกับลำดับภาพที่ใช้ compile

---

## การเตรียมโมเดล 3D สำหรับ Part 4

ไฟล์โมเดลต้องเป็น `.glb` และวางไว้ใน:

```text
assets/models/part4/
```

ข้อมูลโมเดลถูกเรียกผ่าน JSON:

```text
assets/data/part4-1.json → supermarket.glb
assets/data/part4-2.json → school.glb
```

คำแนะนำ:

- ใช้ไฟล์ `.glb` ที่ขนาดไม่ใหญ่เกินไป
- ตั้งชื่อ node/object ในโมเดลให้ตรงกับ `nodeName` ใน JSON
- ถ้า label ไม่ขึ้น ให้ตรวจชื่อ object ในโมเดลกับข้อมูล JSON ก่อน
- ทดสอบบนมือถือจริง เพราะประสิทธิภาพของ WebGL แตกต่างกันในแต่ละเครื่อง

---

## Library ที่ใช้

| Library | ใช้สำหรับ |
|---|---|
| A-Frame | สร้างฉาก WebAR ใน Part 1–3 |
| MindAR | Image Tracking ใน Part 1–3 |
| aframe-text-geometry-component | แสดงตัวอักษร 3D ใน AR |
| Three.js | ฉาก 3D Interactive ใน Part 4 |
| GLTFLoader | โหลดไฟล์ `.glb` |
| DRACOLoader | รองรับโมเดลที่บีบอัดด้วย Draco |
| OrbitControls | หมุนและซูมฉาก 3D |
| Web Speech API | อ่านเสียงภาษาอังกฤษ |
| Google Fonts | ฟอนต์ UI |

---

## การ Deploy ขึ้น GitHub Pages

1. อัปโหลดไฟล์ทั้งหมดขึ้น repository
2. ไปที่ `Settings`
3. เลือก `Pages`
4. Source: `Deploy from a branch`
5. Branch: `main`
6. Folder: `/root`
7. กด Save

หลังอัปเดตไฟล์ อาจต้องรอ GitHub Pages ประมาณ 1–2 นาที และถ้า browser ยังเห็นไฟล์เก่า ให้เปิดแบบเติม query string เช่น:

```text
?v=2
```

---

## Troubleshooting

### กล้องไม่เปิด

- ต้องเปิดผ่าน HTTPS
- ตรวจ permission ของกล้องใน browser
- แนะนำ Android Chrome สำหรับการทดสอบ AR

### สแกนแล้วไม่ติด

- ตรวจว่าใช้ภาพ target ชุดเดียวกับที่ compile เป็น `.mind`
- ตรวจ index ใน JSON ให้ตรงกับลำดับภาพ target
- ใช้ภาพที่ชัด ไม่เบลอ ไม่สะท้อนแสงมากเกินไป

### เสียงไม่เล่น

- บาง browser ต้องให้ผู้ใช้แตะปุ่มก่อนจึงเล่นเสียงได้
- ลองกดปุ่ม Speak / Read อีกครั้ง
- ตรวจว่าอุปกรณ์ไม่ได้ปิดเสียง

### Part 4 โหลดค้าง

- ตรวจ path ของโมเดลใน `assets/data/part4-1.json` หรือ `part4-2.json`
- ตรวจว่าไฟล์ `.glb` อยู่ใน `assets/models/part4/`
- ลองเปิดใหม่พร้อม query string เช่น `?v=3`
- ตรวจขนาดไฟล์โมเดลและสัญญาณอินเทอร์เน็ต

### Part 4 label ไม่ขึ้น

- ตรวจ `nodeName` ใน JSON ให้ตรงกับชื่อ object ในโมเดล
- ตรวจว่าโมเดลถูก export พร้อมชื่อ object ที่ถูกต้อง
- เปิด DevTools เพื่อตรวจ log missing node หากทดสอบบนคอมพิวเตอร์

---

## แนวทางแก้ไข/เพิ่มข้อมูล

| ต้องการแก้ | ไฟล์ที่แก้ |
|---|---|
| ชื่อเมนู / หน้าแรก | `index.html` |
| สีและ layout หลัก | `style.css` |
| helper ส่วนกลาง เช่นเสียง/ปุ่ม | `script.js` |
| ข้อมูล Part 1.1 | `assets/data/part1-1.json` |
| ข้อมูล Part 1.2 | `assets/data/part1-2.json` |
| ข้อมูล Part 1.3 | `assets/data/part1-3.json` |
| ข้อมูล Part 2.1 | `assets/data/part2-1.json` |
| ข้อมูล Part 2.2 | `assets/data/part2-2.json` |
| คำถาม/วงล้อ Part 3 | `assets/data/part3-1.json` |
| ข้อมูล Market 3D | `assets/data/part4-1.json` |
| ข้อมูล School 3D | `assets/data/part4-2.json` |

---

## หมายเหตุสำหรับการใช้งานจริงในห้องเรียน

- เตรียมภาพ target ให้ชัดและมีขนาดพอเหมาะ
- แนะนำให้พิมพ์ target ลงกระดาษด้านเพื่อลดแสงสะท้อน
- ทดสอบบนมือถือจริงก่อนใช้กับนักเรียน
- สำหรับ Part 4 ควรให้ผู้เรียนรอโหลดฉาก 3D ให้ครบก่อนเริ่มกิจกรรม
- ถ้าอุปกรณ์ช้า ให้ลดจำนวน label หรือใช้โมเดลที่เล็กลง

---

## ผู้จัดทำ

Created by JP2T Company

---

## License

สร้างเพื่อการศึกษา สามารถนำไปใช้และปรับแต่งต่อได้ตามความเหมาะสม
