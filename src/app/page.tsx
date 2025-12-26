import Link from "next/link";
import Button from "@/components/ui/Button";
import prisma from "@/lib/db/prisma";

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
        ingredients: {
          where: { isKeyIngredient: true },
          include: { ingredient: true },
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

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="bg-white text-text-primary">
      {/* Hero Section - Clean, High Impact */}
      <section className="relative min-h-[90svh] flex items-center justify-center overflow-hidden bg-cream-light">
        <div className="container mx-auto px-4 relative z-10 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8 md:space-y-10">
              <span className="inline-block py-1 px-3 border border-primary/30 rounded-full text-primary text-sm tracking-widest uppercase animate-fade-in">
                Ciencia + Naturaleza
              </span>

              <h1 className="text-5xl md:text-7xl font-serif font-medium mb-0 leading-[1.08] md:leading-[1.05] animate-slide-up">
                Cosmética clínica,<br />
                <span className="italic text-primary">alma botánica.</span>
              </h1>

              <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-light leading-relaxed animate-slide-up">
                Formulaciones de alto rendimiento que respetan la biología de tu piel.
                Sin promesas vacías, solo ingredientes que funcionan.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-slide-up">
                <Link href="/tienda">
                  <Button size="lg" className="min-w-[200px] h-14 text-lg">
                    Ver Colección
                  </Button>
                </Link>
                <Link href="/ciencia">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="min-w-[200px] h-14 text-lg border border-primary/20 hover:bg-white hover:border-transparent"
                  >
                    Nuestra Ciencia
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-white to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* Value Proposition */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20 space-y-5">
            <h2 className="text-3xl md:text-4xl font-serif text-text-primary">
              No es magia, es dermocosmética.
            </h2>
            <p className="text-text-secondary text-lg font-light leading-relaxed">
              En una industria llena de mitos, elegimos la transparencia.
              Cada fórmula de YUTNÜÜ contiene la concentración exacta de activos
              necesaria para ver cambios reales, validada por estudios clínicos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 md:mb-8 rounded-full bg-cream flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <span className="text-3xl font-serif text-primary">1</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-medium text-text-primary">Evidencia Clínica</h3>
                <p className="text-text-secondary font-light leading-relaxed">
                  Utilizamos activos con estudios in-vivo e in-vitro que demuestran su eficacia.
                  Nada es "relleno".
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 md:mb-8 rounded-full bg-cream flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <span className="text-3xl font-serif text-primary">2</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-medium text-text-primary">Trazabilidad Total</h3>
                <p className="text-text-secondary font-light leading-relaxed">
                  Sabemos exactamente de dónde viene cada extracto botánico y cómo fue procesado.
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 md:mb-8 rounded-full bg-cream flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <span className="text-3xl font-serif text-primary">3</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-medium text-text-primary">Biocompatibilidad</h3>
                <p className="text-text-secondary font-light leading-relaxed">
                  Fórmulas pH-balanceadas diseñadas para fortalecer, no agredir, tu barrera cutánea.
                </p>
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
              <div key={product.id} className="group cursor-pointer">
                <div className="aspect-[4/5] bg-white overflow-hidden mb-5 md:mb-6 relative hover:shadow-xl transition-all duration-500 rounded-xl">
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                    <span className="text-gray-400 font-light">Imagen de Producto</span>
                  </div>

                  {product.isNew && (
                    <span className="absolute top-4 right-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 uppercase tracking-widest shadow-sm">
                      Nuevo
                    </span>
                  )}

                  <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Button className="w-full bg-white text-primary hover:bg-primary hover:text-white border border-transparent shadow-lg text-sm">
                      Ver Detalles
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-text-primary group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-text-secondary font-light line-clamp-1">
                    {product.tagline || "Tratamiento avanzado"}
                  </p>
                  <p className="text-base font-medium text-text-primary">
                    ${product.price}
                  </p>
                </div>
              </div>
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

      {/* Science Deep Dive */}
      <section className="py-20 md:py-28 bg-primary text-white overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-10">
              <h2 className="text-4xl md:text-5xl font-serif leading-[1.1]">
                Ciencia visible,<br />resultados tangibles.
              </h2>

              <div className="space-y-8">
                <div className="border-l border-white/20 pl-6 space-y-2">
                  <h4 className="text-2xl font-light">95%</h4>
                  <p className="text-white/70 font-light leading-relaxed">
                    de suavidad inmediata gracias al ácido hialurónico de bajo peso molecular.
                  </p>
                </div>
                <div className="border-l border-white/20 pl-6 space-y-2">
                  <h4 className="text-2xl font-light">30 Días</h4>
                  <p className="text-white/70 font-light leading-relaxed">
                    para ver reducción visible en manchas solares con nuestro complejo de Vitamina C.
                  </p>
                </div>
              </div>

              <div>
                <Link href="/ciencia">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-primary"
                  >
                    Leer Estudios Clínicos
                  </Button>
                </Link>
              </div>
            </div>

            <div className="h-[360px] md:h-[500px] bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 flex items-center justify-center relative">
              <span className="text-white/30 font-serif italic text-3xl">
                Visualización Molecular
              </span>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-64 md:h-64 border border-white/20 rounded-full animate-pulse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 border border-white/10 rounded-full" />
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
                "
              </span>
              <p className="text-lg text-text-primary font-light italic leading-relaxed mb-6 relative z-10">
                Después de probar marcas de lujo y farmacia, es la primera vez que veo cambios
                en la textura de mi piel sin irritación. La transparencia de los ingredientes
                me da mucha paz.
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
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
                "
              </span>
              <p className="text-lg text-text-primary font-light italic leading-relaxed mb-6 relative z-10">
                El suero de Niacinamida cambió mi relación con el acné. No solo controla la grasa,
                sino que mi piel se siente hidratada, no acartonada como con otros productos.
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="space-y-1">
                  <p className="font-medium text-text-primary leading-none">Carlos R.</p>
                  <p className="text-xs text-text-secondary uppercase tracking-wider">
                    Cliente Verificado
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
            Tu piel sabe la diferencia.
          </h2>
          <Link href="/tienda">
            <Button size="lg" className="px-12 py-4 text-lg shadow-xl">
              Empezar mi Rutina
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
