import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "xuanthang369@outlook.com",
    pass: "thangtedao123",
  },
});

export const sendMail = (user, order) => {
  const mailOptions = {
    from: '"Nova Shop" <xuanthang369@outlook.com>',
    to: user.email,
    subject: "Thanks for your purchase...",
    html: `
      <h4>Hello, ${user.fullName.toUpperCase()}</h4>
      <p>Thank you for your purchase! Your order details:</p>
      <p><strong>Order ID:</strong> ${"#" + order._id.toString().slice(18)}</p>
      <p><strong>Products:</strong></p>
      <ul>
        ${order.products
          .map(
            (item) =>
              `<li>${item.product.name} - ${item.product.salePrice + "₫"} - x${
                item.count
              }</li>`
          )
          .join("")}
      </ul>
      <p><strong>Total Amount:</strong> ${order.totalPrice + "₫"}</p>
      <p>Thank you for shopping with us!</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
