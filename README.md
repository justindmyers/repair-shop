This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## MVP Documentation
[Google Docs](https://docs.google.com/document/d/1_NdNHSbmXFqClr9ZO434-oX2VN8ZjTvVAGIagUSB09M/edit?usp=sharing)

## Workflows Covered
* Create a repair request and submit it to the technicians
* View all repair requests
* View all customers

## Getting Started

Run npm install:
```bash
npm install
```
Set up the database:
```base
npx prisma migrate dev --name init
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Technologies Used
* NextJS
* TailwindCSS
* React
* SWR
* React Hook Form
* Prisma
* SQLite