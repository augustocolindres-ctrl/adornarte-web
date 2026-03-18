import React from 'react';
import { C, S, fmt } from './constants';

export const Badge = ({text,color,bg,border})=>(
  <span style={{fontSize:11,padding:'3px 10px',borderRadius:999,fontWeight:700,background:bg,color,border:`1px solid ${border||bg}`,display:'inline-block',whiteSpace:'nowrap'}}>{text}</span>
);

export const Field = ({label,err,children,...props})=>(
  <div style={{marginBottom:13}}>
    <label style={err?S.labelErr:S.label}>{err?<>⚠ {label} <span style={{color:C.red,fontSize:13}}>*</span></>:label}</label>
    {children
      ?<div style={{border:`1.5px solid ${err?C.red:C.border}`,borderRadius:10,background:err?'#fff5f5':'#faf9fb',overflow:'hidden'}}>{children}</div>
      :<input {...props} style={err?S.inputErr:S.input}/>}
  </div>
);

export const SelField = ({label,err,children,...props})=>(
  <div style={{marginBottom:13}}>
    <label style={err?S.labelErr:S.label}>{err?<>⚠ {label} <span style={{color:C.red}}>*</span></>:label}</label>
    <select {...props} style={err?{...S.inputErr,cursor:'pointer'}:{...S.input,cursor:'pointer'}}>{children}</select>
  </div>
);

export const Modal = ({title,onClose,children,wide,xl})=>(
  <div style={S.overlay} onClick={e=>e.target===e.currentTarget&&onClose()}>
    <div style={xl?S.modalXl:wide?S.modalWide:S.modal}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
        <h3 style={{fontWeight:800,fontSize:17,color:C.text}}>{title}</h3>
        <button onClick={onClose} style={{background:C.bg,border:'none',color:C.textMid,fontSize:18,cursor:'pointer',width:32,height:32,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
      </div>
      {children}
    </div>
  </div>
);

export const IconBtn = ({icon,onClick,title,color,bg,disabled})=>(
  <button title={title} onClick={onClick} disabled={!!disabled} style={{background:bg||C.pinkLight,border:'none',color:color||C.pink,borderRadius:8,width:30,height:30,cursor:disabled?'not-allowed':'pointer',fontSize:13,display:'inline-flex',alignItems:'center',justifyContent:'center',marginLeft:4,flexShrink:0,opacity:disabled?0.4:1}}>{icon}</button>
);

export const StatCard = ({icon,value,label,bg,warn,sub})=>(
  <div style={{background:C.card,border:`1px solid ${warn?C.redBorder:C.cardBorder}`,borderRadius:16,padding:'17px 19px',boxShadow:C.shadow,display:'flex',alignItems:'flex-start',gap:12}}>
    <div style={{width:42,height:42,borderRadius:11,background:bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:19,flexShrink:0}}>{icon}</div>
    <div style={{minWidth:0}}>
      <div style={{fontSize:19,fontWeight:800,color:warn?C.red:C.text,lineHeight:1.2}}>{value}</div>
      <div style={{fontSize:11,color:C.textLight,marginTop:2,fontWeight:500}}>{label}</div>
      {sub&&<div style={{fontSize:11,color:C.textMid,marginTop:1}}>{sub}</div>}
    </div>
  </div>
);

export const SectionHeader = ({title,sub,action})=>(
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
    <div><p style={{fontWeight:700,fontSize:16,color:C.text}}>{title}</p>{sub&&<p style={{color:C.textMid,fontSize:12,marginTop:2}}>{sub}</p>}</div>
    {action}
  </div>
);

export const InfoBox = ({label,value,color,bg})=>(
  <div style={{background:bg||'#faf9fb',borderRadius:10,padding:'9px 13px',border:`1px solid ${C.border}`}}>
    <div style={{fontSize:9,color:C.textLight,fontWeight:700,textTransform:'uppercase',letterSpacing:'1px',marginBottom:2}}>{label}</div>
    <div style={{fontWeight:700,fontSize:13,color:color||C.text}}>{value}</div>
  </div>
);

/* Mini bar chart (horizontal) */
export const MiniBar = ({items, max})=>{
  const m = max || Math.max(...items.map(i=>i.value),1);
  return(
    <div style={{display:'flex',flexDirection:'column',gap:6}}>
      {items.map((it,i)=>(
        <div key={i} style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{fontSize:11,color:C.textMid,width:110,flexShrink:0,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{it.label}</div>
          <div style={{flex:1,background:C.border,borderRadius:999,height:10,overflow:'hidden'}}>
            <div style={{width:`${(it.value/m)*100}%`,height:'100%',background:it.color||C.pink,borderRadius:999,transition:'width 0.4s'}}/>
          </div>
          <div style={{fontSize:11,fontWeight:700,color:C.text,width:72,textAlign:'right',flexShrink:0}}>{fmt(it.value)}</div>
        </div>
      ))}
    </div>
  );
};
