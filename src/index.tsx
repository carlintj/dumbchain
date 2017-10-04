import * as React from "react";
import * as ReactDOM from "react-dom";
import Operator from './operator'
import { observable, action, useStrict } from 'mobx';
import { observer, inject } from 'mobx-react';
import Block from './models/block';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BlockDisplay from './components/BlockDisplay'
import MinerControls from './components/MinerControls';
import BlockChainDisplay from './components/BlockChainDisplay'
import * as _ from 'lodash'
import ChainStore from './stores/ChainStore';

useStrict(true);

let chainStore = new ChainStore();

let postMessage = (message: any) => {
    let { type } = message;
    switch (type) {
        case 'FOUND':
            let { nonce, hash } = message.payload;
            chainStore.postBlock({
                data: "ed",
                nonce,
                hash,
                index: chainStore.minedBlocks.length
            });
            break;
    }
};

let operator = new Operator(chainStore, postMessage);
//operator.startMining(chainStore.value,chainStore.numberOfMiners);

const App = observer(class App extends React.Component<{ appState: ChainStore }> {
    render() {
        let { submitInputValues, minedBlocks, mine } = this.props.appState;
        return (<div>
            <MinerControls {...this.props.appState} submitInputValues={submitInputValues} mine={mine} />
            <BlockChainDisplay blocks={minedBlocks} />
        </div>);
    }
});

ReactDOM.render(
    <MuiThemeProvider>
        <div>
            <App appState={chainStore} />
        </div>
    </MuiThemeProvider>
    ,
    document.getElementById('root')
);