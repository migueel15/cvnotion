# Aplicación de Tareas y Notificaciones

Esta aplicación, desarrollada en React Native con Expo, está diseñada para ayudar a los usuarios a gestionar sus tareas y notificaciones de manera eficiente. A continuación se describen las funcionalidades principales y los requisitos del sistema.

## Funcionalidades Principales

1. **Inicio de Sesión con Notion**: Los usuarios pueden iniciar sesión utilizando su cuenta de Notion para acceder a sus tareas y eventos.

2. **Gestión de Tareas del Campus**: La aplicación extrae automáticamente las tareas del campus virtual en un rango de +/- 2 meses de la fecha actual. Los usuarios pueden ver, modificar y marcar estas tareas como completadas.

3. **Tareas Personales**: Los usuarios pueden crear, modificar y eliminar tareas personales. También pueden filtrar las tareas para ver solo las del campus, solo las personales o ambas.

4. **Vista de Ideas**: Los usuarios pueden crear, modificar y eliminar ideas personales, cada una con un título, un cuerpo de texto y un tag.

5. **Notificaciones**: Los usuarios recibirán notificaciones cada vez que se añadan o modifiquen tareas automáticas del campus.

6. **Sincronización Automática**: La aplicación sincroniza las tareas del campus con Notion cada 10 minutos para mantener la información actualizada.

7. **Widgets**: Se ofrecen widgets para que los usuarios puedan ver las tareas próximas o las ideas creadas de manera rápida y accesible.

## Requisitos del Sistema

- **Campus Virtual**: El sistema debe poder extraer tareas del campus virtual y validar que las bases de datos de Notion tengan las propiedades adecuadas.
- **Eventos de Notion**: Permitir la extracción de tareas mediante filtros y la modificación de tareas existentes.
- **Manejo de Usuarios**: Los usuarios deben iniciar sesión con Notion para acceder a la vista de tareas.
- **Ajustes Personalizados**: Los usuarios pueden modificar propiedades visibles y nombres relacionados con las bases de datos.

## Instalación

Para instalar la aplicación, clone el repositorio y ejecute:

```bash
npm install
npm start
```
