# 🧮 Calculadora en TypeScript

Una aplicación web interactiva construida con **TypeScript**, **RxJS**, **HTML** y **CSS**, que incluye una calculadora funcional, un cronómetro y un reloj en tiempo real.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=flat&logo=reactivex&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)

---

## 📋 Descripción

Aplicación web que reúne tres componentes interactivos desarrollados como práctica de **TypeScript** aplicado al desarrollo web:

- 🧮 **Calculadora** — operaciones aritméticas básicas con encadenamiento, manejo de errores y redondeo.
- ⏱️ **Cronómetro** — temporizador con precisión de centésimas, usando **RxJS** para el flujo reactivo.
- 🕒 **Reloj** — hora actual actualizada cada segundo mediante un `Observable` de RxJS.

Todo se ejecuta en el navegador, sin necesidad de backend.

---

## ✨ Funcionalidades

### 🧮 Calculadora
- ✅ Suma, resta, multiplicación y división
- ✅ Encadenamiento de operaciones (`5 + 3 - 2 =`)
- ✅ Punto decimal con control de duplicados
- ✅ Botón de retroceso (`←`)
- ✅ Borrar entrada actual (`CE`) y borrar todo (`C`)
- ✅ Manejo de errores (división por cero)
- ✅ Redondeo automático para evitar errores de coma flotante
- ✅ Creación dinámica de múltiples calculadoras en la misma página

### ⏱️ Cronómetro
- ✅ Iniciar, detener y reiniciar
- ✅ Precisión de centésimas de segundo
- ✅ Formato `HH:MM:SS.CC`
- ✅ Implementado con `interval` y `Subscription` de RxJS

### 🕒 Reloj
- ✅ Hora actual en formato `HH:MM:SS`
- ✅ Actualización automática cada segundo
- ✅ Implementado con `interval` + `map` de RxJS

### 🎨 Interfaz
- ✅ Diseño responsive con CSS Grid y Flexbox
- ✅ Tipografía tipo display digital (`Segment7Standard`)
- ✅ Estilos diferenciados para operadores, controles y números

---

## 🛠️ Tecnologías usadas

| Tecnología | Uso |
|------------|-----|
| **TypeScript** | Lógica de todos los componentes |
| **RxJS** | Flujos reactivos para cronómetro y reloj |
| **HTML5** | Estructura y semántica |
| **CSS3** | Estilos y layout (Grid + Flexbox) |
| **lite-server** | Servidor local de desarrollo con recarga automática |
| **Node.js + npm** | Gestión de dependencias y scripts |

---

## 📂 Estructura del proyecto

```
calculadora/
├── public/
│   └── image/
│       └── calculator-icon-windows-v1.ico   # Icono de la pestaña
├── src/
│   ├── index.ts            # Punto de entrada: monta los componentes
│   ├── Calculadora.ts      # Lógica de la calculadora
│   ├── Cronometro.ts       # Lógica del cronómetro (RxJS)
│   └── Time.ts             # Reloj en tiempo real (RxJS)
├── dist/                   # JavaScript compilado (generado)
├── index.html              # Página principal
├── styles.css              # Estilos
├── tsconfig.json           # Configuración de TypeScript
├── package.json            # Dependencias y scripts
└── README.md               # Este archivo
```

---

## 🚀 Instalación y uso

### Requisitos previos
- Node.js (v18 o superior)
- npm

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd calculadora
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Compilar TypeScript**
   ```bash
   npx tsc
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm start
   ```

   Esto abrirá la aplicación en el navegador con recarga automática gracias a `lite-server`.

---

## 🧠 Detalles de implementación

### Calculadora
- Estado interno gestionado con propiedades privadas (`valorAct`, `valorAnt`, `operadorAct`, etc.).
- Referencias al DOM cacheadas tras renderizar la estructura HTML.
- Método `redondear()` con `toFixed(10)` para mitigar errores de coma flotante.
- Límite de 12 caracteres en pantalla para mantener el diseño.

### Cronómetro
- `interval(1)` de RxJS para actualizar el tiempo cada milisegundo.
- `Subscription` cancelable para detener el conteo sin fugas de memoria.
- Cálculo del tiempo transcurrido con `Date.getTime()` para mayor precisión.

### Reloj
- `interval(1000)` + `map` para transformar el tick en una cadena `HH:MM:SS`.
- Suscripción en el constructor que actualiza el DOM directamente.

---

> Desarrollado como práctica de **TypeScript** aplicado al desarrollo web.