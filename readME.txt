# Presentado por:
- Sebastian Manriquez
- Francisco Alfaro
- David Rojas

# Sistema de Gestión de Productos

## Índice
1. [Resumen del Proyecto](#resumen-del-proyecto)
2. [Requerimientos](#requerimientos)
3. [Arquitectura de la Información](#arquitectura-de-la-información)
4. [Diseño de prototipos](#prototipo-de-diseño)
5. [Librerías y Tecnologías](#librerías-y-tecnologías)

## Resumen del Proyecto

Sistema web para la gestión de productos alimenticios, permitiendo registrar, editar, visualizar y controlar el inventario, con control de roles y seguridad.

---

## Requerimientos

### Roles del Sistema
- **Administrador**: Control total sobre el sistema.
- **Editor**: Puede crear, editar y eliminar productos.
- **Visualizador**: Solo puede ver información de productos.

### Requerimientos Funcionales

#### Administrador
1. Registrar nuevos productos.
2. Editar cualquier producto existente.
3. Eliminar productos del inventario (borrado lógico).
4. Configurar alertas de stock mínimo.
5. Gestionar usuarios y asignar roles.
6. Exportar e importar datos de productos.
7. Generar reportes de inventario y movimientos.

#### Editor
1. Registrar nuevos productos.
2. Editar productos existentes.
3. Eliminar productos (según permisos).
4. Aplicar filtros y buscar productos por nombre, código, categoría, stock o precio.
5. Actualizar el stock de productos.
6. Agregar imágenes y descripciones a los productos.
7. Visualizar alertas de stock bajo.

#### Visualizador
1. Acceder a la lista de productos.
2. Ver detalles completos de cada producto.
3. Buscar y filtrar productos.
4. Visualizar imágenes y descripciones de productos.
5. Consultar el historial de movimientos de productos.
6. Ver alertas de stock bajo.
7. Descargar reportes de productos (solo lectura).

### Requerimientos No Funcionales

1. Tiempo de respuesta menor a 2 segundos en el 95% de las operaciones clave.
2. Seguridad en autenticación, roles y almacenamiento de contraseñas.
3. Interfaz intuitiva y fácil de usar.
4. Diseño responsive para móviles y escritorio.
5. Compatibilidad con Chrome, Firefox, Edge y Safari.
6. Escalabilidad para manejar más de 10,000 productos sin pérdida de rendimiento.
7. Acceso protegido por HTTPS y cumplimiento de buenas prácticas de desarrollo.

---

## Arquitectura de la Información 
[Estructura de Navegación] (https://whimsical.com/escuelainf-4qgXnPptro4CqvEugsGNNZ )

---

## Prototipo de diseño 
[Figma - Prototipo de Gestión de Productos](https://www.figma.com/design/6byzYver6ICzmizeFhhuId/FoodManager?node-id=1-5913&p=f&t=DsVMZ6Vtd0irQKjJ-0)

---

## Librerías y Tecnologías

- **Ionic Framework** (v7+)
- **Angular** (v17+)
- **TypeScript**
- **SASS** (estilos)
- **RxJS** (manejo reactivo)
- **Angular Router** (navegación)
- **Bootstrap** (componentes UI)
