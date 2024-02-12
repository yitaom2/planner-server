import { createClient } from 'redis';

const PORT = process.env.PORT || 5000
const REDIS_PORT = process.env.PORT || 6379

const client = createClient()

const start = async () => {
    try {
        await client.connect();
        client.set('test', '5')
        console.log("connect")
    } catch (err) {
        console.log(err)
    }
}

start()

// client = await start();
// client.set((1, 2), 3)