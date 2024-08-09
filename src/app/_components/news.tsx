"use client"

export function News() {
    return (
        <div className="flex flex-col bg-local w-[100vw] md:w-[90vw] px-10 md:px-28 py-20 text-amber-900 font-bold font-serif"
        style={{
            backgroundImage: `url('/news-paper.png')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
        }}>
            <h1 className="text-center text-3xl md:text-6xl font-extrabold tracking-widest pb-10 pt-10 font-bluecashews">SELAMAT DATANG MASSA FISIKA&apos;23</h1>
            <div className="flex flex-col lg:flex-row justify-between gap-20 pb-4 text-justify">
                <div>
                    <p className="text-center pb-2 font-black text-2xl font-bluecashews">
                        Relativitas Diri: Perjalanan Eksistensial Melalui Ruang dan Waktu
                    </p>
                    <p className="first-letter:float-left first-letter:uppercase first-letter:leading-[4.5rem] first-letter:text-[5rem] first-letter:font-black font-roman">
                        Layaknya ruang dan waktu yang relatif, diri juga merupakan sesuatu yang selalu berbeda jika dipandang dari kerangka yang berbeda. Seperti teori relativitas yang memperlihatkan betapa ruang dan waktu tidaklah mutlak, begitu pula dengan pemahaman kita tentang diri. Setiap individu memiliki perspektif unik, yang mempengaruhi bagaimana mereka melihat dunia dan bagaimana dunia melihat mereka. Dalam perjalanan ini, kita mengarungi misteri diri yang ada di dalam ruang dan waktu, mempertanyakan eksistensi kita, dan merenungi kemana semua ini akan berlanjut. Sebuah eksplorasi tentang identitas, tujuan, dan makna yang terus berubah seiring dengan perjalanan kita melalui ruang dan waktu yang tak terbatas.
                    </p>
                </div>
                
                {//posts are unused at day 0
                /* <div>
                    <p className="text-center pb-2 font-black text-2xl">post panitia</p>
                    <p className="first-letter:float-left first-letter:uppercase first-letter:leading-[4.5rem] first-letter:text-[5rem] first-letter:font-black"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div> */}
            </div>
        </div>
    );
}