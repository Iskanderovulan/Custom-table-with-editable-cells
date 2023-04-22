import React, { useCallback, useMemo } from 'react';
import s from './Table.module.css';

const Table = ({ data, updateValue }) => {
    console.log(data)
    const renderMonthHeaders = useCallback((months) => months.map((month) => (
        <div key={month.id} className={`${s.cell} ${s.header}`}>
            {month.name}
        </div>
    )), []);

    const storeTotal = useCallback((months) => months.reduce((total, month) => total + Number(month.value), 0), []);

    const renderStoreRows = useCallback((data, updateValue) => data.map((store) => (
        <React.Fragment key={store.store.id}>
            <div className={`${s.cell} ${s.storeName}`}>{store.store.name}</div>
            {store.months.map((month) => (
                <div key={month.id} className={`${s.cell} ${s.monthInput}`}>
                    <input
                        className={s.input}
                        type="number"
                        value={month.value}
                        onChange={(e) =>
                            updateValue(store.store.id, month.id, e.target.value)
                        }
                    />
                </div>
            ))}
            <div className={`${s.cell} ${s.storeTotal}`}>
                {storeTotal(store.months)}
            </div>
        </React.Fragment>
    )), [storeTotal]);

    const columnTotal = useCallback((data, columnIndex) => data.reduce((total, store) => total + Number(store.months[columnIndex].value), 0), []);

    const grandTotal = useCallback((data) => data.reduce(
        (total, store) => total + storeTotal(store.months),
        0
    ), [storeTotal]);

    const renderedMonthHeaders = useMemo(() => renderMonthHeaders(data[0].months), [renderMonthHeaders, data]);
    const renderedStoreRows = useMemo(() => renderStoreRows(data, updateValue), [renderStoreRows, data, updateValue]);
    const renderedTotalColumns = useMemo(() => data[0].months.map((_, i) => (
        <div key={i} className={`${s.cell} ${s.total}`}>
            {columnTotal(data, i)}
        </div>
    )), [data, columnTotal]);

    return (
        <div className={s.container}>
            <div className={`${s.cell} ${s.header}`}>Month</div>
            {renderedMonthHeaders}
            <div className={`${s.cell} ${s.header}`}>Total</div>

            {renderedStoreRows}

            <div className={`${s.cell} ${s.total}`}>Total</div>
            {renderedTotalColumns}
            <div className={`${s.cell} ${s.total}`}>
                {grandTotal(data)}
            </div>
        </div>
    );
};
export default Table;
