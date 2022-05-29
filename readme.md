## Это BACKEND для https://github.com/Maxim-Ba/dron-project

# Запуск приложения 
- npm i 
- создать DB Postgresql (файл с командами инициализации https://github.com/Maxim-Ba/dron-project-backend/blob/master/db/db.sql)
- создать файл .env   с содержимым:
> PORT=5432
> PGHOST='localhost'
> PGUSER='postgres'
> PGDATABASE=dron-project
> PGPASSWORD=12341234
>PGPORT=5432
> 
> SECRET_KEY="SECRET_KEY"

- npm run start:dev

