import * as _ from 'lodash'
import * as Worker from 'worker-loader!./workers/worker';
import ChainStore from './stores/ChainStore'

class Operator {
  store : ChainStore;
  workers: Worker[];
  isMining: boolean = false;
  postMessage: (payload: any) => void;

  constructor(store: ChainStore, postMessage: (payload: any) => void) {
    this.store = store;
    this.postMessage = postMessage;
    setTimeout(this.storeWatcher, 1000);
  }

  storeWatcher = () => {
    if(this.store.isMining && !this.isMining) {
      let {value, numberOfMiners} = this.store;
      this.startMining(value, numberOfMiners);
    }
    setTimeout(this.storeWatcher, 1000);
  }

  startMining(value: string, workerCount: number) {
    this.workers = this.createWorkers(workerCount);
    this.isMining = true;
    let i = 0;
    for(const worker of this.workers) {
       const state = { 
        type: 'START',
        payload: {
          text: value + this.store.minedBlocks.length,
          seed: i,
          increment: workerCount,
          difficulty: this.store.difficulty
        }
      };
      
      worker.postMessage(state);
      i++;
    }
  }

  stopMining() {
    this.isMining = false;
    let message = {
      type: 'CANCEL'
    }
    for(const worker of this.workers) {
      worker.postMessage(message);
    }
  }

  createWorkers(workerCount : number) {
    this.workers = [];
    for(let i = 0; i < workerCount; i++) {
      const worker = new Worker();
      this.workers[i] = worker;
        
      worker.addEventListener(
        'message',
        workerHandler.bind(null, this.postMessage, this.stopMining.bind(this))
      );
    }
    return this.workers;
  }
}

//handles messages from workers
//needs to pass messages back to store
function workerHandler(postMessage : (payload: any) => void,stopMining : () => void, event : any) {
  let {type, payload} = event.data;
        switch(type) {
          case 'FINISHED':
            let {nonce, hash} = payload;
            
            let message = {
              type: 'FOUND', 
              payload
            }
            postMessage(message);
            stopMining();
            break;
      }
}

export default Operator;