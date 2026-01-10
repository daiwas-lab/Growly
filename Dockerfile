FROM node:24-slim

# Install basic dependencies
RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install expo-cli, eas-cli, and @expo/ngrok globally
RUN npm install -g expo-cli eas-cli @expo/ngrok

# Configure git to allow all directories (prevents "dubious ownership" errors with EAS Build)
RUN git config --global --add safe.directory '*'

WORKDIR /app

# The app code will be in a subdirectory (e.g., Growly)
# but we set /app as the home of our container workspace.
EXPOSE 8081

CMD ["sh"]
