import React from 'react';
import { Space, Table, Tag } from 'antd';
import Person from '../Models/Person';
import { CheckCircle, Close, Done, DoneRounded, NoEncryptionGmailerrorred } from '@mui/icons-material';

const { Column, ColumnGroup } = Table;


const data: Person[] = [
    {
        key: '1',
        name: 'John',
        sectors: ['nice', 'developer'],
        agreedToTerm: false
    },
    {
        key: '2',
        name: 'Jim',
        sectors: ['loser'],
        agreedToTerm: true
    },
    {
        key: '3',
        name: 'Joe',
        sectors: ['cool', 'teacher'],
        agreedToTerm: true
    },{
        key: '4',
        name: 'John',
        sectors: ['nice', 'developer'],
        agreedToTerm: true
    },
    {
        key: '5',
        name: 'Jim',
        sectors: ['loser'],
        agreedToTerm: false
    },
    {
        key: '6',
        name: 'Joe',
        sectors: ['cool', 'teacher'],
        agreedToTerm: true
    },
];

function DataTable() {

    return (
        <div className='table'>
            <Table dataSource={data} scroll={{ y: 200, x: 10 }}>
                <Column title="Name" dataIndex="name" key="name" />
                <Column
                    title="Sectors"
                    dataIndex="sectors"
                    key="sectors"
                    render={(sectors: string[]) => (
                        <>
                            {sectors.map((tag) => (
                                <Tag color="blue" key={tag}>
                                    {tag}
                                </Tag>
                            ))}
                        </>
                    )}
                />
                
                <Column
                    title="Agreed to terms"
                    key="agreedToTerm"
                    render={(_: any, record: Person) => (
                        record.agreedToTerm? <CheckCircle color='success' /> : <Close color='error' />
                    )}
                />
                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: Person) => (
                        <Space size="middle">
                            <a style={{color: "yellowgreen"}}>Update</a>
                            <a style={{color: "red"}}>Delete</a>
                        </Space>
                    )}
                />
            </Table>
        </div>
    );
}

export default DataTable;
