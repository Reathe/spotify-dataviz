## Spotify Data Visualisation

## Questions auxquelles nous allons tenter de répondre

Variation dans les habitudes d'écoute :
- Beaucoup d'artistes & peu de chansons par artiste (large) vs. l'inverse (profond) : songs_albums_listens
- Eclectique en genres musicaux ou plutôt chauvin : aller chercher les genres de l'artiste dans l'api (search artiste) en question, les append aux artistes de l'objet "songs_albums_listens" (1er niveau de hiérachie)
- Tendance à écouter des albums (presque au complet) ou des playlists avec seulement quelques chansons par artiste : regarder dans songs_albums_listens à quel point les albums sont "peuplés", i.e. comparer le nombre de chansons écoutées d'un albums à 10 (arbitraire)
- Artistes populaires vs. exploration : champ popularity dans l'api avec requête search de l'artiste
- Pour un artiste, rester sur ses chansons les plus écoutées ou explorer son répertoire : requete artist top tracks api, compare ça aux chansons écoutées dans "songs_albums_listens"
- Différences dans le temps d'écoute (par jour, par session, etc.) : chronology

## Format du json

{
    "ts":"2013-10-09 20:03:57 UTC",
    "username":"xxxxxxxxxx",
    "platform":"xxxxxxx",
    "ms_played":"5969",
    "conn_country":"NL",
    "ip_addr_decrypted":"xx.xx.xx.xx",
    "user_agent_decrypted": "xxxxxxxxxxx",
    "master_metadata_track_name":"You Make Me",
    "master_metadata_album_artist_name":"Avicii",
    "master_metadata_album_album_name":"You Make Me",
    "reason_start":"click-row",
    "reason_end":"click-row",
    "shuffle":false,
    "skipped":false,
    "offline":false,
    "offline_timestamp":"0",
    "incognito_mode":false,
    "metro_code":"0",
    "longitude":0,
    "latitude":0
}