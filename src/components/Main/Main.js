import React, { Component } from 'react';
import Table from '../Table/Table'
import { data } from '../../data';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data,
        };
    }

    updateValue = (storeId, monthId, newValue) => {
        const newData = this.state.data.map((store) => {
            if (store.store.id === storeId) {
                store.months = store.months.map((month) => {
                    if (month.id === monthId) {
                        month.value = newValue;
                    }
                    return month;
                });
            }
            return store;
        });
        this.setState({ data: newData });
    };

    render() {
        return (
            <Table data={this.state.data} updateValue={this.updateValue} />
        );
    }
}

export default Main;