import { observable, action } from 'mobx';
import Block from '../models/block';

function defaultBlocks(): Block[] {
    return [];
}


class ChainStore {
    @observable minedBlocks: Block[] = defaultBlocks();
    @observable numberOfMiners: number = 2;
    @observable difficulty: number = 4;
    @observable value: string = 'foo';
    @observable autorun: boolean = false;
    @observable isMining: boolean = false;

    @action submitInputValues = (numberOfMiners: number, difficulty: number, value: string, autorun: boolean) => {
        this.numberOfMiners = numberOfMiners;
        this.difficulty = difficulty;
        this.value = value;
        this.autorun = autorun;
    }

    @action postBlock = (newBlock: Block) => {
        this.minedBlocks.push(newBlock);
        if (!this.autorun) {
            this.isMining = false;
        }
    }

    @action mine = () => {
        this.isMining = true;
    }
}
export default ChainStore;