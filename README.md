# Tripleten web_project_around_es

Prueba# Around The U.S.

https://alexbricio.github.io/web_project_around_es/

## Descripción del proyecto

Este proyecto corresponde al Sprint 10 de TripleTen y consiste en la refactorización de la aplicación Around The U.S. utilizando Programación Orientada a Objetos (POO) y módulos de JavaScript.

La aplicación permite:

- Editar la información del perfil.
- Agregar nuevas tarjetas dinámicamente.
- Dar like a las tarjetas.
- Eliminar tarjetas.
- Abrir imágenes en un popup.
- Validar formularios dinámicamente.
- Cerrar popups mediante botón, clic fuera del popup y tecla Escape.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (ES6)
- Programación Orientada a Objetos (POO)
- Módulos de JavaScript
- Metodología BEM

## Estructura del proyecto

```text
scripts/
  Card.js
  FormValidator.js
  index.js
  utils.js
```

## Funcionalidades implementadas

### Clase Card

La clase `Card` se encarga de:

- Generar tarjetas dinámicamente.
- Manejar likes.
- Eliminar tarjetas.
- Abrir imágenes en popup.
- Trabajar con plantillas HTML.

### Clase FormValidator

La clase `FormValidator` permite:

- Validar formularios dinámicamente.
- Mostrar mensajes de error.
- Deshabilitar o habilitar botones.
- Limpiar validaciones al abrir formularios.

### Utils

El archivo `utils.js` contiene funciones reutilizables para:

- Abrir popups.
- Cerrar popups.

## Instalación y ejecución

1. Clonar el repositorio:

```bash
git clone https://github.com/alexbricio/web_project_around_es.git
```

2. Abrir el proyecto en Visual Studio Code.

3. Ejecutar Live Server.

## Mejoras futuras

- Conectar la aplicación con una API.
- Guardar tarjetas dinámicamente.
- Agregar sistema de usuarios.
- Implementar animaciones.

## Autor

Alejandro Bricio
