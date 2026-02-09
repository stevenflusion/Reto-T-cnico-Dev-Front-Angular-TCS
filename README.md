# Prueba Técnica Frontend – Angular

Gestión de Productos Financieros

Aplicación web frontend desarrollada en Angular para la gestión de productos financieros.  
Permite listar, buscar, crear, editar y eliminar productos consumiendo una API REST local,  
siguiendo principios de Clean Code, SOLID y buenas prácticas de desarrollo.

---

## 👨‍💻 Autor

Desarrollado por **Steven Quihuire**

---

## 🛠️ Tecnologías

- Angular 14+
- TypeScript 4.8+
- Jest (pruebas unitarias)
- Visual Studio Code

---

## 📋 Requisitos cumplidos

- UI desarrollada sin frameworks de estilos ✅
- Manejo de errores y validaciones visuales ✅
- Arquitectura modular y reutilizable ✅
- Clean Code y principios SOLID ✅
- Pruebas unitarias con mínimo 70% de coverage ✅

---

## 🚀 Funcionalidades

### F1. Listado de productos financieros

- Consumo de API `/bp/products`
- Visualización en lista con skeleton de carga

### F2. Búsqueda de productos

- Filtro por nombre con normalización de texto

### F3. Cantidad de registros

- Selector de 5, 10 y 20 registros
- Actualización reactiva

### F4. Agregar producto

- Formulario reutilizable
- Validaciones completas por campo

### F5. Editar producto

- Navegación por rutas
- ID deshabilitado
- Reutilización del formulario

### F6. Eliminar producto

- Modal de confirmación
- Manejo de cancelación

---

## ✅ Validaciones

- ID: requerido, 3–10 caracteres, validación de existencia
- Nombre: requerido, 5–100 caracteres
- Descripción: requerido, 10–200 caracteres
- Logo: requerido
- Fecha de liberación ≥ fecha actual
- Fecha de revisión = fecha de liberación + 1 año

---

## 🧱 Arquitectura

- Services: manejo de API y lógica de negocio
- Store (Angular Signals): estado derivado, filtros y paginación
- Componentes desacoplados y reutilizables
- Formularios reactivos centralizados
- Utilidades y validadores aislados y testeables

---

## 🧪 Pruebas unitarias

Se implementaron pruebas unitarias con Jest enfocadas principalmente en la **lógica de negocio**, cubriendo:

- Servicios (CRUD y manejo de errores)
- Store de productos
- Páginas Create y Edit
- Validadores personalizados
- Hooks y utilidades
- Normalización de texto
- Configuración de formularios

### 📊 Coverage actual

- Statements: ~74%
- Lines: ~74%
- Functions: ~63%
- Branches: ~43%

✔ Cumple el requisito mínimo del **70% de coverage** solicitado en la prueba técnica.

---

### Tests

````bash
npm run test
npm run test --coverage

---

## ▶️ Ejecución del proyecto

### Backend
```bash
npm install
npm run start:dev

### Frontend
```bash
npm install
npm start

## 📌 Consideraciones finales

- Los objetivos del proyecto se limitó a los requerimientos definidos en la prueba técnica.
- Se priorizó la lógica de negocio y validaciones sobre pruebas de UI.
- El formulario fue diseñado como un componente reutilizable para los metodos de creación y edición.
- El proyecto cumple el porcentaje mínimo de coverage solicitado.

````
