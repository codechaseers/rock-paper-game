import express from "express";
import { createServer } from "http"
// import { send } from "process";
import { Server } from "socket.io";
import cors from 'cors'
import { log } from "console";

const app = express()
const port = 8000
app.use(cors());
//Normal server creat 
const server = createServer(app)


//io server creating
const io = new Server(server, {
    cors: {
        origin: "*"
    },
    pingTimeout: 60000
});
// io.on("connection",(socket)=>{
//     console.log("id is : ",socket.id)
//     socket.emit("id",socket.id)

//     socket.on("CheckConnection",(fid)=>{
//         socket.to(fid).emit("recheckConnection", "hiii recheck conection")
//     })

//     socket.emit("grit","wellcome to the server this is grit messege  "+socket.id,socket.id)
//     socket.on("message",(fid)=>{
//         console.log(fid)
//         io.to(fid).emit("resiveMessage",fid)
//     })

//     socket.on("join-room", (room) => {
//         socket.join(room);
//         console.log(`User joined room ${room}`);
//       });

// })

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('createOrJoinRoom', (room) => {
        console.log(`Request to join room: ${room}`);
        const rooms = io.sockets.adapter.rooms;
        const roomExists = rooms.get(room);

        // Allow a maximum of two clients in a room.
        if (roomExists && roomExists.size < 2) {
            socket.join(room);
            socket.to(room).emit('roomJoined', room);
            console.log(` ${socket.id} joined room: ${room}`);
            // Notify both clients in the room that the game can start.


            io.to(room).emit('gameStart', `Game starting in room: ${room}`);

        } else if (!roomExists) {
            socket.join(room);
            socket.emit("RoomCreated", `Room ${room} created`)
            console.log(`Room ${room} created`);
        } else {
            // Room is full or some other logic
            socket.emit('error', `Room ${room} is full.`);
            console.log(`Cannot join room ${room}, it's full.`);
        }
    });
    socket.on('choice', (message, room) => {
        console.log(message)
        socket.to(room).emit("resiveMessage", message)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });
});

app.get('/', (req, res) => {
    console.log("server start");
    res.status(200).json({ "message": "hii form the server" })
})
server.listen(port, () => {
    console.log(`app lisisten on port ${port}`);
})