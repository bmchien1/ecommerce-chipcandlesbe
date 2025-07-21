"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const database_2 = require("../config/database");
const seedProducts = async () => {
    const products = [
        // Nến Thơm
        {
            name: 'Nến Thơm Lavender',
            description: 'Nến thơm hương lavender thư giãn, giúp giảm stress và cải thiện giấc ngủ',
            price: 150000,
            category: 'candles',
            image_url: 'https://images.unsplash.com/photo-1603006905005-a3c5a5e93640?w=800&h=800&fit=crop',
            stock_quantity: 50,
            featured: true
        },
        {
            name: 'Nến Thơm Vanilla',
            description: 'Nến thơm hương vanilla ngọt ngào, tạo không gian ấm áp và lãng mạn',
            price: 140000,
            category: 'candles',
            image_url: 'https://images.unsplash.com/photo-1603006905005-a3c5a5e93640?w=800&h=800&fit=crop',
            stock_quantity: 45,
            featured: true
        },
        {
            name: 'Nến Thơm Rose',
            description: 'Nến thơm hương hoa hồng lãng mạn, phù hợp cho các dịp đặc biệt',
            price: 160000,
            category: 'candles',
            image_url: 'https://images.unsplash.com/photo-1603006905005-a3c5a5e93640?w=800&h=800&fit=crop',
            stock_quantity: 40,
            featured: false
        },
        // Khuôn Nến
        {
            name: 'Khuôn Nến Hình Trái Tim',
            description: 'Khuôn silicon hình trái tim, dễ tháo và tái sử dụng nhiều lần',
            price: 85000,
            category: 'molds',
            image_url: 'https://images.unsplash.com/photo-1603006905005-a3c5a5e93640?w=800&h=800&fit=crop',
            stock_quantity: 30,
            featured: true
        },
        {
            name: 'Khuôn Nến Hình Tròn',
            description: 'Khuôn silicon hình tròn cơ bản, phù hợp cho người mới bắt đầu',
            price: 65000,
            category: 'molds',
            image_url: 'https://images.unsplash.com/photo-1603006905005-a3c5a5e93640?w=800&h=800&fit=crop',
            stock_quantity: 60,
            featured: false
        },
        {
            name: 'Khuôn Nến Hình Vuông',
            description: 'Khuôn silicon hình vuông hiện đại, tạo nến có góc cạnh đẹp mắt',
            price: 70000,
            category: 'molds',
            image_url: 'https://images.unsplash.com/photo-1603006905005-a3c5a5e93640?w=800&h=800&fit=crop',
            stock_quantity: 35,
            featured: false
        },
        // Màu Nến
        {
            name: 'Bộ Màu Nến 12 Màu',
            description: 'Bộ 12 màu nhuộm nến cơ bản, đa dạng màu sắc cho sáng tạo',
            price: 120000,
            category: 'colors',
            image_url: 'https://images.unsplash.com/photo-1603006905005-a3c5a5e93640?w=800&h=800&fit=crop',
            stock_quantity: 25,
            featured: true
        },
        {
            name: 'Màu Nến Đỏ',
            description: 'Màu nhuộm nến đỏ tươi, tạo nến có màu sắc nổi bật',
            price: 25000,
            category: 'colors',
            image_url: 'https://images.unsplash.com/photo-1603006905005-a3c5a5e93640?w=800&h=800&fit=crop',
            stock_quantity: 100,
            featured: false
        },
        {
            name: 'Màu Nến Xanh Dương',
            description: 'Màu nhuộm nến xanh dương, tạo cảm giác mát mẻ và thư giãn',
            price: 25000,
            category: 'colors',
            image_url: 'https://images.unsplash.com/photo-1603006905005-a3c5a5e93640?w=800&h=800&fit=crop',
            stock_quantity: 80,
            featured: false
        },
        // Hộp Đựng
        {
            name: 'Hộp Quà Cao Cấp',
            description: 'Hộp đựng nến sang trọng, phù hợp làm quà tặng',
            price: 45000,
            category: 'boxes',
            image_url: 'https://images.unsplash.com/photo-1603006905005-a3c5a5e93640?w=800&h=800&fit=crop',
            stock_quantity: 40,
            featured: true
        },
        {
            name: 'Hộp Giấy Kraft',
            description: 'Hộp giấy kraft thân thiện môi trường, bảo vệ sản phẩm tốt',
            price: 25000,
            category: 'boxes',
            image_url: 'https://images.unsplash.com/photo-1603006905005-a3c5a5e93640?w=800&h=800&fit=crop',
            stock_quantity: 70,
            featured: false
        },
        {
            name: 'Hộp Nhựa Trong Suốt',
            description: 'Hộp nhựa trong suốt bảo vệ sản phẩm, dễ nhìn thấy nội dung',
            price: 35000,
            category: 'boxes',
            image_url: 'https://images.unsplash.com/photo-1603006905005-a3c5a5e93640?w=800&h=800&fit=crop',
            stock_quantity: 50,
            featured: false
        },
        // Thiệp Tặng
        {
            name: 'Thiệp Chúc Mừng Sinh Nhật',
            description: 'Thiệp chúc mừng sinh nhật đẹp, phù hợp tặng kèm nến',
            price: 15000,
            category: 'cards',
            image_url: 'https://images.unsplash.com/photo-1603006905005-a3c5a5e93640?w=800&h=800&fit=crop',
            stock_quantity: 100,
            featured: false
        },
        {
            name: 'Thiệp Cảm Ơn',
            description: 'Thiệp cảm ơn tinh tế, thể hiện lòng biết ơn',
            price: 12000,
            category: 'cards',
            image_url: 'https://images.unsplash.com/photo-1603006905005-a3c5a5e93640?w=800&h=800&fit=crop',
            stock_quantity: 80,
            featured: false
        },
        {
            name: 'Thiệp Chúc Mừng Năm Mới',
            description: 'Thiệp chúc mừng năm mới, mang lại may mắn và thịnh vượng',
            price: 18000,
            category: 'cards',
            image_url: 'https://images.unsplash.com/photo-1603006905005-a3c5a5e93640?w=800&h=800&fit=crop',
            stock_quantity: 60,
            featured: false
        },
        // Phụ Kiện
        {
            name: 'Bấc Nến Cotton',
            description: 'Bấc nến cotton chất lượng cao, cháy đều và không tạo khói',
            price: 30000,
            category: 'accessories',
            image_url: 'https://images.unsplash.com/photo-1603006905005-a3c5a5e93640?w=800&h=800&fit=crop',
            stock_quantity: 200,
            featured: true
        },
        {
            name: 'Kẹp Bấc Nến',
            description: 'Kẹp cố định bấc nến, giúp bấc luôn ở giữa khi đúc nến',
            price: 20000,
            category: 'accessories',
            image_url: 'https://images.unsplash.com/photo-1603006905005-a3c5a5e93640?w=800&h=800&fit=crop',
            stock_quantity: 150,
            featured: false
        },
        {
            name: 'Nhiệt Kế Làm Nến',
            description: 'Nhiệt kế chuyên dụng cho làm nến, đảm bảo nhiệt độ chính xác',
            price: 85000,
            category: 'accessories',
            image_url: 'https://images.unsplash.com/photo-1603006905005-a3c5a5e93640?w=800&h=800&fit=crop',
            stock_quantity: 25,
            featured: false
        }
    ];
    for (const product of products) {
        await (0, database_1.query)('INSERT INTO products (name, description, price, category, image_url, stock_quantity, featured) VALUES ($1, $2, $3, $4, $5, $6, $7)', [product.name, product.description, product.price, product.category, product.image_url, product.stock_quantity, product.featured]);
    }
    console.log('✅ Products seeded successfully');
};
const seedReviews = async () => {
    const reviews = [
        {
            product_id: 1,
            customer_name: 'Nguyễn Thị Anh',
            customer_email: 'anh.nguyen@email.com',
            rating: 5,
            comment: 'Nến thơm lavender rất tuyệt! Mùi hương thư giãn và thời gian cháy lâu. Sẽ mua lại!'
        },
        {
            product_id: 1,
            customer_name: 'Trần Văn Bình',
            customer_email: 'binh.tran@email.com',
            rating: 4,
            comment: 'Chất lượng tốt, mùi hương dễ chịu. Giao hàng nhanh chóng.'
        },
        {
            product_id: 2,
            customer_name: 'Lê Thị Cúc',
            customer_email: 'cuc.le@email.com',
            rating: 5,
            comment: 'Nến vanilla ngọt ngào quá! Thích hợp cho các buổi tối lãng mạn.'
        },
        {
            product_id: 4,
            customer_name: 'Phạm Văn Dũng',
            customer_email: 'dung.pham@email.com',
            rating: 4,
            comment: 'Khuôn silicon chất lượng tốt, dễ tháo và tái sử dụng nhiều lần.'
        },
        {
            product_id: 7,
            customer_name: 'Hoàng Thị Em',
            customer_email: 'em.hoang@email.com',
            rating: 5,
            comment: 'Bộ màu đa dạng, màu sắc đẹp và dễ sử dụng. Rất hài lòng!'
        },
        {
            product_id: 10,
            customer_name: 'Vũ Văn Phúc',
            customer_email: 'phuc.vu@email.com',
            rating: 4,
            comment: 'Hộp quà đẹp và sang trọng, phù hợp làm quà tặng.'
        },
        {
            product_id: 16,
            customer_name: 'Đặng Thị Giang',
            customer_email: 'giang.dang@email.com',
            rating: 5,
            comment: 'Bấc cotton chất lượng cao, cháy đều và không tạo khói.'
        }
    ];
    for (const review of reviews) {
        await (0, database_1.query)('INSERT INTO reviews (product_id, customer_name, customer_email, rating, comment) VALUES ($1, $2, $3, $4, $5)', [review.product_id, review.customer_name, review.customer_email, review.rating, review.comment]);
    }
    console.log('✅ Reviews seeded successfully');
};
const seedData = async () => {
    try {
        await (0, database_2.connectDatabase)();
        // Clear existing data
        await (0, database_1.query)('DELETE FROM reviews');
        await (0, database_1.query)('DELETE FROM order_items');
        await (0, database_1.query)('DELETE FROM orders');
        await (0, database_1.query)('DELETE FROM products');
        console.log('🗑️  Cleared existing data');
        // Seed products
        await seedProducts();
        // Seed reviews
        await seedReviews();
        console.log('🎉 All data seeded successfully!');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
};
seedData();
