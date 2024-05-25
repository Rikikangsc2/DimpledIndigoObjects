const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

app.get('/yt-mp3', async (req, res) => {
    let url = req.query.url;
    if (!ytdl.validateURL(url)) {
        return res.status(400).send('URL tidak valid');
    }
    let info = await ytdl.getInfo(url);
    let format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
    res.header('Content-Disposition', `attachment; filename="audio.mp3"`);
    res.setHeader('Content-Type', 'audio/mpeg');
    ytdl(url, { format: format }).pipe(res);
});

app.get('/yt-mp4', async (req, res) => {
    let url = req.query.url;
    if (!ytdl.validateURL(url)) {
        return res.status(400).send('URL tidak valid');
    }
    let info = await ytdl.getInfo(url);
    let format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });
    res.header('Content-Disposition', `attachment; filename="video.mp4"`);
    res.setHeader('Content-Type', 'video/mp4');
    ytdl(url, { format: format }).pipe(res);
});

app.listen(3000, () => {
    console.log('Server berjalan di port 3000');
});
