'use strict';

/**
 * Generador de Paletas de Colores
 * JavaScript Vanilla ES6+ — sin dependencias externas.
 */

// ===========================
// 1. REFERENCIAS AL DOM
// ===========================
const generateBtn = document.getElementById('generate-btn');
const paletteSizeGroup = document.getElementById('palette-size-group');
const colorFormatGroup = document.getElementById('color-format-group');
const paletteGrid = document.getElementById('palette-grid');
const toast = document.getElementById('toast');

let toastTimeoutId = null;

// Estado de selección de los controles (segmented controls)
let selectedSize = 6;
let selectedFormat = 'hex'; // 'hex' o 'hsl'

// Estado actual de la paleta generada
let currentPalette = [];

// ===========================
// 2. UTILIDADES DE COLOR
// ===========================

/**
 * Genera un color aleatorio y devuelve un objeto con sus
 * representaciones HSL y HEX ya calculadas.
 * @returns {{h: number, s: number, l: number, hex: string}}
 */
function generateRandomColor() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 40) + 55; // 55% - 95%
  const l = Math.floor(Math.random() * 35) + 40;  // 40% - 75%
  const hex = hslToHex(h, s, l);

  return { h, s, l, hex };
}

/**
 * Convierte un color HSL a su representación HEX.
 * @param {number} h - Matiz (0-360)
 * @param {number} s - Saturación (0-100)
 * @param {number} l - Luminosidad (0-100)
 * @returns {string} Color en formato HEX
 */
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h < 60)       { r = c; g = x; b = 0; }
  else if (h < 120)  { r = x; g = c; b = 0; }
  else if (h < 180)  { r = 0; g = c; b = x; }
  else if (h < 240)  { r = 0; g = x; b = c; }
  else if (h < 300)  { r = x; g = 0; b = c; }
  else               { r = c; g = 0; b = x; }

  const toHexChannel = (value) => {
    const channel = Math.round((value + m) * 255);
    return channel.toString(16).padStart(2, '0');
  };

  return `#${toHexChannel(r)}${toHexChannel(g)}${toHexChannel(b)}`.toUpperCase();
}

/**
 * Formatea un objeto de color como string HSL legible.
 * @param {{h: number, s: number, l: number}} color
 * @returns {string} ej: "hsl(210, 80%, 55%)"
 */
function formatAsHsl(color) {
  return `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
}

/**
 * Devuelve el string correspondiente según el formato indicado.
 * @param {{h: number, s: number, l: number, hex: string}} color
 * @param {'hex'|'hsl'} format
 * @returns {string}
 */
function formatColor(color, format) {
  return format === 'hsl' ? formatAsHsl(color) : color.hex;
}

/**
 * Calcula la luminancia relativa de un color HEX (fórmula WCAG)
 * para determinar si el texto sobre él debe ser negro o blanco.
 * @param {string} hex - Color en formato "#RRGGBB"
 * @returns {number} Luminancia relativa (0 a 1)
 */
function getRelativeLuminance(hex) {
  const rgb = [1, 3, 5].map((offset) => {
    const channel = parseInt(hex.substring(offset, offset + 2), 16) / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);
  });

  const [r, g, b] = rgb;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Determina el color de texto (negro o blanco) con mejor contraste
 * sobre un fondo determinado. Siempre se calcula a partir del HEX.
 * @param {string} hex - Color de fondo en formato HEX
 * @returns {string} "#000000" o "#FFFFFF"
 */
function getContrastTextColor(hex) {
  const luminance = getRelativeLuminance(hex);
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

// ===========================
// 3. RENDERIZADO DE LA PALETA
// ===========================

/**
 * Genera un arreglo de N objetos de color aleatorios.
 * @param {number} amount - Cantidad de colores a generar
 * @returns {Array<{h: number, s: number, l: number, hex: string}>}
 */
function generatePalette(amount) {
  return Array.from({ length: amount }, () => generateRandomColor());
}

/**
 * Crea la tarjeta DOM de un color mostrando únicamente el formato seleccionado (HEX u HSL).
 * @param {{h: number, s: number, l: number, hex: string}} color
 * @returns {HTMLDivElement} Tarjeta de color lista para insertar
 */
function createColorCard(color) {
  const colorValueText = formatColor(color, selectedFormat);
  const textColor = getContrastTextColor(color.hex);

  const card = document.createElement('div');
  card.className = 'color-card';
  card.style.backgroundColor = color.hex;
  card.setAttribute('role', 'listitem');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `Color ${colorValueText}. Clic para copiar.`);

  const info = document.createElement('div');
  info.className = 'color-card-info';

  // Código único visible según el formato activo (HEX u HSL)
  const colorValueBtn = document.createElement('button');
  colorValueBtn.type = 'button';
  colorValueBtn.className = 'color-value color-value-hex';
  colorValueBtn.textContent = colorValueText;
  colorValueBtn.style.color = textColor;
  colorValueBtn.setAttribute('aria-label', `Copiar código ${selectedFormat.toUpperCase()} ${colorValueText}`);
  colorValueBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    copyToClipboard(colorValueText);
  });

  info.appendChild(colorValueBtn);
  card.appendChild(info);

  // Clic en el FONDO de la tarjeta
  card.addEventListener('click', () => {
    copyToClipboard(colorValueText);
  });

  // Accesibilidad por teclado
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      copyToClipboard(colorValueText);
    }
  });

  return card;
}

/**
 * Renderiza la paleta completa dentro del contenedor principal.
 * @param {Array<{h: number, s: number, l: number, hex: string}>} colors
 */
function renderPalette(colors) {
  paletteGrid.innerHTML = '';
  const fragment = document.createDocumentFragment();

  colors.forEach((color) => {
    fragment.appendChild(createColorCard(color));
  });

  paletteGrid.appendChild(fragment);
}

// ===========================
// 4. CLIPBOARD & MICROFEEDBACK
// ===========================

/**
 * Copia un texto al portapapeles usando la Clipboard API
 * y dispara el toast de confirmación.
 * @param {string} text - Texto a copiar
 */
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(`¡Código ${text} copiado al portapapeles!`);
  } catch (error) {
    showToast('No se pudo copiar el color. Intentá de nuevo.');
    console.error('Error al copiar al portapapeles:', error);
  }
}

/**
 * Muestra el toast de feedback con el mensaje indicado
 * y lo oculta automáticamente luego de un tiempo.
 * @param {string} message - Mensaje a mostrar
 */
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeoutId);
  toastTimeoutId = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

// ===========================
// 5. SEGMENTED CONTROLS
// ===========================

/**
 * Marca visualmente como activo el botón correspondiente al valor
 * seleccionado dentro de un grupo, y actualiza aria-pressed.
 * @param {HTMLElement} group - Contenedor .segmented-control
 * @param {string|number} value - Valor a activar (coincide con data-value)
 */
function setActiveButton(group, value) {
  const buttons = group.querySelectorAll('.segmented-btn');
  buttons.forEach((btn) => {
    const isActive = btn.dataset.value === String(value);
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
}

// Tamaño de paleta: genera colores nuevos
paletteSizeGroup.addEventListener('click', (event) => {
  const btn = event.target.closest('.segmented-btn');
  if (!btn) return;

  selectedSize = parseInt(btn.dataset.value, 10);
  setActiveButton(paletteSizeGroup, selectedSize);
  handleGeneratePalette();
});

// Formato: cambia de HEX a HSL (o viceversa) y vuelve a renderizar la paleta actual
colorFormatGroup.addEventListener('click', (event) => {
  const btn = event.target.closest('.segmented-btn');
  if (!btn) return;

  selectedFormat = btn.dataset.value;
  setActiveButton(colorFormatGroup, selectedFormat);
  
  // Re-renderiza las tarjetas con el nuevo formato sin regenerar los colores aleatorios
  renderPalette(currentPalette);
});

// ===========================
// 6. EVENTOS PRINCIPALES
// ===========================

/**
 * Genera una paleta nueva de colores aleatorios y la renderiza.
 */
function handleGeneratePalette() {
  currentPalette = generatePalette(selectedSize);
  renderPalette(currentPalette);
}

generateBtn.addEventListener('click', handleGeneratePalette);

// ===========================
// 7. INICIALIZACIÓN
// ===========================
document.addEventListener('DOMContentLoaded', handleGeneratePalette);
