import{r as a,S as x,C as m,u,j as e}from"./index-BoOl71Zh.js";function g(){const{album:t,albumId:l,selectedPhotos:s,onSelectAll:i,isAllSelected:c}=a.useContext(x),{setCart:d}=a.useContext(m),r=u(),o=()=>{d(s),r(`/shop/${l}/cart`)};return e.jsxs("aside",{className:"aside",children:[t&&e.jsx("h2",{children:t.name}),e.jsx("div",{id:"select",children:e.jsx("button",{onClick:i,children:c()?"- Alle abwählen":"+ Alle auswählen"})}),s.length>0&&e.jsxs("div",{id:"aside-photo",children:[e.jsx("p",{children:e.jsxs("span",{className:"number",children:[e.jsx("strong",{children:s.length})," ",e.jsxs("span",{className:"for-hidden",children:[s.length>1?"Dateien":"Datei"," ausgewählt"]})]})}),e.jsx("div",{className:"aside-img",children:s.map((n,h)=>e.jsx("img",{src:n.imageUrl,alt:n.name},h))}),e.jsx("p",{id:"next",children:e.jsx("button",{onClick:o,children:"Weiter"})})]})]})}export{g as default};
