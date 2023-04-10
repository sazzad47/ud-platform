import React from 'react';
// import { Link } from 'react-router-dom';
import * as moment from 'moment';

const handleValidDate = date => {
    const date1 = moment(new Date(date)).format('DD MMM Y');
    return date1;
};

// const DatasetId = cell => {
//     return (
//         <React.Fragment>
//             <Link to='/apps-tickets-details' className='fw-medium link-primary'>
//                 {cell.value}
//             </Link>
//         </React.Fragment>
//     );
// };

const Size = cell => {
    return <React.Fragment>{cell.value}</React.Fragment>;
};

const Name = cell => {
    return <React.Fragment>{cell.value}</React.Fragment>;
};

const Owner = cell => {
    return <React.Fragment>{cell.value}</React.Fragment>;
};

const UploadDate = cell => {
    return <React.Fragment>{handleValidDate(cell.value)}</React.Fragment>;
};

const Type = cell => {
    return <React.Fragment>{cell.value}</React.Fragment>;
};

const Status = cell => {
    return (
        <React.Fragment>
            {cell.value === 'Preprocessing' ? (
                <span className='badge badge-soft-warning text-uppercase'>
                    {cell.value}
                </span>
            ) : cell.value === 'Ready' ? (
                <span className='badge badge-soft-success text-uppercase'>
                    {cell.value}
                </span>
            ) : cell.value === 'Not started' ? (
                <span className='badge badge-soft-secondary text-uppercase'>
                    {cell.value}
                </span>
            ) : null}
        </React.Fragment>
    );
};

const Access = cell => {
    return (
        <React.Fragment>
            {cell.value === 'Private' ? (
                <span className='badge bg-warning text-uppercase'>
                    {cell.value}
                </span>
            ) : cell.value === 'Public' ? (
                <span className='badge bg-success text-uppercase'>
                    {cell.value}
                </span>
            ) : null}
        </React.Fragment>
    );
};

const HasAnnotations = cell => {
    return (
        <React.Fragment>
            <div className='text-center'>{cell.value}</div>
        </React.Fragment>
    );
};

// export { DatasetId, Name, Size, Owner, CreateDate, Status, Access };
export { Name, Size, Owner, UploadDate, Type, Status, Access, HasAnnotations };
