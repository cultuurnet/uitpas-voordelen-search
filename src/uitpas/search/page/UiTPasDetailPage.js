import * as React from 'react';
import {
    SearchkitProvider,
    Layout,
} from 'searchkit';

import UiTPasSearchPage from './UiTPasSearchPage';
import UiTPasSearchBar from '../bar/UiTPasSearchBar';
import UiTPasAdvantageDetail from '../detail/UiTPasAdvantageDetail';


export default class UiTPasDetailPage extends UiTPasSearchPage {
    
    render() {

        return (
            <SearchkitProvider searchkit={this.state.searchkit.getDefaultSearchkit()}>
                <Layout>
                    <UiTPasSearchBar searchFields={this.state.searchkit.getDefaultSearchFields()}/>
                    <UiTPasAdvantageDetail advantageId={this.props.match.params.id} key={this.props.match.params.id}/>
                </Layout>
            </SearchkitProvider>
        );
    }
}