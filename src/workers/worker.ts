import Miner from './miner'

const miner = new Miner();

self.onmessage = (e) => {
    let {type, payload} = e.data;
    switch(type) {
        case 'START':
            let {text, seed, increment, difficulty} = payload;
            miner.start(text,seed, increment, 10000, difficulty, self.postMessage)
            break;
        case 'CANCEL':
            miner.stop();
            break;
    }
};
