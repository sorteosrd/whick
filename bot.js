const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const axios = require('axios');





const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true, // Esto ejecuta Puppeteer sin abrir una ventana de navegador
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    }
});


client.on('disconnected', (reason) => {
    console.log('Cliente desconectado:', reason);
    client.initialize(); // Intenta reconectar
});

let qrCodeData = ''; // Variable para almacenar el QR actual
// Variable global para almacenar los números aleatorios
let randomNumbers = generateRandomNumbers();

// Función para generar 4 números aleatorios de dos dígitos
function generateRandomNumbers() {
    return Array.from({ length: 4 }, () => Math.floor(Math.random() * 90) + 10).join('-');
}

// Configuración para cambiar los números a las 5:00 AM
function scheduleNumberUpdate() {
    const now = new Date();
    const next5AM = new Date();
    next5AM.setHours(5, 0, 0, 0);
    if (now > next5AM) {
        next5AM.setDate(next5AM.getDate() + 1); // Programar para el día siguiente
    }

    const timeTo5AM = next5AM - now;
    setTimeout(() => {
        randomNumbers = generateRandomNumbers(); // Generar nuevos números
        console.log('Números actualizados:', randomNumbers);
        scheduleNumberUpdate(); // Volver a programar para el siguiente día
    }, timeTo5AM);
}

// Llama a la función para programar la actualización inicial
scheduleNumberUpdate();

const userState = {};

// Genera el código QR para iniciar sesión en WhatsApp Web
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true }); // Muestra el QR en la terminal
    qrCodeData = qr; // Guarda el QR para mostrarlo en la web
    console.log('Escanea el código QR para iniciar sesión.');
});

// Evento que indica que el cliente está listo
client.on('ready', () => {
    console.log('El bot de WhatsApp está listo para recibir mensajes.');
});




// Menú de bienvenida
const sendWelcomeMenu = (message) => {
    message.reply(
        `👋 Bienvenido/a al servicio automatizado de resultados de loterías.\n\n` +
        `Por favor, elige una opción:\n\n` +
        `1️⃣ *Resultados de Loterías*\n` +
        `2️⃣ *Comunidad*\n` +
        `3️⃣ *Hablar con un Representante*\n\n` +
        `Responde con el número de la opción que deseas.`
    );
};

// Menú de resultados de loterías
const sendLotteryMenu = (message) => {
    message.reply(
        `🔍 Selecciona la lotería para ver los resultados:\n\n` +
        `1️⃣ *Lotería Nacional*\n` +
        `2️⃣ *LEIDSA*\n` +
        `3️⃣ *La Suerte Dominicana*\n` +
        `5️⃣ *LOTEDOM*\n` +
        `6️⃣ *LOTEKA*\n` +
        `7️⃣ *La Primera*\n` +
        `9️⃣ *Anguilla Lottery*\n` +
        `🔟 *Lotería Real*\n` +
        `1️⃣1️⃣ *King Lottery*\n` +
        `1️⃣2️⃣ *Florida Lottery*\n` +
        `1️⃣3️⃣ *New York Lottery*\n\n` +
        `Responde con el número de tu elección o escribe *volver* para regresar al menú principal.`
    );
};

// Submenús
const sendLoteriaNacionalSubMenu = (message) => {
    message.reply(
        `🎟️ Has seleccionado *Lotería Nacional*. Por favor elige una opción:\n\n` +
        `1️⃣ *Lotería Nacional Gana Más*\n` +
        `2️⃣ *Lotería Nacional Noche*\n\n` +
        `Responde con el número de tu elección o escribe *volver* para regresar al menú anterior.`
    );
};

const sendLaSuerteSubMenu = (message) => {
    message.reply(
        `🎲 Has seleccionado *La Suerte*. Por favor elige una opción:\n\n` +
        `1️⃣ *La Suerte Tarde*\n` +
        `2️⃣ *La Suerte Noche*\n\n` +
        `Responde con el número de tu elección o escribe *volver* para regresar al menú anterior.`
    );
};

const sendLaPrimeraSubMenu = (message) => {
    message.reply(
        `🎲 Has seleccionado *La Primera*. Por favor elige una opción:\n\n` +
        `1️⃣ *La Primera Tarde*\n` +
        `2️⃣ *La Primera Noche*\n\n` +
        `Responde con el número de tu elección o escribe *volver* para regresar al menú anterior.`
    );
};

const sendKingLotterySubMenu = (message) => {
    message.reply(
        `👑 Has seleccionado *King Lottery*. Por favor elige una opción:\n\n` +
        `1️⃣ *King Lottery Tarde*\n` +
        `2️⃣ *King Lottery Noche*\n\n` +
        `Responde con el número de tu elección o escribe *volver* para regresar al menú anterior.`
    );
};

const sendFloridaLotterySubMenu = (message) => {
    message.reply(
        `🌴 Has seleccionado *Florida Lottery*. Por favor elige una opción:\n\n` +
        `1️⃣ *Florida Lottery Tarde*\n` +
        `2️⃣ *Florida Lottery Noche*\n\n` +
        `Responde con el número de tu elección o escribe *volver* para regresar al menú anterior.`
    );
};

const sendNewYorkLotterySubMenu = (message) => {
    message.reply(
        `🗽 Has seleccionado *New York Lottery*. Por favor elige una opción:\n\n` +
        `1️⃣ *New York Lottery Tarde*\n` +
        `2️⃣ *New York Lottery Noche*\n\n` +
        `Responde con el número de tu elección o escribe *volver* para regresar al menú anterior.`
    );
};

const sendAnguillaSubMenu = (message) => {
    message.reply(
        `🌅 Has seleccionado *Anguilla*. Por favor elige un horario:\n\n` +
        `1️⃣ *Anguilla 9:00 AM*\n` +
        `2️⃣ *Anguilla 10:00 AM*\n` +
        `3️⃣ *Anguilla 11:00 AM*\n` +
        `4️⃣ *Anguilla 12:00 PM*\n` +
        `5️⃣ *Anguilla 1:00 PM*\n` +
        `6️⃣ *Anguilla 2:00 PM*\n` +
        `7️⃣ *Anguilla 3:00 PM*\n` +
        `8️⃣ *Anguilla 4:00 PM*\n` +
        `9️⃣ *Anguilla 5:00 PM*\n` +
        `🔟 *Anguilla 6:00 PM*\n` +
        `1️⃣1️⃣ *Anguilla 7:00 PM*\n` +
        `1️⃣2️⃣ *Anguilla 8:00 PM*\n` +
        `1️⃣3️⃣ *Anguilla 9:00 PM*\n\n` +
        `Responde con el número de tu elección o escribe *volver* para regresar al menú anterior.`
    );
};

// Función para obtener y mostrar los últimos resultados de una lotería específica
const fetchLatestLotteryResults = async (message, lotteryDescription) => {
    try {
        const response = await axios.get('https://sorteosrd.com/api/sorteosrd-results/217XUR6ivy8A1NdI4SKcnAa9YGZRV7w3');
        const data = response.data;

        const results = data
            .filter(item => item.descripcion.trim().toLowerCase() === lotteryDescription.trim().toLowerCase())
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        const latestResult = results[0];

        if (latestResult && latestResult.num1 && latestResult.num2 && latestResult.num3) {
        const dateOptions = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = new Date(latestResult.created_at).toLocaleDateString('es-ES', dateOptions);

            
            message.reply(
                `Últimos resultados para ${lotteryDescription}:\n\n` +
                `📋 Descripción: *${latestResult.descripcion}*\n` +
                `📅 Fecha: *${formattedDate}*\n\n` +
                `1️⃣ En Primera: *${latestResult.num1}*\n` +
                `2️⃣ En Segunda: *${latestResult.num2}*\n` +
                `3️⃣ En tercera: *${latestResult.num3}*\n\n`+
                `Somos *Sorteos RD*, tu canal de Loterías\n`+
                `📣 *COMPARTE* este WhatsApp con tus contactos.\n`
                
            );
        } else {
            message.reply(`⏳ Los resultados de *${lotteryDescription}* aún no están disponibles.`);
        }
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        message.reply('Ocurrió un error al obtener los datos. Por favor, intenta nuevamente más tarde.');
    }
};

const agradecimientoRegex = /gracias|grasias|gracia|muchas gracias|grax|grasia/i;


// Manejo de mensajes
client.on('message', message => {
const chatId = message.from;
const msg = message.body.trim().toLowerCase();

       // Estado "paused" para detener el bot
   if (userState[chatId] === 'paused') {
        if (msg === 'menu') {
            userState[chatId] = 'welcomeMenu'; // Reactivar el menú principal
            sendWelcomeMenu(message);
        } 
        return; // Salir del manejador si el estado es "paused"
    }

       // Inicializar estado si no existe
       if (!userState[chatId]) {
        userState[chatId] = 'welcomeMenu';
    }

    if (agradecimientoRegex.test(msg)) {
        message.reply("Estamos para servirle. Si necesitas más ayuda, no dudes en pedírmelo.🚀😊");
        return; // Termina aquí si el mensaje contiene alguna palabra de agradecimiento
    }

    


    if (!userState[chatId]) userState[chatId] = 'welcomeMenu';

    if (msg === 'menu' || msg === 'hola' || msg === 'buenos días'|| msg === 'saludos'|| msg === 'klk'|| msg === 'Hi'|| msg === 'buenas tardes'|| msg === 'buenas noches'|| msg === '.'|| msg === 'okey'|| msg === 'okay') {
        userState[chatId] = 'welcomeMenu';
        sendWelcomeMenu(message);
    }

        // Nueva entrada: "chatsrd"
        if (msg === 'chatsrd') {
            message.reply(
                `🌐 *ChatSRD*\n\n` +
                `Números de la *Suerte*: *${randomNumbers}*\n\n` +
                `¡Juega con responsabilidad!`
            );
            return;
        }
    
    else if (userState[chatId] === 'welcomeMenu') {
        if (msg === '1') {
            userState[chatId] = 'lotteryMenu';
            sendLotteryMenu(message);
        } else if (msg === '2') {
            message.reply('🌐 ¡Bienvenido a nuestra *Comunidad de Loterías*! Aquí compartimos consejos y actualizaciones sobre loterías con nuestros miembros.\n Entra ahora https://chatsrd.com');
        } else if (msg === '3') {
            userState[chatId] = 'paused'; // Cambiar a estado "paused"
            message.reply('💬 Un representante se comunicará contigo pronto. Por favor, espera.\n Si desea volver al inicio escriba la palabra *Menú*');
        } else {
            message.reply('Opción no válida. Aquí tienes el menú principal de nuevo.');
            sendWelcomeMenu(message);
        }
    }
    else if (userState[chatId] === 'lotteryMenu') {
        if (msg === '1') {
            userState[chatId] = 'loteriaNacionalSubMenu';
            sendLoteriaNacionalSubMenu(message);
        } else if (msg === '2') {
            fetchLatestLotteryResults(message, 'Quiniela Pale Leidsa 8:55 PM / Dom 3:00 PM');
        } else if (msg === '3') {
            userState[chatId] = 'laSuerteSubMenu';
            sendLaSuerteSubMenu(message); 
        } 
        else if (msg === '10') {
            fetchLatestLotteryResults(message, 'Loto Real 12:55 PM');
        }
        else if (msg === '5') {
            fetchLatestLotteryResults(message, 'Quiniela LoteDom 5:55 PM');
        } else if (msg === '6') {
            fetchLatestLotteryResults(message, 'Loteka 7:55 PM');
        } else if (msg === '7') {
            userState[chatId] = 'laPrimeraSubMenu';
            sendLaPrimeraSubMenu(message);
        } else if (msg === '9') {
            userState[chatId] = 'anguillaSubMenu';
            sendAnguillaSubMenu(message);
        } else if (msg === '11') {
            userState[chatId] = 'kingLotterySubMenu';
            sendKingLotterySubMenu(message);
        } else if (msg === '12') {
            userState[chatId] = 'floridaLotterySubMenu';
            sendFloridaLotterySubMenu(message);
        } else if (msg === '13') {
            userState[chatId] = 'newYorkLotterySubMenu';
            sendNewYorkLotterySubMenu(message);
        } else if (msg === 'volver') {
            userState[chatId] = 'welcomeMenu';
            sendWelcomeMenu(message);
        } else {
            message.reply('Opción no válida. Aquí tienes el menú principal de nuevo.');
            sendLotteryMenu(message);
        }
    }
    else if (userState[chatId] === 'newYorkLotterySubMenu') {
        if (msg === '1') {
            fetchLatestLotteryResults(message, 'New York Lottery 3:30 PM');
        } else if (msg === '2') {
            fetchLatestLotteryResults(message, 'New York Lottery 10:30 PM');
        } else if (msg === 'volver') {
            userState[chatId] = 'lotteryMenu';
            sendLotteryMenu(message);
        } else {
            message.reply('Opción no válida.');
            sendNewYorkLotterySubMenu(message);
        }
    }
    else if (userState[chatId] === 'kingLotterySubMenu') {
        if (msg === '1') {
            fetchLatestLotteryResults(message, 'King Lottery 12:30 PM');
        } else if (msg === '2') {
            fetchLatestLotteryResults(message, 'King Lottery 7:30 PM');
        } else if (msg === 'volver') {
            userState[chatId] = 'lotteryMenu';
            sendLotteryMenu(message);
        } else {
            message.reply('Opción no válida.');
            sendKingLotterySubMenu(message);
        }
    }
    else if (userState[chatId] === 'floridaLotterySubMenu') {
        if (msg === '1') {
            fetchLatestLotteryResults(message, 'Florida Lottery 1:30 PM');
        } else if (msg === '2') {
            fetchLatestLotteryResults(message, 'Florida 10:50 PM');
        } else if (msg === 'volver') {
            userState[chatId] = 'lotteryMenu';
            sendLotteryMenu(message);
        } else {
            message.reply('Opción no válida.');
            sendFloridaLotterySubMenu(message);
        }
    }
    // Opciones del submenú de La Suerte con tarde y noche
    else if (userState[chatId] === 'laSuerteSubMenu') {
        if (msg === '1') {
            fetchLatestLotteryResults(message, 'La Suerte Dominicana 12:30PM');
        } else if (msg === '2') {
            fetchLatestLotteryResults(message, 'La Suerte 6:00 PM');
        } else if (msg === 'volver') {
            userState[chatId] = 'lotteryMenu';
            sendLotteryMenu(message);
        } else {
            message.reply('Opción no válida. Por favor, elige una opción válida o escribe *volver* para regresar.');
            sendLaSuerteSubMenu(message);
        }
    }

    // Opciones del submenú de La Primera con tarde y noche
    else if (userState[chatId] === 'laPrimeraSubMenu') {
        if (msg === '1') {
            fetchLatestLotteryResults(message, 'La Primera 12:00PM');
        } else if (msg === '2') {
            fetchLatestLotteryResults(message, 'La Primera 8:00 PM');
        } else if (msg === 'volver') {
            userState[chatId] = 'lotteryMenu';
            sendLotteryMenu(message);
        } else {
            message.reply('Opción no válida. Por favor, elige una opción válida o escribe *volver* para regresar.');
            sendLaPrimeraSubMenu(message);
        }
    }

    else if (userState[chatId] === 'loteriaNacionalSubMenu') {
        if (msg === '1') {
            fetchLatestLotteryResults(message, 'Loteria Nacional 2:30 PM Gana Más');
        } else if (msg === '2') {
            fetchLatestLotteryResults(message, 'Loteria Nacional 8:50 PM');
        } else if (msg === 'volver') {
            userState[chatId] = 'lotteryMenu';
            sendLotteryMenu(message);
        } else {
            message.reply('Opción no válida.');
            sendLoteriaNacionalSubMenu(message);
        }
    }
    else if (userState[chatId] === 'anguillaSubMenu') {
        const anguillaOptions = {
            '1': 'Anguila 9:00 AM Lun-Vie',
            '2': 'Anguila 10:00 AM',
            '3': 'Anguila 11:00 AM',
            '4': 'Anguila 12:00 PM',
            '5': 'Anguila 1:00 PM',
            '6': 'Anguila 2:00 PM',
            '7': 'Anguila 3:00 PM',
            '8': 'Anguila 4:00 PM',
            '9': 'Anguila 5:00 PM',
            '10': 'Anguila 6:00 PM',
            '11': 'Anguila 7:00 PM',
            '12': 'Anguila 8:00 PM',
            '13': 'Anguila 9:00 PM',

        };

        if (msg in anguillaOptions) {
            const selectedAnguilla = anguillaOptions[msg];
            fetchLatestLotteryResults(message, selectedAnguilla);
        } else if (msg === 'volver') {
            userState[chatId] = 'lotteryMenu';
            sendLotteryMenu(message);
        } else {
            message.reply('Opción no válida. Por favor, elige una opción válida o escribe *volver* para regresar.');
            sendAnguillaSubMenu(message);
        }
    }
});

// Inicializar cliente
client.initialize();