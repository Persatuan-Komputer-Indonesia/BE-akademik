export function generateOtpEmailTemplate(
  username: string,
  otp: string,
  appName: string
) {
  return `
  <!DOCTYPE html>
  <html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Kode OTP</title>
    <style>
      body {
        font-family: Arial, Helvetica, sans-serif;
        background-color: #f4f6f8;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 520px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 10px;
        padding: 28px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }
      .title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 8px;
        color: #222;
      }
      .subtitle {
        font-size: 14px;
        color: #666;
        margin-bottom: 24px;
      }
      .otp-box {
        font-size: 32px;
        letter-spacing: 6px;
        font-weight: bold;
        text-align: center;
        background: #f1f3f5;
        padding: 16px;
        border-radius: 8px;
        margin: 24px 0;
        color: #111;
      }
      .warning {
        font-size: 13px;
        color: #999;
        margin-top: 20px;
        text-align: center;
      }
      .footer {
        margin-top: 28px;
        font-size: 12px;
        color: #aaa;
        text-align: center;
      }
      .brand {
        font-weight: bold;
        color: #333;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="title">Kode OTP Login</div>
      <div class="subtitle">
        Halo <b>${username}</b>, gunakan kode berikut untuk melanjutkan proses login.
      </div>

      <div class="otp-box">${otp}</div>

      <div class="warning">
        Kode OTP ini hanya berlaku selama <b>5 menit</b>.<br/>
        Jangan bagikan kode ini kepada siapapun.
      </div>

      <div class="footer">
        Email ini dikirim otomatis oleh <span class="brand">${appName}</span>.<br/>
        Jika kamu tidak meminta OTP, abaikan saja email ini.
      </div>
    </div>
  </body>
  </html>
  `;
}
