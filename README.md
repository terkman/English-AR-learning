# 🌐 English AR Learning — v1.0

เว็บไซต์สื่อการสอนภาษาอังกฤษด้วย WebAR สำหรับโทรศัพท์มือถือ

---

## 📁 โครงสร้างไฟล์

```
english-ar-learning/
│
├── index.html               ← หน้าแรก เมนูหลัก
├── style.css                ← Global CSS สำหรับทุก Part
├── script.js                ← Global JS (Speech utility)
│
├── part1/
│   └── index.html           ← Part 1: AR Vocabulary Scanner
│
├── part2/
│   └── index.html           ← Part 2: AR Open Question
│
├── part3/
│   └── index.html           ← Part 3: AR Answer Mission Wheel
│
├── part4/
│   └── index.html           ← Part 4: English Situation 3D
│
├── assets/
│   ├── targets/
│   │   └── targets.mind     ← ⚠️ ต้องสร้างเอง (ดูขั้นตอนด้านล่าง)
│   ├── models/
│   │   └── shop.glb         ← ⚠️ วางโมเดล 3D ของคุณที่นี่ (Part 4)
│   ├── data/
│   │   ├── vocab.json       ← คำศัพท์ 10 รายการ
│   │   ├── questions.json   ← คำถามปลายเปิด (Part 2)
│   │   ├── missions.json    ← คำถาม + ตัวเลือกวงล้อ (Part 3)
│   │   └── situation-items.json ← Hotspot ร้านค้า (Part 4)
│   └── images/
│       └── (ภาพ target ที่ใช้สร้าง targets.mind)
│
└── README.md
```

---

## 🚀 การ Deploy ขึ้น GitHub Pages

### ขั้นตอนที่ 1 — สร้าง Repository

```bash
# สร้าง repo ใหม่บน GitHub ชื่อ english-ar-learning
# หรือใช้ชื่ออื่นก็ได้

git init
git add .
git commit -m "v1.0 - Initial release"
git remote add origin https://github.com/YOUR_USERNAME/english-ar-learning.git
git branch -M main
git push -u origin main
```

### ขั้นตอนที่ 2 — เปิด GitHub Pages

1. ไปที่ GitHub Repository
2. คลิก **Settings** → **Pages**
3. เลือก **Source**: `Deploy from a branch`
4. เลือก Branch: `main`, Folder: `/ (root)`
5. คลิก **Save**

URL ที่ได้จะเป็น:
```
https://YOUR_USERNAME.github.io/english-ar-learning/
```

### ขั้นตอนที่ 3 — เปิดบนมือถือ

เปิด URL ด้านบนบนโทรศัพท์ Chrome (Android) หรือ Safari (iOS)

---

## 🎯 การเตรียมไฟล์ targets.mind (สำคัญมาก!)

`targets.mind` คือไฟล์ที่ MindAR ใช้จดจำภาพ Target ต้องสร้างจากภาพจริงที่ต้องการสแกน

### วิธีสร้าง targets.mind

**ขั้นตอนที่ 1 — เตรียมภาพ**

เตรียมภาพ Target ทั้ง 10 ใบ:

| Index | Target | คำแนะนำภาพ |
|-------|--------|------------|
| 0 | McDonald's | ภาพโลโก้ McDonald's ชัดเจน |
| 1 | Nike | ภาพโลโก้ Nike (Swoosh) |
| 2 | Coca-Cola | ภาพโลโก้ Coca-Cola หรือกระป๋อง |
| 3 | 7-Eleven | ภาพโลโก้ 7-Eleven |
| 4 | Starbucks | ภาพโลโก้ Starbucks |
| 5 | Restroom | ภาพป้าย Restroom |
| 6 | Exit | ภาพป้าย Exit |
| 7 | Warning | ภาพป้าย Warning (สามเหลี่ยมเหลือง) |
| 8 | No Smoking | ภาพป้าย No Smoking |
| 9 | Information | ภาพป้าย Information (i) |

**ข้อกำหนดภาพ:**
- ขนาดอย่างน้อย 480×480 px
- Format: JPG หรือ PNG
- ไม่มีพื้นหลังซ้ำกัน (เช่น ลายเช็ค)
- ภาพที่มีรายละเอียดสูงจดจำได้ดีกว่า

**ขั้นตอนที่ 2 — ใช้ MindAR Compiler**

1. ไปที่ https://hiukim.github.io/mind-ar-js-doc/tools/compile
2. เลือก **Upload Images** → อัปโหลดภาพทั้ง 10 ใบ **ตามลำดับ index** (0–9)
3. กด **Compile**
4. ดาวน์โหลดไฟล์ `targets.mind`
5. วางไว้ที่ `assets/targets/targets.mind`

> ⚠️ **สำคัญ:** ลำดับภาพต้องตรงกับ targetIndex ในโค้ด (index 0 = McDonald's, index 1 = Nike ...)

---

## 🏪 การเตรียมโมเดล 3D (Part 4)

Part 4 ใช้โมเดล 3D ในรูปแบบ `.glb`

### วิธีหาโมเดล .glb ฟรี

- **Sketchfab**: https://sketchfab.com (ค้นหา "convenience store" หรือ "shop")
- **Poly Haven**: https://polyhaven.com
- **Google Model Viewer Examples**: https://modelviewer.dev

### วิธีสร้างโมเดลเอง

- **Blender** (ฟรี): สร้างโมเดล Export เป็น .glb
- **Spline** (https://spline.design): สร้างออนไลน์ได้

### การวาง Hotspot บนโมเดล

เมื่อได้ .glb แล้ว ให้เปิด https://modelviewer.dev/editor/ เพื่อ:
1. อัปโหลดโมเดล
2. คลิกตำแหน่งที่ต้องการ Hotspot
3. คัดลอก `data-position` และ `data-normal` มาใส่ใน `part4/index.html`

---

## 📱 ข้อจำกัดของอุปกรณ์

### Android Chrome ✅ แนะนำ

- รองรับ WebAR ได้ดีที่สุด
- Web Speech API ทำงานได้เต็มประสิทธิภาพ
- เสียงทำงานโดยอัตโนมัติ

### iOS Safari ⚠️ มีข้อจำกัด

- **AR**: รองรับ MindAR แต่อาจช้ากว่า Android
- **Web Speech API**: รองรับบน iOS 14.5+ แต่ต้อง **กดปุ่มก่อน** ถึงจะได้ยินเสียง (ไม่สามารถเล่นเสียงอัตโนมัติได้บน iOS)
- แนะนำให้ใช้ Safari บน iOS ไม่ใช่ Chrome (Chrome iOS ไม่รองรับ Web Speech API)

### Desktop Chrome ✅ ทำงานได้

- AR ทำงานผ่าน Webcam ได้
- แต่ออกแบบสำหรับมือถือเป็นหลัก

---

## 🔑 Library ที่ใช้

| Library | Version | ใช้ใน | CDN |
|---------|---------|-------|-----|
| A-Frame | 1.4.2 | AR Scene | cdn.jsdelivr.net |
| MindAR | 1.2.5 | Image Tracking | cdn.jsdelivr.net |
| model-viewer | 3.3.0 | 3D Model (Part 4) | unpkg.com |
| Google Fonts (Nunito, Space Mono) | - | UI | fonts.googleapis.com |

ไม่มี Backend, ไม่ต้องใช้ API Key ทั้งหมด

---

## 🛠️ การปรับแต่งข้อมูล

### เพิ่มคำศัพท์ใหม่ใน Part 1

แก้ไขไฟล์ `assets/data/vocab.json`:

```json
{
  "index": 10,
  "word": "Pharmacy",
  "phonetic": "/ˈfɑːrməsi/",
  "type": "Sign",
  "example": "I need to go to the pharmacy."
}
```

แล้วเพิ่ม AR entity ใน `part1/index.html`:
```html
<a-entity mindar-image-target="targetIndex: 10" id="target-10">
  <a-text value="Pharmacy" ...></a-text>
</a-entity>
```

และเพิ่มภาพที่ index 10 ตอน compile targets.mind ใหม่

### เพิ่มคำถามใหม่ใน Part 2

แก้ไข `assets/data/questions.json` — เพิ่ม string เข้าไปในอาร์เรย์ `questions` ของ target ที่ต้องการ

---

## 🎨 การเปลี่ยนสี/ธีม

แก้ CSS variables ใน `style.css`:

```css
:root {
  --cyan:   #00d4ff;   /* สีหลัก Part 1 */
  --yellow: #ffd60a;   /* สีหลัก Part 2 */
  --pink:   #ff3b8f;   /* สีหลัก Part 3 */
  --green:  #06d6a0;   /* สีหลัก Part 4 */
}
```

---

## ❓ Troubleshooting

**Q: กล้องไม่เปิด**
- ตรวจสอบว่าเว็บเปิดด้วย HTTPS (GitHub Pages ใช้ HTTPS อัตโนมัติ)
- กดอนุญาต Camera permission เมื่อ browser ถาม

**Q: AR ไม่จดจำภาพ**
- ตรวจสอบว่า `targets.mind` อยู่ที่ `assets/targets/targets.mind`
- ลำดับภาพตอน compile ต้องตรงกับ targetIndex

**Q: ไม่มีเสียง (iOS)**
- บน iOS ต้องกดปุ่ม Speak ก่อน ไม่สามารถเล่นเสียงอัตโนมัติได้

**Q: Part 4 ไม่แสดงโมเดล 3D**
- ถ้าไม่มี `shop.glb` ระบบจะแสดง Demo Scene แทน (ปกติ)
- วางไฟล์ .glb ที่ `assets/models/shop.glb` เพื่อใช้โมเดลจริง

---

## 📄 License

สร้างเพื่อการศึกษา — ใช้งานได้อย่างอิสระ

---

*English AR Learning v1.0 | Built for mobile learning*
