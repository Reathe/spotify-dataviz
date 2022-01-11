## Spotify Data Visualisation

page web : https://reathe.github.io/spotify-dataviz/

## Questions auxquelles nous allons tenter de répondre

Variation dans les habitudes d'écoute :
- Beaucoup d'artistes & peu de chansons par artiste (large) vs. l'inverse (profond). Données : listing. Visu : Histogramme, chansons par artistes (ordonnées), Raf et Guillaume en abscisses, donc 2 barres
- Eclectique en genres musicaux ou plutôt chauvin. Présence des generes dans tous les artistes écoutés. Données : listing. Visu : Camembert du nombre de fois qu'on retrouve chaque genre dans tous les artistes. Ex : Rock : 68% des artistes
- Taux de chansons populaires par artiste. Données : listing. Visu : Courbes, artistes en abscisses, Taux de top tracks en ordonnée
- Popularité des artistes. Données : Listing. Visu : Courbes, artistes en abscisses, Taux de popularité en ordonnée
- Différences liées au temps d'écoute :
    Depuis le début :
    - taux d'écoute total depuis la première date dans chronology (dd:hh:mm)
    - taux d'écoute moyen par heure, jour, semaine, mois, année
    - taux d'écoute moyen par heure, détaillé. Données : liste_time_per_hour_detailed. Visu : circular bar plot
    - sessions : 
        - durée des sessions au total. Données : session_lengths. Visu : horizontal bar chart, avec durée session en ordonnée, et nombre de sessions de cette durée en abscisse.
        - répartition de sessions dans le temps, en intervalles. Données : sessions_detailed. Visu : arc diagram, heures en "abscisses". Eventuellement diviser par 10 le nombre d'arcs
- Etude de la présence des artistes dans la chronologie. Données : chronology. Visu : Bar chart du nombre d'écoute par artiste (ordonées) depuis le début (temps en abscisses)

Reste à faire :
- fond noir, texte vert (ou gris clair ?)
- placer les titres des graphes au dessus de ceux-ci
- pour tous les graphes, les ajuster pur qu'ils prennent le plus de place respectivement en gardant la lisibilité
- premier histogramme, mettre les valeurs au dessus des barres
- changer les couleurs des camemberts, sortir les nombres et mettre le genre en question avec
- manque le bar chart horizontal de la durée des sessions
- dans le taux découte par heure détaillé, placer les heures au centre des graphes et remplacer le chiffre à l'extérieur par sa valeur. Celui de Guillaume est coupé
- augmenter la taille verticale des arc diagram, espacer les noeuds
- revoir les graphe7


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
