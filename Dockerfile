FROM node:24-slim

# Install basic dependencies
RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install expo-cli, eas-cli, and @expo/ngrok globally
RUN npm install -g expo-cli eas-cli @expo/ngrok

# Configure git to allow all directories (prevents "dubious ownership" errors with EAS Build)
RUN git config --global --add safe.directory '*'

WORKDIR /app/Growly

# 依存関係ファイルをコピーしてインストール
COPY Growly/package*.json ./
RUN npm install

# アプリケーションのコードをコピー
COPY Growly ./

EXPOSE 8081

# 起動コマンドは docker-compose 側で制御するため、ここでは最小限の設定に
CMD ["sh"]
