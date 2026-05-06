import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";

function CustomCursor() {
  const mx = useMotionValue(-100),
    my = useMotionValue(-100);
  const tx = useSpring(mx, { stiffness: 120, damping: 22 });
  const ty = useSpring(my, { stiffness: 120, damping: 22 });
  const dx = useSpring(mx, { stiffness: 600, damping: 40 });
  const dy = useSpring(my, { stiffness: 600, damping: 40 });
  useEffect(() => {
    const h = (e) => {
      mx.set(e.clientX - 16);
      my.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return (
    <>
      <motion.div
        style={{
          position: "fixed",
          left: tx,
          top: ty,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid rgba(249,115,22,0.5)",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "normal",
        }}
      />
      <motion.div
        style={{
          position: "fixed",
          left: dx,
          top: dy,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#f97316",
          pointerEvents: "none",
          zIndex: 9999,
          boxShadow: "0 0 10px rgba(249,115,22,0.8)",
        }}
      />
    </>
  );
}

function AtmosphericBackground() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 0%, #120800 0%, #080400 55%, #020200 100%)",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          top: -250,
          left: -150,
          y: y1,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(234,88,12,0.18) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          bottom: "5%",
          right: -100,
          y: y2,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          top: "40%",
          left: "35%",
          y: y3,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(180,83,9,0.1) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.015) 1px, transparent 0)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(2,1,0,0.85) 100%)",
        }}
      />
    </div>
  );
}

function GlowCard({ children, style, accent = "rgba(249,115,22,0.15)" }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: "50%", y: "50%" });
  const [hovered, setHovered] = useState(false);
  const onMove = useCallback((e) => {
    const r = ref.current.getBoundingClientRect();
    setPos({ x: `${e.clientX - r.left}px`, y: `${e.clientY - r.top}px` });
  }, []);
  return (
    <div
      ref={ref}
      style={{ ...style, position: "relative", overflow: "hidden" }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s",
          background: `radial-gradient(400px circle at ${pos.x} ${pos.y}, ${accent}, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

function CulinaryOrb() {
  const plateX = useMotionValue(0),
    plateY = useMotionValue(0);
  const sX = useSpring(plateX, { stiffness: 60, damping: 18 });
  const sY = useSpring(plateY, { stiffness: 60, damping: 18 });
  const rotX = useTransform(sY, [-80, 80], [12, -12]);
  const rotY = useTransform(sX, [-80, 80], [-12, 12]);
  const handleMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    plateX.set(e.clientX - rect.left - rect.width / 2);
    plateY.set(e.clientY - rect.top - rect.height / 2);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        plateX.set(0);
        plateY.set(0);
      }}
      style={{
        position: "relative",
        width: "100%",
        height: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: 1000,
      }}
    >
      <motion.div
        style={{
          position: "relative",
          width: 380,
          height: 380,
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -40,
            left: "50%",
            transform: "translateX(-50%)",
            width: 280,
            height: 40,
            background:
              "radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(12px)",
          }}
        />
        <motion.div
          animate={{ rotateZ: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1px solid rgba(251,191,36,0.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 20,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 28%, rgba(255,248,235,0.06) 0%, rgba(30,15,5,0.9) 55%, rgba(10,4,0,0.98) 100%)",
            border: "1px solid rgba(251,191,36,0.18)",
            boxShadow:
              "0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 28,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 38% 32%, rgba(251,191,36,0.04) 0%, rgba(8,3,0,0.95) 70%)",
              border: "1px solid rgba(120,53,15,0.2)",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: "20%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 40% 35%, rgba(251,191,36,0.25) 0%, rgba(234,88,12,0.15) 40%, transparent 70%)",
                filter: "blur(8px)",
              }}
            />
            <svg
              viewBox="0 0 200 200"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity: 0.7,
              }}
            >
              <defs>
                <radialGradient id="drizzle1" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(251,191,36,0.9)" />
                  <stop offset="100%" stopColor="rgba(234,88,12,0.6)" />
                </radialGradient>
                <radialGradient id="herb1" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(74,222,128,0.95)" />
                  <stop offset="100%" stopColor="rgba(22,163,74,0.7)" />
                </radialGradient>
              </defs>
              <motion.path
                d="M100 60 Q120 80 100 100 Q80 120 100 140"
                fill="none"
                stroke="url(#drizzle1)"
                strokeWidth="3"
                strokeLinecap="round"
                animate={{ pathLength: [0, 1, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.ellipse
                cx="115"
                cy="85"
                rx="8"
                ry="14"
                fill="url(#herb1)"
                transform="rotate(-30 115 85)"
                animate={{ rotate: [-30, -25, -30] }}
                style={{ transformOrigin: "115px 85px" }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.ellipse
                cx="88"
                cy="115"
                rx="6"
                ry="11"
                fill="url(#herb1)"
                transform="rotate(20 88 115)"
                animate={{ rotate: [20, 25, 20] }}
                style={{ transformOrigin: "88px 115px" }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
              <motion.circle
                cx="125"
                cy="110"
                r="4.5"
                fill="rgba(30,10,5,0.9)"
                stroke="rgba(120,53,15,0.6)"
                strokeWidth="1"
                animate={{ scale: [1, 1.1, 1] }}
                style={{ transformOrigin: "125px 110px" }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.circle
                cx="78"
                cy="95"
                r="3.5"
                fill="rgba(30,10,5,0.9)"
                stroke="rgba(120,53,15,0.5)"
                strokeWidth="1"
                animate={{ scale: [1, 1.1, 1] }}
                style={{ transformOrigin: "78px 95px" }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
            </svg>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: "22%",
            left: "25%",
            width: "25%",
            height: "18%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.07) 0%, transparent 100%)",
            filter: "blur(6px)",
            transform: "rotate(-20deg)",
            pointerEvents: "none",
          }}
        />
      </motion.div>
      {/* Floating herb orb */}
      <motion.div
        animate={{ y: [-12, 8, -12], x: [6, -4, 6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "14%",
          right: "10%",
          width: 48,
          height: 48,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 30%, rgba(74,222,128,0.25), rgba(22,163,74,0.15))",
          border: "1px solid rgba(74,222,128,0.25)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="8" fill="rgba(74,222,128,0.6)" />
          <circle cx="7" cy="7" r="3" fill="rgba(255,255,255,0.4)" />
        </svg>
      </motion.div>
      {/* Floating amber orb */}
      <motion.div
        animate={{ y: [10, -8, 10], x: [-5, 5, -5] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{
          position: "absolute",
          bottom: "18%",
          left: "8%",
          width: 40,
          height: 40,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 30%, rgba(251,191,36,0.2), rgba(234,88,12,0.1))",
          border: "1px solid rgba(251,191,36,0.2)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="6" fill="rgba(251,191,36,0.7)" />
          <circle cx="6" cy="5" r="2" fill="rgba(255,255,255,0.4)" />
        </svg>
      </motion.div>
      {/* Stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        style={{
          position: "absolute",
          bottom: "5%",
          right: "0%",
          background: "rgba(15,5,0,0.65)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(249,115,22,0.2)",
          borderRadius: 14,
          padding: "14px 18px",
          boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
        }}
      >
        <p
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: 9,
            color: "#57534e",
            marginBottom: 4,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Guest Rating
        </p>
        <p
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: 24,
            fontWeight: 600,
            color: "#fb923c",
            letterSpacing: "-1px",
            margin: 0,
          }}
        >
          4.9 ★
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        style={{
          position: "absolute",
          top: "5%",
          left: "0%",
          background: "rgba(15,5,0,0.65)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(251,191,36,0.18)",
          borderRadius: 14,
          padding: "14px 18px",
          boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
        }}
      >
        <p
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: 9,
            color: "#57534e",
            marginBottom: 4,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Est.
        </p>
        <p
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: 24,
            fontWeight: 600,
            color: "#fbbf24",
            letterSpacing: "-1px",
            margin: 0,
          }}
        >
          Since 2012
        </p>
      </motion.div>
    </motion.div>
  );
}

const entranceVariant = {
  hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger = { visible: { transition: { staggerChildren: 0.09 } } };

function Section({ children, style, id, className }) {
  const ref = useRef(null);
  const io = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      id={id}
      ref={ref}
      className={className}
      variants={stagger}
      initial="hidden"
      animate={io ? "visible" : "hidden"}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function StickyReservation() {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const h = () => setVis(window.scrollY > 500);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <AnimatePresence>
      {vis && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 300,
            display: "flex",
            alignItems: "center",
            gap: 14,
            background: "rgba(15,5,0,0.88)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(249,115,22,0.25)",
            borderRadius: 99,
            padding: "10px 10px 10px 20px",
            boxShadow: "0 24px 48px rgba(0,0,0,0.6)",
          }}
        >
          <p
            style={{
              fontSize: 13,
              color: "#a8a29e",
              whiteSpace: "nowrap",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Ready to dine?
          </p>
          <a
            href="#contact"
            style={{
              background: "linear-gradient(135deg,#ea580c,#c2410c)",
              color: "white",
              padding: "10px 20px",
              borderRadius: 99,
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 0 20px rgba(234,88,12,0.5)",
              whiteSpace: "nowrap",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Reserve a table →
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Starters");
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const menuData = {
    Starters: [
      {
        name: "Bruschetta al Pomodoro",
        desc: "Toasted sourdough, San Marzano tomatoes, fresh basil, aged garlic oil",
        price: "$14",
        img: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&q=80",
        tag: "Chef's Pick",
      },
      {
        name: "Burrata & Prosciutto",
        desc: "Creamy buffalo burrata, 24-month aged prosciutto, fig compote, rocket",
        price: "$19",
        img: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&q=80",
        tag: "Seasonal",
      },
      {
        name: "Calamari Fritti",
        desc: "Crispy fried squid, preserved lemon aioli, micro herbs, sea salt",
        price: "$16",
        img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80",
        tag: null,
      },
      {
        name: "Carpaccio di Manzo",
        desc: "Paper-thin wagyu beef, truffle oil, shaved parmigiano, capers",
        price: "$22",
        img: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&q=80",
        tag: "Signature",
      },
      {
        name: "Zuppa di Cozze",
        desc: "Fresh mussels, white wine, cherry tomatoes, crusty bread",
        price: "$17",
        img: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400&q=80",
        tag: null,
      },
      {
        name: "Vitello Tonnato",
        desc: "Thinly sliced veal, tuna mousse, capers, lemon zest",
        price: "$20",
        img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
        tag: "Classic",
      },
      {
        name: "Insalata di Mare",
        desc: "Octopus, prawns, scallops, celery, olive oil, fresh lemon",
        price: "$23",
        img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
        tag: null,
      },
      {
        name: "Focaccia della Casa",
        desc: "House-baked focaccia, rosemary, sea salt, Ligurian olive oil",
        price: "$9",
        img: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&q=80",
        tag: "House Special",
      },
    ],
    Mains: [
      {
        name: "Spaghetti Carbonara",
        desc: "Guanciale, free-range egg yolk, aged pecorino romano, cracked black pepper",
        price: "$26",
        img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80",
        tag: "Classic",
      },
      {
        name: "Grilled Sea Bass",
        desc: "Line-caught Mediterranean sea bass, lemon beurre blanc, capers, samphire",
        price: "$34",
        img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80",
        tag: "Sustainable",
      },
      {
        name: "Osso Buco Milanese",
        desc: "Braised veal shank, saffron risotto, gremolata, 6-hour jus",
        price: "$40",
        img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
        tag: "Signature",
      },
      {
        name: "Risotto ai Funghi",
        desc: "Wild porcini, truffle butter, aged parmigiano reggiano, chive oil",
        price: "$28",
        img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80",
        tag: "Vegetarian",
      },
      {
        name: "Agnello alla Griglia",
        desc: "Herb-crusted rack of lamb, rosemary jus, roasted root vegetables",
        price: "$44",
        img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=80",
        tag: "Chef's Pick",
      },
      {
        name: "Tagliatelle al Tartufo",
        desc: "Handmade egg tagliatelle, black truffle, butter, parmigiano",
        price: "$36",
        img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=80",
        tag: "Seasonal",
      },
      {
        name: "Filetto di Manzo",
        desc: "Grass-fed beef fillet, red wine reduction, grilled asparagus",
        price: "$48",
        img: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80",
        tag: "Signature",
      },
      {
        name: "Branzino al Forno",
        desc: "Whole roasted sea bream, Sicilian caponata, salmoriglio sauce",
        price: "$38",
        img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&q=80",
        tag: null,
      },
    ],
    Desserts: [
      {
        name: "Tiramisu Classico",
        desc: "Savoiardi, single-origin espresso, mascarpone cream, dark cocoa",
        price: "$12",
        img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80",
        tag: "Classic",
      },
      {
        name: "Panna Cotta",
        desc: "Vanilla bean, wild berry coulis, edible flowers, tuile shard",
        price: "$11",
        img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80",
        tag: null,
      },
      {
        name: "Cannoli Siciliani",
        desc: "Hand-rolled pastry shells, sweetened ricotta, Bronte pistachios",
        price: "$13",
        img: "https://images.unsplash.com/photo-1559622214-f8a9850965bb?w=400&q=80",
        tag: "Chef's Pick",
      },
      {
        name: "Soufflé al Cioccolato",
        desc: "Valrhona dark chocolate, vanilla gelato, praline crumble",
        price: "$15",
        img: "https://images.unsplash.com/photo-1541599468348-e96984315921?w=400&q=80",
        tag: "Signature",
      },
      {
        name: "Torta della Nonna",
        desc: "Traditional custard tart, pine nuts, lemon zest, powdered sugar",
        price: "$11",
        img: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=400&q=80",
        tag: null,
      },
      {
        name: "Gelato Artigianale",
        desc: "Three scoops of house-made gelato, seasonal flavours, wafer",
        price: "$10",
        img: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&q=80",
        tag: "House Special",
      },
      {
        name: "Semifreddo al Limone",
        desc: "Amalfi lemon semifreddo, candied zest, limoncello sauce",
        price: "$12",
        img: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&q=80",
        tag: "Seasonal",
      },
      {
        name: "Affogato al Caffè",
        desc: "Double espresso poured over fior di latte gelato, amaretti",
        price: "$9",
        img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80",
        tag: null,
      },
    ],
    Wines: [
      {
        name: "Barolo DOCG 2018",
        desc: "Nebbiolo, Piedmont. Full-bodied, tar and roses, long finish",
        price: "$18/glass",
        img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80",
        tag: "Sommelier Pick",
      },
      {
        name: "Pinot Grigio DOC 2022",
        desc: "Crisp, mineral-driven white from Alto Adige. Perfect with seafood",
        price: "$12/glass",
        img: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=400&q=80",
        tag: "House White",
      },
      {
        name: "Amarone della Valpolicella",
        desc: "Rich, velvety red. Dried Corvina grapes, chocolate and dried fruit",
        price: "$22/glass",
        img: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80",
        tag: "Premium",
      },
      {
        name: "Prosecco Superiore DOCG",
        desc: "Fine bubbles, fresh green apple and white peach, elegant finish",
        price: "$11/glass",
        img: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&q=80",
        tag: "Sparkling",
      },
      {
        name: "Chianti Classico DOCG",
        desc: "Sangiovese, Tuscany. Medium-bodied, cherry, leather and spice",
        price: "$14/glass",
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
        tag: "House Red",
      },
      {
        name: "Vermentino di Sardegna",
        desc: "Aromatic white, citrus blossom, almonds. Ideal with grilled fish",
        price: "$13/glass",
        img: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&q=80",
        tag: null,
      },
      {
        name: "Brunello di Montalcino",
        desc: "The king of Italian reds. Complex, age-worthy, exceptional structure",
        price: "$28/glass",
        img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80",
        tag: "Reserve",
      },
      {
        name: "Limoncello della Casa",
        desc: "House-made Amalfi lemon liqueur, served ice cold, digestivo",
        price: "$8/glass",
        img: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80",
        tag: "House Made",
      },
    ],
  };

  return (
    <div
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        color: "white",
        minHeight: "100vh",
        overflowX: "hidden",
        cursor: "none",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Montserrat', sans-serif; }
        ::selection { background: rgba(249,115,22,0.35); color: white; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #020200; }
        ::-webkit-scrollbar-thumb { background: #78350f; border-radius: 99px; }
        @keyframes gs { 0%,100% { background-position: 0% 50% } 50% { background-position: 100% 50% } }
        .nlink { color: #78350f; text-decoration: none; font-size: 12px; font-weight: 500; transition: color .25s; font-family: 'Montserrat', sans-serif; letter-spacing: 1.5px; text-transform: uppercase; position: relative; padding: 4px 0; }
        .nlink::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: linear-gradient(90deg,#f97316,#fbbf24); transition: width .3s; }
        .nlink:hover { color: #fed7aa; }
        .nlink:hover::after { width: 100%; }
        .btn-reserve { background: linear-gradient(135deg,#ea580c,#c2410c); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: none; transition: all .3s cubic-bezier(.175,.885,.32,1.275); font-family: 'Montserrat', sans-serif; font-size: 12px; letter-spacing: 0.5px; display: inline-block; text-decoration: none; position: relative; overflow: hidden; }
        .btn-reserve::after { content: ''; position: absolute; top: -50%; left: -60%; width: 35%; height: 200%; background: linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent); transform: skewX(-20deg); transition: left .5s; }
        .btn-reserve:hover { transform: scale(1.05) translateY(-2px); box-shadow: 0 16px 40px rgba(234,88,12,.55); }
        .btn-reserve:hover::after { left: 120%; }
        .btn-reserve:active { transform: scale(.97); }
        .btn-ghost { background: transparent; border: 1px solid rgba(120,53,15,.6); color: #a8a29e; border-radius: 8px; font-weight: 500; cursor: none; transition: all .3s; font-family: 'Montserrat', sans-serif; font-size: 12px; letter-spacing: 0.5px; text-decoration: none; display: inline-block; padding: 14px 28px; }
        .btn-ghost:hover { border-color: rgba(249,115,22,.5); color: #fed7aa; background: rgba(249,115,22,.06); }
        .menu-tab { font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; padding: 10px 24px; border-radius: 99px; border: 1px solid rgba(120,53,15,.4); cursor: none; transition: all .3s; background: transparent; color: #78350f; }
        .menu-tab.active { background: linear-gradient(135deg,#ea580c,#c2410c); color: white; border-color: transparent; box-shadow: 0 8px 24px rgba(234,88,12,.4); }
        .menu-tab:hover:not(.active) { border-color: rgba(249,115,22,.5); color: #fed7aa; }
        .dish-card { background: rgba(20,8,0,0.5); border: 1px solid rgba(120,53,15,0.2); border-radius: 16px; overflow: hidden; transition: all .4s cubic-bezier(.175,.885,.32,1.275); cursor: default; display: flex; flex-direction: row; }
        .dish-card:hover { transform: translateY(-4px); border-color: rgba(249,115,22,0.3); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .dish-img { width: 120px; min-width: 120px; height: 120px; object-fit: cover; display: block; transition: transform .6s ease; }
        .dish-card:hover .dish-img { transform: scale(1.08); }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; padding: 100px 24px 60px !important; }
          .hero-orb { display: none !important; }
          nav { padding: 0 24px !important; }
          .menu-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .section-pad { padding-left: 20px !important; padding-right: 20px !important; }
          nav { padding: 0 16px !important; }
          .nav-links { display: none !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <AtmosphericBackground />
      <CustomCursor />
      <StickyReservation />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Navbar */}
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 64px",
            height: 68,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 200,
            transition: "all .4s",
            background: scrolled ? "rgba(8,3,0,0.92)" : "rgba(8,3,0,0.4)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            borderBottom: "1px solid rgba(120,53,15,0.2)",
          }}
        >
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                background: "linear-gradient(135deg,#ea580c,#c2410c)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 14,
                color: "white",
                boxShadow: "0 0 16px rgba(234,88,12,0.5)",
                fontFamily: "Cormorant Garamond, serif",
                fontStyle: "italic",
              }}
            >
              B
            </div>
            <span
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 20,
                fontWeight: 600,
                color: "#fde8d0",
                letterSpacing: "1px",
              }}
            >
              Bella
              <span style={{ color: "#f97316", fontStyle: "italic" }}>
                Vista
              </span>
            </span>
          </a>
          <div className="nav-links" style={{ display: "flex", gap: 32 }}>
            {[
              ["Menu", "#menu"],
              ["About", "#about"],
              ["Gallery", "#gallery"],
              ["Contact", "#contact"],
            ].map(([l, href]) => (
              <a key={l} href={href} className="nlink">
                {l}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="btn-reserve"
            style={{ padding: "10px 22px" }}
          >
            Reserve a Table
          </a>
        </nav>

        {/* Hero */}
        <section
          id="hero"
          className="hero-grid"
          style={{
            minHeight: "100vh",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            padding: "120px 64px 80px",
            gap: 40,
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(120,53,15,0.15)",
                border: "1px solid rgba(249,115,22,0.2)",
                borderRadius: 99,
                padding: "5px 14px",
                fontSize: 10,
                color: "#fb923c",
                marginBottom: 28,
                backdropFilter: "blur(10px)",
                fontFamily: "Montserrat, sans-serif",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                  boxShadow: "0 0 6px #10b981",
                  display: "inline-block",
                }}
              />
              Fine Dining · Chittagong · Est. 2012
            </motion.div>
            <h1
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 80,
                fontWeight: 300,
                lineHeight: 1.0,
                letterSpacing: "-2px",
                marginBottom: 24,
                fontStyle: "italic",
              }}
            >
              Where every
              <br />
              meal tells
              <span
                style={{
                  display: "block",
                  fontStyle: "normal",
                  fontWeight: 600,
                  background:
                    "linear-gradient(135deg,#fb923c 0%,#fbbf24 50%,#fb923c 100%)",
                  backgroundSize: "200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "gs 5s ease infinite",
                }}
              >
                a story.
              </span>
            </h1>
            <p
              style={{
                fontSize: 15,
                color: "#78716c",
                lineHeight: 1.8,
                marginBottom: 40,
                maxWidth: 440,
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 300,
              }}
            >
              Experience the finest flavours of Italian and Mediterranean
              cuisine. Fresh ingredients, traditional recipes, unforgettable
              moments.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 48,
              }}
            >
              <a
                href="#contact"
                className="btn-reserve"
                style={{
                  padding: "14px 32px",
                  fontSize: 13,
                  boxShadow: "0 0 32px rgba(234,88,12,0.4)",
                }}
              >
                Reserve a Table
              </a>
              <a href="#menu" className="btn-ghost">
                View Menu
              </a>
            </div>
            <div
              className="stats-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 20,
                paddingTop: 32,
                borderTop: "1px solid rgba(120,53,15,0.2)",
              }}
            >
              {[
                ["12+", "Years of Excellence"],
                ["4.9", "Guest Rating"],
                ["500+", "Guests Weekly"],
              ].map(([n, l], i) => (
                <div key={i}>
                  <p
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: 32,
                      fontWeight: 600,
                      color: "#fb923c",
                      margin: "0 0 4px 0",
                      letterSpacing: "-1px",
                    }}
                  >
                    {n}
                  </p>
                  <p
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: 10,
                      color: "#57534e",
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                    }}
                  >
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="hero-orb">
            <CulinaryOrb />
          </div>
        </section>

        {/* Badge bar */}
        <div
          style={{
            padding: "18px 0",
            borderTop: "1px solid rgba(120,53,15,0.15)",
            borderBottom: "1px solid rgba(120,53,15,0.15)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 48,
              flexWrap: "wrap",
              padding: "0 64px",
            }}
          >
            {[
              "Michelin Recommended",
              "Farm to Table",
              "Award-Winning Wine List",
              "TripAdvisor Excellence",
            ].map((item, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: 10,
                  color: "#57534e",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* Menu */}
        <Section
          id="menu"
          className="section-pad"
          style={{ padding: "100px 64px" }}
        >
          <motion.div
            variants={entranceVariant}
            style={{ textAlign: "center", marginBottom: 56 }}
          >
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                color: "#f97316",
                fontSize: 10,
                letterSpacing: "4px",
                textTransform: "uppercase",
                marginBottom: 12,
                fontWeight: 600,
              }}
            >
              Our Menu
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 56,
                fontWeight: 300,
                letterSpacing: "-1.5px",
                marginBottom: 16,
                fontStyle: "italic",
              }}
            >
              Crafted with passion
            </h2>
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                color: "#78716c",
                fontSize: 14,
                maxWidth: 440,
                margin: "0 auto",
                fontWeight: 300,
              }}
            >
              Fresh ingredients, authentic recipes, unforgettable flavours.
            </p>
          </motion.div>
          <motion.div
            variants={entranceVariant}
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "center",
              marginBottom: 56,
              flexWrap: "wrap",
            }}
          >
            {Object.keys(menuData).map((tab) => (
              <button
                key={tab}
                className={`menu-tab ${activeMenu === tab ? "active" : ""}`}
                onClick={() => setActiveMenu(tab)}
              >
                {tab}
              </button>
            ))}
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ maxWidth: 1100, margin: "0 auto" }}
            >
              <motion.div
                variants={{
                  visible: { transition: { staggerChildren: 0.06 } },
                }}
                initial="hidden"
                animate="visible"
                className="menu-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2,1fr)",
                  gap: 12,
                }}
              >
                {menuData[activeMenu].map((dish, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                  >
                    <div className="dish-card">
                      <div
                        style={{
                          width: 120,
                          minWidth: 120,
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <img
                          className="dish-img"
                          src={dish.img}
                          alt={dish.name}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(to right, transparent 50%, rgba(20,8,0,0.3))",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          flex: 1,
                          padding: "16px 16px 14px 14px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              marginBottom: 6,
                              gap: 8,
                            }}
                          >
                            <h3
                              style={{
                                fontFamily: "Cormorant Garamond, serif",
                                fontSize: 17,
                                fontWeight: 500,
                                color: "#fde8d0",
                                lineHeight: 1.2,
                              }}
                            >
                              {dish.name}
                            </h3>
                            {dish.tag && (
                              <span
                                style={{
                                  fontFamily: "Montserrat, sans-serif",
                                  fontSize: 7,
                                  fontWeight: 700,
                                  padding: "3px 7px",
                                  borderRadius: 99,
                                  background: "rgba(249,115,22,0.1)",
                                  color: "#fb923c",
                                  border: "1px solid rgba(249,115,22,0.2)",
                                  whiteSpace: "nowrap",
                                  letterSpacing: "1px",
                                  textTransform: "uppercase",
                                  flexShrink: 0,
                                }}
                              >
                                {dish.tag}
                              </span>
                            )}
                          </div>
                          <p
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              color: "#57534e",
                              fontSize: 10,
                              lineHeight: 1.7,
                              fontWeight: 300,
                            }}
                          >
                            {dish.desc}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 10,
                          }}
                        >
                          <p
                            style={{
                              fontFamily: "Cormorant Garamond, serif",
                              color: "#f97316",
                              fontWeight: 600,
                              fontSize: 20,
                              letterSpacing: "-0.5px",
                              margin: 0,
                            }}
                          >
                            {dish.price}
                          </p>
                          <a
                            href="#contact"
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              fontSize: 9,
                              color: "#78350f",
                              letterSpacing: "1.5px",
                              textTransform: "uppercase",
                              textDecoration: "none",
                              transition: "color .2s",
                              fontWeight: 600,
                            }}
                            onMouseEnter={(e) =>
                              (e.target.style.color = "#fb923c")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.color = "#78350f")
                            }
                          >
                            Reserve →
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
          <motion.div
            variants={entranceVariant}
            style={{ textAlign: "center", marginTop: 48 }}
          >
            <a
              href="#contact"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: 11,
                color: "#57534e",
                letterSpacing: "2px",
                textTransform: "uppercase",
                textDecoration: "none",
                borderBottom: "1px solid rgba(120,53,15,0.3)",
                paddingBottom: 4,
                transition: "color .2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#fb923c")}
              onMouseLeave={(e) => (e.target.style.color = "#57534e")}
            >
              View Full Menu and Reserve
            </a>
          </motion.div>
        </Section>

        {/* About */}
        <Section
          id="about"
          className="section-pad"
          style={{
            padding: "100px 64px",
            borderTop: "1px solid rgba(120,53,15,0.15)",
          }}
        >
          <motion.div
            variants={entranceVariant}
            style={{ textAlign: "center", marginBottom: 64 }}
          >
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                color: "#f97316",
                fontSize: 10,
                letterSpacing: "4px",
                textTransform: "uppercase",
                marginBottom: 12,
                fontWeight: 600,
              }}
            >
              About Us
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 52,
                fontWeight: 300,
                letterSpacing: "-1.5px",
                fontStyle: "italic",
              }}
            >
              A family tradition since 2012
            </h2>
          </motion.div>
          <div
            className="about-grid"
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
          >
            <motion.div variants={entranceVariant}>
              <p
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  color: "#78716c",
                  fontSize: 14,
                  lineHeight: 1.9,
                  marginBottom: 20,
                  fontWeight: 300,
                }}
              >
                BellaVista was born from a simple dream — to bring the authentic
                flavours of the Italian coast to Chittagong. Founded by Chef
                Marco Rossi and his wife Sofia in 2012, every dish is a labour
                of love crafted from traditional recipes passed down through
                generations.
              </p>
              <p
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  color: "#78716c",
                  fontSize: 14,
                  lineHeight: 1.9,
                  marginBottom: 32,
                  fontWeight: 300,
                }}
              >
                We source our ingredients fresh every morning from local farmers
                and trusted Italian importers. From the finest parmigiano to
                Sicilian olive oil — quality is never compromised. Every plate
                that leaves our kitchen tells a story of heritage, passion, and
                craft.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 24,
                }}
              >
                {[
                  { label: "Head Chef", value: "Marco Rossi" },
                  { label: "Founded", value: "Chittagong, 2012" },
                  { label: "Cuisine", value: "Italian · Mediterranean" },
                  { label: "Capacity", value: "80 Covers" },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      borderLeft: "2px solid rgba(249,115,22,0.3)",
                      paddingLeft: 14,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: 9,
                        color: "#57534e",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        marginBottom: 4,
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: 18,
                        fontWeight: 500,
                        color: "#fde8d0",
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              variants={entranceVariant}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              {[
                {
                  icon: "◈",
                  title: "Expert Chefs",
                  desc: "Trained in Italy with 15+ years of fine dining experience",
                },
                {
                  icon: "◇",
                  title: "Fresh Daily",
                  desc: "All ingredients sourced fresh every single morning",
                },
                {
                  icon: "◉",
                  title: "Fine Wines",
                  desc: "Award-winning curated Italian wine collection",
                },
                {
                  icon: "✦",
                  title: "Fine Dining",
                  desc: "Elegant, intimate atmosphere for every occasion",
                },
              ].map((item, i) => (
                <GlowCard
                  key={i}
                  accent="rgba(249,115,22,0.08)"
                  style={{
                    background: "rgba(20,8,0,0.4)",
                    border: "1px solid rgba(120,53,15,0.2)",
                    borderRadius: 16,
                    padding: 20,
                    transition: "all .3s",
                    cursor: "default",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: 22,
                      color: "#fb923c",
                      margin: "0 0 10px 0",
                    }}
                  >
                    {item.icon}
                  </p>
                  <p
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontWeight: 600,
                      fontSize: 17,
                      margin: "0 0 6px 0",
                      color: "#fde8d0",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      color: "#57534e",
                      fontSize: 11,
                      margin: 0,
                      lineHeight: 1.6,
                      fontWeight: 300,
                    }}
                  >
                    {item.desc}
                  </p>
                </GlowCard>
              ))}
            </motion.div>
          </div>
        </Section>

        {/* Testimonials */}
        <Section
          id="gallery"
          className="section-pad"
          style={{
            padding: "100px 64px",
            borderTop: "1px solid rgba(120,53,15,0.15)",
          }}
        >
          <motion.div
            variants={entranceVariant}
            style={{ textAlign: "center", marginBottom: 64 }}
          >
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                color: "#f97316",
                fontSize: 10,
                letterSpacing: "4px",
                textTransform: "uppercase",
                marginBottom: 12,
                fontWeight: 600,
              }}
            >
              Guest Experiences
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 52,
                fontWeight: 300,
                letterSpacing: "-1.5px",
                fontStyle: "italic",
              }}
            >
              What our guests say
            </h2>
          </motion.div>
          <div
            className="testimonials-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 20,
              maxWidth: 1100,
              margin: "0 auto",
            }}
          >
            {[
              {
                quote:
                  "An extraordinary evening. The Osso Buco was the finest I've had outside of Milan. The atmosphere is intimate and the service impeccable — BellaVista is Chittagong's finest table.",
                name: "Alessandro M.",
                role: "Food Critic",
                rating: 5,
              },
              {
                quote:
                  "We celebrated our anniversary here and it was perfect in every way. The wine pairing suggested by the sommelier was inspired. We will be returning very soon.",
                name: "Priya & Rahul S.",
                role: "Anniversary Guests",
                rating: 5,
              },
              {
                quote:
                  "The Tagliatelle al Tartufo alone is worth the visit. Authentic, refined, and deeply satisfying. This is the kind of restaurant that reminds you why food matters.",
                name: "James W.",
                role: "Regular Guest",
                rating: 5,
              },
              {
                quote:
                  "From the bruschetta to the tiramisu — every course was flawless. The staff treat you like family. I have recommended BellaVista to everyone I know.",
                name: "Sofia K.",
                role: "Food Blogger",
                rating: 5,
              },
              {
                quote:
                  "The wine list is exceptional. The Barolo they recommended paired perfectly with our lamb. A genuinely world-class dining experience in an unexpected place.",
                name: "Dr. Ahmed R.",
                role: "Wine Enthusiast",
                rating: 5,
              },
              {
                quote:
                  "I have dined in restaurants across Europe and BellaVista holds its own. The attention to detail — from the plating to the service — is remarkable.",
                name: "Claire D.",
                role: "Frequent Traveller",
                rating: 5,
              },
            ].map((t, i) => (
              <motion.div key={i} variants={entranceVariant}>
                <GlowCard
                  accent="rgba(249,115,22,0.08)"
                  style={{
                    background: "rgba(20,8,0,0.45)",
                    border: "1px solid rgba(120,53,15,0.2)",
                    borderRadius: 20,
                    padding: 28,
                    backdropFilter: "blur(16px)",
                    height: "100%",
                    transition: "all .4s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "rgba(120,53,15,0.2)";
                  }}
                >
                  <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                    {[...Array(t.rating)].map((_, j) => (
                      <span
                        key={j}
                        style={{
                          fontFamily: "Cormorant Garamond, serif",
                          color: "#f97316",
                          fontSize: 14,
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      color: "#d6d3d1",
                      fontSize: 16,
                      lineHeight: 1.8,
                      marginBottom: 24,
                      fontStyle: "italic",
                    }}
                  >
                    "{t.quote}"
                  </p>
                  <div
                    style={{
                      borderTop: "1px solid rgba(120,53,15,0.2)",
                      paddingTop: 16,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontWeight: 600,
                        fontSize: 15,
                        margin: "0 0 2px 0",
                        color: "#fde8d0",
                      }}
                    >
                      {t.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        color: "#57534e",
                        fontSize: 10,
                        margin: 0,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                      }}
                    >
                      {t.role}
                    </p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section
          id="contact"
          className="section-pad"
          style={{
            padding: "100px 64px",
            borderTop: "1px solid rgba(120,53,15,0.15)",
            textAlign: "center",
          }}
        >
          <motion.div variants={entranceVariant}>
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                color: "#f97316",
                fontSize: 10,
                letterSpacing: "4px",
                textTransform: "uppercase",
                marginBottom: 12,
                fontWeight: 600,
              }}
            >
              Reservations
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 56,
                fontWeight: 300,
                margin: "0 0 16px 0",
                letterSpacing: "-1.5px",
                fontStyle: "italic",
              }}
            >
              Book your table
            </h2>
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                color: "#78716c",
                fontSize: 14,
                marginBottom: 56,
                fontWeight: 300,
              }}
            >
              We look forward to welcoming you. Call us or visit in person.
            </p>
          </motion.div>
          <motion.div
            variants={entranceVariant}
            style={{
              display: "flex",
              gap: 20,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 48,
            }}
          >
            {[
              {
                icon: "↗",
                title: "Call Us",
                value: "+880 1234 567890",
                color: "#fb923c",
                href: "tel:+8801234567890",
              },
              {
                icon: "◷",
                title: "Opening Hours",
                value: "Mon–Sun: 12pm – 11pm",
                color: "#a8a29e",
                href: null,
              },
              {
                icon: "◎",
                title: "Location",
                value: "123 GEC Circle, Chittagong",
                color: "#a8a29e",
                href: null,
              },
            ].map((item, i) => (
              <GlowCard
                key={i}
                accent="rgba(249,115,22,0.08)"
                style={{
                  background: "rgba(20,8,0,0.5)",
                  border: "1px solid rgba(120,53,15,0.2)",
                  borderRadius: 16,
                  padding: "24px 32px",
                  minWidth: 190,
                  backdropFilter: "blur(16px)",
                  transition: "all .3s",
                  cursor: "default",
                }}
              >
                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: 24,
                    color: "#fb923c",
                    margin: "0 0 10px 0",
                    fontWeight: 300,
                  }}
                >
                  {item.icon}
                </p>
                <p
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 600,
                    margin: "0 0 6px 0",
                    fontSize: 10,
                    color: "#57534e",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                  }}
                >
                  {item.title}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      color: item.color,
                      margin: 0,
                      fontWeight: 600,
                      fontSize: 18,
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      color: item.color,
                      margin: 0,
                      fontWeight: 500,
                      fontSize: 17,
                    }}
                  >
                    {item.value}
                  </p>
                )}
              </GlowCard>
            ))}
          </motion.div>
          <motion.div variants={entranceVariant}>
            <a
              href="tel:+8801234567890"
              className="btn-reserve"
              style={{
                padding: "16px 52px",
                fontSize: 13,
                boxShadow: "0 0 48px rgba(234,88,12,0.4)",
                borderRadius: 10,
                letterSpacing: "0.5px",
              }}
            >
              Call to Reserve Now
            </a>
          </motion.div>
        </Section>

        {/* Footer */}
        <footer
          style={{
            borderTop: "1px solid rgba(120,53,15,0.15)",
            padding: "44px 64px",
          }}
        >
          <div
            className="footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              gap: 48,
              maxWidth: 1000,
              margin: "0 auto 36px",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    background: "linear-gradient(135deg,#ea580c,#c2410c)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Cormorant Garamond, serif",
                    fontStyle: "italic",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "white",
                    boxShadow: "0 0 10px rgba(234,88,12,0.35)",
                  }}
                >
                  B
                </div>
                <span
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#fde8d0",
                  }}
                >
                  Bella
                  <span style={{ color: "#f97316", fontStyle: "italic" }}>
                    Vista
                  </span>
                </span>
              </div>
              <p
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  color: "#292524",
                  fontSize: 12,
                  lineHeight: 1.7,
                  maxWidth: 220,
                  fontWeight: 300,
                }}
              >
                Fine Italian and Mediterranean dining in the heart of
                Chittagong.
              </p>
            </div>
            {[
              {
                title: "Explore",
                links: [
                  ["Menu", "#menu"],
                  ["About", "#about"],
                  ["Gallery", "#gallery"],
                  ["Contact", "#contact"],
                ],
              },
              {
                title: "Connect",
                links: [
                  ["Instagram", "#"],
                  ["Facebook", "#"],
                  ["TripAdvisor", "#"],
                  ["Reservations", "#contact"],
                ],
              },
            ].map((col, i) => (
              <div key={i}>
                <p
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 600,
                    fontSize: 9,
                    color: "#57534e",
                    marginBottom: 14,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                  }}
                >
                  {col.title}
                </p>
                {col.links.map(([link, href]) => (
                  <a
                    key={link}
                    href={href}
                    className="nlink"
                    style={{
                      display: "block",
                      marginBottom: 10,
                      fontSize: 12,
                      letterSpacing: "0.5px",
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div
            style={{
              borderTop: "1px solid rgba(120,53,15,0.15)",
              paddingTop: 20,
              display: "flex",
              justifyContent: "space-between",
              maxWidth: 1000,
              margin: "0 auto",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                color: "#292524",
                fontSize: 11,
                fontWeight: 300,
              }}
            >
              © 2026 BellaVista Restaurant. All rights reserved.
            </p>
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                color: "#292524",
                fontSize: 11,
                fontWeight: 300,
              }}
            >
              Made with love in Chittagong
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
