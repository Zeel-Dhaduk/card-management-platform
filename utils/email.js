const nodemailer = require('nodemailer');
const { convert } = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    ((this.to = user.to), (this.from = user.from), (this.firstName = user.name), (this.url = url));
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(subject, name, message) {
    const html = `
    <h1>${subject}</h1>
    <p>Hello ${name},</p>
    <p>${message}</p>
    <p>Click the  link below for more info:</p>
    <a href="${this.url}">${this.url}</a>
  `;

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendCardCreated(name) {
    await this.send(`Card created`, 'admin', `${name} created a card`);
  }

  async sendCardApproved(card) {
    await this.send(
      `Card Approval by admin`,
      'vendor',
      `Your ${card} has been approved by the admin`
    );
  }

  async sendCardRejected(card) {
    await this.send(
      `Card Rejected by admin`,
      'vendor',
      `Your ${card} has been rejected by the admin`
    );
  }
};
