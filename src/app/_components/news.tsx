import Link from "next/link";
export function News() {
  return (
    <div
      className="flex w-[100vw] flex-col bg-local px-10 py-20 font-roman font-bold text-amber-900 md:w-[90vw] md:px-28"
      style={{
        backgroundImage: `url('/news-paper.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <h1 className="pb-10 pt-10 text-center font-bluecashews text-3xl font-extrabold tracking-widest md:text-6xl">
        Can Physics Lead You to a Good Career ?
      </h1>
      <div className="flex flex-col justify-between gap-20 pb-4 text-justify lg:flex-row">
        <div>
          <p className="pb-2 text-center font-bluecashews text-2xl font-black">
            &quot;Transisi Fase Karir: Menemukan Jalan dari Akademis ke
            Profesional dalam Dunia Fisika&quot;
          </p>
          <p className="first-letter:float-left first-letter:text-[5rem] first-letter:font-black first-letter:uppercase first-letter:leading-[4.5rem]">
            Di dunia fisika, transisi fase menggambarkan perubahan mendalam
            dalam sifat-sifat material ketika kondisi seperti suhu dan tekanan
            berubah. Konsep ini relevan tidak hanya dalam konteks materi, tetapi
            juga dalam perjalanan karir seseorang. Mahasiswa fisika sering kali
            menghadapi tantangan dalam mengalihkan pengetahuan akademis mereka
            ke dunia profesional. Dengan demikian, memahami dan mempersiapkan
            diri untuk &quot;transisi fase&quot; dalam karir adalah langkah
            penting untuk kesuksesan mereka di masa depan.
          </p>
          <div className="py-3">
            <Link
              href="https://youtu.be/eJ7cAjhFTTg"
              className="flex flex-row justify-center rounded-lg bg-red-700 px-10 py-2 font-semibold text-white no-underline transition hover:bg-red-600"
            >
              Testimoni Alumni Fisika
            </Link>
          </div>
          {/* <div className="py-3">
            <Link
              href="https://youtu.be/4HrweW4IqJc?si=YacA-Un4IuXZc_xs"
              className="flex flex-row justify-center rounded-lg bg-red-700 px-10 py-2 font-semibold text-white no-underline transition hover:bg-red-600"
            >
              If You Are a Physics Major...
            </Link>
          </div> */}
          <p className="pb-5 pt-2 text-center font-sans font-bold">
            Hadirilah Day 3, 24 Agustus 2024 pukul 08.00 WIB
          </p>
          <div className="flex flex-row justify-center gap-10 text-center">
            <Link
              href="https://drive.google.com/file/d/1cYYk0RszTgo4Oq1OKOZCsnFUdIkwFceO/view?usp=sharing"
              className="rounded-full bg-violet-800 px-10 py-3 font-semibold text-white no-underline transition hover:bg-violet-700"
            >
              Buku ungu
            </Link>
            <Link
              href="https://drive.google.com/file/d/1I60q6Q0zYZea4b6VMbJypwTUWChSjFE_/view?usp=drive_link"
              className="rounded-full bg-red-700 px-10 py-3 font-semibold text-white no-underline transition hover:bg-red-600"
            >
              Buku merahs
            </Link>
          </div>
        </div>

        {
          //posts are unused at day 0
          /* <div>
                    <p className="text-center pb-2 font-black text-2xl">post panitia</p>
                    <p className="first-letter:float-left first-letter:uppercase first-letter:leading-[4.5rem] first-letter:text-[5rem] first-letter:font-black"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div> */
        }
      </div>
      {
        //Recheck-day form is unused at day 0
        /* <div className="flex flex-col justify-center items-center mt-10">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSci9nK1b70C5Ju7AcoxrCYQ_R8Lngc7JgbhZYuau4nHQLa9TQ/formResponse">
                    <button className="text-center inline-block rounded-full bg-black/90 px-10 py-3 no-underline transition hover:bg-black/60 text-white text-center font-bluecashews"> 
                        Form Konfirmasi Kehadiran
                    </button>
                </a>
                <p className="text-center font-black font-roman pt-2">
                    Form ini wajib diisi oleh seluruh peserta pada saat Day. Bagi yang belum mengisi, silakan mengisi form.
                </p>
            </div> */
      }
    </div>
  );
}
