Promise.all([

    d3.json("/data/endsong_0.json"),
    d3.json("/data/endsong_1.json"),
    d3.json("/data/endsong_2.json"),
    d3.json("/data/endsong_3.json"),
    d3.json("/data/endsong_4.json"),
    d3.json("/data/endsong_5.json"),
    d3.json("/data/endsong_6.json"),
    d3.json("/data/endsong_7.json")

]).then(function (jsons) {

    // building:
    // 1. listing of artists, albums per artists, songs per albums and number of listens
    // 2. chronology of each listens per day, with song, duration, artist and album
    var songs_albums_listens = {};
    var chronology = {};

    for (var i = 0; i < jsons.length; i++) {
        for (var j = 0; j < jsons[i].length; j++) {

            var ts = jsons[i][j].ts;
            var day = ts.substr(0, 10);
            var time = ts.substr(11, 8);
            var ms_played = jsons[i][j].ms_played;
            var artist = jsons[i][j].master_metadata_album_artist_name;
            var album = jsons[i][j].master_metadata_album_album_name;
            var song = jsons[i][j].master_metadata_track_name;

            /** listing of the form:
                {
                    artist1: {
                        album1: {
                            song1: x
                        },
                        album2: {
                            song3: x,
                            song5: x
                        }
                    },
                    artist2: {
                        album1: {
                            song1: x
                        },
                        album2: {
                            song3: x,
                            song5: x
                        }
                    },
                }
            */
            if (!(artist in songs_albums_listens)) {
                var data_album = {};
                data_album[song] = 1;
                var data_artist = {};
                data_artist[album] = data_album;
                songs_albums_listens[artist] = data_artist;
            } else {
                albums_for_artist = songs_albums_listens[artist];
                if (!(album in albums_for_artist)) {
                    var data_album = {};
                    data_album[song] = 1;
                    songs_albums_listens[artist][album] = data_album;
                } else {
                    songs_for_album = albums_for_artist[album];
                    if (!(song in songs_for_album)) {
                        songs_for_album[song] = 1;
                    } else {
                        songs_for_album[song] = (songs_for_album[song] + 1);
                    }
                }
            }

            /** chronology of the form:
                {
                    day (yyyy-mm-dd): {
                        time (hh:mm:ss UTC): {
                            songname: x,
                            ms_played: x,
                            artist: x,
                            album: x
                        },
                        time: {
                            songname: x,
                            ms_played: x,
                            artist: x,
                            album: x
                        }
                    },
                    day: {
                        time: {
                            songname: x,
                            ms_played: x,
                            artist: x,
                            album: x
                        },
                    },
                }
            */
            if (!(day in chronology)) {
                var new_day = {};
                new_day[time] = {
                    "songname": song,
                    "ms_played": ms_played,
                    "artist": artist,
                    "album": album,
                };
                chronology[day] = new_day;
            } else {
                chronology[day][time] = {
                    "songname": song,
                    "ms_played": ms_played,
                    "artist": artist,
                    "album": album,
                }
            }
        }
    }

    // cleaning data structures of unwanted artists
    var blacklist = [
        "Andrei Krylov",
        "Ben Morfitt (SquidPhysics)",
        "Daft Punk",
        "Drake",
        "Gorillaz",
        "John Renbourn",
        "Kenji Kawai",
        "Justice",
        "Marcin Przybyłowicz",
        "Mikolai Stroinski",
        "Mick Gordon",
        "null",
        "Pink Guy",
        "Parcels",
        "Paradox Interactive",
        "Thousand Foot Krutch",
        "Trouvere Medieval Minstrels"
    ];
    Object.keys(songs_albums_listens).forEach(function (artist) {
        var count = 0;
        Object.keys(songs_albums_listens[artist]).forEach(function (album) {
            Object.keys(songs_albums_listens[artist][album]).forEach(function (song) {
                count = (count + songs_albums_listens[artist][album][song]);
            });
        });
        if (count < 100) blacklist.push(artist);
    });

    blacklist.forEach(function (blacklisted) {
        delete songs_albums_listens[blacklisted];
    })

    const reducer = (accumulator, curr) => accumulator + curr;
    Object.keys(chronology).forEach(function (day) {
        var total_listen_time = 0;
        var listen_time = [];
        for (let i = 0; i < 24; i++) { listen_time[i] = 0; }
        Object.keys(chronology[day]).forEach(function (time) {
            var hour = time.substr(0, 2);
            listen_time[parseInt(hour)] += chronology[day][time]['ms_played'];
            // total_listen_time += chronology[day][time]['ms_played'];
            if (blacklist.includes(chronology[day][time]["artist"]) || chronology[day][time]["songname"] == null) {
                delete chronology[day][time];
                var empty = true;
                for (var i in chronology[day]) { empty = false; break; }
                if (empty) delete chronology[day];
            }
        });
        if (typeof chronology[day] !== 'undefined') {
            chronology[day].listen_time = listen_time;
            chronology[day].total_listen_time = listen_time.reduce(reducer);
        }
    });

    console.log(JSON.stringify(songs_albums_listens));
    console.log(chronology);
});