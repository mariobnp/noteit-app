### Penggunaan AI (Gemini) dalam Pengembangan

Berikut adalah beberapa hal di mana saya menggunakan bantuan Gemini:

- **Debugging Permasalahan `contentEditable`**: Saat mencoba mengimplementasikan atribut `contentEditable` untuk input isi catatan, saya menemukan *bug* di mana posisi kursor selalu kembali ke awal saat mengetik (teks terbalik). Gemini membantu saya menganalisis bahwa masalah ini disebabkan oleh siklus *re-render* React, dan memberikan pertimbangan teknis yang akhirnya membuat saya memutuskan untuk menggunakan `<textarea>` sebagai solusi yang lebih stabil.
- **Penerapan Styling**: Saya menggunakan Gemini untuk membantu menyusun dan merapikan *class* Tailwind CSS pada komponen-komponen aplikasi, termasuk membuat halaman menjadi lebih responsif untuk perangkat *mobile*.
- **Struktur dan Alur Komponen**: Gemini membantu saya memberikan gambaran dan memvalidasi bagaimana cara menstrukturkan komponen React yang baik, serta bagaimana mengatur alur data (*props/state*) dan *routing* navigasi antar halaman agar berjalan dengan lancar.
- **Koreksi dan *Code Review***: Setelah menulis kode, saya sering kali meminta Gemini untuk melakukan tinjauan ulang (*review*) guna memastikan kode yang saya tulis sudah berjalan dengan benar, mengikuti praktik terbaik (*best practices*)

### catatan untuk reviewer terkait penggunaan contenteditable

halo mas/mbak reviewer!

sedikit penjelasan, awalnya aku udah nyoba buat nerapin tips menggunakan atribut `contenteditable` supaya input isi catatannya bisa support rich format html. tapi pas aku terapin di react component-nya, aku ketemu bug yang.

gara-gara react ngelakuin re-render tiap ada perubahan state dari event oninput, posisi kursornya (caret) selalu ke-reset balik ke paling awal. jadinya waktu aku ngetik buat ngedit catatan, huruf-huruf barunya malah numpuk di depan dan kebalik susunannya (misal ngetik 'tes' malah jadi 'set' di awal kalimat). aku sempet coba akalin biar ga terus-terusan re-render, eh inputnya malah jadi nge-freeze dan gak bisa diketik sama sekali hehe.

karena penerapan `contenteditable` ini sifatnya opsional, dan yang paling penting core feature dari aplikasinya tetep berjalan mulus pas diuji, akhirnya aku putusin buat balik pakai tag `<textarea>` biasa aja untuk isi catatannya.

ini perbandingan kode yang aku ubah:

**kode awal (waktu nyoba contenteditable - ada bug kursor):**

```jsx
<div
    className="p-3 border border-white-500 rounded-lg text-white empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white-500"
    data-placeholder="Judul catatan..."
    contentEditable
    suppressContentEditableWarning={true}
    onInput={this.onTitleChangeEventHandler}
    dangerouslySetInnerHTML={{ __html: this.state.title}}
></div>

<div
    className="p-3 border border-white-500 rounded-lg text-white empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white-500"
    data-placeholder="tuliskan catatanmu di sini..."
    contentEditable
    suppressContentEditableWarning={true}
    onInput={this.onbodychangeeventhandler}
    dangerouslySetInnerHTML={{ __html: this.state.body }}
></div>
```

**jadinya pakai input dan textarea biasa:

```jsx
<input
    type="text"
    placeholder="Judul catatan..."
    value={this.state.title}
    onChange={this.onTitleChangeEventHandler}
    className="p-3 border border-white-500 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white-500 placeholder-gray-400 w-full"
/>

<textarea
    placeholder="Tuliskan catatanmu di sini..."
    value={this.state.body}
    onChange={this.onBodyChangeEventHandler}
    className="p-3 border border-white-500 rounded-lg text-white bg-transparent min-h-[200px] resize-y focus:outline-none focus:ring-2 focus:ring-white-500 placeholder-gray-400 w-full"
/>
```

### Catatan Tamabahan
sebelumnya di versi *local data*, aplikasi ini memiliki fitur untuk mengedit catatan. namun, pada submission kali ini fitur **Edit Catatan** sengaja aku hilangkan sepenuhnya dari antarmuka aplikasi. 

alasannya adalah karena setelah aku mempelajari dokumentasi RESTful API yang disediakan (https://notes-api.dicoding.dev/v1), ternyata memang tidak terdapat *endpoint* untuk melakukan *update* atau edit catatan (seperti `PUT` atau `PATCH`). agar aplikasi tetap berjalan stabil dan tidak menembak *endpoint* yang kosong/tidak valid, maka *routing*, tombol, dan halaman *edit* aku hapus dari proyek ini.
