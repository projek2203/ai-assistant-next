# 🤖 AI Assistant Web (Next.js + Tailwind + OpenAI)

Proyek ini adalah **AI Assistant Web** modern berbasis **Next.js 14**, **React**, dan **TailwindCSS**, terintegrasi langsung dengan **OpenAI API**.  
UI-nya responsif, keren, dan siap deploy ke **Vercel** 🚀.

---

## ✨ Fitur
- 💬 Chat interaktif dengan model OpenAI (gpt-4o, gpt-4o-mini, gpt-3.5-turbo)
- 🎨 Desain modern dengan TailwindCSS
- 🔒 Koneksi aman via API Route (tanpa expose API key ke client)
- ⚙️ Mudah dikembangkan (struktur Next.js modular)
- 🧠 Siap ditambah editor kode (Monaco/CodeMirror)

---

## 🧩 Instalasi Lokal

### 1️⃣ Clone repository
```bash
git clone https://github.com/<username>/ai-assistant-next.git
cd ai-assistant-next
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Tambahkan API key
Buat file `.env.local` di root project dan isi:

```
OPENAI_API_KEY=sk-xxxxxx
```

### 4️⃣ Jalankan di lokal
```bash
npm run dev
```
Lalu buka [http://localhost:3000](http://localhost:3000)

---

## ☁️ Deploy ke Vercel

1. Push ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "AI Assistant initial commit"
   git branch -M main
   git remote add origin https://github.com/<username>/ai-assistant-next.git
   git push -u origin main
   ```

2. Buka [https://vercel.com/new](https://vercel.com/new)
   - Import repository kamu
   - Framework: **Next.js**
   - Tambahkan Environment Variable:
     ```
     OPENAI_API_KEY = sk-xxxxxx
     ```

3. Klik **Deploy** 🚀

---

## 🧠 Struktur Folder

```
src/
 ├─ app/
 │   ├─ api/chat/route.js      → Proxy API ke OpenAI
 │   ├─ layout.jsx             → Root layout
 │   ├─ page.jsx               → Halaman utama
 │   └─ globals.css            → Style global (Tailwind)
 └─ components/
     └─ AIAssistant.jsx        → Komponen utama Chat UI
```

---

## 🛠️ Teknologi
- [Next.js 14](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [OpenAI API](https://platform.openai.com/)
- [Monaco Editor (opsional)](https://github.com/suren-atoyan/monaco-react)

---

## 📜 Lisensi
MIT License — bebas digunakan, dikembangkan, dan dimodifikasi.

---

Dibuat dengan ❤️ oleh *kamu* — powered by **OpenAI API** ⚡
