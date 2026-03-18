# express todo server

MongoDB를 사용하는 간단한 Todo API 서버입니다.


## endpoints

- `GET /`
- `GET /health`
- `GET /api/todos`
- `POST /api/todos`
- `PUT /api/todos/:id`
- `DELETE /api/todos/:id`

## todo shape

```json
{
  "id": "mongo-object-id",
  "title": "할 일",
  "completed": false
}
```
