docker compose up --build

env /money-trader/.env

FCSAPI_URL=https://fcsapi.com/api-v3/forex/latest /n
FCSAPI_KEY= /n
POSTGRES_USER= /n
POSTGRES_PASSWORD= /n
POSTGRES_DB= /n
POSTGRES_PORT=5432 /n
HTTP_PORT=3000 /n

http://localhost:4200 (browser incognito if cache issues)
