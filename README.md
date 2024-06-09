### Initilize Hono for cloudflare workers

```
npm create hono@latest fuzzy-train
```

Then you will be asked which template you would like to use. Select Cloudflare Workers for this project.

```
? Which template do you want to use?
    aws-lambda
    bun
    cloudflare-pages
❯   cloudflare-workers
    deno
    fastly
    nextjs
    nodejs
    vercel
```

```
cd fuzzy-train
npm i
```

### Create a neon project and get the connection string

In the root of the project, create a .dev.vars file and add the neon connection string as an environment variable.

```
DATABASE_URL="postgresql://<username>:<password>@ep-dry-violet-a5iayyaq.us-east-2.aws.neon.tech/neondb"
```

### Add drizzle-orm to the project

```
npm i drizzle-orm @neondatabase/serverless
npm i -D drizzle-kit postgres dotenv tsx
```

### Define schema
In the source directory create a new db/schemas/product.schema.ts file

```
import { pgTable, serial, text, doublePrecision } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name'),
  description: text('description'),
  price: doublePrecision('price'),
});
```