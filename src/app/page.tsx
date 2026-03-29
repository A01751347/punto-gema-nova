import Link from "next/link";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/shop/ProductCard";
import prisma from "@/lib/db/prisma";
import HeroCarousel from "@/components/home/HeroCarousel";

async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        isFeatured: true,
      },
      include: {
        categories: {
          include: { category: true },
        },
        materials: {
          where: { isPrimary: true },
          include: { material: true },
        },
      },
      orderBy: [{ isFeatured: "desc" }, { isNew: "desc" }],
      take: 4,
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function getHomeBanners() {
  try {
    const banners = await prisma.banner.findMany({
      where: { isActive: true, position: 'hero' },
      orderBy: { sortOrder: 'asc' }
    });
    return banners;
  } catch (e) {
    return [];
  }
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const heroBanners = await getHomeBanners();

  return (
    <div className="bg-white text-text-primary">
      {/* Hero Section */}
      {heroBanners.length > 0 ? (
        <HeroCarousel banners={heroBanners} />
      ) : (
        <section className="relative min-h-[85svh] flex items-center bg-cream">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <span className="text-xs tracking-[0.3em] uppercase text-accent mb-6 block">
                Joyeria Artesanal Mexicana
              </span>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.05] mb-8">
                Piezas que<br />
                cuentan <em className="text-accent">historias</em>
              </h1>

              <p className="text-lg text-text-secondary max-w-xl leading-relaxed mb-10">
                Elaborada a mano con piedras semipreciosas, perlas y chapa de oro.
                Disenada para regalar, combinar y usar todos los dias.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/tienda">
                  <Button size="lg" className="h-13 px-8 text-sm tracking-wider uppercase">
                    Ver Coleccion
                  </Button>
                </Link>
                <Link href="/proceso">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-13 px-8 text-sm tracking-wider uppercase"
                  >
                    Nuestro Proceso
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative side element */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-2/5 bg-cream-dark" />
        </section>
      )}

      {/* Value Proposition */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">Nuestra Promesa</span>
            <h2 className="text-4xl md:text-5xl leading-tight">
              Cada pieza tiene una historia.
            </h2>
            <p className="mt-6 text-text-secondary text-lg leading-relaxed">
              Seleccionamos piedras semipreciosas y materiales de calidad para crear
              joyeria artesanal con caracter y detalle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200">
            {[
              {
                title: 'Hecho a Mano',
                text: 'Cada pieza es elaborada individualmente con atencion al detalle. No hay dos iguales.',
              },
              {
                title: 'Piedras Autenticas',
                text: 'Piedras semipreciosas naturales: cuarzo rosa, amatista, jade, perlas de rio y mas.',
              },
              {
                title: 'Diseno con Alma',
                text: 'Piezas disenadas para complementar tu estilo con elegancia y sencillez.',
              },
            ].map((card, i) => (
              <div key={i} className="bg-white p-10 md:p-12">
                <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-6">0{i + 1}</span>
                <h3 className="text-xl mb-4">{card.title}</h3>
                <p className="text-text-secondary leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-14">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-3">Favoritos</span>
              <h2 className="text-3xl md:text-4xl">Bestsellers</h2>
            </div>
            <Link href="/tienda" className="hidden md:block text-sm tracking-wider uppercase text-text-secondary hover:text-primary transition-colors border-b border-text-secondary/30 pb-0.5">
              Ver todo
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link href="/tienda">
              <Button variant="outline" className="w-full">Ver toda la tienda</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Artisanal Process — horizontal layout */}
      <section className="py-24 md:py-32 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">
                Proceso Artesanal
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.08] mb-8 text-white">
                Artesania con<br />
                <em className="text-accent">proposito.</em>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed max-w-md mb-10">
                Del diseno a tus manos. Cada pieza pasa por un proceso cuidadoso
                de seleccion, diseno y elaboracion manual.
              </p>
              <Link href="/proceso">
                <Button
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-white transition-all h-12 px-8 text-sm tracking-wider uppercase"
                >
                  Conoce el Proceso
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { number: '100%', label: 'Artesanal', text: 'Elaborada completamente a mano con dedicacion.' },
                { number: '8+', label: 'Piedras Naturales', text: 'Cuarzo, amatista, jade, perlas. Seleccionadas individualmente.' },
                { number: 'MX', label: 'Hecho en Mexico', text: 'Disenado y elaborado con orgullo en Mexico.' },
              ].map((stat, i) => (
                <div key={i} className="border-t border-white/15 pt-6">
                  <span className="text-3xl md:text-4xl font-serif text-accent block mb-2">{stat.number}</span>
                  <span className="text-sm font-medium text-white block mb-3">{stat.label}</span>
                  <p className="text-white/50 text-sm leading-relaxed">{stat.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-4">Testimonios</span>
            <h2 className="text-3xl md:text-4xl">Historias Reales</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: 'La Pulsera Luna de Cuarzo es hermosa. Se nota que esta hecha con cuidado y las piedras son realmente naturales. La uso todos los dias y siempre recibo cumplidos.',
                name: 'Ana Sofia M.',
                initials: 'AS',
              },
              {
                quote: 'Compre el Set Madre e Hija como regalo de cumpleanos y fue un exito total. El empaque es precioso y las pulseras son delicadas pero resistentes.',
                name: 'Carolina R.',
                initials: 'CR',
              },
            ].map((t, i) => (
              <div key={i} className="border border-gray-100 p-8 md:p-10">
                <p className="text-lg text-text-primary leading-relaxed mb-8 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/15 text-accent rounded-full flex items-center justify-center text-xs font-medium">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{t.name}</p>
                    <p className="text-xs text-text-light">Cliente verificada</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-cream text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl mb-8">
            Encuentra la pieza perfecta.
          </h2>
          <Link href="/tienda">
            <Button size="lg" className="h-14 px-12 text-sm tracking-wider uppercase">
              Explorar Coleccion
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
