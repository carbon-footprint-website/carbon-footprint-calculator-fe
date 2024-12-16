# 빌드 단계
FROM node:18 AS build-stage

WORKDIR /app

# package.json 복사 및 의존성 설치
COPY package*.json ./
RUN npm cache clean --force && npm install --no-optional

# 소스 코드 복사 및 빌드
COPY . . 
RUN npm run build

# 배포 단계
FROM node:18 AS production-stage

WORKDIR /app

# 빌드 결과물 복사
COPY --from=build-stage /app/dist ./dist

# 정적 파일 서빙
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]

# 포트 열기
EXPOSE 3000
