# HLS Playlist Trimmer

This script allows you to trim an HLS (HTTP Live Streaming) playlist and its associated chunklists based on specified start and end times. It utilizes the `hls-parser` library to parse and manipulate HLS playlists.

## Prerequisites

Before running this script, ensure that you have the following:

- Node.js installed on your system.

## Installation

1. Clone the repository or download the script file.

2. Install the required dependencies by running the following command in the project directory:

npm install hls-parser

## Usage

To use the HLS Playlist Trimmer script, follow these steps:

1. Open a terminal or command prompt.

2. Navigate to the directory containing the script.

3. Run the script with the following command:


node <script_file> <uri> <start> <end>


Replace `<script_file>` with the filename of the script.

Replace `<uri>` with the URI (Uniform Resource Identifier) of the HLS playlist you want to trim.

Replace `<start>` and `<end>` with the desired start and end times (in seconds) of the trimmed segment.

4. The script will fetch the playlist, parse it, and trim the specified segment from each variant. It will also save the modified playlists as separate files.

## Example


node hls-trimmer.js https://example.com/playlist.m3u8 10 30


In this example, the script will fetch the HLS playlist located at `https://example.com/playlist.m3u8`, trim the segment from 10 to 30 seconds, and save the modified playlists as separate files.


