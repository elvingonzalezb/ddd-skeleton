# Generador de Estructura DDD - TypeScript

### Autor: Elvin Eduardo González Bracho
### Correo electrónico: [elvin.gonzalez@pragma.com.co](mailto:elvin.gonzalez@pragma.com.co)
### Versión: 1.0.0

---

<h1 align="center">Generador de Estructura DDD - TypeScript</h1>

<p align="center">
CLI para crear estructuras de carpetas en TypeScript basadas en el Diseño Impulsado por Dominios (DDD).
</p>

---

## 🔧 Instalación

1. Instala el generador globalmente:
   ```bash
   npm install -g ddd-skeleton
   ```

2. Para obtener ayuda sobre los comandos disponibles:
   ```bash
   ddd-skeleton --help
   ```

---

## 📂 Estructura de Archivos y Carpetas

El generador crea una estructura predeterminada siguiendo el modelo de Diseño Impulsado por Dominios (DDD), permitiendo una mejor organización y escalabilidad del proyecto. La estructura es la siguiente:

```
src/
├── contexts/
│   ├── template/
│   │   ├── application/
│   │   │   └── DTO/
│   │   │       ├── TemplateDTO.ts
│   │   │   └── usecases/
│   │   │       ├── TemplateCreateUseCase.ts
│   │   │       ├── TemplateFindUseCase.ts
│   │   │       ├── TemplateUpdateUseCase.ts
│   │   │       └── TemplateDeleteUseCase.ts
│   │   ├── config/
│   │   │   ├── databaseConfig,ts/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   └── Template.ts
│   │   │   ├── repositories/
│   │   │   │   └── IDatabaseDriver.ts
│   │   │   │   └── IDatabaseRepository.ts
│   │   │   │   └── IUseCases.ts
│   │   │   ├── services/
│   │   │   │   └── TemplateService.ts
│   │   │   ├── valueObjects/
│   │   │   │   └── TemplateId.ts
│   │   ├── infrastructure/
│   │   │   ├── factories/
│   │   │   │   └── DatabaseConnectionFactory.ts
│   │   │   │   └── RepositoryFactory.ts
│   │   │   ├── repositories/
│   │   │   │   └── MemoryRepository.ts
│   │   │   │   └── MongoDBRepository.ts
│   │   │   │   └── PostgresRepository.ts
│   │   │   ├── persistence/
│   │   │   │   └── DatabaseConnection.ts
│   │   │   │   └── LocalStore.ts
│   │   │   │   └── MongoDBConnection.ts
│   │   │   │   └── PostgresConnection.ts
│   │   ├── presentation/
│   │   │   ├── http/
│   │   │   │   └── TemplateController.ts
│   │   │   ├── validators/
│   │   │   │   └── TemplateValidator.ts
│   │   └── utils/
│   │       ├── prepareDataDriverMemory.ts/
│   │       ├── prepareDataDriverMongodb.ts/
│   │       ├── prepareDataDriverPostgres.ts/
├── shared/
│   ├── enums/
│   │   └── General.ts
│   │   └── Responses.ts
│   ├── interfaces/
│   │   └── IMapper.ts
│   │   └── Responses.ts
│   ├── mappers/
│   │   └── MapToHttpResponse.ts
│   ├── responses/
│   │   └── BadRequestResponse.ts
│   │   └── InternalErrorResponse.ts
│   │   └── ResourceNotFoundResponse.ts
│   ├── types/
│   │   └── CommonType.ts
│   │   └── ValidationError.ts
│   ├── utils/
│   │   └── Either.ts
│   │   └── HandleError.ts
│   ├── validators/
│   │   └── Validator.ts
│   └── services/
│       └── EmailNotificationService.ts
│       └── INotificationService.ts
└── ApplicationCore.ts
└── ControllerDependencyInjector.ts
└── main.ts
```

---
## 🔠 Comandos Disponibles

### Crear un Proyecto Inicial
Este comando crea la estructura base de un proyecto con el nombre proporcionado:
```bash
ddd-skeleton --create-project --name=<name>
# Ejemplo:
ddd-skeleton --create-project --name=user
```
---
### Instalar Dependencias, Compilar y Ejecutar
Después de crear un proyecto, puedes instalar las dependencias, compilar y ejecutar el proyecto con:
```bash
npm i && npm run build && npm start
```

### Crear un Contexto
Este comando permite crear un nuevo contexto dentro del proyecto:
```bash
ddd-skeleton --create-context --name=<context>
# Ejemplo:
ddd-skeleton --create-context --name=auth
```

---
## Descripción General del Funcionamiento de la Aplicación:
- La aplicación está diseñada para ser flexible y dinámica, permitiendo que la configuración de la base de datos y el comportamiento de las fábricas dependan del driver configurado. Los archivos clave para su funcionamiento inicial incluyen la configuración dinámica del databaseConfig.ts, que determina qué driver utilizar (ya sea memory, mongodb o postgres). A partir de este valor, las fábricas y demás configuraciones se ajustan automáticamente para trabajar con el tipo de base de datos seleccionado, sin necesidad de intervención manual en los archivos posteriores.

- El resto de la aplicación sigue una estructura basada en Domain-Driven Design (DDD), lo que significa que la lógica y los componentes están organizados en torno a los dominios de negocio, y no se explicarán en detalle en esta ocasión, ya que se centran en la implementación interna.

- Esta implementación dinámica permite que el sistema sea altamente adaptable a diferentes configuraciones de base de datos, facilitando el mantenimiento y la escalabilidad.

## Funcionamiento General
- El Archivo de Configuración `\src\contexts\namecontext\config\databaseConfig.ts`: Este archivo define el objeto databaseConfig, que especifica la configuración del driver de la base de datos que se utilizará en la aplicación. Las fábricas y configuraciones trabajan automáticamente en función del valor del driver indicado. Actualmente, solo se soportan tres tipos de drivers.

- Configuración Inicial: La función ApplicationCore.initialize() se encarga de inicializar el contexto de la aplicación, estableciendo la conexión y el repositorio según la configuración de la base de datos. Esto es posible gracias a las fábricas DatabaseConnectionFactory y RepositoryFactory.

- Inyección de Dependencias: La clase ControllerDependencyInjector es responsable de configurar el controlador de la aplicación, inyectando las dependencias necesarias (como el servicio, repositorio, y drivers) para los casos de uso relacionados con los templates.

- Operaciones: Una vez configurado el controlador, las operaciones de creación, actualización, eliminación y búsqueda de templates se ejecutan a través del controlador (TemplateController), que a su vez utiliza los casos de uso correspondientes.

## Descripción de la estructura:
- contexts/: Contiene los diferentes contextos de dominio. Cada contexto tiene una carpeta application con los casos de uso, domain con las entidades, repositorios y servicios, infrastructure con la implementación de repositorios y conexiones de base de datos, y presentation para controladores y validadores.

- shared/: Contiene componentes comunes que pueden ser reutilizados en varios contextos, como enums, interfaces, mappers, respuestas de error, y servicios.

- config/: Archivos de configuración como el archivo databaseConfig.ts para definir los drivers y conexiones a bases de datos.

- ApplicationCore: El ApplicationCore es responsable de inicializar el contexto central de la aplicación, como la creación de la conexión a la base de datos, la obtención del driver adecuado y la creación del repositorio que interactuará con la base de datos. Este módulo utiliza las fábricas DatabaseConnectionFactory y RepositoryFactory. initialize(): Aquí se configura la base de datos y el repositorio mediante las fábricas.

- ControllerDependencyInjector: Este módulo configura el controlador de la aplicación, inyectando las dependencias necesarias (como el servicio, el repositorio y el driver) para la correcta ejecución de las operaciones en la capa de presentación. setupController(): Este método crea instancias de los casos de uso (como CreateUseCase, FindUseCase, etc.) y luego las pasa al Controller. La configuración de estas dependencias es gestionada a través del patrón de inyección de dependencias.

- DatabaseConnectionFactory: Este módulo gestiona las conexiones a la base de datos, y utiliza un mapa de conexiones para determinar qué clase utilizar en función del tipo de base de datos (actualmente soporta, mongodb, postgres, o memory). createConnection(): Crea una conexión a la base de datos según el tipo de driver configurado. getDriver(): Obtiene el driver correspondiente para la base de datos especificada.

- RepositoryFactory: Este módulo utiliza el patrón de fábrica para crear un repositorio adecuado dependiendo del tipo de base de datos. createRepository(): Crea una instancia del repositorio adecuado según el driver de base de datos (por ejemplo, MongoDBRepository, PostgresRepository, o MemoryRepository).

---
## 🔧 Configuration

### Conexión a Bases de Datos
Por defecto, el generador utiliza un driver "memory" para almacenar los datos en memoria. Para cambiar el driver y conectar a una base de datos, sigue estas instrucciones:

#### MongoDB:

- Cambia el driver en el archivo src/contexts/template/config/databaseConfig.ts a mongodb.
- Agrega las credenciales de MongoDB en el archivo .env.

#### PostgreSQL:

- Cambia el driver en el archivo src/contexts/template/config/databaseConfig.ts a postgres.
- Agrega las credenciales de PostgreSQL en el archivo .env.
- Asegúrate de crear la tabla correspondiente con el siguiente DDL:

Copiar código
```sql
CREATE TABLE public.change_me (
    id varchar NULL,
    "name" varchar NULL,
    status varchar NULL
);
```
### Variables de Entorno
 - Para conectar a las bases de datos, asegúrate de configurar las siguientes variables de entorno:
 - Se crea un archivo .env con la siguiente información.

Copiar código
```bash
POSTGRES_HOST=<host>
POSTGRES_USER=<user>
POSTGRES_PASSWORD=<password>
POSTGRES_DB=<database>
POSTGRES_PORT=<port>

MONGODB_URI=<uri>
MONGODB_HOST=<host>
MONGODB_PORT=<port>
MONGODB_USER=<user>
MONGODB_PASSWORD=<password>
MONGODB_DATABASE=<database>
```

---
## 💡 Notas
- Los nombres de los contextos y archivos deben seguir las convenciones de nombres de TypeScript (camelCase o PascalCase).
- La estructura generada está diseñada para facilitar la escalabilidad y organización de proyectos grandes.
- Puedes personalizar la estructura según tus necesidades, agregando o modificando los contextos y componentes.

- Actualmente todo el proyecto tiene configurado los atributos genéricos:
```sql
id, name, status
```
- Puede adaptarlo según sea su caso.

---
### ✨ ¡Contribuciones Bienvenidas!
Si deseas mejorar esta herramienta o agregar nuevas funcionalidades, no dudes en enviar tus pull requests o crear issues en el repositorio.

