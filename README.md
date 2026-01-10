# Laravel API Server

This documentation provides steps to set up and run the Laravel API server.

## Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js and NPM
- MySQL or compatible database

## Installation

1. Clone the repository to your local machine.

2. Install PHP dependencies:
   composer install

3. Install JavaScript dependencies:
   npm install

4. Configure the environment:
   - Copy .env.example to .env
   - Update database credentials in .env
   - Set other necessary configurations

5. Generate the application key:
   php artisan key:generate

6. Run database migrations:
   php artisan migrate

## Running the Application

To start the development server, queue listener, and Vite simultaneously, run:

composer run dev

Alternatively, you can run the services individually:

- API Server: php artisan serve
- Vite (Asset compiling): npm run dev
- Queue Worker: php artisan queue:listen

## API Documentation

The API Documentation is generated using Swagger.

After starting the server (default: http://localhost:8000), access the documentation at:

http://localhost:8000/swagger

## Additional Commands

- Generate Swagger Documentation:
  php artisan l5-swagger:generate

- Clear Application Cache:
  php artisan optimize:clear

## Bonus:
If you're on Linux, you can just spin a 

### Spin a MySQL container for this project

```bash
docker run --name laravel-mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=laravel-api-server \
  -e MYSQL_USER=laravel \
  -e MYSQL_PASSWORD=secret \
  -p 3306:3306 \
  -d mysql:latest
```

## Frontend (React + Vite)

The project includes a separate React frontend located in the `frontend` directory.

### Setup & Run
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Access the app at: `http://localhost:8080`

### Features
- **Dashboard**: View and create posts.
- **Comments**: Interactive comments system.
- **Authentication**: Seamless Login/Register via Sanctum.

## Social Features
- **Usernames**: Users have unique usernames.
- **Comments**: Full support for commenting on posts.