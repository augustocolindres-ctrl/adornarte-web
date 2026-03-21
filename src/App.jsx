// ⚠️ Archivo simplificado de ejemplo con mejoras móviles + escáner
// Integra esto sobre tu App.jsx original respetando tu lógica existente

import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const videoRef = useRef(null);

  // --- Simulación de carga ---
  useEffect(() => {
    setProducts([
      { id: 1, name: "Labial", price: 50, img: "https://via.placeholder.com/100" },
      { id: 2, name: "Perfume", price: 120, img: "https://via.placeholder.com/100" }
    ]);
  }, []);

  // --- Escáner básico (simulado cámara) ---
  useEffect(() => {
    if (showScanner && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        videoRef.current.srcObject = stream;
      });
    }
  }, [showScanner]);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-20 px-3 pt-safe">

      {/* HEADER */}
      <div className="sticky top-0 bg-white p-3 shadow z-10">
        <h1 className="text-lg font-bold">Inventario</h1>

        <input
          className="w-full mt-2 p-3 rounded-xl border"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* LISTA MOBILE */}
      <div className="mt-3 space-y-3">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl shadow p-3 flex items-center gap-3"
          >
            <img src={p.img} className="w-16 h-16 rounded-xl" />

            <div className="flex-1">
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-500">L {p.price}</div>
            </div>

            <button className="bg-blue-500 text-white px-3 py-2 rounded-xl">
              +
            </button>
          </div>
        ))}
      </div>

      {/* BOTÓN ESCÁNER */}
      <button
        onClick={() => setShowScanner(true)}
        className="fixed bottom-6 right-4 bg-black text-white px-4 py-3 rounded-full shadow-xl"
      >
        📷
      </button>

      {/* MODAL ESCÁNER */}
      {showScanner && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
          <video ref={videoRef} autoPlay className="w-full max-w-md rounded-xl" />

          <button
            onClick={() => setShowScanner(false)}
            className="mt-4 bg-white px-4 py-2 rounded-xl"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* NAVBAR INFERIOR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2">
        <button>🏠</button>
        <button>🧾</button>
        <button>➕</button>
        <button>⚙️</button>
      </div>
    </div>
  );
}
