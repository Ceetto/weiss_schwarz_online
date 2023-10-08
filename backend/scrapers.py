import requests


def scrape_encoredecks(url):
    deck_id = url.split('/')[-1]
    api = "https://www.encoredecks.com/api/deck/" + deck_id

    headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9,nl-NL;q=0.8,nl;q=0.7',
        'Connection': 'keep-alive',
        'If-None-Match': 'W/"d18f-qP61YjHeJqegyt/NKr28HwDqnZk"',
        'Referer': 'https://www.encoredecks.com/deck/B-LmZWtm8',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-GPC': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Brave";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
    }

    response = requests.get(api, headers=headers)
    data = response.json()
    return data
