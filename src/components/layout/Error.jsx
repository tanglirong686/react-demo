import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { NavLink } from 'react-router-dom';

const Error = () => {
    return(
        <Result
            status="error"
            icon={<CloseCircleOutlined />}
            title="OMG , Sorry, the page you visited does not exist !"
            extra={<NavLink to="/"><Button type="primary">Go Home</Button></NavLink>}
        />
    )
}

export default Error;