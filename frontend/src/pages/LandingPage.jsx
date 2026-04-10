import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MailIcon from "@mui/icons-material/Mail";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-[DM_Mono] bg-[#020202] text-[#F7F8E5] overflow-x-hidden">
      {/* ── NAVIGATION ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-[#020202]/95 backdrop-blur-md border-b border-[#F7F8E5]/5 py-4"
            : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo - Fixed */}
            <div className="flex items-center">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#232D23] rounded-lg flex items-center justify-center border border-[#F7F8E5]/10 mr-3 overflow-hidden">
                <img
                  src="/Acepresso-logo-light.png"
                  alt="Acepresso"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-[Cormorant_Garamond] text-2xl lg:text-3xl tracking-tight">
                Acepresso
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {["#home", "#about", "#products", "#contact"].map((href, i) => (
                <a
                  key={i}
                  href={href}
                  className="group relative uppercase text-sm tracking-[0.2em] text-[#F7F8E5]/70 hover:text-[#F7F8E5] transition-all duration-300"
                >
                  <span className="relative z-10 capitalize">
                    {href.slice(1)}
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#F7F8E5] to-transparent group-hover:w-full transition-all duration-500" />
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="uppercase text-sm tracking-[0.25em] text-[#F7F8E5]/60 hover:text-[#F7F8E5]/80 transition-all duration-300 px-6 py-2 border border-[#F7F8E5]/10 hover:border-[#F7F8E5]/25 bg-[#232D23]/50 hover:bg-[#232D23]/80 rounded-lg backdrop-blur-sm"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/login")}
                className="uppercase text-sm tracking-[0.25em] font-medium bg-gradient-to-r from-[#232D23] to-[#6D6A61]/20 border border-[#F7F8E5]/20 hover:border-[#F7F8E5]/30 px-8 py-2.5 rounded-lg transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-[#F7F8E5]/10 backdrop-blur-sm"
              >
                Sign Up
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="p-2 rounded-lg border border-[#F7F8E5]/10 hover:bg-[#232D23] transition-all duration-200">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION WITH MOVING BACKGROUND ── */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      >
        {/* ── MOVING BACKGROUND LAYERS ── */}
        <div className="absolute inset-0">
          {/* Main Hero Image - Parallax */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url("/landing-page-home-main.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: 0.2,
              transform: "scale(1.1)",
              animation: "parallaxSlow 20s ease-in-out infinite",
            }}
          />

          {/* Secondary Pattern - Drift */}
          <div
            className="absolute inset-0 w-full h-full opacity-[0.08]"
            style={{
              backgroundImage: `url("/coffee-beans-pattern.jpg")`,
              backgroundSize: "200%",
              backgroundPosition: "center",
              animation: "drift 25s linear infinite",
            }}
          />

          {/* Noise Texture */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />

          {/* Floating Gradient Orbs */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#232D23]/25 rounded-full blur-3xl animate-float-slow opacity-60" />
          <div className="absolute bottom-32 left-20 w-72 h-72 bg-[#F7F8E5]/8 rounded-full blur-3xl animate-float-medium opacity-40" />
          <div className="absolute top-1/2 -right-40 w-64 h-64 bg-[#6D6A61]/15 rounded-full blur-2xl animate-float-fast opacity-50" />
        </div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-block mb-12 px-8 py-4 bg-[#232D23]/60 backdrop-blur-md border border-[#F7F8E5]/15 rounded-2xl shadow-2xl shadow-black/40">
            <span className="uppercase text-sm tracking-[0.4em] text-[#F7F8E5]/70">
              Crafted with precision
            </span>
          </div>

          <h1 className="font-[Cormorant_Garamond] text-5xl md:text-7xl lg:text-8xl font-normal leading-[0.88] tracking-[-0.03em] mb-8 bg-gradient-to-r from-[#F7F8E5] via-[#F7F8E5] to-[#F7F8E5]/50 bg-clip-text text-transparent drop-shadow-2xl [text-shadow:0_4px_8px_rgba(0,0,0,0.8)]">
            Coffee with
            <br />
            <span className="italic">purpose.</span>
          </h1>

          <p className="uppercase text-xl md:text-2xl lg:text-3xl tracking-[0.18em] text-[#6D6A61]/70 mb-16 max-w-2xl mx-auto leading-relaxed drop-shadow-xl">
            Brewed Like An Ace
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-lg mx-auto mb-16">
            <button
              onClick={() => navigate("/login")}
              className="group relative w-full sm:w-auto uppercase tracking-[0.3em] text-lg font-medium px-14 py-6 bg-[#232D23]/90 backdrop-blur-md border-2 border-[#F7F8E5]/20 hover:border-[#F7F8E5]/50 rounded-2xl transition-all duration-700 hover:scale-[1.05] shadow-2xl hover:shadow-glow hover:shadow-[#F7F8E5]/30 overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#F7F8E5]/20 via-transparent to-[#F7F8E5]/10 opacity-0 group-hover:opacity-100 transition-all duration-700 -skew-x-12" />
            </button>
            <a
              href="#products"
              className="uppercase text-lg tracking-[0.25em] text-[#6D6A61]/60 hover:text-[#F7F8E5]/90 transition-all duration-500 flex items-center gap-3 group hover:gap-4 px-6 py-4 border border-[#6D6A61]/30 hover:border-[#F7F8E5]/40 rounded-xl backdrop-blur-sm hover:shadow-md hover:shadow-[#F7F8E5]/10"
            >
              Explore
              <span className="w-3 h-3 rounded-full bg-[#6D6A61]/40 group-hover:bg-[#F7F8E5]/70 transition-all duration-400 group-hover:scale-125 origin-left" />
            </a>
          </div>

          {/* Enhanced Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center gap-3">
              <div className="w-px h-16 bg-gradient-to-b from-[#F7F8E5]/60 to-[#F7F8E5]/5 animate-scrollPulse rounded-full" />
              <span className="uppercase text-xs tracking-[0.35em] text-[#6D6A61]/50 -rotate-90 whitespace-nowrap">
                Scroll
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section
        id="about"
        className="py-32 relative"
        style={{ isolation: "isolate" }}
      >
        {/* Sticky Background */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url("/about-section-bg.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            opacity: 0.12,
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#020202]/60 via-transparent to-[#020202]/60 pointer-events-none" />

        {/* Content wrapper */}
        <div className="max-w-7xl mx-auto px-8 sm:px-16 lg:px-24">
          <div className="text-center mb-24">
            <span className="uppercase text-sm tracking-[0.4em] text-[#6D6A61]/50 block mb-6">
              Our Craft
            </span>
            <h2 className="font-[Cormorant_Garamond] text-4xl md:text-6xl lg:text-7xl tracking-tight bg-gradient-to-r from-[#F7F8E5] to-[#F7F8E5]/70 bg-clip-text text-transparent drop-shadow-xl">
              Mastering the Art
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-xl md:text-2xl text-[#6D6A61]/75 mb-12 leading-relaxed max-w-xl">
                At Acepresso, we don't just brew coffee. We craft experiences.
                Every bean is meticulously sourced, roasted to perfection, and
                brewed with precision that honors centuries-old traditions while
                embracing modern innovation.
              </p>
              <div className="grid gap-6 max-w-lg">
                {["Precision roasting profiles", "Artisan brewing methods"].map(
                  (feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-8 bg-[#232D23]/40 border border-[#F7F8E5]/10 rounded-2xl hover:bg-[#232D23]/70 hover:shadow-lg hover:shadow-[#F7F8E5]/10 transition-all duration-500 group"
                    >
                      <div className="w-3 h-3 bg-gradient-to-r from-[#F7F8E5] to-[#F7F8E5]/50 rounded-full mt-3 flex-shrink-0 shadow-md group-hover:scale-125 transition-transform" />
                      <span className="text-lg text-[#6D6A61]/90 group-hover:text-[#F7F8E5]/90 transition-colors">
                        {feature}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="relative order-1 lg:order-2 mb-12 lg:mb-0">
              <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-[#232D23]/60 to-[#6D6A61]/20 rounded-3xl border-2 border-[#F7F8E5]/8 p-12 lg:p-16 flex items-center justify-center overflow-hidden shadow-2xl shadow-black/30 hover:shadow-glow">
                <div className="relative z-10 text-center">
                  <div className="w-28 h-28 lg:w-36 lg:h-36 mx-auto mb-8 bg-gradient-to-br from-[#F7F8E5]/20 to-[#F7F8E5]/10 rounded-3xl border-4 border-[#F7F8E5]/30 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-[#F7F8E5]/20 hover:scale-110 transition-all duration-500">
                    <span className="text-4xl lg:text-5xl">☕</span>
                  </div>
                  <h3 className="font-[Cormorant_Garamond] text-2xl lg:text-3xl mb-2 tracking-tight">
                    The Perfect Pour
                  </h3>
                  <p className="text-[#6D6A61]/70 tracking-wide uppercase text-sm">
                    Every drop matters
                  </p>
                </div>
                {/* Floating particles */}
                <div className="absolute inset-0">
                  <div className="absolute top-10 left-10 w-4 h-4 bg-[#F7F8E5]/20 rounded-full animate-float-tiny" />
                  <div className="absolute bottom-20 right-20 w-3 h-3 bg-[#F7F8E5]/15 rounded-full animate-float-tiny delay-1000" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS SECTION ── */}
      <section
        id="products"
        className="py-32 px-4 bg-gradient-to-b from-[#232D23]/10 to-[#020202]/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="uppercase text-sm tracking-[0.4em] text-[#6D6A61]/50 block mb-6">
              Our Collection
            </span>
            <h2 className="font-[Cormorant_Garamond] text-4xl md:text-6xl lg:text-7xl tracking-tight bg-gradient-to-r from-[#F7F8E5] to-[#F7F8E5]/60 bg-clip-text text-transparent drop-shadow-2xl">
              Exceptional Blends
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
            {[
              {
                title: "Ethiopian Sunrise",
                desc: "Bright citrus notes with floral undertones",
                color: "from-[#F7F8E5]/10 via-[#F7F8E5]/5",
              },
              {
                title: "Colombian Midnight",
                desc: "Rich chocolate and caramel depth",
                color: "from-[#6D6A61]/20 via-[#6D6A61]/10",
              },
              {
                title: "Brazilian Legacy",
                desc: "Smooth nutty balance with subtle sweetness",
                color: "from-[#232D23]/50 via-[#232D23]/30",
              },
            ].map((product, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#020202]/50 to-transparent border border-[#F7F8E5]/8 p-10 hover:border-[#F7F8E5]/30 transition-all duration-700 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#F7F8E5]/20 cursor-pointer"
              >
                <div
                  className={`w-full h-56 ${product.color} bg-gradient-to-br rounded-2xl mb-8 group-hover:scale-110 transition-all duration-700 group-hover:rotate-1`}
                />
                <h3 className="font-[Cormorant_Garamond] text-2xl lg:text-3xl mb-4 group-hover:text-[#F7F8E5] transition-all duration-500 tracking-tight">
                  {product.title}
                </h3>
                <p className="text-[#6D6A61]/80 group-hover:text-[#6D6A61]/95 transition-colors mb-8 leading-relaxed text-lg">
                  {product.desc}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-[#F7F8E5]/10">
                  <span className="uppercase text-lg tracking-[0.25em] text-[#6D6A61]/60 group-hover:text-[#F7F8E5]/70">
                    ₱79.99
                  </span>
                  <div className="w-12 h-12 border-2 border-[#F7F8E5]/20 rounded-xl flex items-center justify-center group-hover:bg-[#F7F8E5]/15 group-hover:rotate-90 group-hover:scale-110 transition-all duration-500 backdrop-blur-sm shadow-lg">
                    <span className="text-xl">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section id="contact" className="py-32 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-28">
          <span className="uppercase text-sm tracking-[0.4em] text-[#6D6A61]/50 block mb-6">
            Let's Connect
          </span>
          <h2 className="font-[Cormorant_Garamond] text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6 bg-gradient-to-r from-[#F7F8E5] to-[#F7F8E5]/60 bg-clip-text text-transparent drop-shadow-2xl">
            Ready to Brew?
          </h2>
          <p className="text-xl md:text-2xl text-[#6D6A61]/70 max-w-3xl mx-auto leading-relaxed">
            Join the Acepresso experience and discover coffee crafted with
            purpose
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="flex justify-center lg:justify-start">
            <div className="space-y-8 ">
              {[
                {
                  icon: <MailIcon />,
                  title: "Email",
                  detail: "acepresso.cafe@gmail.com",
                },
                {
                  icon: <LocationPinIcon />,
                  title: "Location",
                  detail: "Purok 6, Batchelor East, Natividad, Pangasinan",
                },
                {
                  icon: <PhoneIcon />,
                  title: "Phone",
                  detail: "+63 912-345-6789",
                },
              ].map((contact, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-6 p-8 bg-[#232D23]/40 border border-[#F7F8E5]/10 rounded-2xl hover:bg-[#232D23]/70 hover:shadow-xl hover:shadow-[#F7F8E5]/15 transition-all duration-500 hover:-translate-x-4"
                >
                  <div className="w-16 h-16 bg-[#F7F8E5]/15 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm border border-[#F7F8E5]/20 group-hover:bg-[#F7F8E5]/25 group-hover:scale-110 transition-all duration-500 shadow-lg">
                    {contact.icon}
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-[#6D6A61]/60 mb-1 group-hover:text-[#F7F8E5]/70">
                      {contact.title}
                    </p>
                    <p className="text-xl font-medium text-[#F7F8E5] group-hover:translate-x-2 transition-transform">
                      {contact.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.107525614614!2d120.820539!3d16.0544459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDAzJzEzLjjEsMTIwwrA0OScxOS40Wi!5e0!3m2!1sen!2sph!4v1730000000000!5m2!1sen!2sph"
              className="w-full h-96 lg:h-[500px] rounded-3xl border-2 border-[#F7F8E5]/10 shadow-2xl shadow-black/40 hover:shadow-glow"
              style={{
                filter: "brightness(0.6) contrast(1.2) saturate(0.8)",
                transition: "all 0.3s ease",
              }}
              title="Acepresso Location"
              loading="lazy"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Overlay gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/60 via-transparent to-transparent rounded-3xl pointer-events-none" />

            {/* Location marker overlay */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
              <div className="w-20 h-20 bg-gradient-to-br from-[#F7F8E5]/30 to-[#F7F8E5]/10 rounded-3xl border-4 border-[#F7F8E5]/40 backdrop-blur-xl flex items-center justify-center shadow-2xl shadow-[#F7F8E5]/30 animate-pulse">
                <div className="w-8 h-8 bg-gradient-to-r from-[#F7F8E5] to-[#F7F8E5]/50 rounded-full shadow-lg animate-bounce" />
              </div>
            </div>

            {/* Location info overlay */}
            <div className="absolute bottom-6 left-6 right-6 lg:left-12 lg:right-12 pointer-events-none z-20">
              <div className="bg-[#232D23]/80 backdrop-blur-md border border-[#F7F8E5]/20 rounded-2xl p-6 shadow-2xl shadow-black/40">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F7F8E5]/20 to-[#F7F8E5]/10 rounded-xl border-2 border-[#F7F8E5]/30 flex items-center justify-center backdrop-blur-sm shadow-lg">
                    <LocationPinIcon className="text-[#F7F8E5]/80 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-[Cormorant_Garamond] text-xl lg:text-2xl tracking-tight mb-1">
                      Find Us Here
                    </h3>
                    <p className="text-[#6D6A61]/90 uppercase tracking-[0.15em] text-sm">
                      Purok 6, Batchelor East
                      <br />
                      Natividad, Pangasinan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#F7F8E5]/5 pt-24 pb-16 px-4 bg-gradient-to-t from-[#020202] to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-16 lg:gap-20 mb-20">
            {/* Logo & Description */}
            <div>
              <div className="flex items-center mb-8">
                <div className="w-14 h-14 bg-[#232D23] rounded-xl flex items-center justify-center border border-[#F7F8E5]/15 mr-4 p-2 overflow-hidden shadow-lg">
                  <img
                    src="/Acepresso-logo-light.png"
                    alt="Acepresso"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="font-[Cormorant_Garamond] text-3xl tracking-tight block">
                    Acepresso
                  </span>
                  <span className="text-[#6D6A61]/60 text-sm uppercase tracking-[0.3em]">
                    Since 2024
                  </span>
                </div>
              </div>
              <p className="text-[#6D6A61]/65 leading-relaxed max-w-sm text-lg">
                Coffee crafted with purpose. Brewed like an ace. Every cup tells
                a story.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-[Cormorant_Garamond] text-2xl mb-8 tracking-tight">
                Quick Links
              </h4>
              <ul className="space-y-4">
                {["Home", "About", "Products", "Contact"].map((link, i) => (
                  <li key={i}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="group flex items-center gap-4 text-[#6D6A61]/75 hover:text-[#F7F8E5] transition-all duration-400 py-2 hover:pl-4"
                    >
                      <div className="w-3 h-3 rounded-full bg-transparent group-hover:bg-[#F7F8E5]/50 transition-all duration-400" />
                      <span className="uppercase tracking-[0.15em]">
                        {link}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-[Cormorant_Garamond] text-2xl mb-8 tracking-tight">
                Our Blends
              </h4>
              <ul className="space-y-3">
                {[
                  "Ethiopian Sunrise",
                  "Colombian Midnight",
                  "Brazilian Legacy",
                  "Signature Blend",
                ].map((product, i) => (
                  <li key={i}>
                    <a
                      href="#products"
                      className="block text-[#6D6A61]/75 hover:text-[#F7F8E5] transition-all duration-300 py-2 hover:pl-4 hover:bg-[#232D23]/50 px-3 rounded-lg"
                    >
                      {product}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div>
              <h4 className="font-[Cormorant_Garamond] text-2xl mb-8 tracking-tight">
                Join the Experience
              </h4>
              <p className="text-[#6D6A61]/70 mb-8 leading-relaxed">
                Ready to taste coffee perfected? Join thousands who brew like
                aces.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="w-full uppercase tracking-[0.25em] text-base font-medium px-8 py-4 bg-gradient-to-r from-[#232D23] to-[#6D6A61]/30 border border-[#F7F8E5]/20 hover:border-[#F7F8E5]/40 rounded-xl transition-all duration-500 hover:scale-[1.02] shadow-lg hover:shadow-[#F7F8E5]/20 backdrop-blur-sm"
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-16 border-t border-[#F7F8E5]/8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8 text-center lg:text-left">
              <p className="text-[#6D6A61]/50 text-lg tracking-wide">
                © 2024 Acepresso. Crafted with precision. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                {[
                  {
                    icon: <FacebookIcon />,
                    link: "https://www.facebook.com/profile.php?id=61574374155552",
                  },
                  {
                    icon: <InstagramIcon />,
                    link: "https://www.facebook.com/jann.rosquita",
                  },
                ].map((icon, i) => (
                  <a
                    key={i}
                    href={icon.link}
                    className="w-14 h-14 border border-[#F7F8E5]/15 rounded-xl flex items-center justify-center hover:bg-[#232D23]/70 hover:scale-110 transition-all duration-400 text-[#6D6A61]/60 hover:text-[#F7F8E5] shadow-md hover:shadow-[#F7F8E5]/20 backdrop-blur-sm"
                    target="_blank"
                  >
                    <span className="text-xl">{icon.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        /* ── CORE ANIMATIONS ── */
        html { scroll-behavior: smooth; }

        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #020202; }
        ::-webkit-scrollbar-thumb { 
          background: linear-gradient(135deg, #232D23 0%, #6D6A61 100%);
          border-radius: 10px; 
          border: 2px solid #020202;
        }
        ::-webkit-scrollbar-thumb:hover { background: #6D6A61; }

        /* ── BACKGROUND ANIMATIONS ── */
        @keyframes parallaxSlow {
          0%, 100% { transform: scale(1.1) translateX(0%) translateY(0%); }
          25% { transform: scale(1.12) translateX(-1%) translateY(-0.5%); }
          50% { transform: scale(1.1) translateX(0.5%) translateY(-1%); }
          75% { transform: scale(1.13) translateX(-0.5%) translateY(0.5%); }
        }

        @keyframes drift {
          0% { background-position: center 0%; }
          25% { background-position: 120% 25%; }
          50% { background-position: 80% 50%; }
          75% { background-position: 110% 75%; }
          100% { background-position: center 100%; }
        }

        /* ── FLOATING ANIMATIONS ── */
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(-120deg); }
          66% { transform: translateY(-15px) rotate(-240deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-40px) rotate(180deg); }
          66% { transform: translateY(-20px) rotate(360deg); }
        }
        @keyframes float-tiny {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.1); }
        }

        /* ── SCROLL & GLOW ── */
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.6; height: 16px; transform: scaleY(1); }
          50% { opacity: 1; height: 32px; transform: scaleY(1.3); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 25px rgba(247,248,229,0.2), 0 0 50px rgba(247,248,229,0.1); }
          50% { box-shadow: 0 0 50px rgba(247,248,229,0.4), 0 0 100px rgba(247,248,229,0.2); }
        }
        @keyframes steam {
          0% { transform: translateY(0) scaleY(1) opacity: 1; }
          100% { transform: translateY(-50px) scaleY(2) opacity: 0; }
        }

        .shadow-glow { animation: glow 2.5s ease-in-out infinite; }
        .animate-scrollPulse { animation: scrollPulse 2s ease-in-out infinite; }
        .animate-steam { animation: steam 4s ease-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 10s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 12s ease-in-out infinite; }
        .animate-float-tiny { animation: float-tiny 5s ease-in-out infinite; }

        /* ── MOBILE OPTIMIZATIONS ── */
        @media (max-width: 768px) {
          .text-5xl { font-size: 3.5rem !important; line-height: 0.95 !important; }
          .text-7xl, .text-8xl { font-size: 4.5rem !important; }
          section { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
