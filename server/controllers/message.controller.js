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




// GET CHAT MESSAGES BETWEEN TWO USERS
export const getMessages = async (req, res) => {
  try {
    const receiverId = req.params.id; // selected user
    const senderId = req.user._id;    // logged in user

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 }); // old → new order

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};