const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");
const { send } = require("process");

const getHashRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};
const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: [
        "http://localhost:5173", // dev
        "http://13.60.81.53", // prod IP
        "https://yourdomain.com", // prod domain if you have one
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  //to accept the connection
  io.on("connection", (socket) => {
    //handle events
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      // const room = "uniqId";
      // socket.join(room);
      // const roomId = [userId, targetUserId].sort().join("_");
      const roomId = getHashRoomId(userId, targetUserId);
      console.log(firstName + " Joining RoomId : ", roomId);
      socket.join(roomId);
    });
    //listening the messages sent from client
    socket.on(
      "sendMessage",
      async ({ firstName, lastName, userId, targetUserId, text }) => {
        try {
          // const roomId = [userId, targetUserId].sort().join("_");
          const roomId = getHashRoomId(userId, targetUserId);
          //get the message from userId(loggedIn user)
          console.log(firstName + ": " + text);

          //save the message
          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }
          chat.messages.push({
            senderId: userId,
            text,
          });
          await chat.save();
          // console.log("sendMessage: ", chat);
          const lastMessage = chat.messages[chat.messages.length - 1];
          // console.log(lastMessage);
          const sentTime = lastMessage.createdAt;
          // console.log(sentTime);
          //send the message to targetUserId(friend)
          io.to(roomId).emit("messageReceived", {
            firstName,
            lastName,
            text,
            sentTime,
          }); // listen this event in frontend (because from frontend we got user1 message to user2 , now we need to send this message to user2 to see on the UI(chatbox))
        } catch (err) {
          console.log(err);
        }
      },
    );
    socket.on("disconnect", () => {});
  });
  return io;
};

module.exports = initializeSocket;
