export default function(io){
    io.on('connection',(socket)=>{
        console.log("client connected!");
        socket.on('disconnect',()=>{
            console.log("client disconnected!");
        })
    })
}