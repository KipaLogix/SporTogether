# SporTogether back-end

SporTogether back-end.

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/KipaLogix/SporTogether/tree/Structure_Develope
    
    cd /SporTogether/back-end
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a .env file in the root directory and add your database connection string:
    ```bash
    DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
    ```

4. Initialize Prisma and run migrations:


    ```bash
    npx prisma init && npx prisma migrate dev
    ```

5. Start the development server:

    ```bash
    npm start
    ```