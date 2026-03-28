import React, { useEffect, useMemo, useState } from "react";
import "./index.css";

// 🔥 CONFIG
const WHATSAPP_NUMERO = "50400000000";

export default function App() {
  const [ruta, setRuta] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setRuta(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  if (ruta === "/catalogo") return <Catalogo />;

  return (
    <div style={{ padding: 20 }}>
      <h2>AdornArte Sistema</h2>
      <button onClick={() => {
        window.history.pushState({}, "", "/catalogo");
        setRuta("/catalogo");
      }}>
        Ir a catálogo
      </button>
    </div>
  );
}

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(data);
  }, []);

  const categorias = ["Todos", ...new Set(productos.map(p => p.categoria || "General"))];

  const filtrados = useMemo(() => {
    return productos.filter(p => {
      const matchBusqueda = p.nombre?.toLowerCase().includes(busqueda.toLowerCase());
      const matchCategoria = categoria === "Todos" || (p.categoria || "General") === categoria;
      return matchBusqueda && matchCategoria;
    });
  }, [productos, busqueda, categoria]);

  const agregarCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(p => p.id === producto.id);
      if (existe) {
        return prev.map(p =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const total = carrito.reduce((acc, p) => acc + (p.precio || 0) * p.cantidad, 0);

  const enviarWhatsApp = () => {
    const mensaje = carrito.map(p =>
      `${p.nombre} x${p.cantidad} - L ${p.precio * p.cantidad}`
    ).join("%0A");

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=Hola,%20quiero:%0A${mensaje}%0ATotal:%20L%20${total}`;
    window.open(url, "_blank");
  };

  return (
    <div style={{ padding: 10 }}>
      <div style={{
        background: "#ff4d8d",
        color: "#fff",
        padding: 15,
        borderRadius: 10,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20
      }}>
        💖 AdornArte Catálogo
      </div>

      <input
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginTop: 10,
          borderRadius: 10,
          border: "1px solid #ccc"
        }}
      />

      <div style={{ display: "flex", overflowX: "auto", marginTop: 10 }}>
        {categorias.map(cat => (
          <button key={cat} onClick={() => setCategoria(cat)} style={{
            marginRight: 5,
            padding: "5px 10px",
            borderRadius: 10,
            border: "none",
            background: categoria === cat ? "#ff4d8d" : "#eee",
            color: categoria === cat ? "#fff" : "#000"
          }}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px,1fr))",
        gap: 10,
        marginTop: 10
      }}>
        {filtrados.map(p => (
          <div key={p.id} style={{
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: 10,
            background: "#fff"
          }}>
            <img
              src={p.imagen || "https://via.placeholder.com/150"}
              alt=""
              style={{ width: "100%", borderRadius: 10 }}
            />
            <h4>{p.nombre}</h4>
            <p style={{ color: "#ff4d8d", fontWeight: "bold" }}>
              L {p.precio}
            </p>

            <button onClick={() => agregarCarrito(p)} style={{
              width: "100%",
              background: "#ff4d8d",
              color: "#fff",
              border: "none",
              padding: 8,
              borderRadius: 10
            }}>
              Agregar 💖
            </button>
          </div>
        ))}
      </div>

      {carrito.length > 0 && (
        <div style={{
          position: "fixed",
          bottom: 10,
          left: 10,
          right: 10,
          background: "#fff",
          borderRadius: 15,
          padding: 10,
          boxShadow: "0 0 10px rgba(0,0,0,0.2)"
        }}>
          <div>Total: L {total}</div>
          <button onClick={enviarWhatsApp} style={{
            width: "100%",
            background: "green",
            color: "#fff",
            border: "none",
            padding: 10,
            borderRadius: 10
          }}>
            Pedir por WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
