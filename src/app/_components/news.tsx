"use client"

export function News() {
    return (
        <div className="flex flex-col bg-local w-[100vw] md:w-[90vw] px-10 md:px-28 py-20 text-amber-900 font-bold "
        style={{
            backgroundImage: `url('/news-paper.png')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
        }}>
            <h1 className="text-center text-3xl md:text-6xl font-extrabold tracking-widest pb-10 pt-10">NEWSPAPER HEADING PLACEHOLDER</h1>
            <div className="flex flex-col lg:flex-row justify-between gap-20 pb-4 text-justify">
                <div>
                    <p className="text-center pb-2 font-black text-2xl">Info Day</p>
                    <p className="first-letter:float-left first-letter:uppercase first-letter:leading-[4.5rem] first-letter:text-[5rem] first-letter:font-black">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                </div>
                <div>
                    <p className="text-center pb-2 font-black text-2xl">post panitia</p>
                    <p className="first-letter:float-left first-letter:uppercase first-letter:leading-[4.5rem] first-letter:text-[5rem] first-letter:font-black"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
            </div>
        </div>
    );
}