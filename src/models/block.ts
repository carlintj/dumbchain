import crypto from 'crypto-js';


export default class Block {
    index?: number;
    timestamp?: number;
    data?:string;
    hash?:string;
    previousHash?: string;
    nonce?: number;
    
    /*
    calculatehash () {
        let hashData = this.index.toString() + this.timestamp.toString() + this.data + this.previousHash;
        return crypto.SHA256(hashData).toString()
    }
    */
}