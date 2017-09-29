import * as _ from 'lodash'
import * as Worker from 'worker-loader!./workers/worker';


export function startMining(workers : Worker[], value: string) {
  let workerCount = workers.length;
  let i = 0;
  for(const worker of workers) {
     const state = { 
      type: 'START',
      payload: {
        text: value,
        seed: i,
        increment: workerCount
      }
    };
    
    worker.postMessage(state);
    i++;
  }
}

//handles messages from workers
//needs to pass messages back to store
export function workerHandler(postMessage : (payload: any) => void,event : any) {
  let {type, payload} = event.data;
        switch(type) {
          case 'FINISHED':
            let {nonce, hash} = payload;
            console.log(nonce, hash);
            
            let message = {
              type: 'FOUND', 
              payload
            }
            postMessage(message);
            
            let output = document.getElementById('output');
            let element = document.createElement("div");
            element.innerHTML = `Found hash ${hash} using nonce ${nonce}`;
            
            output.appendChild(element);
            //startMining(workers, thingtoFind + nonce);
            break;
      }
}

export function createWorkers(workerCount : number, postMessage : (payload: any) => void) {
  
  let workers : Worker[] = [];
  for(let i = 0; i < workerCount; i++) {
    const worker = new Worker();
   
    workers[i] = worker;
      
    worker.addEventListener(
      'message',
      workerHandler.bind(null, postMessage)
    );
  }
  return workers;
}

export function component() {
  var element = document.createElement('div');
    element.setAttribute("id", "output");
  // Lodash, currently included via a script, is required for this line to work
  //element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());

//createWorkers(workerCount);
//startMining(workers, 'foo');
