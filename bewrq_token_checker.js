const { Client } = require("discord.js-selfbot-v13");
const fs = require('fs');
function printProgressBar(current, total, barLength = 10, color = "green", valid = 0, verified = 0) {
const percent = total ? Math.floor((current / total) * 100) : 0;
const filledLength = total ? Math.floor(barLength * current / total) : 0;
const emptyLength = barLength - filledLength;
let bar;
if (color === "green") {
bar = "🟩".repeat(filledLength) + "⬜".repeat(emptyLength);
} else if (color === "blue") {
bar = "🟦".repeat(filledLength) + "⬜".repeat(emptyLength);
} else {
bar = "⬛".repeat(filledLength) + "⬜".repeat(emptyLength);
} process.stdout.write(`\r${bar} (%${percent}) | İşlenen: ${current}/${total} | Geçerli: ${valid} | Doğrulanmış: ${verified}`);
}
class TokenChecker {
constructor() {
this.validTokens = new Set(); 
this.invalidTokens = new Set();
this.verifiedTokens = new Set();
this.processedCount = 0;
this.totalTokens = 0;
this.verifiedCount = 0;
this.existingTokens = new Set(); 
this.lastProgress = 0; }
loadExistingTokens() {
try {
if (fs.existsSync('tokens/fixtoken.txt')) {
const existingTokens = fs.readFileSync('tokens/fixtoken.txt', 'utf8').split('\n');
existingTokens.forEach(token => {
if (token.trim()) {
this.existingTokens.add(token.trim());
                }
            });
        }
    } catch (error) {}
}
async checkToken(token) {
if (!token || token.trim() === '') {
this.processedCount++;
this.updateProgress();
return;
}
if (this.existingTokens.has(token)) {
this.validTokens.add(token);
this.processedCount++;
this.updateProgress();
return; }
const client = new Client({
checkUpdate: false,
autoRedeemNitro: false,
patchVoice: false,
ws: {
properties: {
browser: "Discord Android"
}
}
});
try {
await client.login(token);
const user = client.user;

        if (user) {
            this.validTokens.add(token);
            if (user.verified) {
                this.verifiedCount++;
                this.verifiedTokens.add(token);

                fs.appendFileSync('tokens/dogrulanmis.txt', token + '\n');
            }
        } else {
            this.invalidTokens.add(token);
        }
    } catch (error) {
        this.invalidTokens.add(token);
    } finally {
        try {
            await client.destroy();
        } catch (e) {}
        this.processedCount++;
        this.updateProgress();
    }
}
updateProgress() {
const currentProgress = Math.floor((this.processedCount / this.totalTokens) * 100);
if (currentProgress !== this.lastProgress) {
printProgressBar(
this.processedCount,
this.totalTokens,
10,
"green",
this.validTokens.size,
this.verifiedCount
);
this.lastProgress = currentProgress;
}
}
async processTokens() {
this.loadExistingTokens();

    if (!fs.existsSync('token.txt')) {
        console.log('./token.txt dosyası bulunamadı!');
        return;
    }

    const allLines = fs.readFileSync('./token.txt', 'utf8').split('\n');
    this.totalTokens = allLines.length;
    console.log(`Toplam ${this.totalTokens} token kontrol ediliyor...\n`);

    for (let i = 0; i < allLines.length; i += 3) {
        const tokenGroup = allLines.slice(i, i + 3);
        await Promise.all(tokenGroup.map(token => this.checkToken(token.trim())));
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    const allValidTokens = [...this.existingTokens, ...this.validTokens];
    fs.writeFileSync('tokens/fixtoken.txt', allValidTokens.join('\n'));

    fs.writeFileSync('tokens/dogrulanmis.txt', [...this.verifiedTokens].join('\n'));

    console.log('\n\n=== İşlem Tamamlandı ===');
    console.log(`Toplam token sayısı: ${this.totalTokens}`);
    console.log(`Yeni geçerli token sayısı: ${this.validTokens.size}`);
    console.log(`Mevcut token sayısı: ${this.existingTokens.size}`);
    console.log(`Toplam geçerli token sayısı: ${allValidTokens.length}`);
    console.log(`Geçersiz token sayısı: ${this.invalidTokens.size}`);
    console.log(`Doğrulanmış token sayısı: ${this.verifiedCount}`);
    console.log('========================');
}
}
const checker = new TokenChecker();
checker.processTokens().catch(console.error);