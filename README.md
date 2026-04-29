# 🌐 English AR Learning — v1.0

เว็บไซต์สื่อการสอนภาษาอังกฤษสำหรับโทรศัพท์มือถือ ที่ผสมการเรียนรู้ภาษาอังกฤษเข้ากับ **WebAR, Image Tracking, เสียงอ่านภาษาอังกฤษ, คำถามปลายเปิด, วงล้อภารกิจ และฉาก 3D Interactive**

โปรเจกต์นี้ออกแบบมาเพื่อให้ผู้เรียน “มองเห็นภาษาอังกฤษรอบตัว” ผ่านกล้องมือถือ และฝึกใช้ภาษาอังกฤษจากสถานการณ์จริง เช่น โลโก้สินค้า ป้ายสัญลักษณ์ คำถามชวนคิด ภารกิจการตอบคำถาม และฉากร้านค้า 3D

---

## ✅ เว็บนี้มีหน้าที่ทำอะไร

เว็บนี้เป็นสื่อการเรียนรู้ภาษาอังกฤษแบบโต้ตอบ ผู้เรียนสามารถเปิดเว็บบนมือถือแล้วทำกิจกรรมได้ 4 รูปแบบ:

1. **สแกนภาพโลโก้หรือป้าย** เพื่อดูคำศัพท์ภาษาอังกฤษแบบ AR
2. **สแกนภาพแล้วตอบคำถามปลายเปิด** เพื่อฝึกคิดและพูดภาษาอังกฤษ
3. **สแกนภาพแล้วหมุนวงล้อภารกิจ** เพื่อสุ่มวิธีตอบคำถาม
4. **สำรวจฉาก 3D** แตะวัตถุเพื่อเรียนคำศัพท์หรือบทสนทนาในสถานการณ์จริง

เว็บนี้ไม่มี Backend และไม่ต้องใช้ API Key สามารถอัปขึ้น GitHub Pages แล้วเปิดใช้งานได้ทันทีผ่าน HTTPS

---

## 🧩 เราทำอะไรกับโปรเจกต์นี้บ้าง

โปรเจกต์นี้ถูกพัฒนาและปรับปรุงให้เป็นเว็บสื่อการสอนภาษาอังกฤษแบบ 4 Part โดยมีรายละเอียดดังนี้

### Part 1 — AR Vocabulary Scanner

ทำหน้าที่สแกนภาพแบรนด์หรือป้าย แล้วแสดงคำศัพท์ภาษาอังกฤษบนภาพแบบ AR

สิ่งที่ทำไว้:

- ใช้ **MindAR Image Tracking** สำหรับจดจำภาพ target
- ใช้ **A-Frame + TextGeometry** เพื่อแสดงตัวอักษร 3D แบบนูน
- ตัดพื้นหลังสีดำหลังตัวอักษรออก
- ปรับตัวอักษรให้ใหญ่และดูเป็น 3D มากขึ้น
- แสดง popup ด้านล่างสำหรับคำศัพท์
- มีปุ่ม **Speak** และ **Again** สำหรับฟังเสียงภาษาอังกฤษ
- ใช้ข้อมูลจาก `assets/data/vocab.json`

ตัวอย่างสิ่งที่ผู้เรียนเห็น:

```text
Coca-Cola
/ˌkoʊkəˈkoʊlə/
```

---

### Part 2 — AR Open Question

ทำหน้าที่สแกนภาพ แล้วแสดงคำถามภาษาอังกฤษแบบ AR เพื่อให้ผู้เรียนตอบแบบปลายเปิด

สิ่งที่ทำไว้:

- เปลี่ยนจากการแสดงสัญลักษณ์ `?` เป็นคำถามจริง
- ใช้ตัวอักษร 3D แบบเดียวกับ Part 1
- คำถามแสดงบนภาพและเคลื่อนไหวตาม Image Tracking
- คำถามไม่เกิน 2 บรรทัด
- ล็อกคำถามต่อ target เพื่อไม่ให้สุ่มเปลี่ยนไปเรื่อย ๆ เวลาการ tracking กระพริบ
- popup ด้านล่างเหลือเฉพาะ:
  - `QUESTION`
  - ชื่อ target
  - ปุ่ม `Read`
- ตัดตัวนับ เช่น `Question 1 of 7` ออก
- ตัดปุ่ม `New Question` ออก
- ใช้ข้อมูลจาก `assets/data/questions.json`

ตัวอย่างคำถาม:

```text
When do you usually drink Coca-Cola?
```

---

### Part 3 — AR Answer Mission Wheel

ทำหน้าที่สแกนภาพเพื่อรับคำถาม แล้วหมุนวงล้อเพื่อสุ่มภารกิจการตอบคำถาม

สิ่งที่ทำไว้:

- เปลี่ยนข้อความ AR จากคำว่า `SPIN` เป็นคำถามจริง
- ใช้ตัวอักษร 3D แบบเดียวกับ Part 2
- คำถามเคลื่อนไหวตาม Image Tracking
- ล็อกคำถามต่อ target เพื่อไม่ให้สุ่มเปลี่ยนซ้ำระหว่าง tracking
- แก้ปัญหา **Spin Wheel กดแล้วไม่ทำงาน**
- เพิ่มคำสั่ง `vibrate()` ภายในไฟล์ Part 3 โดยตรง
- ปรับคำในวงล้อให้สอดคล้องกับคำถาม เช่น:
  - Give one reason.
  - Share your opinion.
  - Give a real example.
  - Compare with another thing.
  - Explain why.
  - Answer in one sentence.
- ใช้ข้อมูลจาก `assets/data/missions.json`

ตัวอย่าง flow:

```text
Scan target → See question → Spin wheel → Get mission → Answer in English
```

---

### Part 4 — English Situation 3D

ทำหน้าที่ให้ผู้เรียนสำรวจฉาก 3D แล้วแตะวัตถุเพื่อเรียนคำศัพท์หรือบทสนทนา

สิ่งที่ทำไว้:

- เปลี่ยน Part 4 เป็นระบบ **Three.js Interactive 3D**
- ใช้:
  - `Three.js`
  - `GLTFLoader`
  - `OrbitControls`
  - `Raycaster`
- ผู้เรียนสามารถหมุน ซูม และแตะวัตถุในฉาก 3D ได้
- popup ขึ้นใกล้วัตถุที่แตะ
- ตัดบรรทัด `Object name` ออกจาก popup
- เพิ่ม **Teach Mode** สำหรับตั้งคำศัพท์ให้วัตถุเอง
- คำที่สอนเองบันทึกไว้ใน `localStorage`
- ถ้าไม่มี `assets/models/shop.glb` ระบบจะแสดง demo scene แทน
- เพิ่ม demo scene ที่มี:
  - counter
  - shelf
  - signs
  - water bottle
  - Coca-Cola
  - คน 2 คนกำลังซื้อขายของ
- เพิ่มบทสนทนา “At the Counter”

ตัวอย่างบทสนทนา:

```text
A: Hello. What would you like to buy?
B: I would like a bottle of water, please.
A: Sure. Anything else?
B: No, thank you. How much is it?
A: It is twenty baht.
B: Here you are.
A: Thank you. Have a nice day.
B: Thank you.
```

---

## 📁 โครงสร้างไฟล์

```text
english-ar-learning/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
├── part1/
│   └── index.html
│
├── part2/
│   └── index.html
│
├── part3/
│   └── index.html
│
├── part4/
│   └── index.html
│
└── assets/
    ├── targets/
    │   └── targets.mind
    │
    ├── models/
    │   └── shop.glb
    │
    ├── data/
    │   ├── vocab.json
    │   ├── questions.json
    │   ├── missions.json
    │   └── situation-items.json
    │
    └── images/
        └── target images
```

---

## 📱 วิธีใช้งานสำหรับผู้เรียน

1. เปิดเว็บไซต์บนโทรศัพท์มือถือ
2. เลือกกิจกรรมจากหน้าแรก
3. อนุญาตให้เว็บไซต์ใช้กล้อง
4. สแกนภาพ target เช่น โลโก้สินค้า หรือป้ายสัญลักษณ์
5. อ่าน ฟัง หรือพูดตอบตามกิจกรรมของแต่ละ Part

---

## 🎯 Target Images ที่ใช้ใน Part 1–3

ภาพ target ต้องเรียงลำดับให้ตรงกับ `targetIndex`

| Index | Target |
|------:|--------|
| 0 | McDonald's |
| 1 | Nike |
| 2 | Coca-Cola |
| 3 | 7-Eleven |
| 4 | Starbucks |
| 5 | Restroom |
| 6 | Exit |
| 7 | Warning |
| 8 | No Smoking |
| 9 | Information |

---

## 🧠 การเตรียมไฟล์ `targets.mind`

`targets.mind` คือไฟล์ที่ MindAR ใช้จำภาพ target สำหรับ Image Tracking

### ขั้นตอนการสร้าง

1. เตรียมภาพ target ทั้ง 10 ภาพ
2. เข้าเว็บ MindAR Compiler:
   ```text
   https://hiukim.github.io/mind-ar-js-doc/tools/compile
   ```
3. อัปโหลดภาพเรียงตาม index 0–9
4. กด Compile
5. ดาวน์โหลดไฟล์ `targets.mind`
6. วางไว้ที่:
   ```text
   assets/targets/targets.mind
   ```

ถ้าลำดับภาพไม่ตรงกับ targetIndex ข้อมูลที่แสดงใน AR จะไม่ตรงกับภาพที่สแกน

---

## 🏪 การเตรียมโมเดล 3D สำหรับ Part 4

ถ้าต้องการใช้โมเดลจริง ให้วางไฟล์ `.glb` ไว้ที่:

```text
assets/models/shop.glb
```

ถ้ายังไม่มีไฟล์ `shop.glb` ระบบจะแสดง demo scene ให้ทดสอบก่อน

### คำแนะนำสำหรับโมเดล

- ใช้ไฟล์ `.glb`
- ขนาดไฟล์ไม่ควรใหญ่เกินไป
- ตั้งชื่อ object ในโมเดลให้เข้าใจง่าย เช่น:
  - `Counter`
  - `Water Bottle`
  - `Shelf`
  - `Cashier`
  - `Exit Sign`
- ถ้าชื่อ object เป็นชื่อแปลก เช่น `Material2_36` หรือ `Cube001` สามารถใช้ Teach Mode ตั้งคำศัพท์ใหม่ได้

---

## 🧑‍🏫 Teach Mode ใน Part 4 คืออะไร

Teach Mode ใช้สำหรับสอนคำศัพท์ให้วัตถุในโมเดล 3D

วิธีใช้:

1. เปิด Part 4
2. กด `Teach: ON`
3. แตะวัตถุในโมเดล
4. กรอกคำศัพท์ภาษาอังกฤษ
5. กรอก pronunciation หรือ example sentence ถ้าต้องการ
6. ระบบจะบันทึกไว้ใน browser ด้วย `localStorage`

ข้อมูลที่สอนไว้จะอยู่ในเครื่องของผู้ใช้คนนั้น ถ้าเปลี่ยนเครื่องหรือเคลียร์ browser data ข้อมูลจะหาย

---

## 🔑 Library ที่ใช้

| Library | ใช้สำหรับ |
|--------|-----------|
| A-Frame | สร้าง AR Scene ใน Part 1–3 |
| MindAR | Image Tracking ใน Part 1–3 |
| aframe-text-geometry-component | ตัวอักษร 3D แบบนูนใน AR |
| Three.js | ฉาก 3D Interactive ใน Part 4 |
| GLTFLoader | โหลดไฟล์ `.glb` |
| OrbitControls | หมุนและซูมฉาก 3D |
| Raycaster | ตรวจจับวัตถุที่ผู้ใช้แตะ |
| Web Speech API | อ่านเสียงภาษาอังกฤษ |
| Google Fonts | ฟอนต์ Nunito และ Space Mono |

---

## 🚀 การ Deploy ขึ้น GitHub Pages

### 1. อัปโหลดโปรเจกต์ขึ้น GitHub

```bash
git init
git add .
git commit -m "English AR Learning v1.0"
git remote add origin https://github.com/YOUR_USERNAME/english-ar-learning.git
git branch -M main
git push -u origin main
```

### 2. เปิด GitHub Pages

1. เข้า Repository บน GitHub
2. ไปที่ `Settings`
3. ไปที่ `Pages`
4. เลือก `Deploy from a branch`
5. เลือก branch `main`
6. เลือก folder `/ root`
7. กด Save

URL จะเป็นรูปแบบนี้:

```text
https://YOUR_USERNAME.github.io/english-ar-learning/
```

---

## 🛠️ การปรับแต่งข้อมูล

### เพิ่มคำศัพท์ Part 1

แก้ไฟล์:

```text
assets/data/vocab.json
```

ตัวอย่าง:

```json
{
  "index": 10,
  "word": "Pharmacy",
  "phonetic": "/ˈfɑːrməsi/",
  "type": "Sign"
}
```

จากนั้นต้องเพิ่มภาพ target ใหม่ และ compile `targets.mind` ใหม่ด้วย

---

### เพิ่มคำถาม Part 2

แก้ไฟล์:

```text
assets/data/questions.json
```

เพิ่มคำถามใน target ที่ต้องการ เช่น:

```json
"What do you usually buy here?"
```

---

### ปรับคำถามและวงล้อ Part 3

แก้ไฟล์:

```text
assets/data/missions.json
```

ใช้สำหรับ:

- คำถามของแต่ละ target
- ข้อความในวงล้อ
- สีของช่องวงล้อ
- emoji ของภารกิจ

---

### ปรับข้อมูล Part 4

แก้ไฟล์:

```text
assets/data/situation-items.json
```

ใช้สำหรับจับคู่ข้อมูลคำศัพท์หรือบทสนทนากับวัตถุในโมเดล 3D

---

## 🎨 การเปลี่ยนธีมสี

แก้ไฟล์:

```text
style.css
```

ตัวแปรหลัก:

```css
:root {
  --cyan:   #00d4ff;
  --yellow: #ffd60a;
  --pink:   #ff3b8f;
  --green:  #06d6a0;
}
```

---

## ❓ Troubleshooting

### กล้องไม่เปิด

- ตรวจสอบว่าเปิดเว็บผ่าน HTTPS
- GitHub Pages ใช้ HTTPS ให้อัตโนมัติ
- อนุญาต Camera permission ใน browser

### AR ไม่เจอภาพ

- ตรวจสอบว่า `targets.mind` อยู่ที่:
  ```text
  assets/targets/targets.mind
  ```
- ตรวจสอบลำดับภาพ target ตอน compile
- ใช้ภาพ target ที่ชัด มีรายละเอียด และไม่สะท้อนแสงมากเกินไป

### เสียงไม่เล่น

- Android Chrome ทำงานได้ดีที่สุด
- iOS อาจต้องกดปุ่ม Speak ก่อน
- ถ้าเสียงไม่ออก ให้ลองกดปุ่ม Read / Speak อีกครั้ง

### Part 3 วงล้อไม่หมุน

- ตรวจสอบว่า `assets/data/missions.json` โหลดได้
- ตรวจสอบว่าใน `missions.json` มี `wheelSegments`
- ล้าง cache หรือเปิดแบบ Incognito หลังอัปเดตไฟล์

### Part 4 ไม่แสดงโมเดลจริง

- ตรวจสอบว่าไฟล์อยู่ที่:
  ```text
  assets/models/shop.glb
  ```
- ถ้าไม่มีไฟล์ ระบบจะแสดง demo scene แทน
- ถ้าโมเดลใหญ่เกินไป อาจโหลดช้าในมือถือ

---

## 📌 หมายเหตุสำหรับการใช้งานจริง

- เว็บไซต์นี้เหมาะกับการเปิดบนมือถือ
- แนะนำ Android Chrome สำหรับ Part 1–3
- Part 4 สามารถใช้ได้ทั้งมือถือและคอมพิวเตอร์
- ควรทดสอบผ่าน GitHub Pages หรือ HTTPS เท่านั้น
- ถ้าแก้ไฟล์แล้วไม่เห็นผล ให้ล้าง cache หรือเปิดแบบ Incognito

---

## 👥 ผู้จัดทำ

Created by JP2T Company

---

## 📄 License

สร้างเพื่อการศึกษา สามารถนำไปใช้และปรับแต่งต่อได้
