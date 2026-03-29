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
        <section className="relative min-h-[90svh] flex items-center justify-center overflow-hidden bg-cream-light">
          <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-white to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-white to-transparent pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10 py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex flex-col items-center text-center gap-y-8 md:gap-y-10">
                <span className="inline-flex items-center justify-center py-1 px-3 border border-primary/30 rounded-full text-primary text-sm tracking-widest uppercase animate-fade-in bg-white/80 backdrop-blur-sm">
                  Joyería Artesanal
                </span>

                <h1 className="text-5xl md:text-7xl font-serif font-medium leading-[1.08] md:leading-[1.05] animate-slide-up text-gray-900 drop-shadow-sm">
                  Piezas que cuentan<br />
                  <span className="italic text-primary">historias.</span>
                </h1>

                <p className="text-lg md:text-xl text-text-secondary max-w-2xl font-light leading-relaxed animate-slide-up bg-white/60 backdrop-blur-sm p-4 rounded-xl">
                  Joyería artesanal elaborada a mano con piedras semipreciosas, perlas y chapa de oro.
                  Diseñada para regalar, combinar y usar todos los días.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-slide-up">
                  <Link href="/tienda">
                    <Button size="lg" className="min-w-[200px] h-14 text-lg shadow-lg">
                      Ver Colección
                    </Button>
                  </Link>

                  <Link href="/proceso">
                    <Button
                      size="lg"
                      variant="ghost"
                      className="min-w-[200px] h-14 text-lg border border-primary/20 hover:bg-white hover:border-transparent bg-white/50 backdrop-blur-md"
                    >
                      Nuestro Proceso
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Value Proposition */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-text-primary animate-fade-in">
              Cada pieza tiene una historia.
            </h2>

            <p className="mt-6 text-text-secondary text-lg font-light leading-relaxed animate-slide-up">
              Seleccionamos piedras semipreciosas y materiales de calidad para crear joyería artesanal
              con carácter y detalle. Cada pieza es elaborada a mano en México.
            </p>
          </div>

          <div className="mt-20 md:mt-28 lg:mt-32">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
              {/* Card 1 */}
              <div className="text-center group md:translate-y-0 animate-slide-up">
                <div className="mx-auto w-full max-w-sm rounded-3xl p-8 md:p-9 bg-white/50 backdrop-blur-sm border border-primary/10
                        transition-all duration-500 ease-out
                        hover:-translate-y-2 hover:shadow-xl hover:border-primary/20 hover:ring-1 hover:ring-primary/20">
                  <div className="w-20 h-20 mx-auto mb-7 rounded-full bg-cream flex items-center justify-center
                          transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2">
                    <span className="text-3xl font-serif text-primary">1</span>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-medium text-text-primary transition-transform duration-500 group-hover:scale-[1.02]">
                      Hecho a Mano
                    </h3>
                    <p className="text-text-secondary font-light leading-relaxed">
                      Cada pieza es elaborada individualmente con atención al detalle.
                      No hay dos iguales.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="text-center group md:translate-y-10 animate-slide-up [animation-delay:120ms]">
                <div className="mx-auto w-full max-w-sm rounded-3xl p-8 md:p-9 bg-white/50 backdrop-blur-sm border border-primary/10
                        transition-all duration-500 ease-out
                        hover:-translate-y-2 hover:shadow-xl hover:border-primary/20 hover:ring-1 hover:ring-primary/20">
                  <div className="w-20 h-20 mx-auto mb-7 rounded-full bg-cream flex items-center justify-center
                          transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-2">
                    <span className="text-3xl font-serif text-primary">2</span>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-medium text-text-primary transition-transform duration-500 group-hover:scale-[1.02]">
                      Piedras Auténticas
                    </h3>
                    <p className="text-text-secondary font-light leading-relaxed">
                      Trabajamos con piedras semipreciosas naturales: cuarzo rosa, amatista, jade, perlas de río y más.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="text-center group md:-translate-y-2 animate-slide-up [animation-delay:240ms]">
                <div className="mx-auto w-full max-w-sm rounded-3xl p-8 md:p-9 bg-white/50 backdrop-blur-sm border border-primary/10
                        transition-all duration-500 ease-out
                        hover:-translate-y-2 hover:shadow-xl hover:border-primary/20 hover:ring-1 hover:ring-primary/20">
                  <div className="w-20 h-20 mx-auto mb-7 rounded-full bg-cream flex items-center justify-center
                          transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1">
                    <span className="text-3xl font-serif text-primary">3</span>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-medium text-text-primary transition-transform duration-500 group-hover:scale-[1.02]">
                      Diseño con Alma
                    </h3>
                    <p className="text-text-secondary font-light leading-relaxed">
                      Piezas diseñadas para complementar tu estilo con elegancia y sencillez.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-28 bg-cream-light/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4 md:gap-6">
            <div className="space-y-2">
              <span className="text-sm font-bold tracking-widest text-primary/60 uppercase block">
                Favoritos
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-text-primary">
                Bestsellers
              </h2>
            </div>

            <Link href="/tienda" className="hidden md:block">
              <span className="text-primary hover:text-primary-light border-b border-primary/30 hover:border-primary transition-colors pb-1">
                Ver toda la tienda
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {featuredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 md:mt-12 text-center md:hidden">
            <Link href="/tienda">
              <Button variant="outline" className="w-full">
                Ver toda la tienda
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Artisanal Process */}
      <section className="py-24 md:py-32 bg-[#1a1a1a] text-white overflow-hidden relative isolate">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#c9b99a]/10 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">

            <div className="lg:col-span-7 space-y-10">
              <div>
                <span className="text-[#c9b99a] font-bold tracking-widest uppercase text-sm mb-3 block">
                  Proceso Artesanal
                </span>
                <h2 className="text-4xl md:text-6xl font-serif leading-[1.05] mb-6">
                  Artesanía con<br />
                  <span className="italic text-[#d4af37]">propósito.</span>
                </h2>
                <p className="text-lg text-white/80 font-light max-w-xl leading-relaxed">
                  Del diseño a tus manos. Cada pieza pasa por un proceso cuidadoso de selección de materiales,
                  diseño y elaboración manual que garantiza calidad y autenticidad.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/10 pt-8">
                <div className="space-y-2">
                  <h4 className="text-4xl font-serif text-[#d4af37]">100%</h4>
                  <p className="font-medium text-white text-lg">Artesanal</p>
                  <p className="text-white/60 text-sm font-light leading-relaxed">
                    Cada pieza es elaborada completamente a mano con dedicación y cuidado.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-4xl font-serif text-[#d4af37]">8+</h4>
                  <p className="font-medium text-white text-lg">Piedras Naturales</p>
                  <p className="text-white/60 text-sm font-light leading-relaxed">
                    Cuarzo, amatista, jade, perlas y más. Todas seleccionadas individualmente.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-4xl font-serif text-[#d4af37]">MX</h4>
                  <p className="font-medium text-white text-lg">Hecho en México</p>
                  <p className="text-white/60 text-sm font-light leading-relaxed">
                    Diseñado y elaborado con orgullo en México.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/proceso">
                  <Button
                    variant="outline"
                    className="h-14 px-8 text-lg border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#1a1a1a] transition-all duration-300"
                  >
                    Conoce Nuestro Proceso
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual Area */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/20 to-transparent opacity-50" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-white/20 flex items-center justify-center relative">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-[#d4af37] rounded-full blur-[60px] opacity-40 animate-pulse" />
                    <div className="absolute inset-0 border border-white/10 rounded-full animate-spin-slow" style={{ animationDuration: '20s' }} />

                    <div className="text-center relative z-10">
                      <span className="block text-2xl md:text-3xl font-serif italic text-[#d4af37] mb-1">Artesanal</span>
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#d4af37]/80">Hecho a Mano</span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[#1a1a1a] to-transparent">
                  <p className="text-white/90 text-sm font-light text-center border-t border-white/10 pt-4">
                    "Piedras semipreciosas seleccionadas una a una."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12 md:mb-16 space-y-3">
            <h2 className="text-3xl md:text-4xl font-serif text-text-primary">
              Historias Reales
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            <div className="bg-cream-light p-8 md:p-10 pt-12 md:pt-14 rounded-xl relative overflow-hidden">
              <span className="text-6xl text-primary/20 absolute top-4 left-4 font-serif z-0">
                &ldquo;
              </span>
              <p className="text-lg text-text-primary font-light italic leading-relaxed mb-6 relative z-10">
                La Pulsera Luna de Cuarzo es hermosa. Se nota que está hecha con cuidado y las piedras
                son realmente naturales. La uso todos los días y siempre recibo cumplidos.
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white font-bold text-xs">
                  AS
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-text-primary leading-none">Ana Sofía M.</p>
                  <p className="text-xs text-text-secondary uppercase tracking-wider">
                    Cliente Verificada
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-cream-light p-8 md:p-10 pt-12 md:pt-14 rounded-xl relative overflow-hidden">
              <span className="text-6xl text-primary/20 absolute top-4 left-4 font-serif z-0">
                &ldquo;
              </span>
              <p className="text-lg text-text-primary font-light italic leading-relaxed mb-6 relative z-10">
                Compré el Set Madre e Hija como regalo de cumpleaños y fue un éxito total.
                El empaque es precioso y las pulseras son delicadas pero resistentes. Mi mamá no se la quita.
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white font-bold text-xs">
                  CR
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-text-primary leading-none">Carolina R.</p>
                  <p className="text-xs text-text-secondary uppercase tracking-wider">
                    Cliente Verificada
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-24 bg-cream text-center">
        <div className="container mx-auto px-4 space-y-8">
          <h2 className="text-3xl md:text-5xl font-serif text-text-primary leading-[1.12]">
            Encuentra la pieza perfecta.
          </h2>
          <Link href="/tienda">
            <Button size="lg" className="px-12 py-4 text-lg shadow-xl">
              Explorar Colección
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
