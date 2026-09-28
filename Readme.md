# 🧮 Calculadora en TypeScript

Una calculadora web sencilla construida con **TypeScript**, **HTML** y **CSS**, 
compilada a JavaScript y servida como sitio estático.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)

---

## 📋 Descripción

Calculadora funcional que permite realizar operaciones aritméticas básicas 
(sumas, restas, multiplicaciones y divisiones) directamente en el navegador, 
sin necesidad de backend.

El proyecto está desarrollado como práctica de **TypeScript** aplicado al 
desarrollo web, separando la lógica de la interfaz y trabajando con el DOM.

---

## ✨ Funcionalidades

- ✅ Suma, resta, multiplicación y división
- ✅ Encadenamiento de operaciones (`5 + 3 - 2 =`)
- ✅ Punto decimal con control de duplicados
- ✅ Botón de retroceso (`←`)
- ✅ Borrar entrada actual (`CE`) y borrar todo (`C`)
- ✅ Manejo de errores (división por cero, raíces negativas)
- ✅ Redondeo automático para evitar errores de coma flotante
- ✅ Diseño responsive con CSS Grid

---

## 🛠️ Tecnologías usadas

| Tecnología | Uso |
|------------|-----|
| **TypeScript** | Lógica de la calculadora |
| **HTML5** | Estructura y semántica |
| **CSS3** | Estilos y layout (Grid + Flexbox) |
| **lite-server** | Servidor local de desarrollo con recarga automática |
| **Node.js + npm** | Gestión de dependencias y scripts |

---

## 📂 Estructura del proyecto
```
calculadora/
├── public/
│ └── image/
│ └── calculator-icon-windows-v1.ico # Icono de la pestaña
├── src/
│ └── index.ts # Código fuente TypeScript
├── dist/ # JavaScript compilado (generado)
│ └── index.js
├── index.html # Página principal
├── styles.css # Estilos
├── tsconfig.json # Configuración de TypeScript
├── package.json # Dependencias y scripts
└── README.md # Este archivo
```
