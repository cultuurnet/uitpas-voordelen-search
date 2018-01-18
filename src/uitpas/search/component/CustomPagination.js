import { Pagination } from 'searchkit';

export default class CustomPagination extends Pagination {
    componentDidUpdate() {
        if (this.getResults()) {
            if (this.accessor.state.getValue() > this.getTotalPages()) {
                this.accessor.state = this.accessor.state.setValue(1);
                this.searchkit.performSearch();
            }
        }
    }
}