import BlockDisplay from './BlockDisplay'
import * as React from "react";
import * as ReactDOM from "react-dom";
import Block from '../models/block'
import {List, ListItem} from 'material-ui/List';
import _ from 'lodash';
import { observer, inject } from 'mobx-react';

interface PropTypes {
    blocks : Block[]
}

const style = {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  };

const buildListItem = (block : Block) => <ListItem key={block.index} primaryText={block.nonce} secondaryText={block.hash}/>
const buildListItems = (blocks : Block[]) =>  _.map(blocks,buildListItem);
  
const BlockChainDisplay: React.SFC<PropTypes> = (props) => {
    return <List>{buildListItems(props.blocks)}</List>;
}

export default observer(BlockChainDisplay);