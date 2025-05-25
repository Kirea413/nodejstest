const express = require('express');
    const app = express();
    const http = require('http');
    const server = http.createServer(app);
    const { Server } = require("socket.io");
    const io = new Server(server); // ここでhttpサーバーを渡します

    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html'); // 簡単なHTMLを提供
    });

    io.on('connection', (socket) => {
      console.log('ユーザーが接続しました:', socket.id);

      socket.on('disconnect', () => {
        console.log('ユーザーが切断しました:', socket.id);
      });

      // 'chat message' というイベント名でクライアントからメッセージを受信
      socket.on('chat message', (msg) => {
        console.log('メッセージ受信:', msg);
        // 受信したメッセージを自分以外の全てのクライアントに送信
        io.emit('chat message', msg);
      });
    });

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`サーバーがポート ${PORT} で起動しました`);
    });
