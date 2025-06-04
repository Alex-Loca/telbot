require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Ottieni il token dalle variabili d'ambiente
const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error('BOT_TOKEN non trovato nelle variabili d\'ambiente');
  process.exit(1);
}

// Crea una nuova istanza del bot
const bot = new TelegramBot(token, { polling: true });

// Gestisci il comando /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Ciao! Sono il tuo bot Telegram. Usa /help per vedere i comandi disponibili.');
});

// Gestisci il comando /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `
Comandi disponibili:
/start - Avvia il bot
/help - Mostra questo messaggio di aiuto
/pitch - Informazioni su ModMore
`);
});

// Gestisci il comando /info
bot.onText(/\/pitch/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `
ModMore è una piattaforma per la gestione e distribuzione di mod per videogiochi. La piattaforma si distingue per la sua universalità, accogliendo contenuti per qualsiasi videogioco, sia esso supportato ufficialmente o meno e permette ai creatori di rimanere in contatto con la loro community. Per i giochi supportati, ModMore offre un sistema di installazione automatizzato che semplifica drasticamente l'esperienza utente.
`);
});

// Gestisci messaggi non riconosciuti
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // Ignora i comandi che abbiamo già gestito
  if (msg.text && (msg.text.startsWith('/start') ||
    msg.text.startsWith('/help') ||
    msg.text.startsWith('/pitch'))) {
    return;
  }

  bot.sendMessage(chatId, 'Non ho capito. Usa /help per vedere i comandi disponibili.');
});

console.log('Bot avviato con successo!');