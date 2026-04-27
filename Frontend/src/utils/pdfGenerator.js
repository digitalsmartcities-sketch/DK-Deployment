import { jsPDF } from "jspdf";

export const generateOrderPDF = (order, profileData) => {
    const doc = new jsPDF({
        unit: 'mm',
        format: [58, 150] // POS thermal printer size (58mm)
    });

    const brandName = profileData?.ServiceName || profileData?.name || profileData?.businessName || "Restaurant";
    const orderId = order.orderID || order._id || order.id || "-";
    
    // Header
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(brandName, 29, 10, { align: 'center' });
    
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(order.type === "Reservation" ? "Reservation Receipt" : "Order Receipt", 29, 14, { align: 'center' });
    
    doc.setLineDashPattern([1, 1], 0);
    doc.line(5, 18, 53, 18);
    
    // Details
    doc.setFontSize(7);
    doc.text(`Ref: ${orderId}`, 5, 23);
    doc.text(`Date: ${order.timestamp || new Date(order.createdAt || Date.now()).toLocaleString()}`, 5, 27);
    
    const customerName = order.userDetails?.name || order.customerName || order.customer || "-";
    doc.text(`Customer: ${customerName}`, 5, 31);
    
    const contact = order.userDetails?.phone || order.customerPhone || order.contact || "-";
    doc.text(`Contact: ${contact}`, 5, 35);
    
    let y = 39;
    if (order.type === "Reservation") {
        doc.text(`Guests: ${order.guests || "-"}`, 5, y);
        y += 4;
        doc.text(`Reservation: ${order.date || "-"} ${order.time || ""}`, 5, y);
        y += 4;
    } else {
        const address = order.userDetails?.address || order.location || order.specialRequest || "-";
        const splitAddress = doc.splitTextToSize(`Addr: ${address}`, 48);
        doc.text(splitAddress, 5, y);
        y += (splitAddress.length * 4);
    }
    
    doc.line(5, y, 53, y);
    y += 5;
    
    // Items Table
    doc.setFont("helvetica", "bold");
    doc.text("Items", 5, y);
    doc.text("Amount", 53, y, { align: 'right' });
    doc.setFont("helvetica", "normal");
    y += 4;
    
    if (Array.isArray(order.items)) {
        order.items.forEach(item => {
            const itemName = item.name || item.productName || "Item";
            const qty = item.qty || item.quantity || 1;
            const subtotal = item.subtotal || item.price || (item.unitPrice * qty) || 0;
            
            const text = `${qty} x ${itemName}`;
            const splitName = doc.splitTextToSize(text, 35);
            doc.text(splitName, 5, y);
            doc.text(`Rs. ${Number(subtotal)}`, 53, y, { align: 'right' });
            y += (splitName.length * 4);
        });
    } else {
        doc.text(String(order.items || "-"), 5, y);
        y += 4;
    }
    
    doc.line(5, y, 53, y);
    y += 5;
    
    // Footer
    doc.setFont("helvetica", "bold");
    doc.text("Total", 5, y);
    doc.text(`Rs. ${order.total || order.totalAmount || 0}`, 53, y, { align: 'right' });
    y += 4;
    
    doc.setFont("helvetica", "normal");
    doc.text(`Method: ${order.paymentMethod || "COD"}`, 5, y);
    y += 4;
    doc.text(`Status: ${order.status}`, 5, y);
    y += 8;
    
    doc.setFontSize(6);
    doc.text("Thank you for choosing Digital Kohat Hub!", 29, y, { align: 'center' });
    y += 3;
    doc.text("Visit: www.digitalkohat.com", 29, y, { align: 'center' });

    doc.save(`Receipt-${orderId}.pdf`);
};
