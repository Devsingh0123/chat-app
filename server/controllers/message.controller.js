import Message from "../models/Message.js";

// SEND MESSAGE
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;

    const senderId = req.user._id; // 🔥 from middleware

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};