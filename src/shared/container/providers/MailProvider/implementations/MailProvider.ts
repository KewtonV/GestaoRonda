import nodemailer from 'nodemailer';

import User from '@modules/users/infra/typeorm/entities/User';
import MailProvider from '../model/MailProvider';

export default class SendMailProvider implements MailProvider {
  public async send(user: User, token: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'qrcodeservnac@gmail.com',
        pass: 'qrcode123',
      },
    });

    const bodyEmail = `<div>
                        <div style="background-color: #f2f3f5; padding: 20px">
                          <div style="max-width: 600px; margin: 0 auto">
                            <div
                              style="
                                background: #fff;
                                font: 14px sans-serif;
                                color: #686f7a;
                                border-top: 4px solid #00884a;
                                margin-bottom: 20px;
                              "
                            >
                              <div style="border-bottom: 1px solid #f2f3f5; padding: 20px 30px">
                                <img
                                  id="m_1262704929814511993logo"
                                  width="50"
                                  height="50"
                                  style="max-width: 99px; display: block"
                                  src="https://app-colaborador-avatar.s3.amazonaws.com/logo1.png"
                                  alt="Servnac Seguraça"
                                  class="CToWUd a6T"
                                  tabindex="0"
                                />
                                <div
                                  class="a6S"
                                  dir="ltr"
                                  style="opacity: 0.01; left: 101px; top: 39px"
                                >
                                  <div
                                    id=":nk"
                                    class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q"
                                    role="button"
                                    tabindex="0"
                                    aria-label="Fazer o download do anexo "
                                    data-tooltip-class="a1V"
                                    data-tooltip="Fazer o download"
                                  >
                                    <div class="aSK J-J5-Ji aYr"></div>
                                  </div>
                                </div>
                              </div>

                              <div style="padding: 20px 30px">
                                <div
                                  style="
                                    font-size: 16px;
                                    line-height: 1.5em;
                                    border-bottom: 1px solid #f2f3f5;
                                    padding-bottom: 10px;
                                    margin-bottom: 20px;
                                  "
                                >
                                  <p>
                                    <a style="text-decoration: none; color: #000">
                                      Olá, <b>${user.nome}</b>,
                                    </a>
                                  </p>

                                  <p>
                                    <a style="text-decoration: none; color: #000"
                                      >Uma redefinição de senha foi solicitada para sua conta. Clique no botão abaixo para alterar sua senha</a
                                    >
                                  </p>

                                  <p>
                                    <a style="text-decoration: none; color: #000"
                                      >Observe que o link é válido por 30 minutos. Depois que o limite de tempo expirar, você precisará reenviar a solicitação de redefinição de senha.</a
                                    >
                                  </p>

                                  <a
                                    href="${process.env.APP_WEB_URL}/reset-password/?search=${token}"
                                    style="
                                      font-size: 16px;
                                      color: #ffffff;
                                      text-decoration: none;
                                      border-radius: 2px;
                                      background-color: #00884a;
                                      border-top: 12px solid #00884a;
                                      border-bottom: 12px solid #00884a;
                                      border-right: 18px solid #00884a;
                                      border-left: 18px solid #00884a;
                                      display: inline-block;
                                    "
                                    target="_blank"
                                  >
                                    Alterar sua senha
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <img
                          src="https://ci6.googleusercontent.com/proxy/yzrcRZisVFtQyxCrySig7C4972nAYdeSeJSISFOtHI0YduCkzBeAyMCLIJg7tuCGRpTJ53C37RqYkW0cRnKFygjeolv45RaNXySPZcDkC3aKn6cdoDx5eElf8bvmxUovpeoeMeP-KA_XpHrPlgUBYt5Mcc4310I6b-NLhSyBHiokv3iKywbBiooQodSG99fE3cDYOujYQERyv9HkJkrbzNQMRivpqE95zc-1xZNE73ceABoO_tPNFDT7ydMMrKyYuoJnBtJfj0p-q6Awx7Xi1xEtQ9rnx5ki16LPz12Q3iBWVPixAXRzZYOVRKgkeLOeKMPHqDR3ZFOO_w11hoMSh2w1MmDLXBXAJ04JPEBnE5S4wddpdpzHEaSL8KGirinJTlRfpPO94TQMmx8tuYEXSKtc39T9CDB3hH3nWPpaF_RFuyDsQb7yJ1ufKcX90B93tqPdKDtLq2z4v5dPSBYUPy4834fYtc5kto2iwxfE1MCFDCnr63fqj9NjL0DV7AMg86E6aWPgADDzhU2NNs0SUMsggOMsDOmceJJnTxzwaoN-1ezeWXpTZ62zCjVJzMsa7z7ay5zPVzhx7qAo8Tu8Yjjc0w=s0-d-e1-ft#https://e2.udemymail.com/wf/open?upn=jNaYiSbPAWZtJckSN6dIWyaB6m2oTL-2Bj-2Bz9Y1GCzjwJvbaRw2VtfbAVoYsKoTx6KsEU6xNs9-2B3Meg-2FKHjVMwTFefjhjFvJGJlzPO-2BRQa96UFduOSwIJkxOYM9UCDyqVypo1RRHSAUT0HaxJEQ-2F7lSdwRLdHslj2jAKYX5t7L65i29hRLjIRnywkMmYkF3uzAaxDG5c3NlLmZ7KoIt1ZUkuMzu3mixfyndwF-2BRB0Tc3Dp3yMKezCF69Fkfola1-2F-2BTgdAS8kj6tjZNw649QP-2Bd5o7qM-2FTXA1XnKKx9PT-2BN2TNbrBCmnE-2Be62CW0citT3GIeStD0h8em3mKY6n5jLx-2FobTiqBYdNlPCJ3FXnu8n098-3D"
                          alt=""
                          width="1"
                          height="1"
                          border="0"
                          style="
                            height: 1px !important;
                            width: 1px !important;
                            border-width: 0 !important;
                            margin-top: 0 !important;
                            margin-bottom: 0 !important;
                            margin-right: 0 !important;
                            margin-left: 0 !important;
                            padding-top: 0 !important;
                            padding-bottom: 0 !important;
                            padding-right: 0 !important;
                            padding-left: 0 !important;
                          "
                          class="CToWUd"
                        />
                        <div class="yj6qo"></div>
                        <div class="adL"></div>
                      </div>`;

    const mailOptions = {
      from: 'qrcodeservnac@gmail.com',
      to: `${user.email}`,
      subject: 'Alteração de senha',
      html: bodyEmail,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  }
}
