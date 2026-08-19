# 🤖 Registro de Consultas y Uso de IA

Documentación de consultas técnicas puntuales realizadas durante la fase de desarrollo para validar la arquitectura y resolver dudas específicas.

---

### Consulta 1: Conversión Matemática de HSL a HEX
> **Prompt del usuario:**
> *"¿Cuál es la fórmula matemática o la lógica paso a paso para transformar valores HSL (Hue, Saturation, Lightness) a formato HEX en JavaScript puro, sin usar librerías externas?"*

**Respuesta de la IA (Resumen):**
- Explicación de la conversión de HSL a RGB mediante la fórmula estándar de la Cátedra de Color.
- Normalización de la luminosidad ($L$) y saturación ($S$) a un rango de 0 a 1.
- Conversión de cada canal R, G y B a su equivalente base 16 usando `toString(16).padStart(2, '0')`.

---

### Consulta 2: Manejo eficiente de Eventos en Swatches Dinámicos
> **Prompt del usuario:**
> *"Si genero 9 tarjetas de colores dinámicamente con JS, ¿es mejor agregar un `addEventListener` a cada tarjeta o escuchar el contenedor padre? ¿Cómo identifico qué tarjeta recibió el clic?"*

**Respuesta de la IA (Resumen):**
- Recomendación del patrón **Delegación de Eventos** (Event Delegation) por rendimiento y memoria.
- Uso del método `event.target.closest('.color-card')` en el contenedor principal para capturar la tarjeta específica sin importar si se hace clic en el texto o el fondo.

---

### Consulta 3: Despliegue y Rutas Relativas en GitHub Pages
> **Prompt del usuario:**
> *"Tengo mi proyecto listo pero al subirlo a GitHub Pages no cargan los estilos CSS ni las imágenes. ¿Qué suele causar este problema?"*

**Respuesta de la IA (Resumen):**
- Diferenciación entre rutas absolutas (`/css/styles.css`) y relativas (`css/styles.css` o `./css/styles.css`).
- Advertencia sobre el sistema de archivos case-sensitive de los servidores Linux donde hospeda GitHub Pages (mayúsculas/minúsculas).

---

### Consulta 4: Atributos de Accesibilidad (ARIA) para Toasts
> **Prompt del usuario:**
> *"Quiero que cuando el usuario copie un color al portapapeles aparezca un mensaje toast y sea leído por lectores de pantalla. ¿Qué atributos ARIA debo incluir?"*

**Respuesta de la IA (Resumen):**
- Asignación de `role="status"` o `role="alert"` al elemento flotante.
- Uso del atributo `aria-live="polite"` para notificar al usuario sin interrumpir la lectura actual del lector de pantalla.