export type Language = 'tr' | 'en' | 'de';

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
  nativeName: string;
}

export interface TranslationSchema {
  nav: {
    giyotin_systems: string;
    giyotin_cam: string;
    motorlu_giyotin: string;
    uygulamalar: string;
    imalat_montaj: string;
    cam_balkon: string;
    cam_balkon_katlanir: string;
    cam_balkon_surme: string;
    cam_balkon_isicamli: string;
    diger_hizmetler: string;
    sineklik: string;
    sineklik_pileli: string;
    sineklik_menteseli: string;
    sineklik_kedi: string;
    tente: string;
    tente_kasetli: string;
    tente_mafsalli: string;
    tente_motorlu: string;
    pimapen_tamir: string;
    bayi_kurumsal: string;
    fiyatlandirma: string;
    iletisim: string;
    free_discovery: string;
    get_quote: string;
  };
  hero: {
    badge: string;
    title_prefix: string;
    title_highlight: string;
    title_suffix: string;
    subtitle: string;
    cta_quote: string;
    cta_whatsapp: string;
    stat_years: string;
    stat_projects: string;
    stat_satisfaction: string;
    stat_warranty: string;
  };
  services: {
    title: string;
    subtitle: string;
    explore_button: string;
    giyotin_title: string;
    giyotin_desc: string;
    giyotin_f1: string;
    giyotin_f2: string;
    giyotin_f3: string;
    cam_balkon_title: string;
    cam_balkon_desc: string;
    cam_balkon_f1: string;
    cam_balkon_f2: string;
    cam_balkon_f3: string;
    sineklik_title: string;
    sineklik_desc: string;
    sineklik_f1: string;
    sineklik_f2: string;
    sineklik_f3: string;
    tente_title: string;
    tente_desc: string;
    tente_f1: string;
    tente_f2: string;
    tente_f3: string;
    pimapen_title: string;
    pimapen_desc: string;
    pimapen_f1: string;
    pimapen_f2: string;
    pimapen_f3: string;
  };
  trust: {
    badge: string;
    title: string;
    subtitle: string;
    item1_title: string;
    item1_desc: string;
    item2_title: string;
    item2_desc: string;
    item3_title: string;
    item3_desc: string;
    item4_title: string;
    item4_desc: string;
  };
  b2b: {
    badge: string;
    title: string;
    subtitle: string;
    form_title: string;
    form_desc: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
    benefit4: string;
  };
  contact: {
    title: string;
    subtitle: string;
    phone_label: string;
    email_label: string;
    location_label: string;
    form_name: string;
    form_email: string;
    form_phone: string;
    form_city: string;
    form_service: string;
    form_service_select: string;
    form_message: string;
    form_submit: string;
    form_submitting: string;
    form_success: string;
    form_error: string;
  };
  footer: {
    about_title: string;
    about_desc: string;
    quick_links: string;
    products: string;
    regions: string;
    contact_info: string;
    rights_reserved: string;
  };
  common: {
    call_now: string;
    whatsapp_chat: string;
    view_all: string;
    close: string;
    back: string;
    language: string;
    factory_direct: string;
  };
}
