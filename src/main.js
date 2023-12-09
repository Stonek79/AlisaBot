import {Telegraf} from 'telegraf'
import config from 'config'

const bot = new Telegraf(config.get('TELEGRAM_SCHEDULE_TOKEN'), { handlerTimeout: 30000 })

const url = 'https://ranepa-my.sharepoint.com/personal/sharapova-ev_ranepa_ru/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fsharapova%2Dev%5Franepa%5Fru%2FDocuments%2F%D0%A0%D0%90%D0%A1%D0%9F%D0%98%D0%A1%D0%90%D0%9D%D0%98%D0%95%20%D0%98%D0%9E%D0%9D%2F%D0%A8%D0%B8%D1%80%D0%BE%D0%BA%D0%B8%D0%B9%20%D0%B1%D0%B0%D0%BA%D0%B0%D0%BB%D0%B0%D0%B2%D1%80%D0%B8%D0%B0%D1%82%201%20%D0%BA%D1%83%D1%80%D1%81'
bot.start((ctx) => {
    const chatId = ctx.chat.id;
    ctx.replyWithHTML(`Привет, ${ctx.from.first_name}!`, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Посмотреть расписание ИОН: Широкий бакалавриат 1 курс', url }
                ]
            ]
        }
    });
});

// Обработчик нажатия на кнопку
bot.action('goToSite', (ctx) => {
    const chatId = ctx.chat.id;

    // Отправляем ссылку
    ctx.answerCbQuery('Переход на сайт...');

    // Отправляем сообщение
    ctx.reply('Спасибо за использование бота!');

    // Завершаем сеанс бота
    ctx.telegram.leaveChat(chatId);

    // Завершаем работу бота
    bot.stop();
});

// Запускаем бот
bot.launch();
