# DDD Skeleton

**Version:** 1.0.0

**Author:** Elvin Eduardo Gonzalez Bracho

## 🚀 Introduction

DDD Skeleton is a CLI tool designed to dynamically generate a directory structure based on Domain-Driven Design (DDD) principles. It provides an easy way to bootstrap your projects with a robust and scalable architecture.

With this tool, you can focus on development and avoid repetitive setup tasks.

---

## ✨ Features

- Generate a clean and organized DDD structure dynamically.
- Customizable templates for configuration and source files.
- Lightweight and ready-to-use setup for faster development.
- Easy integration with existing workflows.

---

## 📦 Installation

Install `DDD Skeleton` globally using npm:

```bash
npm install -g structure-skeleton-ddd
```

Generate a new project:

```bash
ddd-skeleton --create-project --name=<name>
```

## 📂 Generated File Structure

The generated project will have a structure like this:

```
nameproject/
├── src/
│   ├── contexts/
│   │   ├── user/
│   │   │   ├── application/
│   │   │   │   ├── DTO/
│   │   │   │   ├── usecases/
│   │   │   ├── config/
│   │   │   ├── domain/
│   │   │   ├── infrastructure/
│   │   │   ├── presentation/
│   │   │   └── utils/
│   ├── shared/
│   │   ├── enums/
│   │   ├── interfaces/
│   │   ├── mappers/
│   │   ├── responses/
│   │   ├── types/
│   │   ├── utils/
│   │   └── services/
│   └── ApplicationCore.ts
│   └── ControllerDependencyInjector.ts
│   └── main.ts
├── test/
├── .env
├── package.json
├── README.md
├── tsconfig.json
```

---
## 🔧 Configuration
DDD Skeleton uses customizable templates. You can modify files in the templates directory to suit your specific needs.

---
## 🔒 License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

### 🎉 Contributing
We welcome contributions!
If you'd like to improve this tool or add new features, feel free to submit a pull request or open an issue in the repository.

---

### 📬 Support
For questions or support, contact: elvin.gonzalez@pragma.com.co