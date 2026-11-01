import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CTABlock from "@/components/seo/CTABlock";
import FAQSection from "@/components/seo/FAQSection";
import ProductSeoSchema from "@/components/seo/ProductSeoSchema";
import { buildProductMetadata } from "@/lib/seo-catalog";
import { getWhatsAppUrl } from "@/lib/constants";
import {
  MotorIcon,
  SunWindIcon,
  ShieldIcon,
  LayersIcon,
  ClockIcon,
  WhatsAppIcon,
  ArrowRightIcon,
} from "@/components/icons/ArchitecturalIcons";

export const metadata: Metadata = buildProductMetadata("giyotin-cam-motorlu", {
  title: "Motorlu Giyotin Cam Sistemleri | Otomatik Açılır Kapanır | Ata Yapı",
  description:
    "Motorlu ve uzaktan kumandalı giyotin cam sistemleri. Somfy ve Becker motor seçenekleri, rüzgar ve yağmur sensörü entegrasyonu, sessiz çalışma, 2 yıl garanti.",
  extraKeywords: [
    "motorlu cam balkon",
    "otomatik dikey sürgülü cam",
    "motorlu giyotin fiyatları",
  ],
});

const motorFeatures = [
  {
    index: "01",
    title: "Uzaktan Kumanda & Mobil Kontrol",
    description:
      "Tek tuşla veya akıllı telefon otomasyonuyla tüm panelleri senkronize ya da bağımsız olarak kontrol edin.",
    icon: <MotorIcon className="w-5 h-5" />,
  },
  {
    index: "02",
    title: "Akıllı Hava Sensörleri",
    description:
      "Yağmur ve rüzgâr sensörleri sayesinde olumsuz hava koşullarında sistem otomatik olarak güvenli konuma kapanır.",
    icon: <SunWindIcon className="w-5 h-5" />,
  },
  {
    index: "03",
    title: "Somfy & Becker Tüp Motorlar",
    description:
      "Avrupa standartlarında yüksek torklu Somfy ve Becker tüp motorlar ile sarsıntısız, sessiz ve uzun ömürlü mekanizma.",
    icon: <MotorIcon className="w-5 h-5" />,
  },
  {
    index: "04",
    title: "Sıkışma Emniyeti & Güvenlik",
    description:
      "Hareket esnasında engel algılandığında otomatik durma sensörü ve çelik takviyeli ağır hizmet triger/zincir aktarımı.",
    icon: <ShieldIcon className="w-5 h-5" />,
  },
  {
    index: "05",
    title: "Isıcamlı Termal & Akustik Yalıtım",
    description:
      "8mm temperli veya 20mm argon gazlı Isıcam paneller ve EPDM fırçalı fitil sistemi ile maksimum sızdırmazlık.",
    icon: <LayersIcon className="w-5 h-5" />,
  },
  {
    index: "06",
    title: "Zamanlayıcı ve Akıllı Bina Uyumu",
    description:
      "KNX, Somfy TaHoma ve ticari işletme otomasyon senaryolarına doğrudan entegrasyon imkânı.",
    icon: <ClockIcon className="w-5 h-5" />,
  },
];

const faqs = [
  {
    question: "Motorlu giyotin cam elektrik kesintisinde nasıl çalışır?",
    answer:
      "Motorlu sistemlerimizde opsiyonel kesintisiz güç kaynağı (UPS/akü kiti) desteği bulunmaktadır; elektrik kesintilerinde sistem güvenli şekilde kapatılabilir.",
  },
  {
    question: "Hangi motor markaları kullanılıyor?",
    answer:
      "Ata Yapı olarak sektör lideri Somfy, Becker ve yüksek torklu sertifikalı tüp motorlar kullanıyoruz. Tüm motorlar 2 yıl üretici garantilidir.",
  },
  {
    question: "Akıllı ev sistemlerine entegre edilebilir mi?",
    answer:
      "Evet, KNX, Zigbee, Somfy TaHoma veya standart kuru kontak röle modülleri ile mevcut otomasyon sisteminize entegre edilebilir.",
  },
  {
    question: "Motorlu giyotin cam fiyatı nasıl hesaplanır?",
    answer:
      "Fiyatlandırma cephe genişliği, yükseklik, motor markası (Somfy/Becker), cam kombinasyonu (tek temperli veya Isıcam) ve sensör donanımına göre belirlenir.",
  },
];

export default function MotorluGiyotinPage() {
  return (
    <>
      <ProductSeoSchema productId="giyotin-cam-motorlu" />

      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-[#0b0f19] text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0">
          <Image
            src="/giyotin-cam-hero.jpg"
            alt="Motorlu Giyotin Cam Sistemleri"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/90 to-[#0b0f19]/40" />
          <div className="absolute inset-0 arch-grid-dark opacity-70 pointer-events-none" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Ana Sayfa
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/giyotin-cam" className="hover:text-white transition-colors">
                    Giyotin Cam
                  </Link>
                </li>
                <li>/</li>
                <li className="text-white font-semibold">Motorlu Sistem</li>
              </ol>
            </nav>

            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-white/[0.06] border border-white/15 text-xs font-semibold tracking-wide text-slate-200 mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              <span>SOMFY & BECKER OTOMASYON</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Motorlu Giyotin <span className="text-red-500">Cam Sistemleri</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              Uzaktan kumandalı, sessiz tüp motorlu ve akıllı sensörlü dikey hareketli cam
              paneller ile mekânlarınızı tek dokunuşla açık terasa dönüştürün.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link
                href="/iletisim"
                className="btn-press inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-colors"
              >
                <span>Ücretsiz Keşif İste</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <a
                href={getWhatsAppUrl("Merhaba, motorlu giyotin cam sistemi hakkında bilgi almak istiyorum.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>WhatsApp Teklif Al</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-3">
              <span className="w-6 h-[2px] bg-[var(--primary)]" />
              <span>OTOMASYON TEKNOLOJİSİ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Akıllı Motorlu Mekanizma Donanımı
            </h2>
            <p className="text-slate-600 text-base">
              Yüksek torklu motor ve akıllı sensör ekipmanlarıyla kesintisiz, güvenli kullanım.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {motorFeatures.map((item) => (
              <div
                key={item.index}
                className="p-6 sm:p-7 bg-white rounded-xl border border-slate-200 hover:border-slate-900 transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 group-hover:bg-[var(--primary)] group-hover:text-white flex items-center justify-center transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    {item.index}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection title="Motorlu Giyotin Cam Hakkında Sıkça Sorulan Sorular" faqs={faqs} />

      <CTABlock />
    </>
  );
}
