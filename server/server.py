import asyncio
import websockets

class WSHandler():

    async def update(self):
        message = await websocket.recv()
        print("message: " + message)
        await websocket.send("Responding...")


if __name__ == "__main__":
    ws_handler = WSHandler()
    start_server = websockets.serve(ws_handler.update, 'localhost', 8000)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()