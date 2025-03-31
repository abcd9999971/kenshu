### front
frontend/my-add で  
```bash
npm run dev
```
ポート番号は5173 (http://localhost:5173/)


### backend
このフォルダ(TODO_PROJECT)で
```bash
poetry run python manage.py runserver
```
ポート番号は8000 (http://localhost:8000/)

###使用可能なAPI
| HTTP メソッド | URL パス                                      | 機能説明                                   |
| ------------- | --------------------------------------------- | ------------------------------------------ |
| GET           | /tasks/                                       | すべてのタスクを取得する                   |
| POST          | /tasks/                                       | 新しいタスクを作成する                     |
| GET           | /tasks/{id}/                                  | 特定のタスクを取得する                     |
| PATCH         | /tasks/{id}/completed                         | タスクを完了または未完了に設定する           |
| POST          | /tasks/{id}/subtasks/                         | サブタスクを作成する                       |
| DELETE        | /tasks/{id}/delete_subtask/{subtask_id}/      | サブタスクを削除する                       |
| GET           | /tasks/search/                                | タスクを検索する                           |
| PATCH         | /tasks/{id}/completed/{subtask_id}/           | サブタスクを完了または未完了に設定する       |

ここで、フロントエンドとバックエンドの用語を分けました

| フロント | バック  |
| -------- | -------- |
|Task | Todo |
|SubTask | Detail(詳細) |




