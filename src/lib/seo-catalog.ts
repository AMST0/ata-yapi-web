import type { Metadata } from "next";
import { SITE_CONTACT } from "@/lib/constants";

export interface CatalogProduct {
  id: string;
  sku: string;
  name: string;
  shortTitle: string;
  category: string;
  googleCategory: string;
  path: string;
  image: string;
  description: string;
  unitLabel: "m²" | "adet" | "sistem" | "servis";
  lowPrice: number;
  highPrice: number;
  keywords: string[];
  specs: { name: string; value: string }[];
  instagram: {
    badgeTr: string;
    headlineTr: string;
    captionTr: string;
    hashtagsTr: string;
    captionEn: string;
    hashtagsEn: string;
  };
}

export const SEO_PRODUCT_CATALOG: CatalogProduct[] = [
  {
    id: "giyotin-cam",
    sku: "ATA-GIY-001",
    name: "Giyotin Cam Sistemleri (Motorlu & Kumandalı Dikey Sürgülü Cam)",
    shortTitle: "Giyotin Cam Sistemleri",
    category: "Giyotin Cam",
    googleCategory: "Hardware > Building Materials > Doors & Windows > Windows",
    path: "/giyotin-cam",
    image: "/giyotin-cam-hero.jpg",
    description:
      "Uzaktan kumandalı motorlu giyotin cam balkon, teras, restoran ve kış bahçesi sistemleri. Isıcamlı veya 8mm temperli cam, çelik zincirli sessiz mekanizma ve 2 yıl Ata Yapı garantisi.",
    unitLabel: "m²",
    lowPrice: 5500,
    highPrice: 9500,
    keywords: [
      "giyotin cam",
      "giyotin cam sistemleri",
      "motorlu giyotin cam",
      "giyotin cam fiyatları",
      "dikey sürgülü cam balkon",
      "kafe restoran giyotin cam",
      "otomatik giyotin cam",
      "maltepe giyotin cam",
      "istanbul giyotin cam üreticisi",
    ],
    specs: [
      { name: "Cam Seçeneği", value: "8mm Temperli / 4+12+4 Isıcam" },
      { name: "Kontrol", value: "RF Uzaktan Kumandalı Tüp Motor" },
      { name: "Taşıyıcı", value: "Çelik Zincir & Alüminyum Ekstrüzyon" },
      { name: "Garanti", value: "2 Yıl Üretim ve Montaj Garantisi" },
    ],
    instagram: {
      badgeTr: "MOTORLU GİYOTİN CAM",
      headlineTr: "Tek Tuşla Açılan Panoramik Teras & Balkonlar",
      captionTr:
        "Mekanlarınızı 4 mevsim konforla buluşturun! Uzaktan kumandalı, ısıcamlı ve emniyet sensörlü Motorlu Giyotin Cam Sistemleri doğrudan Ata Yapı üretimiyle.\n\n• Sessiz Somfy / Becker motor seçenekleri\n• Maksimum rüzgar ve yağmur izolasyonu\n• Konut, villa, kafe ve restoranlara özel ölçü üretim\n• Ücretsiz keşif ve hızlı montaj",
      hashtagsTr:
        "#giyotincam #motorlugiyotincam #cambalkon #kışbahçesi #teraskapatma #mimarisistemler #atayapı #maltepecambalkon #istanbulgiyotincam #restorankapatma",
      captionEn:
        "Architectural Motorized Guillotine Glass Systems manufactured in Türkiye by Ata Yapı. Remote-controlled vertical sliding insulated glass for restaurants, hotels, villas & terraces. Direct factory export across Europe.",
      hashtagsEn:
        "#guillotineglass #motorizedglass #architecturalglazing #wintergarden #terraceglazing #pergolasystem #turkishmanufacturer #b2bconstruction #atayapi",
    },
  },
  {
    id: "giyotin-cam-motorlu",
    sku: "ATA-GIY-002",
    name: "Motorlu Giyotin Cam Sistemi (Somfy & Becker Otomasyonlu)",
    shortTitle: "Motorlu Giyotin Cam",
    category: "Giyotin Cam",
    googleCategory: "Hardware > Building Materials > Doors & Windows > Windows",
    path: "/giyotin-cam/motorlu",
    image: "/giyotin-cam-service.jpg",
    description:
      "Somfy ve Becker tüp motorlu, el sıkışma emniyetli, rüzgar ve yağmur sensörü uyumlu otomatik dikey sürgülü giyotin cam sistemi.",
    unitLabel: "m²",
    lowPrice: 6000,
    highPrice: 10500,
    keywords: [
      "motorlu giyotin cam",
      "kumandalı giyotin cam",
      "otomatik giyotin cam sistemi",
      "somfy giyotin cam",
      "elektrikli giyotin cam balkon",
    ],
    specs: [
      { name: "Motor Markası", value: "Somfy / Becker / Mosel" },
      { name: "Güvenlik", value: "Fotoselli Sıkışma Önleyici Opsiyon" },
      { name: "Küpeşte", value: "Sabit Alt Panel Korkuluk Fonksiyonu" },
    ],
    instagram: {
      badgeTr: "AKILLI OTOMASYON",
      headlineTr: "Kumandalı & Sensörlü Giyotin Cam Teknolojisi",
      captionTr:
        "Rüzgar çıktığında tek dokunuşla kapanan, güneşli havada küpeşte seviyesine inerek %100 açık hava keyfi sunan Motorlu Giyotin Cam sistemlerimizle tanışın.",
      hashtagsTr:
        "#motorlugiyotin #otomatikcam #akıllıev #somfytürkiye #giyotincambalkon #atayapı #terasdekorasyonu",
      captionEn:
        "Smart remote-controlled motorized guillotine glass balustrades with Somfy & Becker tubular automation. Engineered for heavy commercial & residential duty.",
      hashtagsEn:
        "#smartglazing #somfy #guillotinewindow #verticalslidingglass #horecadesign #atayapi",
    },
  },
  {
    id: "giyotin-cam-imalat",
    sku: "ATA-GIY-003",
    name: "Toptan Demonte Giyotin Cam İmalatı & İhracat Kasalama",
    shortTitle: "Toptan Giyotin Cam İmalatı",
    category: "Giyotin Cam",
    googleCategory: "Hardware > Building Materials > Doors & Windows > Windows",
    path: "/giyotin-cam/imalat",
    image: "/giyotin-cam-detail.jpg",
    description:
      "Bayilere, mimarlık ofislerine ve Avrupa ithalatçılarına özel ölçü, montaja hazır demonte veya kurulu giyotin cam üretimi.",
    unitLabel: "m²",
    lowPrice: 4800,
    highPrice: 8500,
    keywords: [
      "giyotin cam imalatı",
      "toptan giyotin cam",
      "giyotin cam üreticisi",
      "demonte giyotin cam bayi",
      "giyotin cam ihracat",
    ],
    specs: [
      { name: "Üretim", value: "CNC Hassas Kesim & Montaja Hazır Set" },
      { name: "Boya", value: "Qualicoat Sertifikalı Elektrostatik RAL" },
      { name: "Sevkiyat", value: "Türkiye Geneli & Avrupa İhracat Kasası" },
    ],
    instagram: {
      badgeTr: "FABRİKA & İHRACAT",
      headlineTr: "Üreticiden Doğrudan Bayilere ve Avrupa'ya Tedarik",
      captionTr:
        "Kendi üretim hattımızda milimetrik CNC işleme ile hazırladığımız giyotin cam ve cam balkon sistemlerini Türkiye geneli bayilerimize ve Avrupa'daki iş ortaklarımıza sevk ediyoruz.",
      hashtagsTr:
        "#giyotincamimalatı #toptancambalkon #camihracatı #yapıfuarı #alüminyumdoğrama #bayilik #atayapı",
      captionEn:
        "Direct-from-factory wholesale Guillotine Glass & Folding Glass Systems from Istanbul to Europe. Export-crated, custom RAL powder-coated, ready to install.",
      hashtagsEn:
        "#wholesaleglazing #exportfromturkey #fenestration #aluminumwindows #glassmanufacturer #atayapi",
    },
  },
  {
    id: "cam-balkon",
    sku: "ATA-CB-001",
    name: "Cam Balkon Sistemleri (Katlanır, Sürme & Isıcamlı)",
    shortTitle: "Cam Balkon Sistemleri",
    category: "Cam Balkon",
    googleCategory: "Hardware > Building Materials > Doors & Windows > Windows",
    path: "/cam-balkon",
    image: "/cam-balkon-service.png",
    description:
      "8mm ve 10mm Şişecam temperli cam, paslanmaz rulmanlı alüminyum ray ve su tahliye kanallı katlanır, sürme ve ısıcamlı cam balkon sistemleri.",
    unitLabel: "m²",
    lowPrice: 2800,
    highPrice: 6500,
    keywords: [
      "cam balkon",
      "cam balkon fiyatları",
      "cam balkon sistemleri",
      "maltepe cam balkon",
      "kadıköy cam balkon",
      "kartal cam balkon",
      "pendik cam balkon",
      "anadolu yakası cam balkon",
    ],
    specs: [
      { name: "Cam", value: "8mm / 10mm Temperli veya Isıcam" },
      { name: "Rulman", value: "Çelik Gövdeli Çift Rulmanlı Taşıyıcı" },
      { name: "İzolasyon", value: "Alüminyum Fitil & Fırça Conta" },
    ],
    instagram: {
      badgeTr: "4 MEVSİM BALKON",
      headlineTr: "Balkonunuzu Evin En Keyifli Odasına Dönüştürün",
      captionTr:
        "Soğuk, yağmur, rüzgar ve şehir gürültüsünü dışarıda bırakın! Katlanır, Eşiksiz Sürme ve Isıcamlı Cam Balkon sistemlerinde ücretsiz keşif ve üretici fiyat avantajı Ata Yapı'da.",
      hashtagsTr:
        "#cambalkon #katlanırcambalkon #ısıcamlıcambalkon #sürmecambalkon #balkondekorasyonu #maltepecambalkon #kadıköycambalkon #atayapı",
      captionEn:
        "Frameless Folding, Sliding & Thermally Insulated Glass Balcony Enclosures. Custom-engineered tempered glass systems with panoramic views.",
      hashtagsEn:
        "#glassbalcony #framelessglazing #balconyenclosure #slidingglass #homeimprovement #atayapi",
    },
  },
  {
    id: "cam-balkon-isicamli",
    sku: "ATA-CB-002",
    name: "Isıcamlı Cam Balkon Sistemi (Maksimum Isı & Ses Yalıtımı)",
    shortTitle: "Isıcamlı Cam Balkon",
    category: "Cam Balkon",
    googleCategory: "Hardware > Building Materials > Doors & Windows > Windows",
    path: "/cam-balkon/isi-camli",
    image: "/hero-balcony.png",
    description:
      "Çift tarafı temperli ısıcam (4+16+4 / 4+20+4) paneller ve ısı bariyerli alüminyum profillerle kışın sıcak, yazın serin balkon kapatma sistemi.",
    unitLabel: "m²",
    lowPrice: 4200,
    highPrice: 7200,
    keywords: [
      "ısıcamlı cam balkon",
      "ısı camlı cam balkon fiyatları",
      "çift camlı cam balkon",
      "yalıtımlı cam balkon",
      "konfor camlı balkon",
    ],
    specs: [
      { name: "Cam Paketi", value: "Çift Yüzey Temperli Isıcam (24-28mm)" },
      { name: "Yalıtım", value: "Standart Cama Göre 3 Kat Isı Tasarrufu" },
      { name: "Conta", value: "EPDM + Manyetik/Alüminyum Ara Fitil" },
    ],
    instagram: {
      badgeTr: "TERMAL YALITIM",
      headlineTr: "Isıcamlı Cam Balkon ile Kışın Bile Sıcacık Yaşam Alanı",
      captionTr:
        "Balkonunuzu kışın oda sıcaklığında kullanmak ister misiniz? Çift temperli Isıcamlı Cam Balkon sistemimiz standart sistemlere göre 3 kata kadar daha yüksek ısı ve ses yalıtımı sağlar!",
      hashtagsTr:
        "#ısıcamlıcambalkon #ısıyalıtımı #balkonkapatma #çiftcamlıbalkon #enerjitasarrufu #atayapı #istanbulcambalkon",
      captionEn:
        "Double-glazed thermally insulated folding balcony systems. Turn any balcony into a year-round heated living room.",
      hashtagsEn:
        "#insulatedglass #doubleglazing #thermalglass #balconydesign #wintergarden #atayapi",
    },
  },
  {
    id: "cam-balkon-katlanir",
    sku: "ATA-CB-003",
    name: "Katlanır Cam Balkon Sistemi (Tam Açılır Panoramik Seri)",
    shortTitle: "Katlanır Cam Balkon",
    category: "Cam Balkon",
    googleCategory: "Hardware > Building Materials > Doors & Windows > Windows",
    path: "/cam-balkon/katlanir",
    image: "/cam-balkon-1.png",
    description:
      "Kanatların içe doğru 90 derece katlanarak tek köşede toplandığı, kolay silinebilir 8mm temperli panoramik katlanır cam balkon sistemi.",
    unitLabel: "m²",
    lowPrice: 2800,
    highPrice: 4800,
    keywords: [
      "katlanır cam balkon",
      "katlanır cam balkon fiyatları",
      "8mm temperli cam balkon",
      "füme cam balkon",
      "katlanır balkon camı",
    ],
    specs: [
      { name: "Açılım", value: "%100 Tam Açılır İçe Katlanır Kanatlar" },
      { name: "Renkler", value: "Şeffaf, Füme, Bronz, Yeşil, Mavi Cam" },
      { name: "Temizlik", value: "İçeriden Güvenli Çift Yönlü Silinebilme" },
    ],
    instagram: {
      badgeTr: "%100 TAM AÇILIM",
      headlineTr: "İstediğiniz An Tamamen Açık, İstediğiniz An Tam Koruma",
      captionTr:
        "İçe katlanan kanat yapısı sayesinde dışarı sarkmadan güvenle temizlenen, L ve U balkonlara bile kusursuz uyum sağlayan Katlanır Cam Balkon serimiz.",
      hashtagsTr:
        "#katlanırcambalkon #temperlicam #fümecambalkon #antrasitcambalkon #balkonkeyfi #atayapı",
      captionEn:
        "100% full-opening frameless folding glass balcony system with 8mm/10mm tempered safety glass and effortless indoor cleaning.",
      hashtagsEn:
        "#foldingglass #framelessbalcony #temperedglass #architecturalglass #atayapi",
    },
  },
  {
    id: "cam-balkon-surme",
    sku: "ATA-CB-004",
    name: "Eşiksiz Sürme Cam Balkon Sistemi (Teras & Kafe Serisi)",
    shortTitle: "Sürme Cam Balkon",
    category: "Cam Balkon",
    googleCategory: "Hardware > Building Materials > Doors & Windows > Windows",
    path: "/cam-balkon/surme",
    image: "/cam-balkon-2.png",
    description:
      "İç mekan mobilya alanı daraltmayan, zeminde takılma yapmayan eşiksiz ve eşikli raylı sürme cam balkon ve teras kapatma sistemi.",
    unitLabel: "m²",
    lowPrice: 3000,
    highPrice: 5400,
    keywords: [
      "sürme cam balkon",
      "eşiksiz sürme cam",
      "sürgülü cam balkon fiyatları",
      "teras sürme cam",
      "raylı cam balkon",
    ],
    specs: [
      { name: "Eşik Yapısı", value: "Engelsiz Eşiksiz veya Yalıtımlı Eşikli Ray" },
      { name: "Alan Kazancı", value: "Kanat İçe Açılmadığı İçin Perde/Mobilya Dostu" },
      { name: "Kilit", value: "İçeriden Mandallı veya Anahtarlı Kilit" },
    ],
    instagram: {
      badgeTr: "EŞİKSİZ SÜRME SERİ",
      headlineTr: "Dar Balkonlar ve Teraslar İçin Perde Dostu Sürme Cam",
      captionTr:
        "Kanatlar içe açılmadığı için balkon mobilyalarınıza ve perdelerinize hiç değmeyen, tek parmakla kayan Eşiksiz Sürme Cam Balkon sistemimiz.",
      hashtagsTr:
        "#sürmecambalkon #sürgülücam #eşiksizcam #teraskapatma #balkontasarımı #atayapı",
      captionEn:
        "Threshold-free sliding glass systems for terraces, restaurants and narrow balconies. Smooth multi-track aluminum rails.",
      hashtagsEn:
        "#slidingglassdoors #thresholdfree #terraceenclosure #patiodoors #atayapi",
    },
  },
  {
    id: "sineklik",
    sku: "ATA-SIN-001",
    name: "Özel Ölçü Alüminyum Sineklik Sistemleri (Pileli, Kedi & Menteşeli)",
    shortTitle: "Sineklik Sistemleri",
    category: "Sineklik",
    googleCategory: "Hardware > Building Materials > Doors & Windows > Window Screens",
    path: "/sineklik",
    image: "/sineklik-service.png",
    description:
      "PVC ve alüminyum doğramalara birebir RAL renk uyumlu pileli (plise), çelik tüllü kedi sinekliği ve menteşeli sineklik üretimi.",
    unitLabel: "adet",
    lowPrice: 950,
    highPrice: 3500,
    keywords: [
      "sineklik",
      "sineklik fiyatları",
      "pileli sineklik",
      "kedi sinekliği",
      "maltepe sineklik",
      "pencere sinekliği",
      "balkon kapısı sineklik",
    ],
    specs: [
      { name: "Kasa", value: "Elektrostatik Toz Boyalı Alüminyum" },
      { name: "Tül Seçeneği", value: "UV Fiberglass Plise / Pet-Screen / Çelik Tül" },
      { name: "Montaj", value: "Aynı Hafta Ölçü ve Temiz Kurulum" },
    ],
    instagram: {
      badgeTr: "ÖZEL ÖLÇÜ SİNEKLİK",
      headlineTr: "Yaz Boyu Pencereleriniz Sonuna Kadar Açık Kalsın",
      captionTr:
        "Doğrama renginize birebir uyumlu Pileli (Plise) Sineklik, Kilitli Kedi Sinekliği ve Menteşeli Sineklik modellerimizle sinekleri dışarıda, temiz havayı içeride tutun!",
      hashtagsTr:
        "#sineklik #pilelisineklik #plisesineklik #kedisinekliği #penceresinekliği #maltepesineklik #atayapı",
      captionEn:
        "Custom-made pleated plisse fly screens, pet-proof steel mesh screens & hinged aluminum mosquito nets. Wholesale & retail production.",
      hashtagsEn:
        "#flyscreen #pleatedscreen #plissescreen #mosquitonet #petscreen #windowscreen #atayapi",
    },
  },
  {
    id: "sineklik-pileli",
    sku: "ATA-SIN-002",
    name: "Pileli (Plise) Akordiyon Sineklik Sistemi",
    shortTitle: "Pileli (Plise) Sineklik",
    category: "Sineklik",
    googleCategory: "Hardware > Building Materials > Doors & Windows > Window Screens",
    path: "/sineklik/pileli",
    image: "/sineklik-service.png",
    description:
      "Kullanılmadığında kasasına katlanarak gizlenen, panjur ve cam balkonlarla tam uyumlu modern akordiyon plise sineklik.",
    unitLabel: "adet",
    lowPrice: 1100,
    highPrice: 2800,
    keywords: [
      "pileli sineklik",
      "plise sineklik",
      "pileli sineklik fiyatları",
      "akordiyon sineklik",
      "sürgülü kapı sinekliği",
    ],
    specs: [
      { name: "Çalışma Yönü", value: "Yatay, Dikey veya Duble Çift Kanat" },
      { name: "Panjur Uyumu", value: "Dar Kasa ile Panjur Arasına Tam Uyum" },
    ],
    instagram: {
      badgeTr: "PLİSE AKORDİYON",
      headlineTr: "Panjur ve Cam Balkon Uyumlu Görünmez Pileli Sineklik",
      captionTr:
        "Menteşe payı kaplamayan, kapandığında kasasına gizlenen şık Pileli (Plise) Sineklik! Antrasit, beyaz ve ahşap desen seçenekleriyle.",
      hashtagsTr:
        "#pilelisineklik #plisesineklik #akordiyonsineklik #balkonsinekliği #atayapı",
      captionEn:
        "Space-saving pleated (plisse) insect screen systems for windows, French balconies & wide sliding patio doors.",
      hashtagsEn: "#plissescreen #pleatedflyscreen #insectscreen #windowsystem #atayapi",
    },
  },
  {
    id: "sineklik-kedi",
    sku: "ATA-SIN-003",
    name: "Kilitli Kedi Sinekliği (Yırtılmaz Çelik & Pet-Screen Tül)",
    shortTitle: "Kilitli Kedi Sinekliği",
    category: "Sineklik",
    googleCategory: "Hardware > Building Materials > Doors & Windows > Window Screens",
    path: "/sineklik/kedi-sineklik",
    image: "/sineklik-service.png",
    description:
      "Evcil hayvanların pencere ve balkondan düşmesini önleyen yırtılmaz paslanmaz çelik / Pet-Screen tüllü ve emniyet mandallı kedi sinekliği.",
    unitLabel: "adet",
    lowPrice: 1400,
    highPrice: 3600,
    keywords: [
      "kedi sinekliği",
      "çelik tüllü kedi sinekliği",
      "yırtılmaz kedi sinekliği",
      "kedi koruma filesi sineklik",
      "kilitli kedi sinekliği fiyatları",
    ],
    specs: [
      { name: "Tül Mukavemeti", value: "Paslanmaz Çelik Tel veya Güçlendirilmiş Pet-Screen" },
      { name: "Kilit", value: "Pati ile Açılmayı Önleyen Metal Emniyet Mandalı" },
    ],
    instagram: {
      badgeTr: "PATİ DOSTU GÜVENLİK",
      headlineTr: "Yırtılmaz Çelik Tüllü & Kilitli Kedi Sinekliği",
      captionTr:
        "Can dostlarınızın güvenliği şansa bırakılmaz! Tırmalamaya ve yüklenmeye dayanıklı Çelik Tüllü & Emniyet Mandallı Kedi Sinekliği ile pencerelerinizi güvenle açın.",
      hashtagsTr:
        "#kedisinekliği #kedigüvenliği #çeliktüllüsineklik #kedifilesi #evcilhayvangüvenliği #istanbulkedi #atayapı",
      captionEn:
        "Claw-proof stainless steel & heavy-duty Pet-Screen safety window screens with child/pet safety latches.",
      hashtagsEn: "#catscreen #petproofscreen #catsafety #steelmeshscreen #atayapi",
    },
  },
  {
    id: "sineklik-menteseli",
    sku: "ATA-SIN-004",
    name: "Menteşeli Alüminyum Kapı & Pencere Sinekliği",
    shortTitle: "Menteşeli Sineklik",
    category: "Sineklik",
    googleCategory: "Hardware > Building Materials > Doors & Windows > Window Screens",
    path: "/sineklik/menteseli",
    image: "/sineklik-service.png",
    description:
      "Mıknatıslı tutuculu, sökülüp yıkanabilir alüminyum çerçeveli ekonomik pencere ve balkon kapısı menteşeli sinekliği.",
    unitLabel: "adet",
    lowPrice: 850,
    highPrice: 2200,
    keywords: [
      "menteşeli sineklik",
      "kapı sinekliği",
      "mıknatıslı alüminyum sineklik",
      "pencere sineklik fiyatları",
    ],
    specs: [
      { name: "Çerçeve", value: "17x25mm / Kapı Tipi Orta Kayıtlı Alüminyum" },
      { name: "Temizlik", value: "Geçmeli Menteşe ile Sökülüp Yıkanabilir" },
    ],
    instagram: {
      badgeTr: "DAYANIKLI & PRATİK",
      headlineTr: "Sökülüp Yıkanabilir Alüminyum Menteşeli Sineklik",
      captionTr:
        "Balkon kapıları ve pencereler için uzun ömürlü, mıknatıslı kapanan alüminyum çerçeveli Menteşeli Sineklik çözümlerimiz.",
      hashtagsTr: "#menteşelisineklik #kapısinekliği #penceresinekliği #sineklikmontajı #atayapı",
      captionEn:
        "Removable & washable hinged aluminum frame insect screens for balcony doors and windows.",
      hashtagsEn: "#hingedscreen #doorscreen #aluminumflyscreen #atayapi",
    },
  },
  {
    id: "tente",
    sku: "ATA-TEN-001",
    name: "Tente & Mimari Gölgelendirme Sistemleri (Kasetli, Mafsallı, Motorlu)",
    shortTitle: "Tente Sistemleri",
    category: "Tente",
    googleCategory: "Home & Garden > Lawn & Garden > Outdoor Living > Awnings",
    path: "/tente",
    image: "/tente-service.png",
    description:
      "UV blokajlı solmaz ithal akrilik kumaşlı, tam kasetli, mafsallı ve rüzgar sensörlü motorlu tente sistemleri.",
    unitLabel: "sistem",
    lowPrice: 8500,
    highPrice: 45000,
    keywords: [
      "tente",
      "tente fiyatları",
      "kasetli tente",
      "mafsallı tente",
      "motorlu tente",
      "maltepe tente",
      "balkon tentesi",
      "dükkan tentesi",
    ],
    specs: [
      { name: "Kumaş", value: "5 Yıl Solmazlık Garantili İthal Akrilik" },
      { name: "Gövde", value: "Elektrostatik Boyalı Alüminyum & Çelik Zincir Kol" },
      { name: "Otomasyon", value: "Manuel Krank veya Kumandalı Sensörlü Motor" },
    ],
    instagram: {
      badgeTr: "GÖLGELENDİRME",
      headlineTr: "Teras, Balkon ve İşletmeler İçin Modern Tente Sistemleri",
      captionTr:
        "Kavurucu güneşi ve yaz yağmurlarını şıklıkla durdurun! 100+ solmaz ithal akrilik kumaş seçeneğiyle Kasetli, Mafsallı ve Sensörlü Motorlu Tente sistemleri Ata Yapı'da.",
      hashtagsTr:
        "#tente #kasetlitente #motorlutente #mafsallıtente #balkontentesi #terastentesi #gölgelendirme #atayapı",
      captionEn:
        "Architectural cassette awnings, articulated arm awnings & wind-sensor motorized sun shading systems with UV-resistant acrylic fabrics.",
      hashtagsEn: "#awning #cassetteawning #motorizedawning #sunshading #outdoorliving #atayapi",
    },
  },
  {
    id: "tente-kasetli",
    sku: "ATA-TEN-002",
    name: "Tam Kasetli Motorlu Tente Sistemi",
    shortTitle: "Kasetli Tente",
    category: "Tente",
    googleCategory: "Home & Garden > Lawn & Garden > Outdoor Living > Awnings",
    path: "/tente/kasetli",
    image: "/kasetli-tente.png",
    description:
      "Kapandığında kumaşı ve kolları tam kapalı alüminyum kaset içinde koruyan, 15 yıla varan ömürlü üst segment motorlu kasetli tente.",
    unitLabel: "sistem",
    lowPrice: 18000,
    highPrice: 52000,
    keywords: [
      "kasetli tente",
      "tam kasetli tente fiyatları",
      "motorlu kasetli tente",
      "kutu tente",
    ],
    specs: [
      { name: "Koruma", value: "Tam Kapalı Sızdırmaz Alüminyum Kaset Gövde" },
      { name: "Ömür", value: "12–15+ Yıl Kumaş ve Mekanizma Koruması" },
    ],
    instagram: {
      badgeTr: "TAM KASETLİ SERİ",
      headlineTr: "Kışın Kumaşı Koruyan Premium Alüminyum Kasetli Tente",
      captionTr:
        "Kapandığında kumaş ve mekanizmayı tamamen alüminyum kaset içine gizleyerek yağmur, kar ve tozdan koruyan Tam Kasetli Motorlu Tente ile tanışın.",
      hashtagsTr: "#kasetlitente #premiumtente #villatentesi #motorlutente #mimaricephe #atayapı",
      captionEn:
        "Full-cassette motorized awnings protecting fabric and arms inside a sleek extruded aluminum housing.",
      hashtagsEn: "#fullcassetteawning #luxuryawning #terraceawning #architecturalshading #atayapi",
    },
  },
  {
    id: "tente-mafsalli",
    sku: "ATA-TEN-003",
    name: "Mafsallı Tente Sistemi (Balkon & Mağaza Cephe Serisi)",
    shortTitle: "Mafsallı Tente",
    category: "Tente",
    googleCategory: "Home & Garden > Lawn & Garden > Outdoor Living > Awnings",
    path: "/tente/mafsalli",
    image: "/mafsalli-tente.png",
    description:
      "Çelik zincirli yaylı kol mekanizmasıyla dikmesiz gölgelik sağlayan ekonomik balkon, teras ve esnaf vitrin mafsallı tentesi.",
    unitLabel: "sistem",
    lowPrice: 8500,
    highPrice: 24000,
    keywords: [
      "mafsallı tente",
      "mafsallı tente fiyatları",
      "elle açılır tente",
      "balkon tentesi fiyatları",
      "dükkan önü tente",
    ],
    specs: [
      { name: "Genişlik", value: "2.00m – 6.00m Tek Modül Cephe" },
      { name: "Açılım", value: "1.50m – 3.50m Ayaksız Serbest Gölgelik" },
    ],
    instagram: {
      badgeTr: "KLASİK & EKONOMİK",
      headlineTr: "Balkon ve Mağaza Cephelerinin En Çok Tercih Edilen Tentesi",
      captionTr:
        "Zeminde ayak gerektirmeyen güçlü yaylı kol mekanizması ve zengin renk kartelasıyla Mafsallı Tente sistemlerimizde ücretsiz keşif fırsatı.",
      hashtagsTr: "#mafsallıtente #dükkantentesi #balkontentesi #tentefiyatları #atayapı",
      captionEn:
        "Classic articulated folding-arm awnings for balconies, cafes and storefronts with UV-blocking acrylic fabric.",
      hashtagsEn: "#retractableawning #foldingarmawning #storefrontawning #atayapi",
    },
  },
  {
    id: "tente-motorlu",
    sku: "ATA-TEN-004",
    name: "Rüzgar & Güneş Sensörlü Motorlu Tente Sistemi",
    shortTitle: "Motorlu Tente",
    category: "Tente",
    googleCategory: "Home & Garden > Lawn & Garden > Outdoor Living > Awnings",
    path: "/tente/motorlu",
    image: "/tente-service.png",
    description:
      "Somfy ve Becker tüp motorlu, şiddetli rüzgarda kendi kendine kapanan 3D salınım sensörlü akıllı motorlu tente.",
    unitLabel: "sistem",
    lowPrice: 13500,
    highPrice: 42000,
    keywords: [
      "motorlu tente",
      "kumandalı tente",
      "rüzgar sensörlü tente",
      "otomatik tente fiyatları",
      "somfy motorlu tente",
    ],
    specs: [
      { name: "Sensör", value: "3D Kablosuz Rüzgar ve Güneş Sensörü" },
      { name: "Kontrol", value: "Uzaktan Kumanda & Akıllı Ev Wi-Fi Opsiyonu" },
    ],
    instagram: {
      badgeTr: "AKILLI SENSÖR",
      headlineTr: "Fırtınada Evde Yokken Bile Kendi Kendine Kapanan Tente",
      captionTr:
        "3D kablosuz rüzgar sensörü sayesinde rüzgar şiddetlendiği an otomatik kapanarak tente kumaşınızı ve mekanizmanızı koruyan Motorlu Tente çözümleri!",
      hashtagsTr: "#motorlutente #akıllıtente #rüzgarsensörlütente #kumandaliTente #somfy #atayapı",
      captionEn:
        "Smart motorized awnings with wireless 3D wind vibration sensors that automatically retract during storms.",
      hashtagsEn: "#smartawning #motorizedshading #windsensor #patioautomation #atayapi",
    },
  },
  {
    id: "pimapen-tamir",
    sku: "ATA-PVC-001",
    name: "PVC Doğrama, Çift Açılım & Pimapen Tamir Servisi",
    shortTitle: "Pimapen Tamir & PVC",
    category: "PVC & Pimapen",
    googleCategory: "Hardware > Building Materials > Doors & Windows > Windows",
    path: "/pimapen-tamir",
    image: "/pimapen.png",
    description:
      "PVC pencere ve kapı rüzgar/su sızıntısı giderme, EPDM kauçuk fitil yenileme, çift açılım (vasistas) dönüşümü, ispanyolet kilit ve ısıcam değişimi.",
    unitLabel: "servis",
    lowPrice: 750,
    highPrice: 4500,
    keywords: [
      "pimapen tamiri",
      "pvc pencere tamiri",
      "maltepe pimapen tamiri",
      "pimapen fitil değişimi",
      "pimapen çift açılım dönüşümü",
      "pencere rüzgar alıyor tamiri",
    ],
    specs: [
      { name: "Conta", value: "1. Sınıf EPDM Kauçuk İzolasyon Fitili" },
      { name: "Mekanizma", value: "İspanyolet, Menteşe & Çift Açılım Donanımı" },
      { name: "Bölge", value: "Maltepe, Kadıköy, Kartal, Pendik, Ataşehir Hızlı Servis" },
    ],
    instagram: {
      badgeTr: "ISI & SES İZOLASYONU",
      headlineTr: "Rüzgar ve Soğuk Alan Pencerelere Aynı Gün Kesin Çözüm",
      captionTr:
        "Pencereleriniz kışın soğuk ve rüzgar mı alıyor? Kapanmakta zorlanıyor mu? Komple doğrama değiştirmeden EPDM fitil yenileme, kilit ayarı ve çift açılım dönüşümüyle ısı kaybına son veriyoruz!",
      hashtagsTr:
        "#pimapentamiri #pvctamiri #pencerefitili #ısıyalıtımı #maltepepimapen #kadıköypimapen #atayapı",
      captionEn:
        "Professional uPVC window & door weatherstripping, tilt-and-turn hardware upgrades and insulated glass replacement.",
      hashtagsEn: "#upvcwindows #windowrepair #weatherstripping #tiltandturn #atayapi",
    },
  },
];

export function getCatalogProductById(id: string): CatalogProduct | undefined {
  return SEO_PRODUCT_CATALOG.find((p) => p.id === id);
}

export function buildProductJsonLd(product: CatalogProduct) {
  const fullUrl = `${SITE_CONTACT.siteUrl}${product.path}`;
  const fullImageUrl = `${SITE_CONTACT.siteUrl}${product.image}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${fullUrl}#product`,
    name: product.name,
    sku: product.sku,
    mpn: product.sku,
    category: product.category,
    description: product.description,
    image: [fullImageUrl],
    url: fullUrl,
    brand: {
      "@type": "Brand",
      name: SITE_CONTACT.companyName,
    },
    manufacturer: {
      "@type": "Organization",
      name: SITE_CONTACT.fullCompanyName,
      url: SITE_CONTACT.siteUrl,
    },
    additionalProperty: product.specs.map((s) => ({
      "@type": "PropertyValue",
      name: s.name,
      value: s.value,
    })),
    offers: {
      "@type": "AggregateOffer",
      url: fullUrl,
      priceCurrency: "TRY",
      lowPrice: String(product.lowPrice),
      highPrice: String(product.highPrice),
      offerCount: "3",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "LocalBusiness",
        name: SITE_CONTACT.companyName,
        telephone: SITE_CONTACT.phoneRaw,
        url: SITE_CONTACT.siteUrl,
      },
    },
  };
}

const PARENT_CATEGORY_LABELS: Record<string, string> = {
  "giyotin-cam": "Giyotin Cam Sistemleri",
  "cam-balkon": "Cam Balkon Sistemleri",
  sineklik: "Sineklik Sistemleri",
  tente: "Tente & Gölgelendirme",
  "pimapen-tamir": "PVC & Pimapen Tamiri",
};

export function buildProductBreadcrumbJsonLd(product: CatalogProduct) {
  const segments = product.path.split("/").filter(Boolean);
  const itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }> = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Ata Yapı",
      item: SITE_CONTACT.siteUrl,
    },
  ];

  if (segments.length === 1) {
    itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: product.shortTitle,
      item: `${SITE_CONTACT.siteUrl}${product.path}`,
    });
  } else if (segments.length >= 2) {
    const parentSlug = segments[0];
    itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: PARENT_CATEGORY_LABELS[parentSlug] || product.category,
      item: `${SITE_CONTACT.siteUrl}/${parentSlug}`,
    });
    itemListElement.push({
      "@type": "ListItem",
      position: 3,
      name: product.shortTitle,
      item: `${SITE_CONTACT.siteUrl}${product.path}`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

export function buildProductMetadata(
  productId: string,
  overrides?: {
    title?: string;
    description?: string;
    extraKeywords?: string[];
  }
): Metadata {
  const product = getCatalogProductById(productId);
  if (!product) {
    return {
      title: overrides?.title || "Ata Yapı | Mimari Cam ve Alüminyum Sistemleri",
      description: overrides?.description,
    };
  }

  const title = overrides?.title || `${product.shortTitle} & Fiyatları | Ata Yapı`;
  const description = overrides?.description || product.description;
  const canonicalUrl = `${SITE_CONTACT.siteUrl}${product.path}`;
  const keywords = Array.from(
    new Set([...product.keywords, ...(overrides?.extraKeywords || []), "Ata Yapı"])
  );

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_CONTACT.companyName,
      locale: "tr_TR",
      type: "website",
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
