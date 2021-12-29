# %%
import json
import sys
import requests

auth = "BQCnKvzwFSzsGkdskCMHhS1KTvMePypz-wazKfnjhykhTBb1dogyXnvl76D-GwlaTgnuJW5a69oiuBuJfP88wuOUMQfWk-mKUoUdYo8iFmF787OiTn0BXHd_hhvpgpFHEDK7_t7tTYzI"


def search(query, artist=False):
    return requests.get(
            f"https://api.spotify.com/v1/search?q={query}&type={'artist' if artist else 'track'}&market=FR&limit=1",
            headers={
                    "Accept":        "application/json",
                    "Authorization": f"Bearer {auth}",
                    "Content-Type":  "application/json"
            }
    )


def get_top_tracks(artist_id):
    return requests.get(
            f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks?market=FR",
            headers={
                    "Accept":        "application/json",
                    "Authorization": f"Bearer {auth}",
                    "Content-Type":  "application/json"
            }
    )


def get_artists_data(data):
    for artist in data:
        res = search(artist, artist=True).json()
        data[artist]["genres"] = res["artists"]["items"][0]["genres"]
        data[artist]["popularity"] = res["artists"]["items"][0]["popularity"]
        data[artist]["id"] = res["artists"]["items"][0]["id"]
        yield data



# %%
name = "./data mining/data_R"
with open(f"{name}.json", encoding="utf-8") as f:
    data = json.load(f)
# %%
for new_data in get_artists_data(data):
    data = new_data
# %%
with open(f"{name}_v1.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False)

# %% md get top tracks
# %%
top_tracks = {}
for artist in data:
    tt = (get_top_tracks(data[artist]['id']).json())['tracks']
    tt = [track['name'] for track in tt]
    top_tracks[artist] = tt
    del data[artist]['id']
# %% calcul
for artist in data:
    ecoutes_total = 0
    ecoutes_top = 0
    for album in data[artist]:
        if album in ('total_albums', 'genres', 'popularity', 'id'):
            continue
        for track in data[artist][album]:
            if track == 'total_songs':
                continue
            n = data[artist][album][track]
            ecoutes_total += n
            if track in top_tracks[artist]:
                ecoutes_top += n
    data[artist]['taux_top_track'] = ecoutes_top / ecoutes_total
# %% save data final
with open(f"{name}_final.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False)
