// Получаем элемент чата
let chat = document.querySelector("#divMessages")
// Получаем строку ввода сообщения
let input = document.querySelector("#inputMessage")
// Получаем кнопку для ввода сообщения
let btnSubmit = document.querySelector("#btnSend")
 
// Подключаем WebSocket
const webSocket = new WebSocket('ws://localhost:8081');
 
// Получаем сообщение от сервера
webSocket.onmessage = function(e) {
    // Парсим полученные данные
    const data = JSON.parse(e.data);
    // Выводим в блог сообщение от сервера
    chat.innerHTML += '<div class="msg">' + data.message + '</div>'
};
 
// Отслеживаем нажатие мыши
btnSubmit.addEventListener("click", () => {
    // Получаем текст из формы для ввода сообщения
    message = input.value;
    // Отправка сообщения через WS
    webSocket.send(JSON.stringify({
        'message': message
    }));
    // Очищаем поле для ввода текста
    input.value = '';
})

/*
// Подключаем библиотеку для работы с WebSocket
const WebSocket = require('ws');
// Создаём подключение к WS
let wsServer = new WebSocket.Server({
    port: 8081
});
// Создаём массив для хранения всех подключенных пользователей
let users = []
 
// Проверяем подключение
wsServer.on('connection', function (ws) {
    Делаем подключение пользователя
    let user = {
        connection: ws
    }
    // Добавляем нового пользователя ко всем остальным 
    users.push(user)
    // Получаем сообщение от клиента
    ws.on('message', function (message) {
        // Перебираем всех подключенных клиентов
        for (let u of users) {
            // Отправляем им полученное сообщения
            u.connection.send(message)
        }
    })
    // Делаем действие при выходе пользователя из чата
    ws.on('close', function () {
        // Получаем ID этого пользователя
        let id = users.indexOf(user)
        // Убираем этого пользователя
        users.splice(id, 1)
    })
}) */