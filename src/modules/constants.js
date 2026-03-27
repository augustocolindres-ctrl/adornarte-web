/* ─── ROLES ──────────────────────────────────────────────── */
export const ROLES = {
  admin:      { label:'Administrador', color:'#7c3aed', bg:'#ede9fe' },
  supervisor: { label:'Supervisor',    color:'#2563eb', bg:'#dbeafe' },
  cajero:     { label:'Cajero',        color:'#059669', bg:'#d1fae5' },
};

/* Permisos por rol */
export const PERMS = {
  admin:      ['dashboard','inventario','movimientos','ingreso','ventas','cotizaciones','devoluciones','creditos','gastos','reportes','clientes','corte','caja','usuarios','config','proveedores','ordenesCompra','apartados','conteoFisico','recordatorios','campanas'],
  supervisor: ['dashboard','inventario','movimientos','ingreso','ventas','cotizaciones','devoluciones','creditos','gastos','reportes','clientes','corte','caja','apartados','conteoFisico','recordatorios','campanas'],
  cajero:     ['dashboard','caja','ventas','cotizaciones','creditos','clientes','apartados','recordatorios'],
};

export const hasPerm = (user, perm) => {
  if(!user) return false;
  return (PERMS[user.rol]||[]).includes(perm);
};

/* ─── TABS ──────────────────────────────────────────────── */
export const TABS = [
  { id:'Caja',          icon:'🖥️', label:'Caja / POS',    perm:'caja'          },
  { id:'Dashboard',     icon:'▦',  label:'Dashboard',     perm:'dashboard'     },
  { id:'Inventario',    icon:'📦', label:'Inventario',    perm:'inventario'    },
  { id:'Movimientos',   icon:'🔄', label:'Movimientos',   perm:'movimientos'   },
  { id:'Ventas',        icon:'🛍️', label:'Ventas',        perm:'ventas'        },
  { id:'Cotizaciones',  icon:'📋', label:'Cotizaciones',  perm:'cotizaciones'  },
  { id:'Devoluciones',  icon:'↩️', label:'Devoluciones',  perm:'devoluciones'  },
  { id:'Creditos',      icon:'💳', label:'Créditos',      perm:'creditos'      },
  { id:'Gastos',        icon:'💸', label:'Gastos',        perm:'gastos'        },
  { id:'Proveedores',   icon:'🏭', label:'Proveedores',   perm:'proveedores'   },
  { id:'Reportes',      icon:'📊', label:'Reportes',      perm:'reportes'      },
  { id:'Clientes',      icon:'👥', label:'Clientes',      perm:'clientes'      },
  { id:'Corte',         icon:'🧾', label:'Corte Diario',  perm:'corte'         },
  { id:'Configuracion', icon:'⚙️', label:'Configuración', perm:'config'        },
  { id:'OrdenesCompra', icon:'🛒', label:'Órd. Compra',   perm:'ordenesCompra' },
  { id:'Apartados',     icon:'🔒', label:'Apartados',     perm:'apartados'     },
  { id:'ConteoFisico',  icon:'📦', label:'Conteo Físico', perm:'conteoFisico'  },
  { id:'Recordatorios', icon:'📅', label:'Recordatorios', perm:'recordatorios' },
  { id:'Campanas',      icon:'📣', label:'Campañas',      perm:'campanas'      },
];

/* ─── PALETTE ────────────────────────────────────────────── */
export const C = {
  bg:'#f5f4f7', sidebar:'#ffffff', card:'#ffffff', cardBorder:'#ede8f0', header:'#ffffff',
  pink:'#e8417a', pinkLight:'#fce7ef', pinkMid:'#f472b6', pinkText:'#be185d',
  green:'#059669', greenLight:'#d1fae5', greenBorder:'#6ee7b7',
  amber:'#d97706', amberLight:'#fef3c7', amberBorder:'#fcd34d',
  red:'#dc2626',   redLight:'#fee2e2',   redBorder:'#fca5a5',
  purple:'#7c3aed',purpleLight:'#ede9fe',purpleBorder:'#c4b5fd',
  blue:'#2563eb',  blueLight:'#dbeafe',  blueBorder:'#93c5fd',
  teal:'#0d9488',  tealLight:'#ccfbf1',  tealBorder:'#5eead4',
  orange:'#ea580c',orangeLight:'#ffedd5',orangeBorder:'#fdba74',
  slate:'#475569', slateLight:'#f1f5f9',
  text:'#1e1230', textMid:'#6b5c7a', textLight:'#a394b4',
  border:'#ede8f0', white:'#ffffff',
  shadow:'0 1px 3px rgba(120,80,140,0.08),0 4px 16px rgba(120,80,140,0.06)',
  shadowMd:'0 4px 24px rgba(120,80,140,0.13)',
};

/* ─── STYLES ─────────────────────────────────────────────── */
export const S = {
  page:      {display:'flex',minHeight:'100vh',background:C.bg,fontFamily:"'Inter','Segoe UI',sans-serif",color:C.text},
  sidebar:   {width:224,background:C.sidebar,borderRight:`1px solid ${C.border}`,display:'flex',flexDirection:'column',position:'fixed',top:0,left:0,height:'100vh',zIndex:30,boxShadow:'2px 0 12px rgba(120,80,140,0.06)'},
  main:      {marginLeft:224,flex:1,display:'flex',flexDirection:'column',minHeight:'100vh'},
  topbar:    {background:C.header,borderBottom:`1px solid ${C.border}`,padding:'14px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:20,boxShadow:'0 1px 4px rgba(120,80,140,0.06)'},
  content:   {padding:'26px 30px',flex:1},
  card:      {background:C.card,border:`1px solid ${C.cardBorder}`,borderRadius:16,boxShadow:C.shadow,overflow:'hidden'},
  table:     {width:'100%',borderCollapse:'collapse',fontSize:13.5},
  th:        {textAlign:'left',padding:'11px 15px',fontSize:10.5,color:C.textLight,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.07em',borderBottom:`1px solid ${C.border}`,background:'#faf9fb'},
  td:        {padding:'11px 15px',borderBottom:`1px solid ${C.border}`,verticalAlign:'middle',color:C.text},
  overlay:   {position:'fixed',inset:0,background:'rgba(30,18,48,0.55)',backdropFilter:'blur(4px)',zIndex:50,display:'flex',alignItems:'center',justifyContent:'center',padding:16},
  modal:     {background:C.white,border:`1px solid ${C.border}`,borderRadius:20,padding:28,width:'100%',maxWidth:520,boxShadow:C.shadowMd,maxHeight:'93vh',overflowY:'auto'},
  modalWide: {background:C.white,border:`1px solid ${C.border}`,borderRadius:20,padding:28,width:'100%',maxWidth:820,boxShadow:C.shadowMd,maxHeight:'93vh',overflowY:'auto'},
  modalXl:   {background:C.white,border:`1px solid ${C.border}`,borderRadius:20,padding:28,width:'100%',maxWidth:1100,boxShadow:C.shadowMd,maxHeight:'96vh',overflowY:'auto'},
  input:     {width:'100%',background:'#faf9fb',border:`1.5px solid ${C.border}`,borderRadius:10,padding:'10px 14px',color:C.text,fontSize:14,outline:'none',boxSizing:'border-box',fontFamily:'inherit'},
  inputErr:  {width:'100%',background:'#fff5f5',border:`2px solid ${C.red}`,borderRadius:10,padding:'10px 14px',color:C.text,fontSize:14,outline:'none',boxSizing:'border-box',fontFamily:'inherit'},
  label:     {display:'block',fontSize:12,color:C.textMid,marginBottom:5,fontWeight:600},
  labelErr:  {display:'block',fontSize:12,color:C.red,marginBottom:5,fontWeight:700},
  btn:       {background:C.pink,color:'#fff',border:'none',borderRadius:10,padding:'10px 20px',fontWeight:700,fontSize:13,cursor:'pointer',boxShadow:'0 2px 8px rgba(232,65,122,0.25)',whiteSpace:'nowrap'},
  btnSm:     {background:C.pinkLight,color:C.pink,border:'none',borderRadius:8,padding:'6px 13px',fontWeight:600,fontSize:12,cursor:'pointer'},
  btnGreen:  {background:C.green,color:'#fff',border:'none',borderRadius:10,padding:'10px 20px',fontWeight:700,fontSize:13,cursor:'pointer',whiteSpace:'nowrap'},
  btnBlue:   {background:C.blue,color:'#fff',border:'none',borderRadius:10,padding:'10px 20px',fontWeight:700,fontSize:13,cursor:'pointer',whiteSpace:'nowrap'},
  btnPurple: {background:C.purple,color:'#fff',border:'none',borderRadius:10,padding:'10px 20px',fontWeight:700,fontSize:13,cursor:'pointer',whiteSpace:'nowrap'},
  btnOutline:{background:'transparent',color:C.pink,border:`1.5px solid ${C.pink}`,borderRadius:10,padding:'9px 18px',fontWeight:600,fontSize:13,cursor:'pointer'},
  btnFull:   {width:'100%',background:C.pink,color:'#fff',border:'none',borderRadius:12,padding:'12px',fontWeight:700,fontSize:14,cursor:'pointer',marginTop:10,boxShadow:'0 2px 10px rgba(232,65,122,0.25)'},
  btnDanger: {background:C.redLight,color:C.red,border:`1px solid ${C.redBorder}`,borderRadius:10,padding:'7px 14px',fontWeight:600,fontSize:12,cursor:'pointer'},
  searchBar: {width:'100%',background:C.white,border:`1.5px solid ${C.border}`,borderRadius:12,padding:'10px 16px 10px 40px',color:C.text,fontSize:14,outline:'none',marginBottom:16,boxSizing:'border-box',fontFamily:'inherit'},
};

/* ─── HELPERS ────────────────────────────────────────────── */
export const fmt    = n => `L ${Number(n).toLocaleString('es-HN',{minimumFractionDigits:2})}`;
export const today  = () => new Date().toISOString().split('T')[0];
export const uid    = () => Date.now() + Math.floor(Math.random()*9999);
export const fmtPct = n => `${Number(n).toFixed(1)}%`;

/* ─── STORAGE ────────────────────────────────────────────── */
export const KEYS = {
  products:'aa_products',    clientes:'aa_clientes',      ventas:'aa_ventas',
  movimientos:'aa_movimientos', abonos:'aa_abonos',
  gastos:'aa_gastos',        catGastos:'aa_catgastos',    folio:'aa_folio',
  users:'aa_users',          proveedores:'aa_proveedores', arqueos:'aa_arqueos',
  cortesGuardados:'aa_cortes',
  cotizaciones:'aa_cotizaciones', cotFolio:'aa_cotfolio', devoluciones:'aa_devoluciones',
  precioHistorial:'aa_precio_hist',
  config:'aa_config',        darkMode:'aa_dark',
  ordenesCompra:'aa_ordenes',
  notificaciones:'aa_notifs',
  apartados:'aa_apartados',  recordatorios:'aa_recordatorios',
  conteoFisico:'aa_conteos', aperturasC:'aa_aperturas',
  respaldoMeta:'aa_backup_meta', cuentasPagar:'aa_cuentas_pagar',
};
export const lstore  = (k,fb) => { try{ const v=localStorage.getItem(k); return v?JSON.parse(v):fb; }catch{return fb;} };
export const sstore  = (k,v)  => { try{ localStorage.setItem(k,JSON.stringify(v)); }catch{} };

/* ─── SEED DATA ──────────────────────────────────────────── */
export const IP = [
  {id:1,nombre:'Aretes Dorados',   categoria:'Aretes',    stock:50,precio:180,costo:80, codigoBarras:'7501234560001',foto:'',stockMinimo:10,proveedorId:1,descuento:0},
  {id:2,nombre:'Collar de Perlas', categoria:'Collares',  stock:20,precio:350,costo:140,codigoBarras:'7501234560002',foto:'',stockMinimo:5, proveedorId:1,descuento:0},
  {id:3,nombre:'Pulsera Tejida',   categoria:'Pulseras',  stock:35,precio:120,costo:45, codigoBarras:'7501234560003',foto:'',stockMinimo:8, proveedorId:2,descuento:0},
  {id:4,nombre:'Sombrero Elegante',categoria:'Accesorios',stock:8, precio:450,costo:180,codigoBarras:'7501234560004',foto:'',stockMinimo:3, proveedorId:2,descuento:0},
];
export const IC = [
  {id:1,nombre:'María González',email:'maria@email.com',  telefono:'9999-0001',direccion:'Col. Kennedy',   compras:3},
  {id:2,nombre:'Carlos Mejía',  email:'carlos@email.com', telefono:'9999-0002',direccion:'Col. Palmira',   compras:1},
];
export const IV = [
  {id:1,folio:'F-0001',fecha:'2026-03-01',tipo:'contado',estado:'pagada',  cajeroId:1,cajeroNombre:'admin',clienteId:1,clienteNombre:'María González',items:[{productoId:1,productoNombre:'Aretes Dorados',  cantidad:2,precio:180,costo:80, descuento:0,subtotal:360}],subtotal:360,descuentoTotal:0,total:360,totalCosto:160,metodoPago:'efectivo',recibido:360,cambio:0,abonado:360,saldo:0},
  {id:2,folio:'F-0002',fecha:'2026-03-03',tipo:'credito',estado:'pendiente',cajeroId:1,cajeroNombre:'admin',clienteId:2,clienteNombre:'Carlos Mejía',  items:[{productoId:3,productoNombre:'Pulsera Tejida',  cantidad:3,precio:120,costo:45, descuento:0,subtotal:360}],subtotal:360,descuentoTotal:0,total:360,totalCosto:135,metodoPago:'credito',  recibido:0,  cambio:0,abonado:100,saldo:260},
  {id:3,folio:'F-0003',fecha:'2026-03-04',tipo:'contado',estado:'pagada',  cajeroId:1,cajeroNombre:'admin',clienteId:1,clienteNombre:'María González',items:[{productoId:2,productoNombre:'Collar de Perlas',cantidad:1,precio:350,costo:140,descuento:0,subtotal:350}],subtotal:350,descuentoTotal:0,total:350,totalCosto:140,metodoPago:'efectivo',recibido:400,cambio:50, abonado:350,saldo:0},
];
export const IA = [
  {id:1,ventaId:2,folio:'F-0002',clienteId:2,clienteNombre:'Carlos Mejía',monto:100,fecha:'2026-03-05',nota:'Abono inicial'},
];
export const ICG = [
  {id:1,nombre:'Proveedor'},{id:2,nombre:'Transporte'},{id:3,nombre:'Servicios'},{id:4,nombre:'Otros'},
];
export const IPROV = [
  {id:1,nombre:'Joyería Mayorista HN',telefono:'2222-0001',email:'ventas@joyeria.hn',  contacto:'Pedro López'},
  {id:2,nombre:'Accesorios del Sur',   telefono:'2222-0002',email:'ventas@accdelsur.hn',contacto:'Ana Reyes'},
];
/* Default users (admin full, cajero demo) */
export const DEFAULT_USERS = [
  {id:1,nombre:'Administrador',   usuario:'admin',   clave:'admin123',  rol:'admin',      activo:true, createdAt:'2026-01-01'},
  {id:2,nombre:'Cajero Principal',usuario:'cajero1', clave:'caja123',   rol:'cajero',     activo:true, createdAt:'2026-01-01'},
  {id:3,nombre:'Supervisor',      usuario:'super1',  clave:'super123',  rol:'supervisor', activo:true, createdAt:'2026-01-01'},
];
