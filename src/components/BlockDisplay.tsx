import Paper from 'material-ui/Paper';
import * as React from "react";
import * as ReactDOM from "react-dom";

interface PropTypes {
    index : number;
    value: string;
    nonce: number;
    hash: string;
}

const style = {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  };
  
const BlockDisplay: React.SFC<PropTypes> = (props) => {
    return <Paper style={style}>{props.value}</Paper>;
}



export default BlockDisplay;