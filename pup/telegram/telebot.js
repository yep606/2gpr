import dotenv from 'dotenv'
import { Telegraf } from 'telegraf'
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome'))

bot.on('text', (ctx) => {
    // Using context shortcut
    ctx.reply(`Hello ${ctx.state.role}`)
  })

bot.launch();

