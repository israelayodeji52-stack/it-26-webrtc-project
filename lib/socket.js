export const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join Room
    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      console.log(`${socket.id} joined room ${roomId}`);

      socket.to(roomId).emit("user-joined", {
        socketId: socket.id,
      });
    });

    // Offer
    socket.on("offer", ({ roomId, offer }) => {
      socket.to(roomId).emit("offer", {
        offer,
        sender: socket.id,
      });
    });

    // Answer
    socket.on("answer", ({ roomId, answer }) => {
      socket.to(roomId).emit("answer", {
        answer,
        sender: socket.id,
      });
    });

    // ICE Candidate
    socket.on("ice-candidate", ({ roomId, candidate }) => {
      socket.to(roomId).emit("ice-candidate", {
        candidate,
        sender: socket.id,
      });
    });

    // Disconnect
    socket.on("disconnect", () => {
      const roomId = socket.data.roomId;

      if (roomId) {
        socket.to(roomId).emit("user-left", {
          socketId: socket.id,
        });

        console.log(`${socket.id} left room ${roomId}`);
      }
    });
  });
};