import { PRODUCTS } from '../data';

export function downloadCatalogHTML(division: 'embutidos' | 'quesos' | 'all', language: 'ES' | 'EN') {
  // Filter products by division
  const filteredProducts = division === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.division === division);

  const title = language === 'ES' 
    ? `Catálogo Oficial y Ficha Técnica — ${division === 'embutidos' ? 'Embutidos Gourmet' : division === 'quesos' ? 'Quesos Seleccionados' : 'Línea de Alimentos'}`
    : `Official Catalog & Technical Specs — ${division === 'embutidos' ? 'Gourmet Cured Meats' : division === 'quesos' ? 'Selected Cheeses' : 'Food Line'}`;

  const langText = {
    ES: {
      brand: "INDUSTRIAS GUSTOSSI S.R.L.",
      subtitle: "CALIDAD, INOCUIDAD & TRADICIÓN COCHABAMBINA",
      cert: "REGISTRO SANITARIO NACIONAL SENASAG L-426",
      date: "Fecha de Emisión: 12 de Junio, 2026",
      origin: "Cochabamba, Bolivia",
      id: "ID",
      product: "Producto",
      category: "Categoría",
      spec: "Presentación",
      desc: "Descripción / Ficha Técnica",
      division: "División",
      sausages: "Salchichas y Chorizos",
      hams: "Jamones y Ahumados",
      baking: "Fiambres y Especialidades",
      pastries: "Quesos de Selección",
      printBtn: "Imprimir o Guardar como PDF",
      contact: "LÍNEA DE ATENCIÓN Y CONTACTO NACIONAL",
      phone: "Teléfono Fijo Central: +591 4 426-8010",
      whatsapp: "WhatsApp Pedidos: +591 4 426-8010"
    },
    EN: {
      brand: "INDUSTRIAS GUSTOSSI S.R.L.",
      subtitle: "QUALITY, HYGIENE & COCHABAMBINA HERITAGE",
      cert: "SENASAG NATIONAL HEALTH REGISTER AUTHORIZATION L-426",
      date: "Date of Issue: June 12, 2026",
      origin: "Cochabamba, Bolivia",
      id: "ID",
      product: "Product",
      category: "Category",
      spec: "Net Content / Pack",
      desc: "Description & Technical Details",
      division: "Division",
      sausages: "Sausages & Chorizos",
      hams: "Fine Hams",
      baking: "Specialties & Cold Cuts",
      pastries: "Selected Cheeses",
      printBtn: "Print or Save as PDF",
      contact: "NATIONAL CUSTOMER SERVICE DESK",
      phone: "Main Telephone Line: +591 4 426-8010",
      whatsapp: "WhatsApp Sales: +591 4 426-8010"
    }
  }[language];

  const categoryMap = (cat: string) => {
    if (cat === 'sausages') return langText.sausages;
    if (cat === 'hams') return langText.hams;
    if (cat === 'baking') return langText.baking;
    if (cat === 'pastries') return langText.pastries;
    return cat;
  };

  const htmlContent = `<!DOCTYPE html>
<html lang="${language.toLowerCase()}">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Open Sans', sans-serif;
      color: #333333;
      background-color: #faf9f6;
      margin: 0;
      padding: 40px 20px;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: #ffffff;
      padding: 50px;
      border-radius: 4px;
      box-shadow: 0 4px 30px rgba(0,0,0,0.03);
      border-top: 8px solid #CB9D06;
    }
    .header {
      text-align: center;
      border-bottom: 2px solid #eaeaea;
      padding-bottom: 30px;
      margin-bottom: 43px;
    }
    .logo-container {
      display: inline-block;
      width: 60px;
      height: 60px;
      color: #CB9D06;
      margin-bottom: 12px;
    }
    .logo-container svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
    h1 {
      font-family: 'Manrope', sans-serif;
      font-size: 24px;
      font-weight: 800;
      margin: 0 0 4px 0;
      letter-spacing: 0.1em;
      color: #1a1a1a;
    }
    .subtitle {
      font-family: 'Manrope', sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.25em;
      color: #666666;
      margin-bottom: 16px;
    }
    .badge {
      display: inline-block;
      background-color: #fce7bc;
      color: #7d5a00;
      font-family: 'Manrope', sans-serif;
      font-weight: 700;
      font-size: 10px;
      letter-spacing: 0.1em;
      padding: 6px 14px;
      border-radius: 50px;
      margin-bottom: 10px;
    }
    .meta {
      font-size: 11px;
      color: #999999;
      margin: 8px 0;
    }
    .product-grid {
      margin-top: 30px;
    }
    .product-row {
      display: flex;
      align-items: flex-start;
      gap: 25px;
      border-bottom: 1px solid #f0f0f0;
      padding: 24px 0;
    }
    .product-row:last-child {
      border-bottom: none;
    }
    .product-img {
      width: 110px;
      height: 110px;
      object-fit: cover;
      border-radius: 4px;
      background-color: #eaeaea;
      border: 1px solid #e2e2e2;
    }
    .product-details {
      flex: 1;
    }
    .product-header-line {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 6px;
    }
    .product-name {
      font-family: 'Manrope', sans-serif;
      font-size: 17px;
      font-weight: 700;
      color: #222222;
      margin: 0;
    }
    .product-cat {
      font-family: 'Manrope', sans-serif;
      font-size: 10px;
      font-weight: 700;
      color: #CB9D06;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .product-desc {
      font-size: 13px;
      color: #555555;
      line-height: 1.5;
      margin: 0 0 10px 0;
    }
    .product-spec {
      font-family: 'Manrope', sans-serif;
      font-size: 11px;
      font-weight: 700;
      color: #333333;
      background: #faf7ee;
      padding: 4px 8px;
      border-radius: 2px;
      display: inline-block;
    }
    .footer-section {
      margin-top: 50px;
      border-top: 2px solid #eaeaea;
      padding-top: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }
    .contact-info {
      font-family: 'Manrope', sans-serif;
      font-size: 11px;
      color: #666666;
      line-height: 1.6;
    }
    .contact-info strong {
      color: #333333;
    }
    .actions {
      text-align: center;
      margin-top: 30px;
    }
    .btn-print {
      background-color: #111111;
      color: #ffffff;
      border: none;
      padding: 13px 26px;
      font-family: 'Manrope', sans-serif;
      font-weight: 700;
      font-size: 12px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      cursor: pointer;
      border-radius: 3px;
      transition: background-color 0.2s;
    }
    .btn-print:hover {
      background-color: #CB9D06;
    }
    @media print {
      body {
        background: transparent;
        padding: 0;
      }
      .container {
        box-shadow: none;
        padding: 20px;
        border: none;
      }
      .actions {
        display: none;
      }
    }
  </style>
</head>
<body>

  <div class="container">
    <div class="header">
      <div class="logo-container">
        <svg viewBox="0 0 305 304">
          <path d="M157.135 303.572C157.135 222.53 223.131 156.832 304.174 156.832V303.572H157.135Z" />
          <path d="M147.039 303.572C147.039 222.53 81.0425 156.832 0 156.832V303.572H147.039Z" />
          <path d="M157.135 0C157.135 81.0426 223.131 146.74 304.174 146.74C304.174 65.698 238.178 0 157.135 0Z" />
          <path d="M147.039 0C147.039 81.0426 81.0425 146.74 0 146.74C0 65.698 65.9962 0 147.039 0Z" />
        </svg>
      </div>
      <h1>${langText.brand}</h1>
      <div class="subtitle">${langText.subtitle}</div>
      <span class="badge">✓ ${langText.cert}</span>
      <div class="meta">${langText.date} &nbsp;|&nbsp; ${langText.origin}</div>
    </div>

    <div class="product-grid">
      ${filteredProducts.map(p => `
        <div class="product-row">
          <div class="product-details">
            <div class="product-header-line">
              <h3 class="product-name">${p.name}</h3>
              <span class="product-cat">${categoryMap(p.category)}</span>
            </div>
            <p class="product-desc">${p.description}</p>
            <div class="product-spec"><strong>${langText.spec}:</strong> ${p.spec}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="footer-section">
      <div class="contact-info">
        <strong>${langText.contact}</strong><br>
        Planta Industrial: Blanco Galindo Km 7.5, Cochabamba<br>
        ${langText.phone} | ${langText.whatsapp}
      </div>
      <div class="contact-info" style="text-align: right; line-height: 1.6;">
        Industria Boliviana<br>
        <strong>SENASAG L-426</strong>
      </div>
    </div>
  </div>

  <div class="actions">
    <button class="btn-print" onclick="window.print()">${langText.printBtn}</button>
  </div>

</body>
</html>`;

  // Download the HTML file locally
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const element = document.createElement('a');
  element.setAttribute('href', url);
  
  const filename = division === 'all' 
    ? `Ficha_Tecnica_Gustossi_${language}.html`
    : `Catalogo_Gustossi_${division === 'embutidos' ? 'Embutidos' : 'Quesos'}_${language}.html`;
    
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  URL.revokeObjectURL(url);
}
