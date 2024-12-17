# 빌드 단계
FROM node:18 AS build-stage

WORKDIR /app

# package.json 및 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사 및 빌드
COPY . .
RUN npm run build

# 배포 단계
FROM nginx:stable-alpine AS production-stage

# 빌드된 React 앱 복사
COPY --from=build-stage /app/build /usr/share/nginx/html

# Nginx 실행
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
