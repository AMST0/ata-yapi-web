"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import {
  MotorIcon,
  LayersIcon,
  SparkGridIcon,
  SunWindIcon,
  WrenchIcon,
  ArrowUpRightIcon,
  GlobeIcon,
} from "@/components/icons/ArchitecturalIcons";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      index: "01",
      id: "giyotin-cam",
      title: t.services.giyotin_title,
      description: t.services.giyotin_desc,
      image: "/giyotin-cam-service.jpg",
      features: [t.services.giyotin_f1, t.services.giyotin_f2, t.services.giyotin_f3],
      href: "/giyotin-cam",
      featured: true,
      icon: <MotorIcon className="w-5 h-5" />,
    },
    {
      index: "02",
      id: "cam-balkon",
      title: t.services.cam_balkon_title,
      description: t.services.cam_balkon_desc,
      image: "/cam-balkon-service.png",
      features: [t.services.cam_balkon_f1, t.services.cam_balkon_f2, t.services.cam_balkon_f3],
      href: "/cam-balkon",
      featured: true,
      icon: <LayersIcon className="w-5 h-5" />,
    },
    {
      index: "03",
      id: "sineklik",
      title: t.services.sineklik_title,
      description: t.services.sineklik_desc,
      image: "/sineklik-service.png",
      features: [t.services.sineklik_f1, t.services.sineklik_f2, t.services.sineklik_f3],
      href: "/sineklik",
      featured: false,
      icon: <SparkGridIcon className="w-5 h-5" />,
    },
    {
      index: "04",
      id: "tente",
      title: t.services.tente_title,
      description: t.services.tente_desc,
      image: "/tente-service.png",
      features: [t.services.tente_f1, t.services.tente_f2, t.services.tente_f3],
      href: "/tente",
      featured: false,
      icon: <SunWindIcon className="w-5 h-5" />,
    },
    {
      index: "05",
      id: "pimapen-tamir",
      title: t.services.pimapen_title,
      description: t.services.pimapen_desc,
      image: "/pimapen.png",
      features: [t.services.pimapen_f1, t.services.pimapen_f2, t.services.pimapen_f3],
      href: "/pimapen-tamir",
      featured: false,
      icon: <WrenchIcon className="w-5 h-5" />,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="container">
        {/* Editorial Architectural Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 pb-8 border-b border-slate-200">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-3">
              <span className="w-6 h-[2px] bg-[var(--primary)]" />
              <span>{t.common.factory_direct}</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-slate-900">
              {t.services.title}
            </h2>
          </div>
          <div className="max-w-md flex flex-col items-start lg:items-end gap-3">
            <p className="text-slate-600 text-base lg:text-right leading-relaxed">
              {t.services.subtitle}
            </p>
            <Link
              href="/bayi-kurumsal"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:text-[var(--primary)] transition-colors"
            >
              <GlobeIcon className="w-3.5 h-3.5 text-[var(--primary)]" />
              <span>{t.b2b.badge}</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Flagship Glazing Systems (2-Column Architectural Cards) */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {services
            .filter((s) => s.featured)
            .map((service) => (
              <Link
                key={service.id}
                href={service.href}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200 hover:border-slate-900 transition-all duration-300 card-hover"
              >
                <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-900">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-sm border border-white/15 text-white font-mono text-xs font-semibold">
                      {service.index}
                    </span>
                    <span className="px-3 py-1 rounded-md bg-[var(--primary)] text-white text-[11px] font-semibold tracking-wide uppercase">
                      {t.common.factory_direct}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2.5 py-1 bg-slate-950/75 backdrop-blur-sm border border-white/15 text-slate-100 text-xs font-medium rounded-md"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 group-hover:bg-[var(--primary)] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                          {service.icon}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[var(--primary)] transition-colors">
                          {service.title}
                        </h3>
                      </div>
                      <ArrowUpRightIcon className="w-5 h-5 text-slate-400 group-hover:text-[var(--primary)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                    </div>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-slate-900 group-hover:text-[var(--primary)] transition-colors">
                    <span>{t.services.explore_button}</span>
                    <span className="text-xs font-mono text-slate-400 group-hover:text-[var(--primary)]">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        {/* Complementary Architectural Systems (3-Column Grid) */}
        <div className="grid md:grid-cols-3 gap-6">
          {services
            .filter((s) => !s.featured)
            .map((service) => (
              <Link
                key={service.id}
                href={service.href}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200 hover:border-slate-900 transition-all duration-300 card-hover"
              >
                <div className="relative h-52 overflow-hidden bg-slate-900">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-sm border border-white/15 text-white font-mono text-xs font-semibold">
                      {service.index}
                    </span>
                  </div>
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex flex-wrap gap-1.5">
                    {service.features.slice(0, 2).map((feature) => (
                      <span
                        key={feature}
                        className="px-2.5 py-0.5 bg-slate-950/75 backdrop-blur-sm border border-white/15 text-slate-100 text-[11px] font-medium rounded-md"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 group-hover:bg-[var(--primary)] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                        {service.icon}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[var(--primary)] transition-colors">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-800 group-hover:text-[var(--primary)] transition-colors">
                    <span>{t.services.explore_button}</span>
                    <ArrowUpRightIcon className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
