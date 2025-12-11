# Docker Deployment for Coolify

This project is configured for deployment using Coolify with Docker Compose.

## Files Created

- `Dockerfile`: Multi-stage build optimized for Next.js production
- `docker-compose.yml`: Coolify-compatible deployment configuration
- `.dockerignore`: Excludes unnecessary files from build context
- `next.config.ts`: Updated with `output: 'standalone'` for Docker deployment

## Coolify Deployment

1. Push your code to a Git repository
2. In Coolify, create a new project from your Git repository
3. Coolify will automatically detect and use the `docker-compose.yml` file
4. The application will be available on port 3000

## Environment Variables

If your application requires environment variables, you can set them in Coolify:

- `NODE_ENV=production` (automatically set)
- `NEXT_TELEMETRY_DISABLED=1` (automatically set)
- Add any other environment variables your app needs

## Local Testing

To test the Docker setup locally:

```bash
# Build the image
docker build -t tody-website .

# Run with docker-compose
docker-compose up

# Or run directly
docker run -p 3000:3000 tody-website
```

The application will be available at `http://localhost:3000`
