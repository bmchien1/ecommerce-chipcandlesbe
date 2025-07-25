import nodemailer from 'nodemailer';
import { Bill } from '../entities/Bill';

// Define interface for OrderItem based on provided data
interface OrderItem {
  id?: number;
  name: string;
  components: {
    mold?: string;
    color?: string;
    scent?: string;
    box?: string;
    card?: string;
  };
  price: number;
  quantity: number;
  image?: string;
}

export async function sendBillEmail(bill: Bill) {
  // Configure transporter with Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER || 'hoangbui10052003@gmail.com',
      pass: process.env.GMAIL_PASS || 'YOUR_APP_PASSWORD', // Use environment variables for security
    },
  });

  // Calculate total cost
  const totalCost = (bill.orderItems || []).reduce((sum, item: OrderItem) => sum + (item.price * item.quantity), 0);

  // Helper function to safely format item properties
  const formatItemProperties = (item: OrderItem): string => {
    const { id, image, components, ...otherProps } = item;
    const componentEntries = Object.entries(components).map(([key, value]) => ({
      key: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize, e.g., mold -> Mold
      value: value ?? 'N/A',
    }));
    const otherEntries = Object.entries(otherProps).map(([key, value]) => ({
      key: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize, e.g., price -> Price
      value: key === 'Price' ? `${value.toLocaleString('vi-VN')}đ` : value ?? 'N/A', // Format price with VND
    }));
    return [...componentEntries, ...otherEntries]
      .map(({ key, value }) => `<td style="padding: 8px; border: 1px solid #ddd; text-align: left;">${key}: ${value}</td>`)
      .join('');
  };

  // Create email content
  const mailOptions = {
    from: 'Chipscendles <hoangbui10052003@gmail.com>',
    to: bill.email, // Send to customer's email for confirmation
    cc: 'chipscendle@gmail.com', // CC to business for processing
    subject: `Hóa Đơn Đơn Hàng - ${bill.firstName} ${bill.lastName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
        <h1 style="color: #333; text-align: center;">Hóa Đơn Đơn Hàng</h1>
        <h2 style="color: #555;">Cảm ơn bạn đã mua sắm tại Chipscendles!</h2>
        <h3 style="color: #333;">Thông tin khách hàng</h3>
        <p><strong>Họ tên:</strong> ${bill.firstName} ${bill.lastName}</p>
        <p><strong>Email:</strong> ${bill.email}</p>
        <p><strong>Điện thoại:</strong> ${bill.phone}</p>
        <p><strong>Địa chỉ giao hàng:</strong> ${bill.address}, ${bill.ward}, ${bill.district}, ${bill.city}</p>
        <p><strong>Ghi chú:</strong> ${bill.notes || 'Không có'}</p>
        <p><strong>Phương thức thanh toán:</strong> ${bill.paymentMethod}</p>
        <h3 style="color: #333; margin-top: 20px;">Chi tiết đơn hàng</h3>
        <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Sản phẩm</th>
            </tr>
          </thead>
          <tbody>
            ${(bill.orderItems || []).map((item: OrderItem) => `
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>${formatItemProperties(item)}</tr>
                  </table>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <p style="font-size: 16px; font-weight: bold; text-align: right;">
          <strong>Tổng cộng:</strong> ${totalCost.toLocaleString('vi-VN')}đ
        </p>
        <p style="color: #555; text-align: center; margin-top: 20px;">
          Vui lòng kiểm tra thông tin đơn hàng. Chúng tôi sẽ liên hệ sớm để xác nhận và giao hàng.
        </p>
        <p style="color: #555; text-align: center;">
          Trân trọng,<br>Chipscendles
        </p>
      </div>
    `,
  };

  // Send email
  await transporter.sendMail(mailOptions);
}