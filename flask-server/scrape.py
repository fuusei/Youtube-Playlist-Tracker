from bs4 import BeautifulSoup as bSoup
import requests
import re
import json

def scrapePlaylist(URL):

    data = requests.get(URL).text
    soup = bSoup(data, 'html.parser')
    script = soup.find("script", string=re.compile("ytInitialData")).get_text()
    
    start = script.find("{")
    end = script.find("};") + 1
    playlistJSON = json.loads(script[start:end])
    playlistTitle = ''
    try:
        playlistTitle = playlistJSON['metadata']['playlistMetadataRenderer']['title']
    except:
        raise Exception("Error finding playlist. Make sure it is a valid public playlist.")

    contents = playlistJSON['contents']['twoColumnBrowseResultsRenderer']['tabs'][0]['tabRenderer']['content']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'][0]['playlistVideoListRenderer']['contents']
    playlist = {'title': playlistTitle, 'songs': []}
    for video in contents:
        author = video['playlistVideoRenderer']['shortBylineText']['runs'][0]['text']
        name = video['playlistVideoRenderer']['title']['runs'][0]['text']
        playlist['songs'].append({"name": name, "author": author})

    return playlist

def compare(existingPlaylist, URL):
    try:
        playList = scrapePlaylist(URL)

        existingPlaylistTitles = list(map(lambda song: song['name'], existingPlaylist))
        newPlaylistTitles = list(map(lambda song: song['name'], playList['songs']))

        existingPlaylistSet = set(existingPlaylistTitles)
        newPlaylistSet = set(newPlaylistTitles)

        deleted = existingPlaylistSet - newPlaylistSet
        recentlyAdded = newPlaylistSet - existingPlaylistSet
        return {'deleted': list(deleted), 'added': list(recentlyAdded)}
    except:
        raise Exception("Error occurred when finding differences.")
