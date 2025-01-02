import { Agent } from 'w-kits';
import { google } from 'w-kits/models';
import readline from 'readline';

// Membuat instance Agent
const agent = new Agent({
    model: google('gemini-2.0-flash-exp'),
    chain: 'testnet',
    privateKey: process.env.PRIVATE_KEY as `0x${string}`,
    tokenList: {
        WPN: {
            address: '0x619114eE16B57b43237153C585d5FAbd20e4EBfA',
            symbol: 'WPN',
            decimals: 18,
        },
    },
});

// Membuat interface untuk membaca input dari terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Batas maksimal riwayat percakapan
const MAX_HISTORY_LENGTH = 30;

// Array untuk menyimpan riwayat percakapan
const chatHistory: string[] = [];

// Fungsi untuk menambahkan pesan ke riwayat percakapan
function addToHistory(message: string) {
    chatHistory.push(message); // Tambahkan pesan baru
    if (chatHistory.length > MAX_HISTORY_LENGTH) {
        chatHistory.shift(); // Hapus pesan terlama jika melebihi batas
    }
}

// Fungsi untuk mendapatkan riwayat percakapan sebagai string
function getHistory() {
    return chatHistory.join('\n');
}

// Fungsi untuk memulai chat
async function startChat() {
    while (true) {
        const userInput = await new Promise<string>((resolve) => {
            rl.question('You: ', resolve);
        });

        if (userInput.toLowerCase() === 'exit') {
            console.log('Goodbye!');
            rl.close();
            break;
        }

        // Tambahkan pesan pengguna ke riwayat percakapan
        addToHistory(`You: ${userInput}`);

        // Ambil riwayat percakapan sebagai konteks
        const context = getHistory();

        // Gabungkan konteks dengan input pengguna
        const prompt = `${context}\nAssistant:`;

        // Menggunakan generateText untuk mendapatkan respons dari agent
        try {
            const { text } = await agent.generateText({
                prompt: prompt,
                toolChoice: 'auto',
                maxSteps: 10,
            });

            // Tambahkan respons AI ke riwayat percakapan
            addToHistory(`Assistant: ${text}`);

            // Menampilkan respons
            console.log(`Assistant: ${text}`);
        } catch (error) {
            console.error('Error while generating response:', error);
        }
    }
}

// Memulai chat
console.log('Chatbot is running. Type "exit" to quit.');
startChat();