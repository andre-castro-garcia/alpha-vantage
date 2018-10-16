import React from 'react';

import { connect } from 'react-redux';
import { searchSymbolInfo} from '../../store/reducers/searchReducer';
import { withHandlers, withState, withProps, compose } from 'recompose';

import { Input, Button, Layout, Table } from 'antd';
const { Content } = Layout;
const { Column } = Table;

const enhance = compose(
    connect(
        ({ SearchReducer }) => ({ SearchReducer }),
        {
            searchSymbolInfoConnect: searchSymbolInfo
        }
    ),
    withProps(({ SearchReducer }) => ({
        data: SearchReducer.data,
        isFetching: SearchReducer.isFetching,
        isSuccess: SearchReducer.isSuccess,
        isError: SearchReducer.isError
    })),
    withState("inputValue", "setInputValue", ""),
    withHandlers({
        onChange: ({ setInputValue }) => event => {
            setInputValue(event.target.value)
        }
    })
);

const isEmpty = (array) => array != null && array !== undefined && array.length === 0;
const searchBoxStyle = {
  display: "flex"
};
const resultBoxStyle = {
    paddingTop: "20px"
};

export const Search = enhance(({ inputValue, data, isFetching, isSuccess, isError, onChange, searchSymbolInfoConnect }) =>
    <Layout className="layout">
    <Content style={{ padding: '0 50px', marginTop: 20, marginBottom: 20 }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        <div style={searchBoxStyle}>
            <span>
                Pesquise pelo nome do papel (PETR4):
            </span>
        <Input
            onChange={onChange}
            type='text'
            value={inputValue}
        />
            <span>
                &nbsp;
            </span>
        <Button shape="circle" icon="search" disabled={inputValue.length < 1} onClick={() => searchSymbolInfoConnect(inputValue)}/>
        </div>
        <div style={resultBoxStyle}>
        {
            isFetching &&
            <div>Pesquisando...</div>
        }
        {
            isError &&
            <div>Ocorreu um erro ao realizar a consulta.</div>
        }
        {
            isEmpty(data.bestMatches) &&
            <div>Nenhum item encontrado!</div>
        }
        {
            isSuccess && !isEmpty(data.bestMatches) &&
            <Table dataSource={data.bestMatches} pagination={false}>
                <Column title="Símbolo" dataIndex="1. symbol" key="1. symbol"/>
                <Column title="Empresa" dataIndex="2. name" key="2. name"/>
                <Column title="Região" dataIndex="4. region" key="4. region"/>
                <Column title="Fuso Horário" dataIndex="7. timezone" key="7. timezone"/>
                <Column title="Moeda" dataIndex="8. currency" key="8. currency"/>
            </Table>
        }
        </div>
        </div>
    </Content>
    </Layout>
);
