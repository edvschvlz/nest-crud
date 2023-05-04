## 💻 Technologies

- [Nest](https://nestjs.com/)
- [Typescript](https://www.typescriptlang.org)
- [TypeORM](https://typeorm.io/)
- [Docker](https://www.docker.com)
- [PostgreSQL](https://www.postgresql.org)

## 🔥 Installation

### Running application with docker-compose

1. Clone the repo

   ```sh
   $ git clone https://github.com/edvschvlz/nest-crud.git
   ```

2. Configure environment variables in [docker-compose](./docker-compose.yml)

3. Run the app

   ```sh
   $ docker-compose up -d
   ```

4. The app will be exposed on port `3000`

5. If you want to stop it
   ```sh
   $ docker-compose down
   ```

### Running application without docker-compose

1. Clone the repo

   ```sh
   $ git clone https://github.com/edvschvlz/nest-crud.git
   ```

2. Configure environment variables, create a file called `.env` like `.env.example` (you can basically copy and paste)

3. Install dependencies

   ```sh
   $ npm install
   ```

4. Run the app

   ```
   $ npm run start
   ```

5. The app will be exposed on port `3000`

## API Reference

- [Postman Collection](./Nest-CRUD.postman_collection.json)
