/**
 * District Pages Data
 * 
 * Contains all location-based landing page content for local SEO.
 * Each district-service combination has unique content, FAQs, and metadata.
 */

export interface FAQ {
    question: string;
    answer: string;
}

export interface DistrictPage {
    slug: string;
    district: string;
    districtSlug: string;
    service: 'cam-balkon' | 'sineklik' | 'tente';
    serviceTitle: string;
    serviceHref: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    h1: string;
    intro: string;
    valueProposition: string[];
    systemSelection: {
        title: string;
        description: string;
        options: { name: string; description: string; pros: string[] }[];
    };
    pricingNote: string;
    faqs: FAQ[];
}

// Maltepe District Pages
const maltepeCamBalkon: DistrictPage = {
    slug: 'maltepe-cam-balkon',
    district: 'Maltepe',
    districtSlug: 'maltepe',
    service: 'cam-balkon',
    serviceTitle: 'Cam Balkon',
    serviceHref: '/cam-balkon',
    title: 'Maltepe Cam Balkon',
    metaTitle: 'Maltepe Cam Balkon Sistemleri | Ata Yapı - Ücretsiz Keşif',
    metaDescription: 'Maltepe\'de cam balkon sistemleri arayanlar için profesyonel çözümler. Katlanır ve sürme cam balkon montajı, 2 yıl garanti. Ücretsiz keşif için hemen arayın.',
    h1: 'Maltepe Cam Balkon Sistemleri',
    intro: 'Maltepe\'de yaşıyorsanız ve balkonunuzu 4 mevsim kullanılabilir bir yaşam alanına dönüştürmek istiyorsanız, doğru adrestesiniz. Ata Yapı olarak Maltepe ve çevresinde 10 yılı aşkın tecrübemizle cam balkon sistemleri kurulumu gerçekleştiriyoruz. Marmara Denizi manzaralı balkonlarınızı rüzgar, yağmur ve tozdan korurken, aydınlık ve ferah bir ortam yaratıyoruz.',
    valueProposition: [
        'Maltepe\'ye özel ücretsiz keşif ve ölçüm hizmeti',
        'Yerinde üretim ile hızlı teslimat',
        '2 yıl montaj ve malzeme garantisi',
        'Deneyimli ekip ile profesyonel montaj',
        'Uygun fiyat ve taksit seçenekleri',
    ],
    systemSelection: {
        title: 'Maltepe\'de Hangi Cam Balkon Sistemi Size Uygun?',
        description: 'Balkonunuzun konumu, boyutu ve kullanım amacınıza göre en uygun sistemi belirliyoruz.',
        options: [
            {
                name: 'Katlanır Cam Balkon',
                description: 'Cam panellerin tamamen katlanarak toplanabildiği sistem. Balkonunuzu istediğinizde tamamen açık hale getirebilirsiniz.',
                pros: ['%100 açılım imkanı', 'Kolay kullanım', 'Şık görünüm', 'Hava sirkülasyonu'],
            },
            {
                name: 'Sürme Cam Balkon',
                description: 'Cam panellerin ray üzerinde kayarak açıldığı ekonomik sistem. Dar balkonlar için idealdir.',
                pros: ['Ekonomik fiyat', 'Yer tasarrufu', 'Kolay temizlik', 'Dayanıklı yapı'],
            },
            {
                name: 'Isı Camlı Sistem',
                description: 'Çift cam ile üstün ısı ve ses yalıtımı sağlayan premium sistem.',
                pros: ['Enerji tasarrufu', 'Ses yalıtımı', '4 mevsim konfor', 'Premium kalite'],
            },
        ],
    },
    pricingNote: 'Cam balkon fiyatları balkonunuzun ölçülerine, seçtiğiniz cam tipine ve sisteme göre değişiklik gösterir. Maltepe\'de ücretsiz keşif hizmeti ile size özel fiyat teklifi sunuyoruz. Net fiyat için mutlaka yerinde ölçüm yapılması gerekmektedir.',
    faqs: [
        {
            question: 'Maltepe\'de cam balkon montajı kaç gün sürer?',
            answer: 'Standart bir balkon için montaj işlemi genellikle 1 gün içinde tamamlanır. Büyük veya özel tasarım gerektiren projeler 2 güne uzayabilir. Keşif sonrasında size net süre bilgisi veririz.',
        },
        {
            question: 'Maltepe\'de cam balkon fiyatları ne kadar?',
            answer: 'Fiyatlar balkon ölçülerine ve tercih edilen sisteme göre değişir. Ortalama bir balkon için fiyatlar 15.000 TL\'den başlar. Ücretsiz keşif sonrası size özel teklif hazırlıyoruz.',
        },
        {
            question: 'Cam balkon sistemleri rüzgara dayanıklı mı?',
            answer: 'Evet, kullandığımız alüminyum profiller ve temperli camlar yüksek rüzgar dayanımına sahiptir. Maltepe\'nin deniz kenarı konumu düşünülerek ekstra güçlendirme yapıyoruz.',
        },
        {
            question: 'Kış aylarında cam balkon içi soğuk olur mu?',
            answer: 'Isı camlı sistemlerimiz ile kış aylarında bile konforlu bir ortam sağlanır. Tek camlı sistemlerde de dış ortama göre 8-10 derece fark oluşur.',
        },
        {
            question: 'Cam balkon temizliği nasıl yapılır?',
            answer: 'Cam paneller kolayca içeri doğru açılarak her iki yüzey de güvenle temizlenebilir. Normal cam temizleyici ile temizlik yapabilirsiniz.',
        },
        {
            question: 'Maltepe\'de hangi bölgelere hizmet veriyorsunuz?',
            answer: 'Maltepe\'nin tüm mahallelerine hizmet veriyoruz: Cevizli, Girne, Altıntepe, Küçükyalı, Bağlarbaşı, Feyzullah, İdealtepe ve diğer tüm semtler.',
        },
    ],
};

const maltepeSineklik: DistrictPage = {
    slug: 'maltepe-sineklik',
    district: 'Maltepe',
    districtSlug: 'maltepe',
    service: 'sineklik',
    serviceTitle: 'Sineklik',
    serviceHref: '/sineklik',
    title: 'Maltepe Sineklik',
    metaTitle: 'Maltepe Sineklik Sistemleri | Ata Yapı - Plise & Menteşeli',
    metaDescription: 'Maltepe\'de sineklik çözümleri: plise, menteşeli ve sürme sineklik sistemleri. Haşerelere karşı koruma, ücretsiz keşif. Hemen arayın!',
    h1: 'Maltepe Sineklik Sistemleri',
    intro: 'Maltepe\'nin yeşil alanları ve denize yakınlığı, özellikle yaz aylarında sivrisinek ve haşere sorununu beraberinde getirebilir. Ata Yapı olarak Maltepe\'deki evleriniz için ölçüye özel sineklik sistemleri üretip monte ediyoruz. Pencere ve kapılarınıza tam uyum sağlayan sinekliklerimiz ile hem temiz hava alın hem de haşerelerden korunun.',
    valueProposition: [
        'Maltepe\'ye özel ücretsiz ölçüm hizmeti',
        'Her pencere tipine uygun çözümler',
        'Dayanıklı ve uzun ömürlü malzemeler',
        'Aynı gün montaj imkanı',
        '2 yıl garanti',
    ],
    systemSelection: {
        title: 'Maltepe\'de Hangi Sineklik Sistemi Size Uygun?',
        description: 'Pencere ve kapı tiplerinize göre en uygun sineklik sistemini belirliyoruz.',
        options: [
            {
                name: 'Plise (Pileli) Sineklik',
                description: 'Akordiyon tarzı katlanan modern sineklik. Kullanılmadığında minimal yer kaplar.',
                pros: ['Şık tasarım', 'Kolay kullanım', 'Uzun ömür', 'Minimal görünüm'],
            },
            {
                name: 'Menteşeli Sineklik',
                description: 'Kapı gibi açılıp kapanan klasik sineklik. Balkon kapıları için ideal.',
                pros: ['Geniş geçiş', 'Sağlam yapı', 'Kolay montaj', 'Ekonomik'],
            },
            {
                name: 'Sürme Sineklik',
                description: 'Ray üzerinde kayan sineklik. Geniş açıklıklar ve balkonlar için uygundur.',
                pros: ['Geniş alan', 'Kolay kullanım', 'Ekonomik fiyat', 'Hızlı montaj'],
            },
        ],
    },
    pricingNote: 'Sineklik fiyatları pencere/kapı ölçülerine ve seçilen sisteme göre belirlenir. Maltepe\'de ücretsiz keşif ile size özel fiyat teklifi hazırlıyoruz.',
    faqs: [
        {
            question: 'Maltepe\'de sineklik montajı aynı gün yapılır mı?',
            answer: 'Evet, standart pencereler için ölçüm ve montaj aynı gün içinde tamamlanabilir. Özel ölçüler için 2-3 gün içinde montaj yapılır.',
        },
        {
            question: 'Sineklikler kedi ve evcil hayvanlara dayanıklı mı?',
            answer: 'Kedi sinekliği olarak adlandırdığımız özel güçlendirilmiş fileye sahip sistemlerimiz mevcuttur. Bu sistemler evcil hayvanların yırtmasına karşı dayanıklıdır.',
        },
        {
            question: 'Plise sineklik mi menteşeli mi tercih etmeliyim?',
            answer: 'Pencereler için plise sineklik daha şık ve kullanışlıdır. Balkon kapıları için menteşeli veya sürme sineklik daha uygundur. Keşif sırasında size en uygun sistemi öneriyoruz.',
        },
        {
            question: 'Sineklik temizliği nasıl yapılır?',
            answer: 'Sineklik fileleri nemli bir bezle silinerek veya hafif su sıkılarak kolayca temizlenebilir. Yılda 1-2 kez detaylı temizlik yeterlidir.',
        },
        {
            question: 'Sineklik montajı duvara zarar verir mi?',
            answer: 'Hayır, sineklik montajı pencere kasasına veya denizliğe yapılır. Duvara herhangi bir hasar vermeden montaj gerçekleştirilir.',
        },
    ],
};

const maltepeTente: DistrictPage = {
    slug: 'maltepe-tente',
    district: 'Maltepe',
    districtSlug: 'maltepe',
    service: 'tente',
    serviceTitle: 'Tente',
    serviceHref: '/tente',
    title: 'Maltepe Tente',
    metaTitle: 'Maltepe Tente Sistemleri | Ata Yapı - Mafsallı & Kasetli',
    metaDescription: 'Maltepe\'de tente sistemleri: mafsallı, kasetli ve motorlu tenteler. Güneşten korunun, enerji tasarrufu yapın. Ücretsiz keşif!',
    h1: 'Maltepe Tente Sistemleri',
    intro: 'Maltepe\'nin güneşli iklimi, özellikle yaz aylarında balkon ve teraslarınızı kullanılamaz hale getirebilir. Ata Yapı olarak Maltepe\'deki konut ve işyerleriniz için profesyonel tente çözümleri sunuyoruz. Güneşin zararlı UV ışınlarından korunurken, dış mekanlarınızı konforlu yaşam alanlarına dönüştürün.',
    valueProposition: [
        'Maltepe\'ye ücretsiz keşif hizmeti',
        'Manuel ve motorlu seçenekler',
        'UV korumalı özel kumaşlar',
        'Rüzgar sensörlü akıllı sistemler',
        '5 yıl kumaş garantisi',
    ],
    systemSelection: {
        title: 'Maltepe\'de Hangi Tente Sistemi Size Uygun?',
        description: 'Balkon, teras veya bahçeniz için en uygun tente sistemini belirliyoruz.',
        options: [
            {
                name: 'Mafsallı Tente',
                description: 'Klasik kol mekanizması ile açılıp kapanan tente. Balkon ve küçük teraslar için ideal.',
                pros: ['Ekonomik', 'Kolay kullanım', 'Hızlı montaj', 'Geniş renk seçeneği'],
            },
            {
                name: 'Kasetli Tente',
                description: 'Kumaşın kaset içinde korunduğu premium sistem. Uzun ömürlü kullanım sağlar.',
                pros: ['Kumaş koruması', 'Modern görünüm', 'Uzun ömür', 'Az bakım'],
            },
            {
                name: 'Motorlu Tente',
                description: 'Uzaktan kumanda ile kontrol edilen konforlu sistem. Rüzgar sensörü eklenebilir.',
                pros: ['Kolay kontrol', 'Akıllı sensörler', 'Premium konfor', 'Yüksek değer'],
            },
        ],
    },
    pricingNote: 'Tente fiyatları ölçülere, kumaş kalitesine ve sisteme (manuel/motorlu) göre değişir. Maltepe\'de yerinde keşif ile size özel fiyat teklifi hazırlıyoruz.',
    faqs: [
        {
            question: 'Maltepe\'de tente montajı ne kadar sürer?',
            answer: 'Standart bir balkon tentesi için montaj yarım gün ile 1 gün arasında tamamlanır. Büyük teras projeleri 2 güne uzayabilir.',
        },
        {
            question: 'Tente kumaşları ne kadar dayanıklı?',
            answer: 'Kullandığımız ithal kumaşlar UV dirençli ve su itici özelliktedir. Doğru bakımla 8-10 yıl sorunsuz kullanım sağlar.',
        },
        {
            question: 'Motorlu tente fiyatları ne kadar?',
            answer: 'Motorlu sistemler manuel sistemlere göre yaklaşık %30-40 daha yüksek fiyatlıdır. Ücretsiz keşif sonrası detaylı fiyat bilgisi verilir.',
        },
        {
            question: 'Tente rüzgarda zarar görür mü?',
            answer: 'Şiddetli rüzgarda tente kapatılmalıdır. Motorlu sistemlere rüzgar sensörü eklenerek otomatik kapanma sağlanabilir.',
        },
        {
            question: 'Tente rengi solmaz mı?',
            answer: 'Kaliteli tentelerimizde UV dirençli kumaşlar kullanılır. 5 yıl renk solmasına karşı garanti veriyoruz.',
        },
    ],
};

// Kartal District Pages
const kartalCamBalkon: DistrictPage = {
    slug: 'kartal-cam-balkon',
    district: 'Kartal',
    districtSlug: 'kartal',
    service: 'cam-balkon',
    serviceTitle: 'Cam Balkon',
    serviceHref: '/cam-balkon',
    title: 'Kartal Cam Balkon',
    metaTitle: 'Kartal Cam Balkon Sistemleri | Ata Yapı - Ücretsiz Keşif',
    metaDescription: 'Kartal\'da cam balkon sistemleri. Katlanır, sürme ve ısı camlı cam balkon montajı. Profesyonel ekip, 2 yıl garanti. Ücretsiz keşif için arayın.',
    h1: 'Kartal Cam Balkon Sistemleri',
    intro: 'Kartal, İstanbul\'un Anadolu Yakası\'nın en hızlı gelişen ilçelerinden biri olarak modern yaşam alanlarına ev sahipliği yapıyor. Ata Yapı olarak Kartal\'daki konutlara cam balkon sistemleri kurulumu gerçekleştiriyoruz. Dragos\'tan Yakacık\'a, Soğanlık\'tan Kordonboyu\'na kadar tüm Kartal\'a hizmet veriyoruz.',
    valueProposition: [
        'Kartal genelinde ücretsiz keşif',
        'Aynı hafta içinde montaj',
        '2 yıl tam garanti',
        'Uygun fiyat garantisi',
        'Profesyonel montaj ekibi',
    ],
    systemSelection: {
        title: 'Kartal\'da Hangi Cam Balkon Sistemi Tercih Etmelisiniz?',
        description: 'Kartal\'ın farklı bölgelerindeki konutlara uygun cam balkon çözümleri sunuyoruz.',
        options: [
            {
                name: 'Katlanır Cam Balkon',
                description: 'Panellerin tamamen katlanarak açılabildiği sistem. Deniz manzaralı balkonlar için mükemmel.',
                pros: ['Tam açılım', 'Manzara keyfi', 'Kolay kullanım', 'Modern tasarım'],
            },
            {
                name: 'Sürme Cam Balkon',
                description: 'Ekonomik ve pratik çözüm. Yeni yapılan siteler için ideal.',
                pros: ['Ekonomik', 'Pratik kullanım', 'Hızlı montaj', 'Düşük bakım'],
            },
            {
                name: 'Isı Camlı Sistem',
                description: 'Kartal\'ın rüzgarlı bölgeleri için ideal. Üstün ısı ve ses yalıtımı.',
                pros: ['Isı yalıtımı', 'Ses yalıtımı', 'Enerji tasarrufu', 'Konfor'],
            },
        ],
    },
    pricingNote: 'Cam balkon fiyatları projeye özeldir. Kartal\'da ücretsiz keşif hizmeti ile birebir ölçüm yaparak size en uygun teklifi sunuyoruz.',
    faqs: [
        {
            question: 'Kartal\'da cam balkon için belediye izni gerekli mi?',
            answer: 'Cam balkon sistemleri genellikle ruhsat gerektirmez. Ancak bazı sitelerin yönetim planlarında kısıtlama olabilir. Montaj öncesinde site yönetiminizle iletişime geçmenizi öneririz.',
        },
        {
            question: 'Kartal Dragos\'ta cam balkon yaptırabilir miyim?',
            answer: 'Evet, Dragos dahil Kartal\'ın tüm mahallelerinde cam balkon montajı yapıyoruz. Deniz manzaralı balkonlarınız için özel çözümler sunuyoruz.',
        },
        {
            question: 'Cam balkon montajı apartmanı rahatsız eder mi?',
            answer: 'Montaj işlemi sessiz ve temiz yapılır. Genellikle 1 günde tamamlanır ve komşularınızı rahatsız etmez.',
        },
        {
            question: 'Kartal\'da hangi mahallelere hizmet veriyorsunuz?',
            answer: 'Dragos, Yakacık, Soğanlık, Kordonboyu, Cevizli, Esentepe, Uğur Mumcu ve tüm Kartal mahallelerine hizmet veriyoruz.',
        },
        {
            question: 'Taksitle ödeme yapabilir miyim?',
            answer: 'Evet, kredi kartına taksit ve elden taksit seçeneklerimiz mevcuttur. Detaylar için keşif sırasında bilgi alabilirsiniz.',
        },
    ],
};

const kartalSineklik: DistrictPage = {
    slug: 'kartal-sineklik',
    district: 'Kartal',
    districtSlug: 'kartal',
    service: 'sineklik',
    serviceTitle: 'Sineklik',
    serviceHref: '/sineklik',
    title: 'Kartal Sineklik',
    metaTitle: 'Kartal Sineklik Sistemleri | Ata Yapı - Pileli & Sürme',
    metaDescription: 'Kartal\'da sineklik sistemleri. Pileli, menteşeli ve sürme sineklik montajı. Haşerelere son! Aynı gün montaj, ücretsiz keşif.',
    h1: 'Kartal Sineklik Sistemleri',
    intro: 'Kartal\'ın gelişen yapılaşması ve yeşil alanları, özellikle ilkbahar ve yaz dönemlerinde haşere sorununu beraberinde getirebilir. Evlerinizin pencere ve kapılarına ölçüye özel sineklik sistemleri üreterek monte ediyoruz. Temiz hava alırken haşerelerden korunun.',
    valueProposition: [
        'Kartal genelinde ücretsiz keşif',
        'Aynı gün montaj imkanı',
        'Her pencere tipine uygun çözüm',
        'Kedi/evcil hayvan dostu sistemler',
        '2 yıl garanti',
    ],
    systemSelection: {
        title: 'Kartal\'da Hangi Sineklik Sistemi Size Uygun?',
        description: 'Pencere tiplerinize ve ihtiyaçlarınıza göre en uygun sineklik sistemini öneriyoruz.',
        options: [
            {
                name: 'Pileli Sineklik',
                description: 'Modern ve şık tasarım. Kullanmadığınızda görünmez.',
                pros: ['Estetik', 'Pratik', 'Dayanıklı', 'Sessiz'],
            },
            {
                name: 'Menteşeli Sineklik',
                description: 'Kapı tipi açılım. Balkon ve teras kapıları için.',
                pros: ['Geniş geçiş', 'Kolay kullanım', 'Sağlam yapı', 'Ekonomik'],
            },
            {
                name: 'Sürme Sineklik',
                description: 'Kayar sistem ile geniş açıklıklar için ideal.',
                pros: ['Geniş alan', 'Kolay kayış', 'Ekonomik', 'Hızlı montaj'],
            },
        ],
    },
    pricingNote: 'Sineklik fiyatları ölçü ve sisteme göre değişir. Kartal\'da ücretsiz keşif ile kesin fiyat teklifi alabilirsiniz.',
    faqs: [
        {
            question: 'Kartal\'da sineklik montajı kaç saatte biter?',
            answer: 'Standart bir evin tüm pencerelerine sineklik montajı 2-4 saat arasında tamamlanır.',
        },
        {
            question: 'Kedim için güvenli sineklik var mı?',
            answer: 'Evet, kedi sinekliği olarak bilinen güçlendirilmiş file sistemimiz kedilerin tırmasına ve atlamasına karşı dayanıklıdır.',
        },
        {
            question: 'Sineklik renk seçenekleri neler?',
            answer: 'Beyaz, kahverengi, antrasit ve özel RAL renklerde üretim yapabiliyoruz. Pencere doğramanıza uygun renk seçebilirsiniz.',
        },
        {
            question: 'Plise sineklik fiyatı ne kadar?',
            answer: 'Fiyatlar pencere boyutuna göre değişir. Ortalama bir pencere için 800-1500 TL arasında değişmektedir.',
        },
        {
            question: 'Garantili sineklik montajı yapıyor musunuz?',
            answer: 'Evet, tüm sineklik sistemlerimize 2 yıl montaj ve malzeme garantisi veriyoruz.',
        },
    ],
};

const kartalTente: DistrictPage = {
    slug: 'kartal-tente',
    district: 'Kartal',
    districtSlug: 'kartal',
    service: 'tente',
    serviceTitle: 'Tente',
    serviceHref: '/tente',
    title: 'Kartal Tente',
    metaTitle: 'Kartal Tente Sistemleri | Ata Yapı - Motorlu & Mafsallı',
    metaDescription: 'Kartal\'da profesyonel tente çözümleri. Mafsallı, kasetli ve motorlu tente sistemleri. Ücretsiz keşif, 5 yıl garanti.',
    h1: 'Kartal Tente Sistemleri',
    intro: 'Kartal\'ın güneşli havasında balkon ve teraslarınızı rahatça kullanabilmek için tente sistemleri şart. Ata Yapı olarak Kartal\'daki evlere ve işyerlerine profesyonel tente montajı yapıyoruz. Güneşin zararlı ışınlarından korunurken, enerji tasarrufu da yapın.',
    valueProposition: [
        'Kartal\'a ücretsiz keşif',
        'İtalyan ve Alman kumaşlar',
        'Manuel ve motorlu seçenekler',
        'Rüzgar/güneş sensörleri',
        '5 yıl kumaş garantisi',
    ],
    systemSelection: {
        title: 'Kartal\'da Hangi Tente Sistemi Tercih Etmelisiniz?',
        description: 'Kullanım alanınıza ve bütçenize uygun tente sistemini birlikte belirleyelim.',
        options: [
            {
                name: 'Mafsallı Tente',
                description: 'Klasik ve güvenilir sistem. Balkonlar için en çok tercih edilen model.',
                pros: ['Ekonomik', 'Güvenilir', 'Kolay bakım', 'Hızlı montaj'],
            },
            {
                name: 'Kasetli Tente',
                description: 'Kumaşı kapalıyken koruyan premium sistem.',
                pros: ['Uzun ömür', 'Kumaş koruması', 'Modern tasarım', 'Az bakım'],
            },
            {
                name: 'Motorlu Tente',
                description: 'Uzaktan kumanda ile kontrol. Akıllı ev sistemlerine entegre edilebilir.',
                pros: ['Kolay kullanım', 'Akıllı sensörler', 'Konfor', 'Prestij'],
            },
        ],
    },
    pricingNote: 'Tente fiyatları ölçü, kumaş ve sistem tipine göre değişir. Kartal\'da yerinde keşif ile size özel fiyat belirliyoruz.',
    faqs: [
        {
            question: 'Kartal\'da tente montajı yapıyor musunuz?',
            answer: 'Evet, Kartal\'ın tüm mahallelerine tente montaj hizmeti veriyoruz.',
        },
        {
            question: 'Motorlu tente uzaktan kumanda ile mi çalışıyor?',
            answer: 'Evet, motorlu tentelerimiz uzaktan kumanda ile kontrol edilir. İsteğe bağlı olarak duvara monte şalter de eklenebilir.',
        },
        {
            question: 'Tente kumaşı yağmurda ıslanır mı?',
            answer: 'Kullandığımız kumaşlar su itici özelliktedir. Hafif yağmurda sorun olmaz, ancak şiddetli yağmurda tente kapatılmalıdır.',
        },
        {
            question: 'Tente montajı binaya zarar verir mi?',
            answer: 'Hayır, profesyonel montaj ekibimiz binaya zarar vermeden montaj yapar. Duvar delme işlemi minimumda tutulur.',
        },
        {
            question: 'Tente hangi renklerde yapılabilir?',
            answer: 'Düz renklerden çizgili desenlere kadar geniş bir kumaş yelpazesine sahibiz. Keşif sırasında katalogdan seçim yapabilirsiniz.',
        },
    ],
};

// Pendik District Pages
const pendikCamBalkon: DistrictPage = {
    slug: 'pendik-cam-balkon',
    district: 'Pendik',
    districtSlug: 'pendik',
    service: 'cam-balkon',
    serviceTitle: 'Cam Balkon',
    serviceHref: '/cam-balkon',
    title: 'Pendik Cam Balkon',
    metaTitle: 'Pendik Cam Balkon Sistemleri | Ata Yapı - Profesyonel Montaj',
    metaDescription: 'Pendik\'te cam balkon sistemleri. Katlanır, sürme ve ısı camlı cam balkon. Ücretsiz keşif, hızlı montaj, 2 yıl garanti. Hemen arayın!',
    h1: 'Pendik Cam Balkon Sistemleri',
    intro: 'Pendik, Sabiha Gökçen Havalimanı\'na yakınlığı ve marmaray bağlantısı ile İstanbul\'un en dinamik ilçelerinden biri. Ata Yapı olarak Pendik\'teki modern konutlara cam balkon sistemleri kurulumu gerçekleştiriyoruz. Kaynarca\'dan Kurtköy\'e, Güzelyalı\'dan Kavakpınar\'a kadar tüm Pendik\'e hizmet veriyoruz.',
    valueProposition: [
        'Pendik genelinde ücretsiz keşif',
        'Fabrika teslim fiyatları',
        'Hızlı üretim ve montaj',
        '2 yıl tam garanti',
        'Taksit seçenekleri',
    ],
    systemSelection: {
        title: 'Pendik\'te Hangi Cam Balkon Sistemi Size Uygun?',
        description: 'Pendik\'in yeni yapılarına ve mevcut konutlarına uygun cam balkon çözümleri.',
        options: [
            {
                name: 'Katlanır Cam Balkon',
                description: 'Panellerin katlanarak açıldığı esnek sistem. Geniş balkonlar için ideal.',
                pros: ['Tam açılım', 'Esnek kullanım', 'Şık görünüm', 'Kolay temizlik'],
            },
            {
                name: 'Sürme Cam Balkon',
                description: 'Yeni sitelerde en çok tercih edilen ekonomik sistem.',
                pros: ['Ekonomik fiyat', 'Kolay montaj', 'Düşük bakım', 'Modern tasarım'],
            },
            {
                name: 'Isı Camlı Sistem',
                description: 'Kış aylarında maksimum konfor için çift cam sistemi.',
                pros: ['Üstün yalıtım', 'Enerji tasarrufu', 'Sessiz ortam', 'Premium kalite'],
            },
        ],
    },
    pricingNote: 'Pendik\'te rekabetçi fiyatlarla cam balkon montajı yapıyoruz. Ücretsiz keşif sonrası size özel fiyat teklifi sunuyoruz.',
    faqs: [
        {
            question: 'Pendik\'te cam balkon kaç günde monte edilir?',
            answer: 'Ölçüm sonrası üretim 3-5 iş günü, montaj ise 1 gün sürer. Toplam süreç yaklaşık 1 hafta içinde tamamlanır.',
        },
        {
            question: 'Pendik Kurtköy\'de hizmet veriyor musunuz?',
            answer: 'Evet, Kurtköy dahil Pendik\'in tüm mahallelerine cam balkon montajı yapıyoruz.',
        },
        {
            question: 'Yeni binada cam balkon yaptırmak için ne gerekli?',
            answer: 'Site yönetimi izni yeterlidir. Belediye veya ruhsat işlemi genellikle gerekmez.',
        },
        {
            question: 'Cam balkon garantisi ne kadar?',
            answer: '2 yıl işçilik ve malzeme garantisi sunuyoruz. Cam ve profillerde 10 yıla kadar üretici garantisi mevcuttur.',
        },
        {
            question: 'Pendik\'te en çok hangi sistem tercih ediliyor?',
            answer: 'Yeni sitelerde sürme sistem, villa ve müstakil evlerde katlanır sistem daha çok tercih ediliyor.',
        },
    ],
};

const pendikSineklik: DistrictPage = {
    slug: 'pendik-sineklik',
    district: 'Pendik',
    districtSlug: 'pendik',
    service: 'sineklik',
    serviceTitle: 'Sineklik',
    serviceHref: '/sineklik',
    title: 'Pendik Sineklik',
    metaTitle: 'Pendik Sineklik Sistemleri | Ata Yapı - Aynı Gün Montaj',
    metaDescription: 'Pendik\'te sineklik çözümleri. Pileli, menteşeli ve sürme sineklik. Haşerelere karşı koruma. Aynı gün montaj, ücretsiz keşif!',
    h1: 'Pendik Sineklik Sistemleri',
    intro: 'Pendik\'in geniş yeşil alanları ve deniz kenarı konumu, yaz aylarında sivrisinek ve haşere yoğunluğunu artırabilir. Evlerinizin pencerelerine ve balkon kapılarına ölçüye özel sineklik sistemleri monte ederek bu sorunu çözüyoruz. Ata Yapı kalitesiyle haşerelere elveda deyin.',
    valueProposition: [
        'Pendik\'e ücretsiz keşif',
        'Aynı gün montaj imkanı',
        'Geniş model seçeneği',
        'Kedi dostu sistemler',
        '2 yıl garanti',
    ],
    systemSelection: {
        title: 'Pendik\'te Hangi Sineklik Sistemi Tercih Etmelisiniz?',
        description: 'Pencere ve kapı tiplerinize göre en uygun sineklik sistemini öneriyoruz.',
        options: [
            {
                name: 'Pileli Sineklik',
                description: 'Şık ve modern tasarım. PVC ve alüminyum pencerelere uygun.',
                pros: ['Modern tasarım', 'Kolay kullanım', 'Dayanıklı', 'Estetik'],
            },
            {
                name: 'Menteşeli Sineklik',
                description: 'Kapı olarak açılan sineklik. Balkon çıkışları için.',
                pros: ['Geniş geçiş', 'Sağlam yapı', 'Ekonomik', 'Pratik'],
            },
            {
                name: 'Sürme Sineklik',
                description: 'Ray üzerinde kayan geniş sineklik paneli.',
                pros: ['Geniş alan', 'Kolay kayış', 'Ekonomik', 'Hızlı montaj'],
            },
        ],
    },
    pricingNote: 'Sineklik fiyatları ölçü ve sisteme göre belirlenir. Pendik\'te ücretsiz keşif ile net fiyat teklifi alabilirsiniz.',
    faqs: [
        {
            question: 'Pendik\'te sineklik aynı gün monte edilir mi?',
            answer: 'Evet, stok ölçülerde aynı gün montaj yapılabilir. Özel ölçüler 2-3 gün içinde hazırlanır.',
        },
        {
            question: 'Sineklik fileleri ne kadar dayanıklı?',
            answer: 'Kullandığımız fiberglass fileler UV dayanımlı olup 5-8 yıl sorunsuz kullanım sağlar.',
        },
        {
            question: 'PVC pencereye sineklik takılabilir mi?',
            answer: 'Evet, her marka ve model PVC pencereye uygun sineklik sistemimiz mevcuttur.',
        },
        {
            question: 'Sineklik montajı için evde olmam gerekiyor mu?',
            answer: 'Evet, ölçüm ve montaj için evde bulunmanız gerekmektedir. Randevu saatine uyum sağlıyoruz.',
        },
        {
            question: 'Çift kanatlı pencereye hangi sineklik uyar?',
            answer: 'Çift kanatlı pencereler için plise sineklik veya ortadan açılan menteşeli sineklik öneriyoruz.',
        },
    ],
};

const pendikTente: DistrictPage = {
    slug: 'pendik-tente',
    district: 'Pendik',
    districtSlug: 'pendik',
    service: 'tente',
    serviceTitle: 'Tente',
    serviceHref: '/tente',
    title: 'Pendik Tente',
    metaTitle: 'Pendik Tente Sistemleri | Ata Yapı - Profesyonel Çözümler',
    metaDescription: 'Pendik\'te tente çözümleri. Mafsallı, kasetli ve motorlu tente sistemleri. Güneşten korunun. Ücretsiz keşif ve montaj!',
    h1: 'Pendik Tente Sistemleri',
    intro: 'Pendik\'in güneşli günlerinde balkon ve teraslarınızı konforlu hale getirmek için profesyonel tente çözümleri sunuyoruz. Kaynarca\'daki villalardan Kurtköy\'deki sitelere kadar Pendik\'in her yerine tente montajı yapıyoruz. Güneşin tadını çıkarırken zararlı UV ışınlarından korunun.',
    valueProposition: [
        'Pendik genelinde ücretsiz keşif',
        'Premium kumaş seçenekleri',
        'Manuel ve motorlu sistemler',
        'Akıllı sensör teknolojisi',
        '5 yıl kumaş garantisi',
    ],
    systemSelection: {
        title: 'Pendik\'te Hangi Tente Sistemi Size Uygun?',
        description: 'Balkon, teras veya bahçeniz için ideal tente sistemini birlikte belirleyelim.',
        options: [
            {
                name: 'Mafsallı Tente',
                description: 'Klasik kol sistemi ile güvenilir kullanım. Balkonlar için popüler tercih.',
                pros: ['Güvenilir', 'Ekonomik', 'Geniş seçenek', 'Kolay bakım'],
            },
            {
                name: 'Kasetli Tente',
                description: 'Kumaşın korunduğu üst segment sistem.',
                pros: ['Kumaş koruması', 'Uzun ömür', 'Estetik', 'Modern'],
            },
            {
                name: 'Motorlu Tente',
                description: 'Tek tuşla açılıp kapanan konforlu sistem.',
                pros: ['Kolay kullanım', 'Akıllı ev uyumu', 'Sensörler', 'Lüks'],
            },
        ],
    },
    pricingNote: 'Pendik\'te rekabetçi fiyatlarla tente montajı yapıyoruz. Yerinde keşif sonrası detaylı fiyat teklifi sunuyoruz.',
    faqs: [
        {
            question: 'Pendik\'te tente kaç günde monte edilir?',
            answer: 'Siparişten sonra 5-7 iş günü içinde üretim ve montaj tamamlanır.',
        },
        {
            question: 'Motorlu tente fiyatı ne kadar fazla?',
            answer: 'Motorlu sistemler manuel sistemlere göre yaklaşık %30-40 daha yüksek fiyatlıdır.',
        },
        {
            question: 'Tente kumaşı değiştirilebilir mi?',
            answer: 'Evet, mevcut tente sistemlerine yeni kumaş takılabilir. Sadece kumaş değişimi de yapıyoruz.',
        },
        {
            question: 'Bahçe için pergola tente yapıyor musunuz?',
            answer: 'Evet, bahçe ve geniş teraslar için pergola tente sistemleri de sunuyoruz.',
        },
        {
            question: 'Tente rüzgar sensörü nasıl çalışır?',
            answer: 'Rüzgar sensörü belirli bir hız üzerinde rüzgarı algılayarak tente motorunu otomatik olarak kapatır.',
        },
    ],
};

// Export all district pages
export const districtPages: DistrictPage[] = [
    // Maltepe
    maltepeCamBalkon,
    maltepeSineklik,
    maltepeTente,
    // Kartal
    kartalCamBalkon,
    kartalSineklik,
    kartalTente,
    // Pendik
    pendikCamBalkon,
    pendikSineklik,
    pendikTente,
];

// Helper function to get a district page by slug
export const getDistrictPageBySlug = (slug: string): DistrictPage | undefined => {
    return districtPages.find((page) => page.slug === slug);
};

// Helper function to get all slugs for static generation
export const getAllDistrictSlugs = (): string[] => {
    return districtPages.map((page) => page.slug);
};

// Group pages by district
export const getPagesByDistrict = (districtSlug: string): DistrictPage[] => {
    return districtPages.filter((page) => page.districtSlug === districtSlug);
};

// Group pages by service
export const getPagesByService = (service: 'cam-balkon' | 'sineklik' | 'tente'): DistrictPage[] => {
    return districtPages.filter((page) => page.service === service);
};
