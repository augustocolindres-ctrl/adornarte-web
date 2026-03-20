/* ── FULL INVOICE (A4/letter, for browser print) ── */
export function buildFacturaHTML(venta, clientes) {
  const cli = clientes.find(c=>c.id===venta.clienteId)||{nombre:venta.clienteNombre,telefono:'',direccion:''};
  const fechaFmt = new Date(venta.fecha+'T12:00:00').toLocaleDateString('es-HN',{year:'numeric',month:'long',day:'numeric'});
  const tipoBadge = venta.tipo==='credito'
    ?`<span style="background:#fef3c7;color:#d97706;border:1px solid #fcd34d;padding:2px 10px;border-radius:999px;font-size:11px;font-weight:700">CRÉDITO</span>`
    :`<span style="background:#d1fae5;color:#059669;border:1px solid #6ee7b7;padding:2px 10px;border-radius:999px;font-size:11px;font-weight:700">CONTADO</span>`;
  const rows = venta.items.map((it,i)=>`<tr>
    <td>${i+1}</td><td>${it.productoNombre}</td>
    <td style="text-align:center">${it.cantidad}</td>
    <td style="text-align:right">L ${it.precio.toLocaleString('es-HN',{minimumFractionDigits:2})}</td>
    ${it.descuento>0?`<td style="text-align:right;color:#d97706">-L ${it.descuento.toLocaleString('es-HN',{minimumFractionDigits:2})}</td>`:'<td style="text-align:center">—</td>'}
    <td style="text-align:right;font-weight:700">L ${it.subtotal.toLocaleString('es-HN',{minimumFractionDigits:2})}</td>
  </tr>`).join('');
  return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"/><title>Factura ${venta.folio}</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',sans-serif;background:#fff;color:#1e1230;padding:36px;max-width:720px;margin:0 auto}
.hdr{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #e8417a;padding-bottom:20px;margin-bottom:24px}
.brand{font-size:28px;font-weight:900;color:#e8417a;font-family:Georgia,serif}.tagline{font-size:9px;letter-spacing:3px;color:#9a6b7d;margin-top:3px}
.folio{font-size:22px;font-weight:800;text-align:right}.folio-sub{font-size:11px;color:#a394b4;margin-top:3px;text-align:right}
.info{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:22px}
.ib{background:#faf9fb;border:1px solid #ede8f0;border-radius:10px;padding:12px 14px}
.ib-lbl{font-size:10px;color:#a394b4;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
.ib-val{font-size:14px;font-weight:600}
table{width:100%;border-collapse:collapse;margin-bottom:20px;font-size:13px}
th{text-align:left;padding:8px 9px;background:#faf9fb;color:#a394b4;font-size:10px;font-weight:700;text-transform:uppercase;border-bottom:2px solid #ede8f0}
td{padding:8px 9px;border-bottom:1px solid #f0ebf5}
.tots{display:flex;flex-direction:column;align-items:flex-end;gap:4px;margin-bottom:20px}
.tot-row{display:flex;gap:44px;font-size:13px;color:#6b5c7a}
.tot-final{font-size:18px;font-weight:800;color:#e8417a;border-top:2px solid #fce7ef;padding-top:8px;margin-top:4px}
.pay-box{background:#faf9fb;border:1px solid #ede8f0;border-radius:10px;padding:12px 14px;margin-bottom:18px;font-size:13px}
.footer{text-align:center;margin-top:24px;padding-top:14px;border-top:1px solid #fce7ef;font-size:11px;color:#a394b4}
@media print{body{padding:16px}}</style></head><body>
<div class="hdr"><div><div class="brand">🌸 AdornArte</div><div class="tagline">RESALTA TU BELLEZA</div></div>
<div><div class="folio">${venta.folio}</div><div class="folio-sub">${fechaFmt}</div><div style="margin-top:6px;text-align:right">${tipoBadge}</div></div></div>
<div class="info">
  <div class="ib"><div class="ib-lbl">Cliente</div><div class="ib-val">${cli.nombre}</div>${cli.telefono?`<div style="font-size:12px;color:#6b5c7a;margin-top:3px">📞 ${cli.telefono}</div>`:''}${cli.direccion?`<div style="font-size:12px;color:#6b5c7a;margin-top:2px">📍 ${cli.direccion}</div>`:''}</div>
  <div class="ib"><div class="ib-lbl">Venta</div><div class="ib-val">${venta.fecha}</div><div style="font-size:12px;color:#6b5c7a;margin-top:4px">Tipo: ${venta.tipo==='credito'?'Crédito':'Contado'}</div><div style="font-size:12px;color:#6b5c7a;margin-top:2px">Cajero: ${venta.cajeroNombre||'—'}</div><div style="font-size:12px;color:#6b5c7a;margin-top:2px">Estado: ${venta.estado==='pagada'?'✅ Pagada':'⏳ Pendiente'}</div></div>
</div>
<table><thead><tr><th>#</th><th>Producto</th><th style="text-align:center">Cant.</th><th style="text-align:right">Precio</th><th style="text-align:right">Desc.</th><th style="text-align:right">Total</th></tr></thead><tbody>${rows}</tbody></table>
<div class="tots">
  ${venta.descuentoTotal>0?`<div class="tot-row"><span>Subtotal</span><span>L ${venta.subtotal.toLocaleString('es-HN',{minimumFractionDigits:2})}</span></div><div class="tot-row" style="color:#d97706"><span>Descuento</span><span>-L ${venta.descuentoTotal.toLocaleString('es-HN',{minimumFractionDigits:2})}</span></div>`:''}
  <div class="tot-row tot-final"><span>TOTAL</span><span>L ${venta.total.toLocaleString('es-HN',{minimumFractionDigits:2})}</span></div>
  ${venta.tipo==='credito'?`<div class="tot-row"><span>Abonado</span><span>L ${venta.abonado.toLocaleString('es-HN',{minimumFractionDigits:2})}</span></div><div class="tot-row" style="color:#d97706;font-weight:700"><span>Saldo</span><span>L ${venta.saldo.toLocaleString('es-HN',{minimumFractionDigits:2})}</span></div>`:''}
</div>
${venta.tipo==='contado'?`<div class="pay-box"><div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="color:#6b5c7a">Método de pago:</span><strong>${venta.metodoPago==='tarjeta'?'💳 Tarjeta':venta.metodoPago==='transferencia'?'🏦 Transferencia':'💵 Efectivo'}</strong></div>${venta.metodoPago==='efectivo'?`<div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="color:#6b5c7a">Recibido:</span><strong>L ${venta.recibido.toLocaleString('es-HN',{minimumFractionDigits:2})}</strong></div><div style="display:flex;justify-content:space-between"><span style="color:#6b5c7a">Cambio:</span><strong style="color:#059669;font-size:16px">L ${venta.cambio.toLocaleString('es-HN',{minimumFractionDigits:2})}</strong></div>`:''}</div>`:''}
<div class="footer">Gracias por tu compra 💕 · AdornArte – Resalta Tu Belleza · ${new Date().toLocaleString('es-HN')}</div>
</body></html>`;
}

/* ── THERMAL TICKET (80mm, ESC/POS via browser print with narrow CSS) ── */
export function buildTicketHTML(venta, clientes) {
  const cli = clientes.find(c=>c.id===venta.clienteId)||{nombre:venta.clienteNombre};
  const lines = venta.items.map(it=>`
    <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
      <span style="flex:1;overflow:hidden">${it.productoNombre}</span>
    </div>
    <div style="display:flex;justify-content:space-between;font-size:11px;padding-left:8px;margin-bottom:4px">
      <span>${it.cantidad} x L${it.precio.toLocaleString('es-HN',{minimumFractionDigits:2})}</span>
      <span style="font-weight:700">L${it.subtotal.toLocaleString('es-HN',{minimumFractionDigits:2})}</span>
    </div>`).join('');
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
<style>
  @page{margin:0;size:80mm auto}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Courier New',monospace;font-size:12px;width:80mm;padding:4mm 3mm}
  .center{text-align:center}.hr{border-top:1px dashed #000;margin:6px 0}
  .row{display:flex;justify-content:space-between;margin-bottom:2px}
  .brand{font-size:18px;font-weight:900;text-align:center}
  .big{font-size:20px;font-weight:900;text-align:right}
  .cambio{font-size:16px;font-weight:900}
  @media print{body{width:80mm}}
</style></head><body>
<div class="brand">*** AdornArte ***</div>
<div class="center" style="font-size:10px;margin-bottom:2px">RESALTA TU BELLEZA</div>
<div class="center" style="font-size:10px">Tegucigalpa, Honduras</div>
<div class="hr"></div>
<div class="row"><span>Folio:</span><span style="font-weight:700">${venta.folio}</span></div>
<div class="row"><span>Fecha:</span><span>${venta.fecha}</span></div>
<div class="row"><span>Cliente:</span><span>${cli.nombre}</span></div>
<div class="row"><span>Cajero:</span><span>${venta.cajeroNombre||'—'}</span></div>
<div class="hr"></div>
${lines}
<div class="hr"></div>
${venta.descuentoTotal>0?`<div class="row"><span>Subtotal:</span><span>L${venta.subtotal.toLocaleString('es-HN',{minimumFractionDigits:2})}</span></div><div class="row"><span>Descuento:</span><span>-L${venta.descuentoTotal.toLocaleString('es-HN',{minimumFractionDigits:2})}</span></div>`:''}
<div class="row"><span style="font-weight:900;font-size:14px">TOTAL:</span><span class="big">L${venta.total.toLocaleString('es-HN',{minimumFractionDigits:2})}</span></div>
${venta.tipo==='contado'&&venta.metodoPago==='efectivo'?`
<div class="hr"></div>
<div class="row"><span>Efectivo:</span><span>L${venta.recibido.toLocaleString('es-HN',{minimumFractionDigits:2})}</span></div>
<div class="row"><span class="cambio">CAMBIO:</span><span class="cambio">L${venta.cambio.toLocaleString('es-HN',{minimumFractionDigits:2})}</span></div>`:''}
${venta.tipo==='credito'?`<div class="hr"></div><div class="row"><span>SALDO PENDIENTE:</span><span style="font-weight:900">L${venta.saldo.toLocaleString('es-HN',{minimumFractionDigits:2})}</span></div>`:''}
<div class="hr"></div>
<div class="center" style="font-size:11px">Gracias por su compra!</div>
<div class="center" style="font-size:10px">*** ${new Date().toLocaleTimeString('es-HN')} ***</div>
</body></html>`;
}

export function printFactura(venta, clientes, thermal=false) {
  const pw = window.open('','_blank');
  if(!pw){ alert('Activa las ventanas emergentes'); return; }
  pw.document.write(thermal ? buildTicketHTML(venta,clientes) : buildFacturaHTML(venta,clientes));
  pw.document.close(); pw.focus(); pw.print();
}
