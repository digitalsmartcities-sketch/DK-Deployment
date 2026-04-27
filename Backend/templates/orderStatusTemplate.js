export const orderStatusTemplate = (customerName, orderId, status) => {
    let statusMessage = "";
    let statusColor = "#4B5563"; // Default Gray

    switch (status) {
        case "Under Review":
            statusMessage = "Your order is currently under review by the store.";
            statusColor = "#2563EB"; // Blue
            break;
        case "Pending":
            statusMessage = "Your order is pending confirmation.";
            statusColor = "#D97706"; // Amber
            break;
        case "Approved":
            statusMessage = "Good news! Your order has been approved and is being prepared.";
            statusColor = "#059669"; // Green
            break;
        case "On The Way":
            statusMessage = "Your order is out for delivery! Get ready to receive it.";
            statusColor = "#7C3AED"; // Purple
            break;
        case "Delivered":
            statusMessage = "Your order has been successfully delivered. Enjoy!";
            statusColor = "#10B981"; // Emerald
            break;
        case "Rejected":
            statusMessage = "We're sorry, but your order has been rejected by the store.";
            statusColor = "#DC2626"; // Red
            break;
        case "Canceled":
            statusMessage = "Your order has been canceled.";
            statusColor = "#9CA3AF"; // Gray
            break;
        default:
            statusMessage = `Your order status has been updated to: ${status}`;
    }

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            .container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; }
            .header { text-align: center; margin-bottom: 30px; }
            .status-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: bold; color: white; margin-bottom: 20px; }
            .content { line-height: 1.6; color: #374151; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280; text-align: center; }
            .order-id { font-weight: bold; color: #111827; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="color: #111827; margin: 0;">Order Status Update</h1>
                <p style="color: #6b7280;">Digital Kohat Hub</p>
            </div>
            <div class="content">
                <p>Hello <strong>${customerName}</strong>,</p>
                <p>There has been an update regarding your order <span class="order-id">#${orderId}</span>.</p>
                
                <div style="text-align: center;">
                    <div class="status-badge" style="background-color: ${statusColor};">
                        ${status.toUpperCase()}
                    </div>
                </div>

                <p style="text-align: center; font-size: 18px; font-weight: 500;">
                    ${statusMessage}
                </p>

                <p>You can track your order details in your dashboard under "My Orders".</p>
            </div>
            <div class="footer">
                <p>Thank you for choosing Digital Kohat Hub!</p>
                <p>&copy; 2026 Digital Kohat. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
