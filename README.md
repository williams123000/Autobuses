# 🌍 Sistema de Gestión de Viajes

¡Bienvenido al Sistema de Gestión de Viajes! Este es un proyecto diseñado para gestionar terminales, autobuses, conductores, viajes y clientes, ofreciendo una experiencia sencilla y eficiente para la administración de un sistema de transporte.

Este proyecto fue desarrollado con **Vite**, **React**, **Tailwind CSS** y **shadcn** para un diseño moderno y dinámico.

---

## 🚀 Características principales

### **1. Terminales**
- Agregar, editar y eliminar terminales.
- **Datos requeridos**:
  - **ID**: Identificador único.
  - **Estado**: Estado donde se encuentra la terminal.
  - **Dirección**: Ubicación exacta.

### **2. Autobuses**
- Agregar, editar y eliminar autobuses.
- **Datos requeridos**:
  - **ID**: Identificador único.
  - **Número de asientos**: Capacidad del autobús.
  - **Matrícula**: Placa del autobús.
  - **Marca y modelo**: Detalles del vehículo.
  - **Terminal**: Terminal a la que pertenece.

### **3. Conductores**
- Agregar, editar y eliminar conductores.
- **Datos requeridos**:
  - **ID**: Identificador único.
  - **Nombre y apellidos**: Información personal.
  - **Email**: Correo electrónico del conductor.
  - **Licencia**: Número de licencia de conducción.
  - **Teléfono**: Contacto.
  - **Género**: Identificación de género.
  - **Fecha de nacimiento**: Edad y registro.
  - **Dirección**: Ubicación.
  - **Terminal**: Terminal asignada.

### **4. Viajes**
- Agregar, editar y eliminar viajes.
- **Datos requeridos**:
  - **ID**: Identificador único.
  - **Fecha y hora de salida**: Detalles del itinerario.
  - **Precio**: Costo del viaje.
  - **Autobús**: Autobús asignado al viaje.
  - **Conductor**: Conductor asignado al viaje.
  - **Origen y destino**: Terminales de salida y llegada.

### **5. Clientes y tickets**
- Agregar, editar y eliminar clientes.
- **Datos requeridos**:
  - **ID**: Identificador único.
  - **Nombre y apellidos**: Información personal.
  - **Email**: Correo electrónico.
  - **Teléfono**: Contacto.
  - **Viaje**: Viaje asignado.
- **Generación automática de tickets**:
  - Incluye:
    - **ID del ticket**.
    - **Nombre del cliente**.
    - **ID del viaje ligado**.

---

## 🛠️ Tecnologías utilizadas
- **Frontend**:
  - [Vite](https://vitejs.dev/) - Herramienta rápida de desarrollo.
  - [React](https://react.dev/) - Biblioteca para construir interfaces de usuario.
  - [Tailwind CSS](https://tailwindcss.com/) - Framework de diseño CSS.
  - [shadcn/ui](https://ui.shadcn.com/) - Componentes de diseño moderno.
  
---

## 📂 Estructura del proyecto

```plaintext
project-root/
├── frontend/            # Código del frontend
│   ├── src/             # Archivos principales
│   │   ├── components/  # Componentes reutilizables
│   │   ├── pages/       # Páginas del sistema
│   │   ├── styles/      # Estilos (Tailwind CSS)
│   │   └── App.jsx      # Archivo principal
│   └── public/          # Archivos estáticos
├── backend/             # Código del backend
└── README.md            # Documentación del proyecto
```

---

## 💻 Instalación y ejecución

### **Requisitos previos**
- Node.js 16+ instalado en tu máquina.
- Un navegador moderno.

### **Instrucciones**
1. Clona este repositorio:
   ```bash
   git clone https://github.com/tuusuario/sistema-gestion-viajes.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd sistema-gestion-viajes
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Accede a la aplicación en tu navegador:
   ```
   http://localhost:3000
   ```

---

## 🗂️ Funcionalidades pendientes
- **Autenticación de usuarios**: Sistema de roles para administrador y clientes.
- **Reportes**: Generación de reportes de viajes y ventas.
- **Optimización móvil**: Mejoras en la experiencia para dispositivos móviles.

---

## 🤝 Contribuciones
Si deseas contribuir, ¡serás bienvenido! Por favor, abre un issue o un pull request en este repositorio.

---

## 📄 Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más detalles.

---
