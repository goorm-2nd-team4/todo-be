# todo-be

Todo 앱 백엔드 프로젝트입니다.

## Stack

- Java 17
- Spring Boot
- Spring Data JPA (Hibernate)
- PostgreSQL
- Swagger (OpenAPI)
- Render

## 실행

```bash
./gradlew bootRun
```

기본 환경 변수:

- `DB_URL=jdbc:postgresql://localhost:5432/todo`
- `DB_USERNAME=postgres`
- `DB_PASSWORD=postgres`
- `PORT=8080`

## API 문서

- Swagger UI: `http://localhost:8080/docs`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

## 현재 포함된 예시 기능

- `GET /health`
- `GET /api/todos`
- `GET /api/todos/{todoId}`
- `POST /api/todos`
- `PUT /api/todos/{todoId}`
- `DELETE /api/todos/{todoId}`

## Render 배포 메모

- Root Directory: `todo-be`
- Build Command: `./gradlew build`
- Start Command: `java -Dserver.port=$PORT -jar build/libs/todo-be-0.0.1-SNAPSHOT.jar`
