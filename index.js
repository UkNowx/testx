const Discord = require("discord.js-selfbot-v13");
const { Client } = require('discord.js-selfbot-v13');
const client = new Discord.Client({
    checkUpdate: false
});
const express = require('express')
const app = express();
const port = 8000;

const largeImages = [
    'https://media.discordapp.net/attachments/1198466129664950374/1199704361027244113/powerback.gif?ex=65c382c1&is=65b10dc1&hm=5a48285b814aaf30f3670b496815cd784f781811f9591ebf6e2e4ff30874170f&=',
    'https://media.discordapp.net/attachments/1198466129664950374/1199704361564110908/powerbackx.gif?ex=65c382c1&is=65b10dc1&hm=33df403c047cdfe49a1031b9ffa1657599b5fbd9a5d2e22876579ad69f6f9b18&=',
    'https://media.discordapp.net/attachments/1198466129664950374/1199704362050654258/genshin.gif?ex=65c382c1&is=65b10dc1&hm=da4389ad33e2ef98ac4e5b4c644f254fd298e9134984ec9486f27c4adea9d7c7&=',
    'https://media.discordapp.net/attachments/1198466129664950374/1199704362482663424/genshin2.gif?ex=65c382c1&is=65b10dc1&hm=f62b7171cb15e3001926e70c009b652e12203dd734c4dd1d3479753f3af01e53&=',
    'https://media.discordapp.net/attachments/1198466129664950374/1199704363023732736/genshin3.gif?ex=65c382c1&is=65b10dc1&hm=720df3fc9bb421a283a102eb46ae3affe467d93499b786312c41cb982e0378b0&='
    // Add more large image URLs as needed
];

const stateTexts = [
    '「 𝙷𝚎𝚕𝚕𝚘 𝙵𝚛𝚘𝚖 𝙺𝚒𝚛𝚌𝚢 」',
    '「 𝙹𝚘𝚒𝚗 𝙾𝚞𝚛 𝙳𝚒𝚜𝚌𝚘𝚛𝚍! 」',
    '「 𝙵𝚛𝚎𝚎 𝙸𝚝𝚎𝚖𝚜 𝙾𝚗 𝙳𝚌 」',
    '「 𝚁𝚞𝚗 𝙱𝚘𝚝 𝟸𝟺𝙷 」'
    // Add more state texts as needed
];

const nameTexts = [
    'รับบูสดิสราคาถูก.',
    'รับรันเม็ดม่วง 24ชม.',
    'รับรันบอท 24ชม.',
    'รับรันดักซอง 24ชม.',
    'เเจกของต่างๆเข้ามาดิส'
    // Add more state texts as needed
];

let currentStateIndex = 0; // Index to track the current state text

let currentLargeImageIndex = 0;

let currentnameTextsIndex = 0;

app.get('/', (req, res) => res.send('ทำงานเรียบร้อยแล้ว'))
app.listen(port, () =>
    console.log(`Your app is listening at http://localhost:${port}`)
);

client.on("ready", async () => {
    var startedAt = Date.now();
    console.log(`${client.user.username} เม็ดม่วงทำงานเรียบร้อยแล้ว !`);

    setInterval(() => {
        const currentTime = getCurrentTime();
        const currentDate = getCurrentDate();

        const r = new Discord.RichPresence()
            .setApplicationId('1121867777867788309')
            .setType('STREAMING')
            .setState(stateTexts[currentStateIndex])
            .setName(nameTexts[currentnameTextsIndex])
            .setDetails(` ﹝ ⌚${currentTime} | 😎 𝙆𝙞𝙧𝙘𝙮𝘿𝙚𝙫 ﹞ `)
            .setStartTimestamp(startedAt)
            .setAssetsLargeText(`﹝ 📅 ${currentDate}  |  🛸 0 m/s ﹞`)
            .setAssetsLargeImage(largeImages[currentLargeImageIndex])
            .setAssetsSmallText('A$t๏r 🖤')
            .addButton('เข้าดิส', 'https://fakelinkclub')


        client.user.setActivity(r);

        currentLargeImageIndex = (currentLargeImageIndex + 1) % largeImages.length;
        currentStateIndex = (currentStateIndex + 1) % stateTexts.length;
        currentnameTextsIndex = (currentnameTextsIndex + 1) % nameTexts.length;
    }, 500); // Change large image and state text every 1 second
});

function getCurrentDate() {
    const a = new Date(Date.now());
    const c = { timeZone: "Asia/Bangkok", day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = a.toLocaleDateString("en-US", c);
    const [month, day, year] = formattedDate.split('/');
    return `${day}/${month}/${year}`;
}

function getCurrentTime() {
    const a = new Date(Date.now());
    const c = { timeZone: "Asia/Bangkok", hour: "numeric", minute: "numeric", hour12: false };
    return a.toLocaleTimeString("th-TH", c);
}

client.login(process.env.token);
