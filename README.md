# Money Trader Application

This repository contains the code for the Money Trader application, which uses Docker for deployment and PostgreSQL as a database.

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your system.

### Browser
- http://localhost:4200

### Environment Variables

Create a `.env` file within the `money-trader` directory (`/money-trader/.env`) with the following variables:

```plaintext
FCSAPI_URL=https://fcsapi.com/api-v3/forex/latest
FCSAPI_KEY=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_PORT=5432
HTTP_PORT=3000

