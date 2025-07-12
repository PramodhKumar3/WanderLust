# WanderLust 🧭

    Full Stack Java Peoject Using SpringBoot

## 📑 Table of Contents

1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [Project Setup](#project-setup)
   - [Backend - Spring Boot](#backend---spring-boot)
   - [Frontend - Angular](#frontend---angular)
   - [Database - MySQL Setup](#database---mysql-setup)
4. [Running the Application](#running-the-application)
5. [Running JUnit Tests in Spring Tool Suite](#running-junit-tests-in-spring-tool-suite)
6. [Log4j2 Setup](#log4j2-setup)
7. [Contributing](#contributing)
8. [Screenshots](#screenshots)
9. [Author](#author)

---

## 🧾 Introduction

**WanderLust** is a full-stack travel booking application built using **Spring Boot (backend)** and **Angular (frontend)**. It allows users to plan and book travel journeys with ease. The project integrates JUnit for backend testing and provides a seamless user experience from both ends.

The aim of WanderLust is to assist users in choosing, customizing, and booking their perfect travel plan with data-driven suggestions and easy-to-use features.

---

## 🛠 Technologies Used

- **Spring Boot** (v3.2.4)
- **Angular**
- **MySQL**
- **Log4j2**
- **JUnit**
- **ModelMapper**
- **Swagger (Springdoc OpenAPI)**
- **Maven**
- **STS (Spring Tool Suite)**

---

## ⚙️ Project Setup

### 📌 Backend - Spring Boot

#### Required Dependencies in `pom.xml`:

- **Spring Boot Starter (core)**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-logging</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

- **Spring Boot Log4j2 (logging)**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-log4j2</artifactId>
</dependency>
```

- **Spring Boot Web (REST and MVC)**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

- **Spring Boot Validation (Bean validation)**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

- **Spring Boot JPA (Data Access)**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

- **MySQL JDBC Driver**

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.32</version>
    <scope>runtime</scope>
</dependency>
```

- **ModelMapper (DTO mapping)**

```xml
<dependency>
    <groupId>org.modelmapper</groupId>
    <artifactId>modelmapper</artifactId>
    <version>3.2.0</version>
</dependency>
```

- **Lombok (Boilerplate code reduction)**

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <scope>provided</scope>
</dependency>
```

- **Springdoc OpenAPI (Swagger UI)**

```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.6.0</version>
</dependency>
```

- **Spring Boot DevTools (Live reload)**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>
```

- **Spring Boot Test (Testing with JUnit)**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
    <exclusions>
        <exclusion>
            <groupId>org.junit.vintage</groupId>
            <artifactId>junit-vintage-engine</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

---

### 🌐 Frontend - Angular

1. Install [Node.js](https://nodejs.org/) (v16 or above).
2. Install Angular CLI globally:
   ```bash
   npm install -g @angular/cli
   ```
3. Navigate to your Angular project folder:
   ```bash
   cd wanderlust-frontend
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Run the Angular server:
   ```bash
   ng serve --open
   ```

---

### 🗃️ Database - MySQL Setup

```sql
CREATE DATABASE wanderlust;
```

To import the `tablescripts.sql`:

```bash
mysql -u root -p wanderlust < path/to/tablescripts.sql
```

Or open and execute manually via MySQL Workbench or CLI.

---

## ▶️ Running the Application

**Backend:** Run via STS → Run as Spring Boot App.  
Access Swagger UI: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

**Frontend:** Run `ng serve --open` and open `http://localhost:4200`.

---

## 🧪 Running JUnit Tests

```bash
mvn test
```

Or via STS → `Run As → JUnit Test`.

---

## 📋 Log4j2 Setup

Add `log4j2.xml` under `src/main/resources`. Example provided in this repo.

---

## 🤝 Contributing

```bash
git checkout -b feature-branch
# make changes
git commit -m 'Add feature'
git push origin feature-branch
```

Then open a Pull Request.

---

## 🖼️ Screenshots

![Wanderlust Home Page](<Screenshot%20(185).png>)
![Wanderlust Logged In](<Screenshot%20(186).png>)

---

## 👤 Author

**T. Pramodh Kumar**  
Project: **WanderLust**

---

## 🔐 Configuration Example

**application.properties.example**

```
spring.datasource.url=jdbc:mysql://localhost:3306/wanderlust
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
logging.level.org.springframework=INFO
server.port=8080
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 📁 .gitignore

```
/target/
/node_modules/
/.env
*.log
*.class
*.jar
*.war
.DS_Store
.idea/
*.iml
.vscode/
```

---

Project Link: [https://github.com/Pramodh9653/WanderLust](https://github.com/Pramodh9653/WanderLust)

[Back to top](#WanderLust)
