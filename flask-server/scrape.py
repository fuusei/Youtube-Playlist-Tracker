from bs4 import BeautifulSoup as bSoup
import requests
import re
import json

def printSongs(playlist):
    note = ''
    for song in playlist['songs']:
        note += song['name'] + " by [/ " + song['author'] + " /]\n"
    f = open(playlist['title'] + ".txt", "w", encoding='utf8')
    f.write(note)

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

def compare(path, URL):
    playList = scrapePlaylist(URL)
    f = open(path, "r", encoding='utf8');
    filePlaylist = f.read().split('\n')
    existingPlaylist = []
    for i in range(len(filePlaylist)-1):
        s = filePlaylist[i].split(' by [/ ')
        author = s[1][:-3]
        existingPlaylist.append({'name': s[0], 'author': author})
    existingPlaylistTitles = list(map(lambda song: song['name'], existingPlaylist))
    newPlaylistTitles = list(map(lambda song: song['name'], playList['songs']))
    existingPlaylistSet = set(existingPlaylistTitles)
    newPlaylistSet = set(newPlaylistTitles)
    deleted = existingPlaylistSet - newPlaylistSet
    recentlyAdded = newPlaylistSet - existingPlaylistSet
    print(deleted)
    print(recentlyAdded)
