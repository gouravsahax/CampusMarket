# peerproducts

> A type-safe product recommendation social network built with Next.js 16, React 19, Prisma, Neon PostgreSQL, Docker, Nginx, and GitHub Actions.

**Live Platform:** [https://peer.idea-rader.com](https://peer.idea-rader.com)


---

### How to Run Locally

To run this application on your local computer:

1. **Install dependencies:**
   ```bash
   npm ci
   ```
   *(This downloads and installs all library packages needed to run the website code).*

2. **Generate Database Client & Sync Schema:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```
   *(This builds the database connection tools and sets up the required tables inside PostgreSQL).*

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   *(This starts a local server at http://localhost:3000 where you can see code updates in real-time).*


---

### What Was Done

#### 1. Decoupled Architecture Setup
- Migrated database layer from local container to a cloud-managed **Neon Serverless PostgreSQL** database to separate compute and state.
  *(This means we moved our database out of the main server and onto a specialized cloud service. This frees up our server's memory and lets our database scale automatically as traffic grows.)*
- Configured secure TLS connection strings between the Next.js app server and Neon.
  *(This means we encrypted the connection between our website and our database. Any data sent between them—like usernames, passwords, or posts—is scrambled and safe from hackers.)*

#### 2. Containerization & Orchestration
- Packaged the runtime using a multi-stage **Dockerfile** based on `node:20-alpine`, resolved with compatibility layers (`libc6-compat`, `ca-certificates`, `openssl`).
  *(This means we packed our website code and its dependencies into a lightweight, self-contained virtual box. This ensures it runs exactly the same way on our laptop, a testing server, or a production AWS server.)*
- Orchestrated environments via **Docker Compose**, passing environment keys (`AUTH_SECRET`, `AUTH_TRUST_HOST`, `GOOGLE_CLIENT_ID`, `CLOUDINARY_API_KEY`) and automated database migrations execution on container startup.
  *(This means we wrote a master control file to launch our app container with all its secret settings—like Google login keys—and made it automatically apply database structure updates every time the app starts up.)*

#### 3. Ingress Reverse Proxy & SSL Setup
- Implemented **Nginx** as a reverse proxy, mapping public ports 80/443 to container port 3000.
  *(This means we set up Nginx as a gatekeeper at our public address. It receives web requests from users and safely directs them to our application running inside its container.)*
- Configured proxy headers (`Host`, `X-Forwarded-Proto`, `X-Forwarded-For`) to resolve NextAuth v5 `UntrustedHost` and secure HTTPS redirection conflicts.
  *(This means we instructed Nginx to pass the user's real domain name and secure connection protocol to our login system. This fixed bugs where the login system blocked requests thinking they were insecure or unauthorized.)*
- Secured the domain `peer.idea-rader.com` with Let's Encrypt certificates using **Certbot** for automated SSL termination and renewals.
  *(This means we turned on the secure lock icon/HTTPS at our domain address and configured it to renew itself automatically so the certificate never expires.)*

#### 4. Database Drift & Migration Safeguards
- Resolved Prisma migrations lock (`P3009`) by writing a script to purge failed runs in the database history (`_prisma_migrations`).
  *(This means we wrote a quick database cleaner tool to clear a stuck migration check that was blocking our database from receiving new code updates.)*
- Rewrote the database schema migration to be idempotent, introducing database guards (`ALTER TABLE IF EXISTS`, `DROP CONSTRAINT IF EXISTS`, `DROP TABLE IF EXISTS`) to secure existing data against collisions.
  *(This means we modified our database structure scripts so they can be run multiple times safely without crashing or accidentally deleting existing user tables.)*

#### 5. Google OAuth 2.0 Identity Flow
- Configured Google OAuth login callbacks to sync with NextAuth's token exchange.
  *(This means we connected our app to Google's login system so users can sign in securely using their Google Account.)*
- Aligned Nginx schemes with Google Developer Console callbacks to eliminate protocol redirects mismatch.
  *(This means we synced our proxy settings with Google's security settings, ensuring the user is successfully sent back to a secure page after logging in.)*

#### 6. Continuous Integration & Deployment (CI/CD)
- Built an automated **GitHub Actions** pipeline triggered on push to `main`.
  *(This means we set up an automated robot that watches our code repository. The moment we push new code to GitHub, the robot automatically starts building and deploying it.)*
- Compiles the application image with advanced layer caching (`Buildx` GHA cache) and publishes to Docker Hub.
  *(This means our robot builds our Docker package and speeds up future builds by reusing unchanged parts, then uploads it to a public cloud registry.)*
- Automatically connects to the AWS EC2 instance via SSH keys and performs rolling container reloads with zero downtime.
  *(This means our robot logs into our AWS cloud server securely, downloads the new package, and swaps the running app with the new version instantly without anyone noticing any downtime).*