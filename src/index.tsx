import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Operator from './operator'
import { observable  } from 'mobx';
import { observer, inject } from 'mobx-react';
import Block from './models/block';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BlockDisplay from './components/BlockDisplay'
import * as _ from 'lodash'

class ChainStore {
    @observable minedBlocks : Block[];
}

const appState = new ChainStore();
appState.minedBlocks = observable.array([]);

const TodoView = observer(class TodoView extends React.Component<{appState : ChainStore}> {
      render() {
        let ed = "";
        let blocks = _.map(this.props.appState.minedBlocks, (block: Block) => 
            <BlockDisplay 
                key={block.index}
                value="value"
                index={block.index}
                nonce={block.nonce}
                hash={block.hash}

            />);
        return <div>{blocks}</div>;
    }
});

let postMessage = (message: any) => {
    console.log(message);
    let {type} = message;
    switch(type) {
        case 'FOUND':
            let {nonce, hash} = message.payload;
            appState.minedBlocks.push({
                data: "ed",
                nonce,
                hash 
            });
            break;
    }
};

let workers = Operator.createWorkers(2,postMessage);
Operator.startMining(workers, 'foo')

ReactDOM.render(
    <MuiThemeProvider>
        <div>   
            <TodoView appState={appState}/>
        </div>
    </MuiThemeProvider>
,
    document.getElementById('root')
);