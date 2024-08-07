import { PrismaClient } from "@prisma/client";
import { Role } from "@prisma/client";

const prisma = new PrismaClient();

const akunPesertas = [
    {nim: "10223001", name: "Muhammad Zamil Muthahhari",},
    {nim: "10223002", name: "Alyani Mazaya Inaldo",},
    {nim: "10223003", name: "Belva Syazwina Herman",},
    {nim: "10223004", name: "Ryan Gibran P. Sihaloho",},
    {nim: "10223005", name: "Rizka Hasna Tiara",},
    {nim: "10223006", name: "Ahmad Fadillah",},
    {nim: "10223007", name: "Maudy Rahma Tsabitha",},
    {nim: "10223008", name: "Raya Nouvalli Pasha",},
    {nim: "10223009", name: "Marsha Zhalyka Febrianthy",},
    {nim: "10223010", name: "Kayla Faza Herfian",},
    {nim: "10223011", name: "Nadila Gusriyani",},
    {nim: "10223012", name: "Adinda Mutiara Salsabiela",},
    {nim: "10223013", name: "Hasna Ayesha Bastari",},
    {nim: "10223014", name: "Nazwa Ikmalia Putri Purba",},
    {nim: "10223015", name: "Ni'ma Auliya Mulyana",},
    {nim: "10223016", name: "Zakira Khairunnisa Jumahaldi",},
    {nim: "10223017", name: "Yafi Zainul Muttaqin",},
    {nim: "10223018", name: "Atthur Seine Jayasasmita",},
    {nim: "10223019", name: "Syauqi Fatah Mulkillah",},
    {nim: "10223020", name: "Atra Ardiyanto Alam Purnama",},
    {nim: "10223021", name: "Tamam Dwi Amanulloh",},
    {nim: "10223022", name: "Shafa Zahra Afifah",},
    {nim: "10223023", name: "Muhammad Ridwan Mulyana",},
    {nim: "10223024", name: "Sri Hestin Berliana",},
    {nim: "10223025", name: "Calvin Sabastian Tanzil",},
    {nim: "10223026", name: "Naifa Ahnaf Sabita",},
    {nim: "10223027", name: "Magnalia Beatifica Dei",},
    {nim: "10223028", name: "Mateus Rolamro P. Sidabutar",},
    {nim: "10223029", name: "Santun Wiwaha",},
    {nim: "10223030", name: "Muhammad Ataa Aqil D",},
    {nim: "10223031", name: "Angel Betesda Silaban",},
    {nim: "10223032", name: "Muhammad Surya Kusuma",},
    {nim: "10223033", name: "Olvandri Nouva Pratama",},
    {nim: "10223034", name: "Fadil S Omar Attala",},
    {nim: "10223035", name: "Kuny Roihanata Bintarti",},
    {nim: "10223036", name: "Muhammad Azfa Mukhlis",},
    {nim: "10223037", name: "Dietrich Pepalem Tarigan",},
    {nim: "10223038", name: "Abraham Heven Philia Saragih",},
    {nim: "10223039", name: "Aldi Wahyu Permana",},
    {nim: "10223040", name: "Chaesya Jasmine Wanda Islami",},
    {nim: "10223041", name: "Abar Almazari",},
    {nim: "10223042", name: "Nurul Izzati",},
    {nim: "10223043", name: "Tasniem Asyifa Wahyudi",},
    {nim: "10223044", name: "Nadyazir Rahmah Siregar",},
    {nim: "10223045", name: "Naufal Aulia Pramadhana",},
    {nim: "10223046", name: "Mohammad Adil Ramdhi Fadhila",},
    {nim: "10223047", name: "Muhammad Affan",},
    {nim: "10223048", name: "John Derrick Halomoan Tambunan",},
    {nim: "10223049", name: "Muhammad Afiq Iqbal Saputra",},
    {nim: "10223050", name: "Gading Manggala Ramadanu",},
    {nim: "10223051", name: "Azizah Pribadi Istiqomah",},
    {nim: "10223052", name: "Najmicitta Khalif Fauzana",},
    {nim: "10223053", name: "Lidia Safira Adiibah",},
    {nim: "10223054", name: "Rubent Titus Nainggolan",},
    {nim: "10223055", name: "Aliif Fahrur Abi Hanafi",},
    {nim: "10223056", name: "Petra Siahaan",},
    {nim: "10223057", name: "Gea Imelda Hanna Saweri",},
    {nim: "10223058", name: "Raden Vio Brahmantyo",},
    {nim: "10223059", name: "Sherina Dwi Ariani",},
    {nim: "10223060", name: "Adrian Pandjie Ramdhani",},
    {nim: "10223061", name: "Destira Ainur Rahmah",},
    {nim: "10223062", name: "Reffanditya Aski Putra",},
    {nim: "10223063", name: "Jack Lucas Christian",},
    {nim: "10223064", name: "Muhammad Rasyid Ghifari",},
    {nim: "10223065", name: "Nauroh Salsabila",},
    {nim: "10223066", name: "Muhammad Fahreza Daffa Ayyasy",},
    {nim: "10223067", name: "Gwen Sevilen",},
    {nim: "10223068", name: "Nashwan Iqbal Ramdhani",},
    {nim: "10223069", name: "Dafina Sellisya Narendra",},
    {nim: "10223070", name: "Kayla Adinda Nasution",},
    {nim: "10223071", name: "Nazifa",},
    {nim: "10223072", name: "Vincent Constantine Darmawan",},
    {nim: "10223073", name: "Fathiyah Shidqiya Sadida",},
    {nim: "10223074", name: "Reyhan Nugraha Akbar",},
    {nim: "10223075", name: "Muhammad Syamsuddiin",},
    {nim: "10223076", name: "Salsyabilla Puteri Edora",},
    {nim: "10223077", name: "Lim, Edbert Valentino Halim",},
    {nim: "10223078", name: "Kaesya Paradilla",},
    {nim: "10223079", name: "Ilham Aimanthariq Haripradana",},
    {nim: "10223080", name: "Khansa Muthia Abrar",},
    {nim: "10223081", name: "Hani Lutfiana Febriani Ode",},
    {nim: "10223082", name: "Meizar Gutama",},
    {nim: "10223083", name: "Ikbar Fauzul Mubin Ruhimat",},
    {nim: "10223084", name: "Valinda Zikra Markus",},
    {nim: "10223085", name: "Azzahra Putriya Ahmad",},
    {nim: "10223086", name: "Zidan Ramadhan Rusdiana",},
    {nim: "10223087", name: "Hairil Aulia",},
    {nim: "10223088", name: "Efra Feyza",},
    {nim: "10223089", name: "Nadya Fitri Amelia",},
    {nim: "10223090", name: "Akhmad Zidane Luqman",},
    {nim: "10223091", name: "Sabila Fauziyah",},
    {nim: "10223092", name: "Tazkia Sahla Fatihah Qurrota A",},
    {nim: "10223093", name: "Fathiyyahdi At Thariq",},
    {nim: "10223094", name: "Kayla Sabira Yusuf",},
    {nim: "10223095", name: "Nabilah Zulfa Kudrati",},
    {nim: "10223096", name: "Nindya Khoeroni Safitri",},
    {nim: "10223097", name: "Muhammad Zahranhaq Algifar",},
    {nim: "10223098", name: "Ardhika Maradana Sumirat",},
    {nim: "10223099", name: "Yehezkiel Rusniyanto Massa",},
    {nim: "10223100", name: "Noraini",},
    {nim: "10223101", name: "Adiyasa Pratama Putra",},
    {nim: "10223102", name: "Nairaya Zaizafun",},
    {nim: "10223103", name: "Kaisa Nida Assafira",},
    {nim: "10223104", name: "Zharfan Aksa Khoiri",},
    
    {nim: "1", name: "pesertaDummy1", passwordOverride: false, password: "1"},
    {nim: "2", name: "pesertaDummy2", passwordOverride: false, password: "2"},
]

const akunPanits = [
    {name: "panitia", nim: "10222000", passwordOverride: false, password: "965d1d1288fda83d002cf4d35dd8d02fe5c3e1fbe6a5d030ebb1aa9798df4f1e9cbf5e927af7914a6457e5af6a982d0637df4f57ed61ea396bc12f8da14ab752",role: Role.ADMIN},
]

const load = async () => {
    try {
        // //!seed akun peserta 
        // const akunPeserta = 
        await prisma.user.createMany({
                data: akunPesertas, skipDuplicates: true,
        });
        // //!seed akun panit
        // const akunPanit = 
        await prisma.user.createMany({
                data: akunPanits, skipDuplicates: true,
        });
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
};
await load()