# Chipscendles Backend API

Backend API cho ứng dụng Chipscendles sử dụng Express.js, PostgreSQL, TypeScript và Cloudinary.

## 🚀 Tính năng

- **Products API**: Quản lý sản phẩm với tìm kiếm, lọc và phân trang
- **Boxes API**: Quản lý hộp đựng với tìm kiếm, lọc và phân trang
- **Cards API**: Quản lý thiệp với tìm kiếm, lọc và phân trang
- **Molds API**: Quản lý khuôn đúc với tìm kiếm, lọc và phân trang
- **Scents API**: Quản lý hương liệu với tìm kiếm, lọc và phân trang
- **Colors API**: Quản lý màu sắc với tìm kiếm, lọc và phân trang
- **Categories API**: Quản lý danh mục sản phẩm
- **Reviews API**: Quản lý đánh giá khách hàng
- **Upload API**: Tải ảnh lên Cloudinary
- **Authentication**: Đăng ký, đăng nhập và quản lý người dùng
- **Database**: PostgreSQL với connection pooling
- **Image Processing**: Cloudinary cho tối ưu hóa ảnh

## 📋 Yêu cầu hệ thống

- Node.js 18+
- Neon PostgreSQL database (hoặc PostgreSQL local)
- Cloudinary account

## 🛠️ Cài đặt

1. **Clone repository**
```bash
cd chipscendlebe
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Cấu hình environment**
```bash
cp env.example .env
```

Chỉnh sửa file `.env` với thông tin của bạn:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=chipscendles_db
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

4. **Cấu hình Neon Database**

   **Cách 1: Sử dụng DATABASE_URL (Khuyến nghị)**
   ```env
   DATABASE_URL=postgresql://username:password@ep-example-123456.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

   **Cách 2: Sử dụng individual parameters**
   ```env
   DB_HOST=ep-example-123456.us-east-1.aws.neon.tech
   DB_PORT=5432
   DB_NAME=neondb
   DB_USER=username
   DB_PASSWORD=password
   DB_SSL=true
   ```

5. **Khởi tạo database tables**
```bash
npm run dev
```

6. **Seed dữ liệu mẫu (tùy chọn)**
```bash
npm run seed
```

## 🚀 Chạy ứng dụng

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## 📚 API Endpoints

### Products
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/:id` - Lấy chi tiết sản phẩm
- `GET /api/products/featured` - Lấy sản phẩm nổi bật
- `GET /api/products/category/:category` - Lấy sản phẩm theo danh mục
- `GET /api/products/search` - Tìm kiếm sản phẩm

### Boxes
- `GET /api/boxes` - Lấy danh sách hộp đựng
- `GET /api/boxes/:id` - Lấy chi tiết hộp đựng
- `GET /api/boxes/category/:category` - Lấy hộp đựng theo danh mục
- `GET /api/boxes/search/:query` - Tìm kiếm hộp đựng
- `GET /api/boxes/categories/all` - Lấy danh sách danh mục hộp đựng

### Cards
- `GET /api/cards` - Lấy danh sách thiệp
- `GET /api/cards/:id` - Lấy chi tiết thiệp
- `GET /api/cards/category/:category` - Lấy thiệp theo danh mục
- `GET /api/cards/search/:query` - Tìm kiếm thiệp
- `GET /api/cards/categories/all` - Lấy danh sách danh mục thiệp

### Molds
- `GET /api/molds` - Lấy danh sách khuôn đúc
- `GET /api/molds/:id` - Lấy chi tiết khuôn đúc
- `GET /api/molds/category/:category` - Lấy khuôn đúc theo danh mục
- `GET /api/molds/search/:query` - Tìm kiếm khuôn đúc
- `GET /api/molds/categories/all` - Lấy danh sách danh mục khuôn đúc

### Scents
- `GET /api/scents` - Lấy danh sách hương liệu
- `GET /api/scents/:id` - Lấy chi tiết hương liệu
- `GET /api/scents/category/:category` - Lấy hương liệu theo danh mục
- `GET /api/scents/search/:query` - Tìm kiếm hương liệu
- `GET /api/scents/categories/all` - Lấy danh sách danh mục hương liệu

### Colors
- `GET /api/colors` - Lấy danh sách màu sắc
- `GET /api/colors/:id` - Lấy chi tiết màu sắc
- `GET /api/colors/category/:category` - Lấy màu sắc theo danh mục
- `GET /api/colors/search/:query` - Tìm kiếm màu sắc
- `GET /api/colors/categories/all` - Lấy danh sách danh mục màu sắc

### Categories
- `GET /api/categories` - Lấy danh sách danh mục
- `GET /api/categories/:category` - Lấy chi tiết danh mục

### Reviews
- `GET /api/reviews` - Lấy danh sách đánh giá
- `GET /api/reviews/:id` - Lấy chi tiết đánh giá
- `GET /api/reviews/product/:productId` - Lấy đánh giá theo sản phẩm
- `GET /api/reviews/featured` - Lấy đánh giá nổi bật

### Upload
- `POST /api/upload/single` - Tải ảnh đơn
- `POST /api/upload/multiple` - Tải nhiều ảnh
- `POST /api/upload/product` - Tải ảnh sản phẩm
- `POST /api/upload/category` - Tải ảnh danh mục
- `DELETE /api/upload/:publicId` - Xóa ảnh

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user hiện tại
- `PUT /api/auth/change-password` - Đổi mật khẩu

### Statistics
- `GET /api/orders/stats` - Thống kê đơn hàng
- `GET /api/users/stats` - Thống kê người dùng

## 🔧 Scripts

```bash
npm run dev          # Chạy development server
npm run build        # Build production
npm run start        # Chạy production server
npm run seed         # Seed dữ liệu mẫu
npm run test         # Chạy tests
npm run test:api     # Test API endpoints
npm run test:neon    # Test Neon database connection
npm run lint         # Kiểm tra code style
npm run lint:fix     # Tự động sửa code style
```

## 📊 Database Schema

### Products
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR)
- `description` (TEXT)
- `price` (DECIMAL)
- `category` (VARCHAR)
- `image_url` (VARCHAR)
- `stock_quantity` (INTEGER)
- `featured` (BOOLEAN)
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Boxes
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR)
- `description` (TEXT)
- `price` (DECIMAL)
- `category` (VARCHAR)
- `category_name` (VARCHAR)
- `image_url` (VARCHAR)
- `material` (VARCHAR)
- `size` (VARCHAR)
- `capacity` (VARCHAR)
- `rating` (DECIMAL)
- `in_stock` (BOOLEAN)
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Cards
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR)
- `description` (TEXT)
- `price` (DECIMAL)
- `category` (VARCHAR)
- `category_name` (VARCHAR)
- `image_url` (VARCHAR)
- `material` (VARCHAR)
- `size` (VARCHAR)
- `design` (VARCHAR)
- `rating` (DECIMAL)
- `in_stock` (BOOLEAN)
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Molds
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR)
- `description` (TEXT)
- `price` (DECIMAL)
- `category` (VARCHAR)
- `category_name` (VARCHAR)
- `image_url` (VARCHAR)
- `material` (VARCHAR)
- `size` (VARCHAR)
- `capacity` (VARCHAR)
- `rating` (DECIMAL)
- `in_stock` (BOOLEAN)
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Scents
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR)
- `description` (TEXT)
- `price` (DECIMAL)
- `category` (VARCHAR)
- `category_name` (VARCHAR)
- `image_url` (VARCHAR)
- `material` (VARCHAR)
- `volume` (VARCHAR)
- `intensity` (VARCHAR)
- `rating` (DECIMAL)
- `in_stock` (BOOLEAN)
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Colors
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR)
- `description` (TEXT)
- `price` (DECIMAL)
- `category` (VARCHAR)
- `category_name` (VARCHAR)
- `image_url` (VARCHAR)
- `material` (VARCHAR)
- `weight` (VARCHAR)
- `intensity` (VARCHAR)
- `rating` (DECIMAL)
- `in_stock` (BOOLEAN)
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Reviews
- `id` (SERIAL PRIMARY KEY)
- `product_id` (INTEGER REFERENCES products)
- `customer_name` (VARCHAR)
- `customer_email` (VARCHAR)
- `rating` (INTEGER)
- `comment` (TEXT)
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Users
- `id` (SERIAL PRIMARY KEY)
- `email` (VARCHAR UNIQUE)
- `password_hash` (VARCHAR)
- `first_name` (VARCHAR)
- `last_name` (VARCHAR)
- `role` (VARCHAR)
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## 🔒 Bảo mật

- Helmet.js cho security headers
- CORS configuration
- Rate limiting
- Input validation
- SQL injection protection
- JWT authentication

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `DATABASE_URL` | Neon connection string | - |
| `DB_HOST` | Database host | localhost |
| `DB_PORT` | Database port | 5432 |
| `DB_NAME` | Database name | chipscendles_db |
| `DB_USER` | Database user | postgres |
| `DB_PASSWORD` | Database password | - |
| `DB_SSL` | Enable SSL connection | false |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRES_IN` | JWT expiration | 7d |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | - |
| `CLOUDINARY_API_KEY` | Cloudinary API key | - |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | - |
| `CORS_ORIGIN` | CORS origin | http://localhost:3000 |

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

ISC License 

## Gửi bill về email khi có đơn hàng mới

1. Cài đặt biến môi trường trong file `.env` (tạo nếu chưa có):

```
GMAIL_USER=chienbui10052003@gmail.com
GMAIL_PASS=APP_PASSWORD_CUA_BAN
```

- GMAIL_PASS là App Password, không phải mật khẩu Gmail thông thường. Xem hướng dẫn tạo tại: https://support.google.com/accounts/answer/185833

2. Khi có bill mới, hệ thống sẽ tự động gửi thông tin bill về email này. 