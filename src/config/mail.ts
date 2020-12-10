export default {
  host: 'smtp.gmail.com',
  port: '587',
  secure: false,
  auth: {
    user: 'qrcodeservnac@gmail.com',
    pass: 'qrcode123',
  },
  default: {
    from: 'Servnac',
    to: null,
    subject: 'E-mail enviado usando Node!',
    text: 'Bem fácil, não? ;)',
  },
};
