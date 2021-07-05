import { Component } from "react";
import UiTElasticSearchKit from "../UiTElasticSearchKit";

export default class UiTPasSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchkit: new UiTElasticSearchKit(),
    };
  }
}
