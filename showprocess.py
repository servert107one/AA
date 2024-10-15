
import websocket
import json
import signal
import sys

import asyncio
import websockets
import json

import time
from tqdm import tqdm
from colorama import Fore, Style
import os
import gdown

import gdown
import time


def socketprint():

    
    def on_open(ws):
        print('Connected to Binance WebSocket')

    def on_message(ws, message):
        parsed_data = json.loads(message)
        print('Price update:', parsed_data)
        # print("Currency",parsed_data)

    def on_error(ws, error):
        print('WebSocket error:', error)

    def on_close(ws, close_status_code, close_msg):
        print('Disconnected from Binance WebSocket')

    def signal_handler(sig, frame):
        print('Stopping WebSocket connection...')
        ws.close()
        sys.exit(0)

    # Example: BTC/USDT ticker stream
    socket_url = 'wss://stream.binance.com:9443/ws/btcusdt@ticker'

    # Create a WebSocket connection
    ws = websocket.WebSocketApp(socket_url,
                                on_open=on_open,
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)

    
    # Handle Ctrl+C to close WebSocket properly
    signal.signal(signal.SIGINT, signal_handler)

    # Run the WebSocket connection
    ws.run_forever()

# def multisocket():
#     # WebSocket connection to Binance for 35 currency pairs
#     currency_pairs = [
#         "btcusdt", "ethusdt", "bnbusdt", "xrpusdt", "adausdt", "solusdt", "dotusdt", "maticusdt",
#         "ltcusdt", "linkusdt", "xlmusdt", "uniusdt", "avaxusdt", "filusdt", "dogeusdt", "shibusdt",
#         "etcusdt", "atomusdt", "nearusdt", "algousdt", "xtzusdt", "vetusdt", "trbusdt", "sandusdt",
#         "eosusdt", "thetausdt", "icpusdt", "manausdt", "ftmusdt", "zecusdt", "chzusdt", "xmrusdt",
#         "aaveusdt", "axsusdt", "runeusdt"
#     ]

#     # Create the streams part of the URL
#     streams = "/".join([f"{pair}@ticker" for pair in currency_pairs])
#     socket_url = f"wss://stream.binance.com:9443/stream?streams={streams}"

#     def on_message(ws, message):
#         # Parsing the received message
#         # ticker_data = json.loads(message)

#         # def on_message(ws, message):
#     # Parsing the received message
#         data = json.loads(message)
#         if 'data' in data:
#             stream_data = data['data']
#             print(stream_data)
#          # Printing each key with its meaning
#         # print("e: Event type -", ticker_data['e'])
#         # print(Fore.GREEN + f"e: Event type - {ticker_data['e']}" + Style.RESET_ALL)
#         # print("E: Event time (converted) -", convert_timestamp(ticker_data['E']))
#         # print("s: Symbol -", ticker_data['s'])
#         # print("p: Price change in the last 24 hours -", ticker_data['p'])
#         # print("P: Price change percent in the last 24 hours -", ticker_data['P'])
#         # print("w: Weighted average price -", ticker_data['w'])
#         # print("x: Previous day's closing price -", ticker_data['x'])
#         # print("c: Current price -", ticker_data['c'])
#         # print("Q: Last quantity traded -", ticker_data['Q'])
#         # print("b: Best bid price -", ticker_data['b'])
#         # print("B: Best bid quantity -", ticker_data['B'])
#         # print("a: Best ask price -", ticker_data['a'])
#         # print("A: Best ask quantity -", ticker_data['A'])
#         # print("o: Opening price of the day -", ticker_data['o'])
#         # print("h: Highest price in the last 24 hours -", ticker_data['h'])
#         # print("l: Lowest price in the last 24 hours -", ticker_data['l'])
#         # print("v: Total traded base asset volume -", ticker_data['v'])
#         # print("q: Total traded quote asset volume -", ticker_data['q'])
#         # print("O: Statistics open time (converted) -", convert_timestamp(ticker_data['O']))
#         # print("C: Statistics close time (converted) -", convert_timestamp(ticker_data['C']))
#         # print("F: First trade ID -", ticker_data['F'])
#         # print("L: Last trade ID -", ticker_data['L'])
#         # print("n: Total number of trades -", ticker_data['n'])
#         ws.close()
#         sys.exit(0)
           

#     def on_error(ws, error):
#         print(error)

#     def on_close(ws):
#         print("### closed ###")

#     def on_open(ws):
#         print("Connection opened")

#     # Initialize WebSocket connection
#     ws = websocket.WebSocketApp(socket_url, on_message=on_message, on_error=on_error, on_close=on_close)

#     # Start the WebSocket connection
#     ws.run_forever()


def color():
# Print text with colors using Colorama
    print(Fore.GREEN + "This is a message in green" + Style.RESET_ALL)
    print(Fore.RED + "This is a message in red" + Style.RESET_ALL)

    # Show a progress bar with tqdm
    # for _ in tqdm(range(100), desc=Fore.YELLOW + "Pattern Match ..." + Style.RESET_ALL, ncols=100):
    #     time.sleep(0.05)


def progress():
    # Printing each key with its meaning
    # print("e: Event type -", ticker_data['e'])
    print(Fore.GREEN + f"Searching Pattern ....." + Style.RESET_ALL)
    # # Show a progress bar with tqdm
    for _ in tqdm(range(100), desc=Fore.YELLOW + "Downloading..." + Style.RESET_ALL, ncols=100):
        time.sleep(0.05)


def timedprint():
    # message = "He"
    for char in range(101):
        print(Fore.GREEN + f"Searching Pattern ..... : {char}%" + Style.RESET_ALL)
        # print(char, end="", flush=True)
        time.sleep(0.1)  

  
def googledocfile():
    print("Connecting To Server  ....")
    # Replace the file URL with your Google Drive file URL

    # Replace the file URL with your Google Drive file URL
    # file_url = 'https://drive.google.com/uc?id=1FN6TdqeVu9nQ0g2CcLgCbSRZY_GyUIzp'
    file_url = 'https://drive.google.com/uc?id=1uCNI1ZiCdbQgOD7yvV0qaCs0tOZhv25Q'
    # file_url = 'https://drive.google.com/file/d/1uCNI1ZiCdbQgOD7yvV0qaCs0tOZhv25Q/view?usp=sharing'
    # file_url = 'https://drive.google.com/file/d/1FN6TdqeVu9nQ0g2CcLgCbSRZY_GyUIzp/view?usp=sharing'
    output_path = 'myfile.txt'

    # Download the file
    gdown.download(file_url, output_path, quiet=True)

    # Read the file and print its content
    with open(output_path, 'r') as file:
        file_content = file.readlines()
        # print(file_content)
    os.remove(output_path)
    for i in file_content:
        # print(i.strip())
        print(Fore.GREEN + i.strip() + Style.RESET_ALL)
        time.sleep(0.1)


async def get_binance_prices():
    url = "wss://stream.binance.com:9443/ws/!ticker@arr"
    listcp = ["DOGEJPY","TONUSDT"]
    cont = True
    async with websockets.connect(url) as websocket:
        # disconnect_task = asyncio.create_task(asyncio.sleep(20))
        # print(disconnect_task)
        while cont:
            try:
                response = await websocket.recv()
                data = json.loads(response)
                
                for ticker in data:
                    if ticker['s'] in listcp:
                        symbol = ticker['s']
                        price = ticker['c']
                        print(f"Symbol: {symbol}, Price: {price}")
                
            except websockets.ConnectionClosed:
                print("Connection closed, reconnecting...")
                break
            except Exception as e:
                print(f"Error: {e}")


# Run the asyncio event loop
# asyncio.run(get_binance_prices())

async def get_binance_prices2(limit=10):
    url = "wss://stream.binance.com:9443/ws/!ticker@arr"
    listcp = ["DOGEJPY", "TONUSDT"]

    max_messages = limit  # Specify the number of messages to receive before stopping
    message_count = 0

    async with websockets.connect(url) as websocket:
        while message_count < max_messages:
            try:
                response = await websocket.recv()
                data = json.loads(response)

                for ticker in data:
                    if ticker['s'] in listcp:
                        symbol = ticker['s']
                        price = ticker['c']
                        print(f"Symbol: {symbol}, Price: {price}")

                message_count += 1

            except websockets.ConnectionClosed:
                print("Connection closed, reconnecting...")
                break
            except Exception as e:
                print(f"Error: {e}")
                break

    print("Time of Connection Compleate")

# Run the asyncio event loop

# progress()

# timedprint()

# color()

# socketprint()


if __name__ == "__main__":

    googledocfile()

    asyncio.run(get_binance_prices2(11))

























