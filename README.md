# Avrupapulse TR

Avrupapulse TR is a digital news platform designed for Turkish-speaking people living in Europe, with a particular focus on the Turkish community in Germany.

The project aims to provide clear, relevant, and accessible news in Turkish about life in Europe, including public affairs, social issues, culture, education, work, and community developments.

## Purpose

The purpose of this project is to build a complete online newspaper platform with two main parts:

- a backend for creating, storing, and publishing articles
- a frontend for presenting published news to readers in a modern and mobile-friendly format

The long-term goal is to create a reliable media product for a real audience, not only a technical demo.

## Project Structure

```text
avrupapulse-tr/
├── backend/      -> Spring Boot API
├── frontend/     -> Web client for readers (planned)
└── README.md
```

## Current Status

The repository currently contains the backend implementation.

The backend already supports:

- creating articles
- publishing articles
- listing published articles

The frontend has not been implemented yet, but it is planned as the next major part of the project.

## Backend

### Technology Stack

- Java 17
- Spring Boot 4
- Spring Web MVC
- Spring Data JPA
- Flyway
- H2 Database
- Maven

### Available Endpoints

```http
GET /
POST /api/articles
POST /api/articles/{id}/publish
GET /api/articles
```

### Article Model

Each article currently includes:

- `id`
- `titleTr`
- `summaryTr`
- `sourceName`
- `sourceUrl`
- `status`
- `createdAt`

Status values:

- `DRAFT`
- `PUBLISHED`
- `ARCHIVED`

### Running the Backend

From the `backend` directory:

```bash
mvn spring-boot:run
```

The application runs on:

```text
http://localhost:8080
```

### Database

The current development setup uses an in-memory H2 database.

Flyway creates the `article` table automatically at startup.

H2 console:

```text
http://localhost:8080/h2-console
```

Default local connection settings:

- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: empty

## Frontend Plan

The frontend will be developed as a separate application under the `frontend/` directory.

Its purpose will be to display published news articles in a clean, fast, and responsive interface for readers. The frontend will consume data from the backend REST API and turn the article records into a usable newspaper-style reading experience.

### Planned Frontend Responsibilities

- show the latest published articles on the homepage
- display article detail pages
- support category-based navigation
- provide a mobile-friendly reading experience
- present a Turkish-language interface

### Recommended Frontend Stack

- React
- Vite
- Tailwind CSS or a modern CSS-based styling approach

### Expected Frontend Flow

The frontend will request published articles from the backend:

```http
GET /api/articles
```

Those results will be shown on the homepage as news cards or headline sections. When article detail support is added on the backend, the frontend can be extended with dedicated article pages.

## Example API Usage

Create an article:

```powershell
$body = @{
  titleTr    = "Test article"
  summaryTr  = "Test summary"
  sourceName = "Tagesschau"
  sourceUrl  = "https://example.com"
} | ConvertTo-Json

$response = Invoke-RestMethod -Method Post `
  -Uri "http://localhost:8080/api/articles" `
  -ContentType "application/json" `
  -Body $body
```

Publish the article:

```powershell
Invoke-RestMethod -Method Post `
  -Uri "http://localhost:8080/api/articles/$($response.id)/publish"
```

List published articles:

```powershell
Invoke-RestMethod -Method Get `
  -Uri "http://localhost:8080/api/articles"
```

## Roadmap

- build the frontend application
- connect the frontend to the backend API
- add article detail support
- add categories and homepage sections
- improve validation and error handling
- add update and delete operations
- move from H2 to PostgreSQL for production
- add authentication and editorial roles
- deploy the platform online

## Summary

Avrupapulse TR is planned as a full digital newspaper platform for Turkish-speaking communities in Europe, especially in Germany. The backend is already in progress, and the next major step is to build the frontend experience that readers will use directly.
