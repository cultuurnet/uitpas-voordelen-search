import * as React from "react";
import {
    SearchkitComponent,
} from "searchkit";
import UiTElasticSearchKit from '../UiTElasticSearchKit';

export default class UiTPasSearchContainer extends SearchkitComponent{
    constructor(props){
        super(props);
        this.state = {
            'searchkit': new UiTElasticSearchKit(),
        };
    }
}