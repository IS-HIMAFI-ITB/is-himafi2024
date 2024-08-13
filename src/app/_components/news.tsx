import Link from 'next/link';
export function News() {
    return (
        <div className="flex flex-col bg-local w-[100vw] md:w-[90vw] px-10 md:px-28 py-20 text-amber-900 font-bold font-roman"
        style={{
            backgroundImage: `url('/news-paper.png')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
            
        }}>
            <h1 className="text-center text-3xl md:text-6xl font-extrabold tracking-widest pb-10 pt-10 font-bluecashews">You have found your soul, but...</h1>
            <div className="flex flex-col lg:flex-row justify-between gap-20 pb-4 text-justify">
                <div>
                    <p className="text-center pb-2 font-black text-2xl font-bluecashews">
                    &quot;Entropi Pikiran:  Eksplorasi Peran Insan Akademis dalam Berpikir dan Pengembangan Potensi&quot;
                    </p>
                    <p className="first-letter:float-left first-letter:uppercase first-letter:leading-[4.5rem] first-letter:text-[5rem] first-letter:font-black">
                    Dalam dunia fisika, entropi sering kali dikaitkan dengan ketidakberaturan dan perubahan. Begitu pula dengan pikiran manusia yang penuh dengan potensi tak terbatas dan tantangan yang harus dihadapi. Sebagai insan akademis, kita memiliki peran penting dalam mengarungi lautan entropi pikiran ini, mengubah ketidakberaturan menjadi kreativitas, dan memanfaatkan potensi yang ada untuk mencapai hal-hal besar. Eksplorasi ini bukan hanya tentang ilmu pengetahuan, tetapi juga tentang bagaimana kita berpikir, berinovasi, dan berkembang sebagai individu. Mari kita bersama-sama mengeksplorasi peran kita dalam dunia akademis, memahami bagaimana cara berpikir kita dapat membentuk masa depan, dan mengembangkan potensi diri untuk menjadi agen perubahan yang membawa dampak positif bagi dunia. 
                    </p>
                    <div className='py-3'>
                    <Link href="https://www.youtube.com/watch?v=WXBA4eWskrc&pp=ygUXcGhpbG9zb3BoeSBvZiB0aW1lIHRlZHg%3D" className='flex flex-row justify-center rounded-lg bg-red-700 px-10 py-2 text-white font-semibold no-underline transition hover:bg-red-600 '>The Philosophy of Time Management</Link>
                    </div>
                    <p className="text-center font-bold font-sans pt-2 pb-5">Hadirilah Day 1, 15 Agustus 2024, 07.30</p>
                    <div className="flex flex-row justify-center gap-10">
                        <Link href="https://drive.google.com/file/d/1ELOjJhzWJ4OKUIm7QeNcrqNwD-Drr_i1/view?usp=sharing" className='rounded-full bg-violet-800 px-10 py-3 text-white font-semibold no-underline transition hover:bg-violet-700'>Buku ungu</Link>
                        <Link href="https://drive.google.com/file/d/1zRHCbBsZu3rkIOC3BdQQBy4JI1z9md69/view?usp=drive_link" className='rounded-full bg-red-700 px-10 py-3 text-white font-semibold no-underline transition hover:bg-red-600'>Buku merah</Link>
                    </div>
                </div>
                
                {//posts are unused at day 0
                /* <div>
                    <p className="text-center pb-2 font-black text-2xl">post panitia</p>
                    <p className="first-letter:float-left first-letter:uppercase first-letter:leading-[4.5rem] first-letter:text-[5rem] first-letter:font-black"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div> */}
            </div>
            <div className="flex justify-center items-center">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSci9nK1b70C5Ju7AcoxrCYQ_R8Lngc7JgbhZYuau4nHQLa9TQ/formResponse">
                    <button className="text-center inline-block rounded-full bg-black/90 px-10 py-3 no-underline transition hover:bg-black/60 text-white text-center font-bluecashews"> 
                        Konfirmasi Kehadiran Day
                    </button>
                </a>
            </div>
        </div>
    );
}