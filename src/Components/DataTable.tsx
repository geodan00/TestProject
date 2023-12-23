import React, { MouseEventHandler, useState } from 'react';
import { Space, Table, Tag, Tooltip } from 'antd';
import Person from '../Models/Person';
import { CheckCircle, Close, Done, DoneRounded, Edit, EditOffSharp, NoEncryptionGmailerrorred, Update } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Sector from '../Models/Sector';
import { useAuthUser } from 'react-auth-kit';
import User from '../Models/User';
import UpdatePersonModal from './UpdatePersonModal';

const { Column, ColumnGroup } = Table;

function DataTable(props: { data: Person[], onClick?: any, methods: any, allSectors: Sector[], load: boolean, updateFunction: Function }) {
    return (
        <div className='table'>
            <Table dataSource={props.data} scroll={{ y: 200, x: 10 }}>
                <Column title="Name" dataIndex="name" key="name" />
                <Column
                    title="Sectors"
                    dataIndex="sectors"
                    key="sectors"
                    render={(sectors: Sector[]) => (
                        <>
                            {sectors.map((tag) => (
                                <Tag color="blue" key={tag.id}>
                                    {tag.name}
                                </Tag>
                            ))}
                        </>
                    )}
                />

                <Column
                    title="Create by"
                    key="createBy"
                    dataIndex="createBy"
                />
                <Column
                    title="Date"
                    key="createAt"
                    dataIndex="createAt"
                />
                <Column
                    title="Modify date"
                    key="updateAt"
                    dataIndex="updateAt"
                />
                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: Person) => (
                        <UpdatePersonModal person={record} onSubmit={props.updateFunction} methods={props.methods} allSectors={props.allSectors} load={props.load}/>
                    )}
                />
            </Table>
        </div>
    );
}

export default DataTable;
