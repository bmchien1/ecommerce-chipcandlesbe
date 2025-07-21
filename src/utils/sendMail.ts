import nodemailer from 'nodemailer';
import { Bill } from '../entities/Bill';

export async function sendBillEmail(bill: Bill) {
  // Cấu hình transporter với Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER || 'hoangbui10052003@gmail.com',
      pass: process.env.GMAIL_PASS || 'YOUR_APP_PASSWORD', // Nên dùng biến môi trường
    },
  });

  // Tạo nội dung email
  const mailOptions = {
    from: 'Chipscendles <hoangbui10052003@gmail.com>',
    to: 'chienbui10052003@gmail.com',
    subject: `Đơn hàng mới từ ${bill.firstName} ${bill.lastName}`,
    html: `
      <h2>Thông tin đơn hàng mới</h2>
      <p><b>Khách hàng:</b> ${bill.firstName} ${bill.lastName}</p>
      <p><b>Email:</b> ${bill.email}</p>
      <p><b>Điện thoại:</b> ${bill.phone}</p>
      <p><b>Địa chỉ:</b> ${bill.address}, ${bill.ward}, ${bill.district}, ${bill.city}</p>
      <p><b>Ghi chú:</b> ${bill.notes || ''}</p>
      <h3>Danh sách sản phẩm:</h3>
      <ul>
        ${(bill.orderItems || []).map((item: any) => `<li>${item.name} x ${item.quantity}</li>`).join('')}
      </ul>
      <p><b>Phương thức thanh toán:</b> ${bill.paymentMethod}</p>
    `,
  };

  // Gửi email
  await transporter.sendMail(mailOptions);
} 