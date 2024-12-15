# 빌드 단계
FROM node:18 AS build-stage

WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm cache clean --force && npm install --no-optional

# Vue 애플리케이션 빌드
COPY . .
RUN npm run build

# 배포 단계
FROM node:18 AS production-stage

WORKDIR /app

# 빌드된 파일만 복사
COPY --from=build-stage /app/dist ./dist

# Node.js로 정적 파일 서빙
RUN npm install -g serve

# 앱 실행
CMD ["serve", "-s", "dist", "-l", "3000"]

# 포트번호
EXPOSE 3000