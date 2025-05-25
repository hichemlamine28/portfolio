import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import nodemailer from "nodemailer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      
      // Send email notification
      try {
        await sendContactEmail(contactData);
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Continue even if email fails
      }
      
      res.json({ success: true, message: "Message envoyé avec succès!" });
    } catch (error) {
      console.error("Contact submission error:", error);
      res.status(400).json({ 
        success: false, 
        message: "Erreur lors de l'envoi du message. Veuillez réessayer." 
      });
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({ message: "Erreur lors de la récupération des contacts" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

async function sendContactEmail(contactData: any) {
  // Configure nodemailer with environment variables
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER || process.env.EMAIL_USER,
      pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER || process.env.EMAIL_USER || "noreply@portfolio.com",
    to: "hichemlamine@gmail.com",
    subject: `Portfolio Contact: ${contactData.subject}`,
    html: `
      <h2>Nouveau message depuis votre portfolio</h2>
      <p><strong>Nom:</strong> ${contactData.firstName} ${contactData.lastName}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      ${contactData.company ? `<p><strong>Entreprise:</strong> ${contactData.company}</p>` : ''}
      <p><strong>Sujet:</strong> ${contactData.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${contactData.message.replace(/\n/g, '<br>')}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
