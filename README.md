# expense-tracker

This app lets you keep track of your money by putting in your income and expenses.

## How to use

Clone the project:

```bash
git clone https://github.com/ViaxCo/expense-tracker.git
```

Install dependencies:

```bash
npm install && cd client && npm install
```

Create a `.env` file for these environment variables:

```
NODE_ENV=development
DB_USERNAME=
DB_PASSWORD=
DB_HOST=
SECRET=
```

Run the dev server and client concurrently:

```bash
npm i -D concurrently
npm run dev
```

Build out the project for production:

```bash
npm run build && cd client && npm run build
```

The frontend production files would be contained in: "client/build", while the backend files would be in "dist"

## Demo

A live demo of the code can be found here: [Expense Tracker](https://viaxco-expense-tracker.herokuapp.com/)
