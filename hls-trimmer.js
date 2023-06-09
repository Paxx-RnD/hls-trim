const HLS= require('hls-parser');
const fs = require('fs');
const path = require('path');

const uri = process.argv[2]
const start = +process.argv[3]
const end = +process.argv[4]

fetch(uri)
    .then(res => res.text())
    .then(text => {
        const playlist = HLS.parse(text);
        for(let variant of playlist.variants){
            const parsedUrl = new URL(uri);
            const directoryPath = path.dirname(parsedUrl.pathname);
            const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}${directoryPath}/`;
            let filename = path.basename(baseUrl + variant.uri)
            fetch(baseUrl + filename)
                .then(res => res.text())
                .then(text => {
                    const chunklist = HLS.parse(text)
                    chunklist.segments = trim(start, end, chunklist.segments)
                    write(filename, chunklist)
                })

        }
        const manifest = path.basename(uri)
        write(manifest, playlist)
    })

function trim(start, end, segments) {
    const trimmedSegments = [];

    let offset = 0
    for (const segment of segments) {
        const segmentStart = offset;
        const segmentEnd = segmentStart + segment.duration;
        offset = segmentEnd

        if (segmentStart >= start && segmentEnd <= end) {
            trimmedSegments.push(segment);
        }

        if (segmentEnd > end)
            return trimmedSegments;
    }

    return trimmedSegments;
}

function write(filename, playlist) {
    let playlistData = HLS.stringify(playlist)
    fs.writeFile(filename, playlistData, 'utf8', (err) => {
        if (err) {
            console.error('An error occurred while writing the file:', err);
        }
    });
}
