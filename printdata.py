
import websocket
import json
import signal
import sys

import time
from tqdm import tqdm
from colorama import Fore, Style



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





# progress()

# timedprint()

# color()

socketprint()


