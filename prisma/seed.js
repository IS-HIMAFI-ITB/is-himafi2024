import { PrismaClient } from "@prisma/client";
import { Role } from "@prisma/client";

const prisma = new PrismaClient();

const akunPesertas = [
    {name: "ikan1", nim: "123", password: "d1"},
    {name: "ikan2", nim: "234", password: "d2"},
]

const akunPanits = [
    {name: "panit1", nim: "345", password: "e1",role: Role.ADMIN},
    {name: "panit2", nim: "456", password: "e2",role: Role.ADMIN},
]

const load = async () => {
    try {
        // //!seed akun peserta 
        const akunPeserta = await prisma.user.createMany({
                data: akunPesertas, skipDuplicates: true,
        });
        // //!seed akun panit
        const akunPanit = await prisma.user.createMany({
                data: akunPanits, skipDuplicates: true,
        });
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
};
await load()