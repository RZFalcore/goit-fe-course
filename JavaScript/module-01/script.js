'use strick'

let login = prompt('Введите логин');
let password;
const adminLogin = 'admin';
const adminPassword = 'm4ngo1zh4ackz0r';
const cancel = 'Отменено пользователем!';
const incorrectLogin = 'Доступ запрещен, неверный логин!';
const incorrectPassword = 'Доступ запрещен, неверный пароль!';
const succesLog = 'Добро пожаловать!';

if (login === null) {
    alert(cancel);
} else if (login !== adminLogin){
    alert(incorrectLogin);
} else if (login === adminLogin){
    password = prompt('Введите пароль');
    if (password === null){
        alert(cancel);
    } else if(password !== adminPassword) {
        alert(incorrectPassword);
    } else if (password === adminPassword) {
        alert(succesLog);
    }
}
