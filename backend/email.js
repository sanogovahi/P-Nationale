import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendContactEmail = async (email, nom, sujet) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Confirmation: ${sujet}`,
      html: `
        <h2>Merci pour votre message</h2>
        <p>Bonjour ${nom},</p>
        <p>Nous avons bien reçu votre message concernant "${sujet}".</p>
        <p>Nous vous répondrons dans les plus brefs délais.</p>
        <p>Cordialement,</p>
        <p><strong>Police Nationale de Côte d'Ivoire</strong></p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email de confirmation envoyé à ${email}`);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
  }
};

export const sendDeclarationEmail = async (email, nom, declarationId) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Votre déclaration a été enregistrée',
      html: `
        <h2>Déclaration enregistrée</h2>
        <p>Bonjour ${nom},</p>
        <p>Votre déclaration a été enregistrée avec succès.</p>
        <p><strong>Numéro de dossier:</strong> ${declarationId}</p>
        <p>Vous pouvez suivre le statut de votre déclaration sur notre plateforme.</p>
        <p>Cordialement,</p>
        <p><strong>Police Nationale de Côte d'Ivoire</strong></p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email de déclaration envoyé à ${email}`);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
  }
};
export const sendNotificationToDGPN = async ({ nom, email, telephone, sujet, message }) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: "servicecomdgpn@gmail.com",
      subject: `📩 Nouveau message : ${sujet}`,
      html: `
        <h2>Nouveau message reçu depuis le site DGPN</h2>

        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${telephone || "Non renseigné"}</p>
        <p><strong>Sujet :</strong> ${sujet}</p>

        <hr>

        <p><strong>Message :</strong></p>

        <p>${message.replace(/\n/g, "<br>")}</p>
      `
    });

    console.log("Notification DGPN envoyée.");
  } catch (err) {
    console.error(err);
  }
};
