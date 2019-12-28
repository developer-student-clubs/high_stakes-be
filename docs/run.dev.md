## Steps to run server in Dev
### Docker
- Setup Docker following steps in the other doc.
- Run `docker-compose up -d`
- `-d` signifies Detached mode. Containers run in background.
- Try messing around inside containers to learn more.
- Use `docker exec -it container_name bash` to enter a container.
- **NOTE** : Docker uses pm2 to serve node app. So app will always be in production server.
- This behaviour can be changed by changing Dockerfile.

### Normal
- Just run `node /src/index.js`
- For production mode:
- Run `pm2-runtime ecosystem.config.js`
