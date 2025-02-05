import nodemailer from "nodemailer";

const invitationMail = async (req, res) => {
  try {
    const { email, roomId } = req.body;

    console.log(email, roomId);

    if (!email || !roomId) {
      return res
        .status(400)
        .json({ message: "Email and room code are required!" });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: "pavanponnana1@gmail.com",
        pass: "bjhz zorl ykhs qltn",
      },
    });

    const link=`http://localhost:5173/joinRoom/?roomCode=${roomId}`

    const mailOptions = {
      from: "pavanponnana1@gmail.com",
      to: email,
      subject: "You are invited to join a chat room!",
      html: `
        <h2>Hello,</h2>
        <p>You have been invited to join a chat room.</p>
        <p><strong>Room Code:</strong> ${roomId}</p>
       <p><a href=${link}>here</a> to join the room.</p>

        <p>If you have any questions, feel free to reply to this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Invitation email sent successfully!" });
  } catch (err) {
    console.error("Error sending invitation email:", err);
    res.status(500).json({ message: "Failed to send invitation email." });
  }
};

export { invitationMail };