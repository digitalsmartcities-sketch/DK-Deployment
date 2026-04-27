export const reportResponseTemplate = (reporterName, serviceName, status, response) => {
    let statusMessage = "";
    let statusColor = "#4B5563"; // Default Gray

    switch (status) {
        case "Pending":
            statusMessage = "Your report is currently under review by our moderation team.";
            statusColor = "#D97706"; // Amber
            break;
        case "Approved":
            statusMessage = "Your report has been reviewed and approved. We are taking appropriate action.";
            statusColor = "#059669"; // Green
            break;
        case "Resolved":
            statusMessage = "Your report has been successfully resolved.";
            statusColor = "#10B981"; // Emerald
            break;
        case "Rejected":
            statusMessage = "After careful review, your report has been rejected.";
            statusColor = "#DC2626"; // Red
            break;
        default:
            statusMessage = `Your report status has been updated to: ${status}`;
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
            .response-box { background-color: #f9fafb; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280; text-align: center; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="color: #111827; margin: 0;">Report Update</h1>
                <p style="color: #6b7280;">Digital Kohat Hub</p>
            </div>
            <div class="content">
                <p>Hello <strong>${reporterName}</strong>,</p>
                <p>This is an update regarding the report you submitted for <strong>${serviceName}</strong>.</p>
                
                <div style="text-align: center;">
                    <div class="status-badge" style="background-color: ${statusColor};">
                        ${status.toUpperCase()}
                    </div>
                </div>

                <p>${statusMessage}</p>

                ${response ? `
                <div class="response-box">
                    <p style="margin: 0; font-weight: 600; color: #1e40af;">Admin Response:</p>
                    <p style="margin: 5px 0 0 0;">${response}</p>
                </div>
                ` : ""}

                <p>Thank you for helping us keep our community safe and accurate.</p>
            </div>
            <div class="footer">
                <p>Best Regards,<br>The Digital Kohat Team</p>
                <p>&copy; 2026 Digital Kohat. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
