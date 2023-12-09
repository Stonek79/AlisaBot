import {Telegraf} from 'telegraf'
import config from 'config'

const bot = new Telegraf(config.get('TELEGRAM_SCHEDULE_TOKEN'), { handlerTimeout: 30000 })

const url = 'https://ranepa-my.sharepoint.com/personal/sharapova-ev_ranepa_ru/_layouts/15/onedrive.aspx'
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
