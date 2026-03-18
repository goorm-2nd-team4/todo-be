# express todo server

## run

```bash
npm install
npm start
```

## endpoints

- `GET /health`
- `GET /api/todos`
- `POST /api/todos`
- `PUT /api/todos/:id`
- `DELETE /api/todos/:id`

## request examples

create:

```json
{
  "title": "스터디 준비",
  "description": "Express 구조 정리",
  "dueDate": "2026-03-20"
}
```

update:

```json
{
  "title": "스터디 준비 완료",
  "description": "CRUD 확인",
  "completed": true,
  "dueDate": "2026-03-21"
}
```
