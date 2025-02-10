
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define schemas
const artistSchema = new mongoose.Schema({
  name: String,
  image: String,
  followers: Number,
  genres: [String],
  popularity: Number,
  url: String,
  albums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }]
});

const albumSchema = new mongoose.Schema({
  name: String,
  image: String,
  releaseDate: Date,
  totalTracks: Number,
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }]
});

const songSchema = new mongoose.Schema({
  title: String,
  artists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }],
  duration: Number,
  album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
  url: String,
  lyrics: String
});

const Artist = mongoose.model('Artist', artistSchema);
const Album = mongoose.model('Album', albumSchema);
const Song = mongoose.model('Song', songSchema);

// Routes
app.get('/api/artists/top', async (req, res) => {
  try {
    const artists = await Artist.find().sort({ popularity: -1 }).limit(6);
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/artists/by-genre', async (req, res) => {
  try {
    const artists = await Artist.find().sort({ popularity: -1 });
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/artists/:id', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id).populate('albums');
    res.json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/albums/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate('songs');
    res.json(album);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/songs/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id)
        .populate('artists')
        .populate('album');
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});