import Link from "next/link";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/shop/ProductCard";
import ShopTheLook from "@/components/home/ShopTheLook";
import HeroSection from "@/components/home/HeroSection";
import StickyCTA from "@/components/home/StickyCTA";
import InstagramFeed from "@/components/home/InstagramFeed";
import Testimonials from "@/components/home/Testimonials";
import Marquee from "@/components/ui/Marquee";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
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

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  const lookProducts = featuredProducts.length >= 2 ? featuredProducts : [];

  return (
    <div className="bg-white text-text-primary">

      {/* 👇 SOLO el hero */}
      <div className="-mt-20 md:-mt-[120px]">
        <HeroSection />
      </div>
      {/* 2. Marquee Banner — Animated scrolling text */}
      <Marquee
        items={[
          'Envío gratis en compras +$1,300 MXN',
          'Joyería artesanal hecha en México',
          'Piedras semipreciosas naturales',
          'Piezas únicas diseñadas con alma',
          'Chapa de oro de la más alta calidad',
        ]}
        className="py-4 bg-primary text-white text-xs tracking-[0.2em] uppercase"
        speed={35}
      />

      {/* 3. Categorías Visuales con animaciones stagger */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <AnimateOnScroll animation="fade-up" className="text-center mb-14">
            <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-3">Explora</span>
            <h2 className="text-3xl md:text-4xl font-serif">Encuentra Tu Pieza</h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <AnimateOnScroll animation="fade-up" delay={0}>
              <Link href="/colecciones" className="relative h-[55vh] md:h-[65vh] group overflow-hidden block img-zoom">
                <img
                  src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop"
                  alt="Aros y Aretes"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-500" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <span className="text-[10px] tracking-[0.3em] uppercase block mb-2 text-white/80">Joyería Cotidiana</span>
                  <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Aros & Aretes</h2>
                  <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-white/90 group-hover:gap-3 transition-all">
                    Explorar
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={150}>
              <Link href="/colecciones" className="relative h-[55vh] md:h-[65vh] group overflow-hidden block img-zoom">
                <img
                  src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop"
                  alt="Collares de Perla"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <span className="text-[10px] tracking-[0.3em] uppercase block mb-2 text-white/80">Para Ocasiones</span>
                  <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Collares de Perla</h2>
                  <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-white/90 group-hover:gap-3 transition-all">
                    Explorar
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </AnimateOnScroll>
          </div>

          {/* Extra category row — 3 smaller cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mt-4 lg:mt-6">
            {[
              { title: 'Pulseras', label: 'Best Seller', img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=600&auto=format&fit=crop' },
              { title: 'Sets', label: 'Para Regalar', img: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=600&auto=format&fit=crop' },
              { title: 'Personalizados', label: 'Bajo Pedido', img: 'https://images.unsplash.com/photo-1515562141589-67f0d569b6c3?q=80&w=600&auto=format&fit=crop' },
            ].map((cat, i) => (
              <AnimateOnScroll key={cat.title} animation="fade-up" delay={i * 100 + 200}>
                <Link href="/tienda" className="relative h-[35vh] group overflow-hidden block img-zoom">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="glass text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 text-primary">{cat.label}</span>
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-xl md:text-2xl font-serif text-white">{cat.title}</h3>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bestsellers — Catálogo Elegante */}
      <section className="py-20 md:py-28 bg-cream-light">
        <div className="container mx-auto px-4">
          <AnimateOnScroll animation="fade-up" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-accent block mb-3">La Selección</span>
              <h2 className="text-3xl md:text-4xl font-serif">Bestsellers</h2>
            </div>
            <Link href="/tienda" className="text-xs tracking-wider uppercase text-text-secondary hover:text-primary transition-colors border-b border-text-secondary/30 pb-1">
              Ver todos
            </Link>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {featuredProducts.map((product: any, i: number) => (
              <AnimateOnScroll key={product.id} animation="fade-up" delay={i * 100}>
                <ProductCard product={product} />
              </AnimateOnScroll>
            ))}
          </div>

          {featuredProducts.length === 0 && (
            <AnimateOnScroll animation="fade-in" className="text-center py-16">
              <p className="text-text-secondary text-sm">Pronto agregaremos nuestros productos destacados.</p>
              <Link href="/tienda" className="inline-block mt-4">
                <Button variant="outline" className="text-xs tracking-wider uppercase">
                  Ir a la Tienda
                </Button>
              </Link>
            </AnimateOnScroll>
          )}
        </div>
      </section>

      {/* 5. Módulo Editorial: Shop The Look */}
      <ShopTheLook products={lookProducts} />

      {/* 6. Valores / Features strip */}
      <section className="py-14 bg-cream border-y border-cream-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {[
              { icon: '✦', title: 'Hecho a Mano', desc: 'Cada pieza es artesanal' },
              { icon: '◈', title: 'Envío Gratis', desc: 'En compras +$1,300' },
              { icon: '♡', title: 'Piedras Reales', desc: 'Semipreciosas naturales' },
              { icon: '✧', title: 'Diseño Mexicano', desc: 'Con alma y tradición' },
            ].map((item, i) => (
              <AnimateOnScroll key={item.title} animation="fade-up" delay={i * 80}>
                <div className="text-center">
                  <span className="text-2xl mb-3 block text-accent">{item.icon}</span>
                  <h4 className="text-sm font-medium tracking-wide mb-1">{item.title}</h4>
                  <p className="text-xs text-text-secondary">{item.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Testimoniales */}
      <Testimonials />

      {/* 8. Promesa de Marca — Hecho en México */}
      <section className="relative py-32 md:py-40 text-white text-center px-4 overflow-hidden">
        {/* Background image with parallax feel */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1600&auto=format&fit=crop"
            alt="Proceso artesanal"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/85" />
        </div>

        <div className="container mx-auto max-w-3xl relative z-10">
          <AnimateOnScroll animation="fade-up">
            <span className="text-xs tracking-[0.3em] uppercase text-accent mb-6 block">Nuestro Propósito</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-8 text-white">
              Joyería hecha a mano en México<br className="hidden md:block" />
              con atención en cada detalle.
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-12 max-w-2xl mx-auto font-light">
              Seleccionamos piedras semipreciosas naturales y materiales auténticos
              para crear piezas diseñadas no para brillar más que tú, sino para complementar tu día a día.
            </p>
            <Link href="/proceso">
              <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white transition-all h-14 px-10 text-xs tracking-[0.2em] uppercase">
                Conoce el Proceso
              </Button>
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 9. Instagram Feed */}
      <InstagramFeed />

      {/* 10. Sticky CTA for mobile & desktop */}
      <StickyCTA />

    </div>
  );
}
