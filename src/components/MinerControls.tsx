import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import * as React from "react";
import * as ReactDOM from "react-dom";
import RaisedButton from 'material-ui/RaisedButton';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';

interface PropTypes {
    numberOfMiners: number;
    difficulty: number;
    value: string;
    autorun: boolean;
    isMining: boolean;
    submitInputValues: (numberOfMiners: number, difficulty: number, value: string, autorun: boolean) => any;
    mine: () => any;
}

const style = {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

class MinerController extends React.Component<PropTypes, undefined>{
    private numberOfMiners: TextField;
    private difficulty: TextField;
    private value: TextField;
    private autorun: Toggle;

    render() {
        let { numberOfMiners, difficulty, value, autorun,isMining } = this.props;
        return (
            <div>
                <TextField name="testValue"
                    floatingLabelText="# of Miners"
                    underlineShow={false}
                    fullWidth={true}
                    defaultValue={numberOfMiners}
                    ref={(input) => { this.numberOfMiners = input }}
                    type="number"
                />
                <Divider />
                <TextField floatingLabelText="Difficulty" underlineShow={false} defaultValue={difficulty} fullWidth={true}
                    ref={(input) => { this.difficulty = input }} />
                <Divider />
                <TextField floatingLabelText="Value" underlineShow={false} defaultValue={value} fullWidth={true}
                    ref={(input) => { this.value = input }} />
                <Divider />
                <Toggle label="Autorun"
                    defaultToggled={false}
                    ref={(input) => { this.autorun = input }}
                />
                <Divider />
                <RaisedButton label="Save" fullWidth={true} primary={true} onClick={this.doChangeInputs} />
                <RaisedButton label="Mine" disabled={isMining} fullWidth={true} secondary={true} onClick={this.doMine} />
            </div>
        );
    }

    doChangeInputs = (e: React.FormEvent<any>) => {
        let numberOfMiners = +this.numberOfMiners.getValue();
        let difficulty = +this.difficulty.getValue();
        let value = this.value.getValue();
        let autorun = this.autorun.isToggled();

        this.props.submitInputValues(numberOfMiners, difficulty, value, autorun);
    }

    doMine = () => {
        this.props.mine();
    }
}

export default observer(MinerController);