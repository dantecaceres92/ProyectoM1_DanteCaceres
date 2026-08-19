# ColorFly — Generador Interactivo de Paletas de Colores

**Proyecto Integrador — Módulo 1: Desarrollo Web Full Stack (Henry)**

Aplicación web dinámica desarrollada con tecnologías nativas (Vanilla HTML, CSS y JS) que permite la generación, conversión y gestión interactiva de paletas cromáticas aleatorias en formatos HSL y HEX.

---

## Tabla de Contenido

- [Visión General](#visión-general)
- [Demostración en Línea](#demostración-en-línea)
- [Funcionalidades Principales](#funcionalidades-principales)
  - [Requerimientos Base](#requerimientos-base)
  - [Mejoras y UX](#mejoras-y-ux)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Arquitectura de Directorios](#arquitectura-de-directorios)
- [Instrucciones de Ejecución Local](#instrucciones-de-ejecución-local)
- [Guía de Despliegue (GitHub Pages)](#guía-de-despliegue-github-pages)
- [Decisiones de Diseño y Arquitectura Técnica](#decisiones-de-diseño-y-arquitectura-técnica)
- [Contacto y Redes](#contacto-y-redes)

---

## Visión General

**ColorFly** es un generador de esquemas de color orientado a diseñadores y desarrolladores web. La herramienta permite construir combinaciones cromáticas de 6, 8 o 9 bloques en un solo clic. Internamente, la aplicación procesa la tonalidad, saturación y luminosidad mediante el modelo espacial **HSL**, calculando de forma limpia su representación equivalente en sistema hexadecimal (**HEX**). El usuario puede alternar la notación visible y copiar al portapapeles cualquier valor cromático de manera inmediata.

---

## Demostración en Línea

🚀 **Sitio publicado:** [Ver aplicación en GitHub Pages](https://dantecaceres92.github.io/tu-repositorio/)  
*(Asegúrate de reemplazar el enlace con la URL de tu repositorio desplegado)*

---

## Funcionalidades Principales

### Requerimientos Base
- **Mapeo y Generación Dinámica:** Disparador central mediante botón principal para renderizar paletas aleatorias.
- **Modelos de Color Compatibles:** Algoritmo matemático para generación de valores HSL y su respectiva conversión a notación HEX.
- **Cantidades Configurables:** Configuración de la grilla en tamaños de 6, 8 o 9 muestras de color.
- **Copiado al Portapapeles:** Interacción directa sobre cada muestra con respuesta inmediata de copiado (`Clipboard API`).
- **Retroalimentación Accesible:** Notificación flotante (toast) configurada con atributos ARIA (`role="status"`, `aria-live="polite"`) para comunicar acciones a lectores de pantalla.

### Mejoras y UX
- **Alternador de Formato Notacional:** Control de interfaz para cambiar la visualización activa entre HSL y HEX sin regenerar la estructura cromática de la pantalla.
- **Maquetado Semántico:** Uso riguroso de etiquetas HTML5 (`<header>`, `<main>`, `<section>`, `<nav>`, `<fieldset>`, `<footer>`).
- **Accesibilidad y Contraste:** Cumplimiento de estándares WCAG AA, garantizando estados de foco visibles (`:focus-visible`) e indicadores adaptables independientemente de la luminosidad del color generado.

---

## Tecnologías Utilizadas

- **HTML5:** Estructuración semántica y accesible de la interfaz.
- **CSS3:** Estilado modular utilizando Flexbox, CSS Grid y Variables CSS (`custom properties`), libre de dependencias de frameworks externos.
- **JavaScript (ES6+ Vanilla):** Lógica nativa de manipulación del DOM, algoritmos de conversión de color y gestión de eventos.
- **Git & GitHub:** Control de versiones.
- **GitHub Pages:** Plataforma de alojamiento para el despliegue estático.

---

## Arquitectura de Directorios

```text
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   ├── logo.svg
│   └── favicon.ico
├── documentacion/
│   ├── bitacora-desarrollo.md
│   └── capturas/
└── README.md
```

> **Nota sobre la estructura:** Para facilitar la integración continua con GitHub Pages y evitar redirecciones complejas de archivos estáticos, la raíz del proyecto aloja la plantilla de entrada (`index.html`) junto con los directorios de estilos y scripts. El material documental de apoyo y bitácoras se mantiene organizado dentro del directorio `documentacion/`.

---

## Instrucciones de Ejecución Local

Para correr el proyecto en tu entorno local sin depender de herramientas de compilación o empaquetadores:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/dantecaceres92/nombre-de-tu-repositorio.git
   ```

2. **Acceder a la carpeta del proyecto:**
   ```bash
   cd nombre-de-tu-repositorio
   ```

3. **Ejecutar la aplicación:**
   - Haz doble clic sobre el archivo `index.html` para abrirlo en tu navegador preferido.
   - Alternativamente, puedes servilo a través de extensiones de servidor local como **Live Server** en VS Code para contar con recarga en tiempo real.

---

## Guía de Despliegue (GitHub Pages)

Para publicar la aplicación en línea a través de GitHub Pages:

1. Dirígete a la pestaña **Settings** dentro del repositorio en GitHub.
2. Navega en el menú lateral hasta la sección **Pages**.
3. En el apartado **Build and deployment** -> **Source**, selecciona la opción `Deploy from a branch`.
4. Elige la rama `main` y define la carpeta `/ (root)`.
5. Guarda los cambios. En un par de minutos, GitHub generará la URL pública bajo el dominio `https://dantecaceres92.github.io/nombre-de-tu-repositorio/`.

---

## Decisiones de Diseño y Arquitectura Técnica

- **Modelo HSL como fuente primaria:** Se optó por generar los componentes HSL (Hue, Saturation, Lightness) de forma directa en lugar de cadenas hexadecimales aleatorias. Esto permite un control más homogéneo sobre los valores de saturación y luminosidad antes de procesar su conversión matemática a HEX.
- **Seguridad en la Inyección del DOM:** En lugar de manipular bloques de cadenas masivas a través de `innerHTML`, las celdas cromáticas se construyen instanciando nodos del DOM de forma explícita mediante `document.createElement()` y `appendChild()`, anulando potenciales vectores de inyección.
- **Optimización de Eventos:** Implementación del patrón de delegación de eventos (`Event Delegation`) escuchando el contenedor principal (`event.target.closest()`), evitando adjuntar *event listeners* individuales por cada tarjeta de color generada.
- **Rutas Relativas para Producción:** Organización de rutas de recursos mediante notación relativa (`css/styles.css`, `js/script.js`), garantizando la correcta resolución de dependencias tanto en entornos locales como en subsistemas Linux de GitHub Pages.

---

## Contacto y Redes

**Dante Cáceres**

- **GitHub:** [@dantecaceres92](https://github.com/dantecaceres92)
- **LinkedIn:** [dantecaceres](https://linkedin.com/in/dantecaceres)
