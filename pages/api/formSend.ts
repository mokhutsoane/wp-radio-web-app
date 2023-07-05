import { NextApiRequest, NextApiResponse } from "next";
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const apiUrl = process.env.API_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }
  // Get the reCAPTCHA response token from the request body
  const formData = req.body;
  console.log(formData.recaptchaResponseToken);
  // Verify the reCAPTCHA response token
  try {
    const verificationResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${formData.recaptchaResponseToken}`,
      {
        method: "POST",
      }
    );
    const verificationData = await verificationResponse.json();
    if (verificationData.success) {
      // reCAPTCHA verification successful, proceed with form submission
      const formDataToSend = new FormData();
      formDataToSend.append("your-name", formData.firstName);
      formDataToSend.append("your-last-name", formData.lastName);
      formDataToSend.append("your-company", formData.company);
      formDataToSend.append("your-email", formData.email);
      formDataToSend.append("your-message", formData.message);
      formDataToSend.append("your-phone", formData.phoneNumber);
      formDataToSend.append("your-subject", formData.subject);
      // Make the form submission request
      const response = await fetch(`${apiUrl}`, {
        method: "POST",
        body: formDataToSend,
        redirect: "follow",
      });
      const data = await response.json();
      if (response.ok) {
        res.status(200).json({
          message: data.message,
          invalid_fields: data.invalid_fields[0]?.field ?? "",
        });
      } else {
        res.status(500).json({ message: data.message });
      }
    } else {
      // reCAPTCHA verification failed
      console.error("reCAPTCHA verification failed");
      res.status(400).json({ message: "reCAPTCHA verification failed" });
    }
  } catch (error) {
    console.error("An error occurred while submitting the form", error);
    res.status(500).json({ message: `Form submission failed ${error}` });
  }
}
