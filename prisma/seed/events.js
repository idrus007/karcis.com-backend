import { prisma } from "../../src/application/database.js";
import { logger } from "../../src/application/logging.js";

const events = [
  {
    name: "Tech Future Expo 2025",
    description:
      "Pameran teknologi terbesar se-Asia Tenggara, menampilkan inovasi AI, IoT, dan robotik.",
    location: "Jakarta Convention Center, Jakarta",
    date: new Date("2025-11-10T09:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Standard Pass", price: 150000, quantity: 500 },
      { name: "VIP Access", price: 1000000, quantity: 50 },
    ],
  },
  {
    name: "Startup Connect 2025",
    description: "Ajang networking dan showcase startup teknologi terdepan.",
    location: "ICE BSD, Tangerang",
    date: new Date("2025-08-15T10:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Regular", price: 120000, quantity: 400 },
      { name: "Investor Lounge", price: 900000, quantity: 40 },
    ],
  },
  {
    name: "DevCon Indonesia",
    description:
      "Konferensi developer dengan topik teknologi dan sesi hands-on coding.",
    location: "Telkom University, Bandung",
    date: new Date("2025-10-20T09:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Student Pass", price: 75000, quantity: 300 },
      { name: "Professional Pass", price: 250000, quantity: 100 },
    ],
  },
  {
    name: "Indie Music Fest",
    description: "Festival musik indie dengan band lokal dan internasional.",
    location: "Eco Park Ancol, Jakarta",
    date: new Date("2025-09-05T16:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "General", price: 130000, quantity: 600 },
      { name: "All Access", price: 800000, quantity: 60 },
    ],
  },
  {
    name: "GameXperience 2025",
    description: "Pameran dan turnamen game terbesar di Indonesia.",
    location: "JIEXPO Kemayoran, Jakarta",
    date: new Date("2025-07-30T11:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Gamer Pass", price: 90000, quantity: 500 },
      { name: "Pro Player", price: 350000, quantity: 100 },
    ],
  },
  {
    name: "FilmFest Asia",
    description: "Festival film independen Asia dengan penayangan eksklusif.",
    location: "CGV Grand Indonesia",
    date: new Date("2025-09-18T19:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Basic", price: 60000, quantity: 300 },
      { name: "Premium Seat", price: 120000, quantity: 100 },
    ],
  },
  {
    name: "AI Revolution Forum",
    description: "Konferensi tentang AI dan masa depan pekerjaan.",
    location: "Universitas Indonesia, Depok",
    date: new Date("2025-12-01T08:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Early Bird", price: 100000, quantity: 200 },
      { name: "Regular", price: 200000, quantity: 100 },
    ],
  },
  {
    name: "EduTech Summit",
    description: "Transformasi pendidikan digital di Indonesia.",
    location: "Graha Unesa, Surabaya",
    date: new Date("2025-08-12T09:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Educator Pass", price: 85000, quantity: 300 },
      { name: "Corporate Pass", price: 300000, quantity: 50 },
    ],
  },
  {
    name: "CryptoCon ID",
    description: "Diskusi tren blockchain, NFT, dan Web3.",
    location: "Pullman Hotel, Jakarta",
    date: new Date("2025-10-02T12:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Holder Entry", price: 180000, quantity: 250 },
      { name: "Whale Lounge", price: 1200000, quantity: 30 },
    ],
  },
  {
    name: "UX Camp Asia",
    description: "Bootcamp desain UX intensif selama 2 hari.",
    location: "Ubud Hub, Bali",
    date: new Date("2025-08-03T08:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Design Pass", price: 170000, quantity: 200 },
      { name: "Workshop Access", price: 400000, quantity: 50 },
    ],
  },
  {
    name: "Startup Women Lead",
    description:
      "Empowerment dan networking bagi founder perempuan di Indonesia.",
    location: "CoHive Jakarta Selatan",
    date: new Date("2025-07-22T14:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Participant", price: 95000, quantity: 150 },
      { name: "Supporter", price: 50000, quantity: 300 },
    ],
  },
  {
    name: "Food Bazaar Nusantara",
    description:
      "Eksplorasi kuliner tradisional dari seluruh daerah Indonesia.",
    location: "Lapangan Merdeka, Medan",
    date: new Date("2025-08-25T10:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Taste Pass", price: 60000, quantity: 500 },
      { name: "VIP Kitchen Tour", price: 300000, quantity: 50 },
    ],
  },
  {
    name: "Digital Marketing Expo",
    description: "Strategi digital, SEO, social media, dan branding era AI.",
    location: "The Westin, Jakarta",
    date: new Date("2025-11-14T10:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Marketing Entry", price: 110000, quantity: 200 },
      { name: "Expert Access", price: 600000, quantity: 30 },
    ],
  },
  {
    name: "Motion Design Fest",
    description:
      "Event motion graphics dan animasi dengan showcase dan live VJ.",
    location: "Gandaria City Mall, Jakarta",
    date: new Date("2025-10-28T17:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Viewer", price: 90000, quantity: 300 },
      { name: "VJ Backstage", price: 400000, quantity: 40 },
    ],
  },
  {
    name: "AR/VR Indonesia Day",
    description:
      "Demo langsung AR/VR di dunia pendidikan, hiburan, dan bisnis.",
    location: "Bandung Creative Hub",
    date: new Date("2025-08-18T10:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "AR Access", price: 100000, quantity: 250 },
      { name: "VR Showcase", price: 300000, quantity: 50 },
    ],
  },
  {
    name: "Youth Leadership Camp",
    description:
      "Pelatihan kepemimpinan dan public speaking untuk pelajar dan mahasiswa.",
    location: "Cibubur Camp, Jakarta Timur",
    date: new Date("2025-07-29T09:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Camper", price: 125000, quantity: 400 },
      { name: "Mentor Pass", price: 450000, quantity: 30 },
    ],
  },
  {
    name: "Smart City ID",
    description: "Diskusi dan demo solusi kota pintar dan urban tech.",
    location: "Hotel Santika, Bandung",
    date: new Date("2025-08-20T10:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Urban Pass", price: 90000, quantity: 350 },
      { name: "Gov Panel", price: 500000, quantity: 25 },
    ],
  },
  {
    name: "CyberSec Forum",
    description:
      "Konferensi keamanan digital, hacking etis, dan proteksi data.",
    location: "Menara BCA, Jakarta",
    date: new Date("2025-12-08T11:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Security Pass", price: 160000, quantity: 250 },
      { name: "CTF Access", price: 700000, quantity: 40 },
    ],
  },
  {
    name: "Java Dev Days",
    description: "Perkembangan Java dan tools terbaru di ekosistem backend.",
    location: "ITS Surabaya",
    date: new Date("2025-10-17T13:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Dev Entry", price: 110000, quantity: 400 },
      { name: "Deep Dive", price: 350000, quantity: 50 },
    ],
  },
  {
    name: "Eco Future Festival",
    description:
      "Sustainable living, energi terbarukan, dan gaya hidup ramah lingkungan.",
    location: "Taman Menteng, Jakarta",
    date: new Date("2025-09-15T09:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Eco Pass", price: 85000, quantity: 500 },
      { name: "Green Talk", price: 300000, quantity: 35 },
    ],
  },
  {
    name: "AgriTech Talk",
    description: "Inovasi pertanian digital dan keberlanjutan pangan.",
    location: "Universitas Gadjah Mada",
    date: new Date("2025-11-05T10:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Farmer Pass", price: 95000, quantity: 350 },
      { name: "Tech Panel", price: 280000, quantity: 30 },
    ],
  },
  {
    name: "HealthTech Expo",
    description: "Inovasi digital dalam dunia medis dan layanan kesehatan.",
    location: "RS Premier Bintaro",
    date: new Date("2025-09-28T08:30:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Health Entry", price: 120000, quantity: 250 },
      { name: "Doctor Room", price: 500000, quantity: 20 },
    ],
  },
  {
    name: "UI/UX Conference",
    description: "Diskusi tren desain produk dan studi kasus UI modern.",
    location: "BINUS Alam Sutera",
    date: new Date("2025-10-10T09:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "UI Pass", price: 100000, quantity: 400 },
      { name: "UX Masterclass", price: 550000, quantity: 40 },
    ],
  },
  {
    name: "Women in STEM Summit",
    description:
      "Kolaborasi dan inspirasi perempuan di bidang sains dan teknologi.",
    location: "Universitas Airlangga",
    date: new Date("2025-10-05T08:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "STEM Entry", price: 85000, quantity: 300 },
      { name: "Innovation Panel", price: 400000, quantity: 30 },
    ],
  },
  {
    name: "Python ID Conference",
    description:
      "Pertemuan komunitas Python Indonesia dengan speaker nasional.",
    location: "Universitas Diponegoro, Semarang",
    date: new Date("2025-09-30T09:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "PyPass", price: 95000, quantity: 400 },
      { name: "PyWorkshop", price: 320000, quantity: 50 },
    ],
  },
  {
    name: "AI x Healthcare Conference",
    description: "Aplikasi AI dalam diagnosis, prediksi, dan sistem kesehatan.",
    location: "Hotel JW Marriott, Jakarta",
    date: new Date("2025-12-02T09:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "AI Entry", price: 140000, quantity: 300 },
      { name: "Medical Panel", price: 600000, quantity: 40 },
    ],
  },
  {
    name: "Creative Coding Camp",
    description: "Workshop coding interaktif untuk desain dan seni digital.",
    location: "RuangRupa, Jakarta",
    date: new Date("2025-09-12T14:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Creator Pass", price: 100000, quantity: 300 },
      { name: "Mentor Pass", price: 400000, quantity: 30 },
    ],
  },
  {
    name: "Blockchain Dev Meetup",
    description: "Meetup khusus pengembang smart contract dan Web3.",
    location: "Hacktiv8, Jakarta Selatan",
    date: new Date("2025-11-11T18:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Developer Pass", price: 95000, quantity: 200 },
      { name: "Protocol Panel", price: 500000, quantity: 25 },
    ],
  },
  {
    name: "Bali Tech Retreat",
    description: "Retreat teknologi dengan workshop dan networking santai.",
    location: "Sanur, Bali",
    date: new Date("2025-09-22T10:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Retreat Pass", price: 300000, quantity: 150 },
      { name: "Private Mentor", price: 1000000, quantity: 20 },
    ],
  },
  {
    name: "Indo WebConf",
    description:
      "Konferensi web developer tentang frontend, backend, dan cloud.",
    location: "Universitas Brawijaya, Malang",
    date: new Date("2025-10-21T10:00:00Z"),
    image: "https://placehold.co/600x400",
    tickets: [
      { name: "Web Dev Pass", price: 115000, quantity: 400 },
      { name: "Advanced Labs", price: 450000, quantity: 35 },
    ],
  },
];

async function seedEvents() {
  try {
    for (const event of events) {
      await prisma.event.create({
        data: {
          name: event.name,
          description: event.description,
          location: event.location,
          date: event.date,
          image: event.image,
          tickets: {
            create: event.tickets,
          },
        },
      });
    }

    logger?.info(`✅ Seeded ${events.length} events with tickets`);
  } catch (err) {
    logger?.error("❌ Seeder failed", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedEvents();
