import Miner from './miner'

const miner = new Miner();

self.onmessage = (e) => {
    let {type, payload} = e.data;
    switch(type) {
        case 'START':
            let {text, seed, increment} = payload;
            console.log("Starting worker:", text, seed, increment);
            miner.start(text,seed, increment, 10000, self.postMessage)
            break;
        case 'CANCEL':
            console.log('canceling');
            miner.stop();
            break;
    }
};
