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
        Physics is a Part of Your Soul
      </h1>
      <div className="flex flex-col justify-between gap-20 pb-4 text-justify lg:flex-row">
        <div>
          <p className="pb-2 text-center font-bluecashews text-2xl font-black">
            &quot;Pasca Big Bang: Dinamika Fisika sebagai Pilar Sains yang Abadi
            dan Kearifan Saintifik&quot;
          </p>
          <p className="first-letter:float-left first-letter:text-[5rem] first-letter:font-black first-letter:uppercase first-letter:leading-[4.5rem]">
            Sejak momen Big Bang, alam semesta kita telah mengalami transformasi
            yang luar biasa, berkembang dan berubah dalam cara-cara yang
            menakjubkan. Fisika, sebagai pilar utama sains, telah menjadi kunci
            untuk memahami dinamika ini dan memberikan kita wawasan mendalam
            tentang kosmos. Dalam perjalanan ini, kita tidak hanya belajar
            tentang hukum-hukum alam yang mendasari segala sesuatu, tetapi juga
            mengembangkan kearifan saintifik yang membimbing kita dalam mencari
            kebenaran dan makna. Melalui kajian fisika, kita mampu merangkul
            keabadian prinsip-prinsip ilmiah yang terus berkembang, serta
            mengaplikasikan pengetahuan ini untuk memajukan peradaban manusia.
            Mari kita telusuri bersama dinamika fisika pasca Big Bang, memahami
            bagaimana ilmu ini membentuk dunia kita, dan mengapresiasi kearifan
            saintifik yang muncul dari eksplorasi kita terhadap alam semesta.
          </p>
          <div className="py-3">
            <Link
              href="https://youtube.com/shorts/DqvpS9QJk3M?si=11iY_urm1ecIvMUU"
              className="flex flex-row justify-center rounded-lg bg-red-700 px-10 py-2 font-semibold text-white no-underline transition hover:bg-red-600"
            >
              Physics: The World&apos;s Best Analytical Framework
            </Link>
          </div>
          <div className="py-3">
            <Link
              href="https://youtu.be/4HrweW4IqJc?si=YacA-Un4IuXZc_xs"
              className="flex flex-row justify-center rounded-lg bg-red-700 px-10 py-2 font-semibold text-white no-underline transition hover:bg-red-600"
            >
              If You Are a Physics Major...
            </Link>
          </div>
          <p className="pb-5 pt-2 text-center font-sans font-bold">
            Hadirilah Day 2, 20 Agustus 2024, 07.30
          </p>
          <div className="flex flex-row justify-center gap-10">
            <Link
              href="https://drive.google.com/file/d/1TMbjJ8HHUj-zbVBy2GG54fSmU1vZ9aAU/view?usp=drive_link"
              className="rounded-full bg-violet-800 px-10 py-3 font-semibold text-white no-underline transition hover:bg-violet-700"
            >
              Buku ungu
            </Link>
            <Link
              href="https://drive.google.com/file/d/1pdvGVsUYZJXSvpxoyBV1X-8Ckh_AGUFp/view?usp=drive_link"
              className="rounded-full bg-red-700 px-10 py-3 font-semibold text-white no-underline transition hover:bg-red-600"
            >
              Buku merah
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
