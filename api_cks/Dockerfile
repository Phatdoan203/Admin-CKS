# 1. Sử dụng image Node chính thức
FROM node:18-alpine

# 2. Tạo thư mục làm việc trong container
WORKDIR /usr/src/app

# 3. Copy file cấu hình và dependencies
COPY package*.json ./

# 4. Cài đặt dependencies
RUN npm install

# 5. Copy toàn bộ mã nguồn vào container
COPY . .

# 6. Biên dịch TypeScript sang JavaScript
RUN npm run build

# 7. Mở port (tuỳ bạn dùng port nào trong app)
EXPOSE 8001

# 8. Chạy ứng dụng
CMD ["node", "dist/index.js"]
