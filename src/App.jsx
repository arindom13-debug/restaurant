function App() {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
        backgroundColor: "#0c0a09",
        color: "white",
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 64px",
          borderBottom: "1px solid #292524",
          position: "sticky",
          top: 0,
          zIndex: 100,
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(12, 10, 9, 0.85)",
        }}
      >
        <a
          href="#"
          style={{
            fontSize: "22px",
            fontWeight: "800",
            letterSpacing: "-0.5px",
            textDecoration: "none",
            color: "white",
          }}
        >
          Bella<span style={{ color: "#f97316" }}>Vista</span>
        </a>
        <div style={{ display: "flex", gap: "32px" }}>
          <a
            href="#menu"
            style={{
              color: "#a8a29e",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Menu
          </a>
          <a
            href="#about"
            style={{
              color: "#a8a29e",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            About
          </a>
          <a
            href="#contact"
            style={{
              color: "#a8a29e",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Contact
          </a>
        </div>
        <a
          href="#contact"
          style={{
            backgroundColor: "#f97316",
            color: "white",
            padding: "10px 24px",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          Reserve a table
        </a>
      </nav>

      {/* Hero */}
      <section
        style={{
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
          background:
            "radial-gradient(ellipse at center, rgba(249, 115, 22, 0.08) 0%, transparent 70%)",
        }}
      >
        <div style={{ maxWidth: "700px" }}>
          <p
            style={{
              color: "#f97316",
              fontSize: "13px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "20px",
              fontWeight: "500",
            }}
          >
            Fine Dining · Chittagong
          </p>
          <h1
            style={{
              fontSize: "68px",
              fontWeight: "800",
              lineHeight: "1.05",
              margin: "0 0 24px 0",
              letterSpacing: "-2px",
            }}
          >
            Where every meal
            <br />
            <span style={{ color: "#f97316" }}>tells a story.</span>
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#a8a29e",
              lineHeight: "1.8",
              margin: "0 auto 40px",
              maxWidth: "520px",
            }}
          >
            Experience the finest flavours of Italian and Mediterranean cuisine
            in the heart of the city.
          </p>
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#contact"
              style={{
                backgroundColor: "#f97316",
                color: "white",
                padding: "14px 36px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "16px",
              }}
            >
              Reserve a table
            </a>
            <a
              href="#menu"
              style={{
                border: "1px solid #44403c",
                color: "#d6d3d1",
                padding: "14px 36px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              View menu
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        style={{
          padding: "40px 64px",
          borderTop: "1px solid #292524",
          borderBottom: "1px solid #292524",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "24px",
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {[
            { number: "12+", label: "Years of Excellence" },
            { number: "80+", label: "Menu Items" },
            { number: "4.9★", label: "Average Rating" },
            { number: "500+", label: "Happy Guests/Week" },
          ].map((stat, i) => (
            <div key={i}>
              <p
                style={{
                  fontSize: "36px",
                  fontWeight: "800",
                  color: "#f97316",
                  margin: "0 0 4px 0",
                }}
              >
                {stat.number}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#78716c",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section
        id="menu"
        style={{ padding: "80px 64px", borderTop: "1px solid #292524" }}
      >
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p
            style={{
              color: "#f97316",
              fontSize: "13px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Our Menu
          </p>
          <h2
            style={{
              fontSize: "42px",
              fontWeight: "800",
              margin: "0 0 16px 0",
              letterSpacing: "-1px",
            }}
          >
            Crafted with passion
          </h2>
          <p style={{ color: "#a8a29e", fontSize: "16px" }}>
            Fresh ingredients, authentic recipes, unforgettable flavours.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {[
            {
              category: "Starters",
              emoji: "🥗",
              items: [
                {
                  name: "Bruschetta al Pomodoro",
                  desc: "Toasted bread, fresh tomatoes, basil, garlic",
                  price: "$12",
                  img: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&q=80",
                },
                {
                  name: "Burrata & Prosciutto",
                  desc: "Creamy burrata, aged prosciutto, fig jam",
                  price: "$18",
                  img: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&q=80",
                },
                {
                  name: "Calamari Fritti",
                  desc: "Crispy fried calamari, lemon aioli",
                  price: "$15",
                  img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80",
                },
              ],
            },
            {
              category: "Mains",
              emoji: "🍝",
              items: [
                {
                  name: "Spaghetti Carbonara",
                  desc: "Guanciale, egg yolk, pecorino romano",
                  price: "$24",
                  img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80",
                },
                {
                  name: "Grilled Sea Bass",
                  desc: "Mediterranean herbs, lemon butter, capers",
                  price: "$32",
                  img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80",
                },
                {
                  name: "Osso Buco Milanese",
                  desc: "Braised veal, gremolata, saffron risotto",
                  price: "$38",
                  img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
                },
              ],
            },
            {
              category: "Desserts",
              emoji: "🍮",
              items: [
                {
                  name: "Tiramisu Classico",
                  desc: "Mascarpone, espresso, ladyfingers",
                  price: "$10",
                  img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80",
                },
                {
                  name: "Panna Cotta",
                  desc: "Vanilla bean, mixed berry coulis",
                  price: "$9",
                  img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80",
                },
                {
                  name: "Cannoli Siciliani",
                  desc: "Crispy shells, ricotta, pistachios",
                  price: "$11",
                  img: "https://images.unsplash.com/photo-1559622214-f8a9850965bb?w=400&q=80",
                },
              ],
            },
          ].map((section, si) => (
            <div
              key={si}
              style={{
                backgroundColor: "#1c1917",
                border: "1px solid #292524",
                borderRadius: "16px",
                padding: "28px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "24px",
                }}
              >
                <span style={{ fontSize: "24px" }}>{section.emoji}</span>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    margin: 0,
                    color: "#f97316",
                  }}
                >
                  {section.category}
                </h3>
              </div>
              {section.items.map((item, ii) => (
                <div
                  key={ii}
                  style={{
                    display: "flex",
                    gap: "14px",
                    alignItems: "center",
                    padding: "14px 0",
                    borderBottom:
                      ii < section.items.length - 1
                        ? "1px solid #292524"
                        : "none",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "10px",
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontWeight: "600",
                        fontSize: "15px",
                        margin: "0 0 4px 0",
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      style={{ color: "#78716c", fontSize: "13px", margin: 0 }}
                    >
                      {item.desc}
                    </p>
                  </div>
                  <p
                    style={{
                      color: "#f97316",
                      fontWeight: "700",
                      fontSize: "15px",
                      margin: "0",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.price}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        style={{ padding: "80px 64px", borderTop: "1px solid #292524" }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "64px",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                color: "#f97316",
                fontSize: "13px",
                letterSpacing: "4px",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Our Story
            </p>
            <h2
              style={{
                fontSize: "42px",
                fontWeight: "800",
                margin: "0 0 24px 0",
                letterSpacing: "-1px",
                lineHeight: "1.1",
              }}
            >
              A family tradition since 2012
            </h2>
            <p
              style={{
                color: "#a8a29e",
                fontSize: "16px",
                lineHeight: "1.8",
                marginBottom: "16px",
              }}
            >
              BellaVista was born from a simple dream — to bring the authentic
              flavours of the Italian coast to Chittagong. Founded by Chef Marco
              Rossi and his wife Sofia, our restaurant has been a labour of love
              for over a decade.
            </p>
            <p
              style={{ color: "#a8a29e", fontSize: "16px", lineHeight: "1.8" }}
            >
              Every dish is prepared using traditional recipes passed down
              through generations, combined with the finest locally sourced
              ingredients.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            {[
              {
                emoji: "👨‍🍳",
                title: "Expert Chefs",
                desc: "Trained in Italy with 15+ years experience",
              },
              {
                emoji: "🌿",
                title: "Fresh Daily",
                desc: "Ingredients sourced fresh every morning",
              },
              {
                emoji: "🍷",
                title: "Fine Wines",
                desc: "Curated selection of Italian wines",
              },
              {
                emoji: "✨",
                title: "Fine Dining",
                desc: "Elegant atmosphere for every occasion",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#1c1917",
                  border: "1px solid #292524",
                  borderRadius: "12px",
                  padding: "20px",
                }}
              >
                <span style={{ fontSize: "28px" }}>{item.emoji}</span>
                <p
                  style={{
                    fontWeight: "700",
                    fontSize: "14px",
                    margin: "10px 0 4px 0",
                  }}
                >
                  {item.title}
                </p>
                <p style={{ color: "#78716c", fontSize: "12px", margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        style={{
          padding: "80px 64px",
          borderTop: "1px solid #292524",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "#f97316",
            fontSize: "13px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Reservations
        </p>
        <h2
          style={{
            fontSize: "42px",
            fontWeight: "800",
            margin: "0 0 16px 0",
            letterSpacing: "-1px",
          }}
        >
          Book your table
        </h2>
        <p style={{ color: "#a8a29e", fontSize: "16px", marginBottom: "48px" }}>
          We look forward to welcoming you. Call us or send a message.
        </p>
        <div
          style={{
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "48px",
          }}
        >
          {[
            {
              emoji: "📞",
              title: "Call us",
              value: "+880 1234 567890",
              color: "#f97316",
            },
            {
              emoji: "🕐",
              title: "Opening Hours",
              value: "Mon–Sun: 12pm – 11pm",
              color: "#a8a29e",
            },
            {
              emoji: "📍",
              title: "Location",
              value: "123 GEC Circle, Chittagong",
              color: "#a8a29e",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#1c1917",
                border: "1px solid #292524",
                borderRadius: "12px",
                padding: "24px 32px",
                minWidth: "200px",
              }}
            >
              <p style={{ fontSize: "24px", margin: "0 0 8px 0" }}>
                {item.emoji}
              </p>
              <p style={{ fontWeight: "600", margin: "0 0 4px 0" }}>
                {item.title}
              </p>
              <p style={{ color: item.color, margin: 0, fontWeight: "600" }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
        <a
          href="tel:+8801234567890"
          style={{
            backgroundColor: "#f97316",
            color: "white",
            padding: "14px 40px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "700",
            fontSize: "16px",
          }}
        >
          Call to reserve now
        </a>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid #292524",
          padding: "24px 64px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ fontSize: "18px", fontWeight: "800" }}>
          Bella<span style={{ color: "#f97316" }}>Vista</span>
        </div>
        <p style={{ color: "#78716c", fontSize: "13px", margin: 0 }}>
          © 2026 BellaVista Restaurant. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "20px" }}>
          {["Instagram", "Facebook", "TripAdvisor"].map((s, i) => (
            <a
              key={i}
              href="#"
              style={{
                color: "#78716c",
                textDecoration: "none",
                fontSize: "13px",
              }}
            >
              {s}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default App;
