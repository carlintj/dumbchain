import * as crypto from 'crypto-js';
import * as _ from 'lodash';

class Miner {
    working: boolean = true;
    
    constructor() {
        
    }
    
    start(text : string, seed : number, incrementAmt : number, checkAmount : number,difficulty: number, postMessage : any) {
        this.working = true;
        this.mine(text,seed, incrementAmt, checkAmount,difficulty, postMessage);
    }
    
    mine(text : string, seed : number, incrementAmt : number, checkAmount : number,difficulty: number, postMessage : any) {
        let nonce = seed -= incrementAmt;
        let checked = 0;
        let goal = _.repeat("0",(difficulty));
        let foundHash = false;
        do {
            nonce += incrementAmt;
            checked ++;
            foundHash = crypto.SHA256(nonce + text).toString().substring(0,goal.length) == goal
        } while (!foundHash && checked < checkAmount);
        
        if(foundHash) {
            let message : any = {
                type: 'FINISHED', 
                payload: {
                    nonce: nonce,
                    hash: crypto.SHA256(nonce + text).toString()
                }
            }
            postMessage(message);
        }
        else if(this.working){
            setTimeout(() => this.mine(text,nonce, incrementAmt, checkAmount,difficulty,postMessage), 5);
        }
    }
    
    stop() {
        this.working = false;
    }
}

export default Miner;