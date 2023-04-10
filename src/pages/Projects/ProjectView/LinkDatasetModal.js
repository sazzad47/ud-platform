import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ButtonGroup,
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormFeedback,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
    UncontrolledDropdown,
} from 'reactstrap';

import downloadIcon from '../../../assets/images/svg/download-svgrepo-com.svg';

import Multiselect from 'multiselect-react-dropdown';
// import { useDispatch } from 'react-redux';

const LinkDatasetModal = ({
    show,
    updateProjectDatasetsAndCloseModal,
    onCancelClick,
    project,
    allDatasets,
    // datasetSelection,
}) => {
    // console.log('***** LinkDatasetModal ********');
    // console.log({ allDatasets });
    // console.log({ project });

    const [selectedOptions, setSelectedOptions] = useState([]);
    // const [datasetSelection, setDatasetSelection] = useState([]);

    useEffect(() => {
        // console.log('--- LinkDatasetModal Main useEffect ---');
        // console.log({ allDatasets });
        // console.log({ project });
        const initialOptionSelection = allDatasets
            .filter(dataset => project.datasets.includes(dataset.id))
            .map(dataset => {
                return { cat: dataset.id, key: dataset.name };
            });

        // console.log('About to setSelectedOptions with initialOptionSelection:');
        // console.log({ initialOptionSelection });
        setSelectedOptions(initialOptionSelection);
    }, [allDatasets, project]);

    // console.log({ selectedOptions });

    const allDatasetOptions = allDatasets.map(dataset => {
        return { cat: dataset.id, key: dataset.name };
    });

    const onConfirmClick = () => {
        const newDatasetSelection = selectedOptions
            .map(option => option.cat)
            .sort();
        updateProjectDatasetsAndCloseModal(newDatasetSelection);
    };

    return (
        <Modal
            isOpen={show}
            toggle={onCancelClick}
            centered={true}
            size='lg'
            className='link-dataset-modal'
        >
            <ModalHeader toggle={onCancelClick} className='p-3 bg-soft-info'>
                Link Datasets
            </ModalHeader>
            <ModalBody className='py-3 px-5'>
                <div className='mt-2 text-center link-dataset-text'>
                    <div className='mt-4 mb-4 pt-2 fs-15 mx-4 mx-sm-5'>
                        <h4>Please select datasets to link</h4>
                    </div>
                </div>
                <div className='dataset-link-multiselect-wrapper'>
                    <Multiselect
                        className='link-dataset-multiselect'
                        displayValue='key'
                        // isObject={false}
                        options={allDatasetOptions}
                        onSelect={(selectedList, selectedItem) => {
                            setSelectedOptions(selectedList);
                            // console.log('I am in Multiselect onSelect....');
                            // console.log({ selectedList });
                            // console.log({ selectedItem });
                            // console.log({ selectedOptions });
                        }}
                        onRemove={(selectedList, selectedItem) => {
                            setSelectedOptions(selectedList);
                            // console.log('I am in Multiselect onRemove....');
                            // console.log({ selectedList });
                            // console.log({ selectedItem });
                            // console.log({ selectedOptions });
                        }}
                        selectedValues={selectedOptions}
                        placeholder='Enter search term here'
                        showCheckbox
                        style={{
                            chips: {
                                background: '#404040',
                                fontSize: '1rem',
                            },
                            multiselectContainer: {
                                color: 'white',
                            },
                            searchBox: {
                                backgroundColor: '#909090',
                                display: 'block',
                                padding: '1rem 1rem',
                                border: 'none',
                                borderRadius: '0px',
                                fontSize: '10px',
                                minHeight: '50px',
                            },
                            option: {
                                color: 'white',
                                // background: 'purple',
                                fontSize: '1rem',
                            },
                        }}
                    />
                </div>

                <div className='d-flex gap-2 justify-content-center mt-4 mb-2'>
                    <button
                        type='button'
                        className='btn w-sm btn-light'
                        data-bs-dismiss='modal'
                        onClick={onCancelClick}
                    >
                        Cancel
                    </button>
                    <button
                        type='button'
                        className='btn w-sm btn-primary '
                        id='confirm-selection'
                        onClick={onConfirmClick}
                    >
                        Confirm selection
                    </button>
                </div>
            </ModalBody>
        </Modal>
    );
};

LinkDatasetModal.propTypes = {
    onCloseClick: PropTypes.func,
    onConfirmClick: PropTypes.func,
    show: PropTypes.any,
};

export default LinkDatasetModal;

// const LinkDatasetModal = ({
//     show,
//     dataset,
//     toggle,
//     setModal,
//     onCancelClick,
// }) => {
//     // console.log('in EditDatasetModal');
//     // console.log({ dataset });

//     const dispatch = useDispatch();

//     //Dropzone file upload
//     const [selectedFiles, setselectedFiles] = useState([]);
//     const [files, setFiles] = useState([]);

//     /**
//      * Formats the size
//      */
//     function formatBytes(bytes, decimals = 2) {
//         if (bytes === 0) return '0 Bytes';
//         const k = 1024;
//         const dm = decimals < 0 ? 0 : decimals;
//         const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

//         const i = Math.floor(Math.log(bytes) / Math.log(k));
//         return (
//             parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
//         );
//     }

//     function handleAcceptedFiles(files) {
//         // console.log('in handleAcceptedFiles');
//         // console.log({ files });

//         files.map(file => {
//             if (file.type.startsWith('image')) {
//                 return Object.assign(file, {
//                     preview: URL.createObjectURL(file),
//                     formattedSize: formatBytes(file.size),
//                 });
//             } else {
//                 return Object.assign(file, {
//                     preview: null,
//                     formattedSize: formatBytes(file.size),
//                 });
//             }
//         });

//         // console.log('after files.map');
//         // console.log({ files });
//         setselectedFiles(files);
//     }

//     // validation
//     const formik = useFormik({
//         // enableReinitialize : use this flag when initial values needs to be changed
//         enableReinitialize: true,

//         initialValues: {
//             name: (dataset && dataset.name) || '',
//             description: (dataset && dataset.description) || '',
//             type: (dataset && dataset.type) || '',
//             status: (dataset && dataset.status) || '',
//             access: (dataset && dataset.access) || '',
//         },
//         validationSchema: Yup.object({
//             name: Yup.string().required('Please Enter Name'),
//             description: Yup.string().required('Please Enter Description'),
//             type: Yup.string().required('Please Enter Type'),
//             status: Yup.string().required('Please Enter Status'),
//             access: Yup.string().required('Please Enter Access'),
//         }),
//         onSubmit: values => {
//             const updatedDataset = {
//                 _id: dataset ? dataset._id : 0,
//                 datasetId: values.datasetId,
//                 name: values.name,
//                 description: values.description,
//                 type: values.type,
//                 status: values.status,
//                 access: values.access,
//             };

//             // console.log(
//             //     'in useFormik onSubmit - about to dispatch updateDataset'
//             // );

//             // console.log({ updatedDataset });

//             dispatch(updateDataset(updatedDataset));

//             toggle();
//         },
//     });

//     const dateFormat = () => {
//         let d = new Date(),
//             months = [
//                 'Jan',
//                 'Feb',
//                 'Mar',
//                 'Apr',
//                 'May',
//                 'Jun',
//                 'Jul',
//                 'Aug',
//                 'Sep',
//                 'Oct',
//                 'Nov',
//                 'Dec',
//             ];
//         return (
//             d.getDate() +
//             ' ' +
//             months[d.getMonth()] +
//             ', ' +
//             d.getFullYear()
//         ).toString();
//     };

//     const [credate, setcreDate] = useState(dateFormat());
//     const [duedate, setdueDate] = useState(dateFormat());

//     const credateformate = e => {
//         const date = e.toString().split(' ');
//         const joinDate = (date[2] + ' ' + date[1] + ', ' + date[3]).toString();
//         setcreDate(joinDate);
//     };

//     const duedateformate = e => {
//         const date = e.toString().split(' ');
//         const joinDate = (date[2] + ' ' + date[1] + ', ' + date[3]).toString();
//         setdueDate(joinDate);
//     };

//     // console.log('in EditDatasetModal - right before return ');
//     // console.log({ formik });

//     return (
//         <Modal
//             isOpen={show}
//             toggle={onCancelClick}
//             centered
//             size='lg'
//             className='border-0'
//             modalClassName='zoomIn'
//         >
//             <ModalHeader toggle={onCancelClick} className='p-3 bg-soft-info'>
//                 Edit Dataset
//             </ModalHeader>
//             <Form
//                 onSubmit={e => {
//                     e.preventDefault();
//                     formik.handleSubmit();
//                     return false;
//                 }}
//             >
//                 <ModalBody>
//                     <Row>
//                         <Col lg={7}>
//                             <Card className='h-100'>
//                                 <CardBody className='h-100 d-flex flex-column'>
//                                     <div className='mb-4'>
//                                         <Label
//                                             className='form-label'
//                                             htmlFor='project-title-input'
//                                         >
//                                             Dataset Name
//                                         </Label>
//                                         <Input
//                                             type='text'
//                                             className='form-control'
//                                             id='project-title-input'
//                                             placeholder='Enter data set name'
//                                             onChange={formik.handleChange}
//                                             value={formik.values.name}
//                                         />
//                                     </div>

//                                     <div className='mb-3 h-100 d-flex flex-column dataset-edit-CKEditor-wrapper'>
//                                         <Label className='form-label'>
//                                             Dataset Description
//                                         </Label>
//                                         <CKEditor
//                                             editor={ClassicEditor}
//                                             // PLACEHOLDER TEXT IS NOT WORKING WELL. WILL TRY TO FIX IT IF TIME PERMITS
//                                             // data='<p>Enter Dataset description here.</p>'
//                                             // data=''
//                                             data={
//                                                 dataset
//                                                     ? dataset.description
//                                                     : '<p>Enter Dataset description here.</p>'
//                                             }
//                                             onReady={editor => {
//                                                 // You can store the "editor" and use when it is needed.
//                                             }}
//                                             // onFocus={(event, editor) => {
//                                             //     editor.setData('');
//                                             // }}
//                                             onChange={(event, editor) => {
//                                                 const data = editor.getData();

//                                                 // WE SHOULD DO SOMETHING WITH data at this point
//                                                 // formik.handleChange() is not doing anything with it.

//                                                 // formik.handleChange();
//                                             }}
//                                         />
//                                         {/* )} */}
//                                     </div>
//                                 </CardBody>
//                             </Card>
//                         </Col>

//                         <Col lg={5} className='d-flex flex-column'>
//                             <Card className='flex-grow-1'>
//                                 <CardBody className='d-flex flex-column justify-content-between'>
//                                     <Row>
//                                         <Col lg={12}>
//                                             <div className='mb-3 mb-lg-0'>
//                                                 <Label
//                                                     htmlFor='choices-data-set-type'
//                                                     className='form-label'
//                                                 >
//                                                     Dataset Type
//                                                 </Label>
//                                                 <select
//                                                     className='form-select'
//                                                     data-choices
//                                                     data-choices-search-false
//                                                     id='choices-data-set-type'
//                                                     onChange={
//                                                         formik.handleChange
//                                                     }
//                                                     value={formik.values.type}
//                                                 >
//                                                     <option defaultValue='Images'>
//                                                         Images
//                                                     </option>
//                                                     <option value='Videos'>
//                                                         Videos
//                                                     </option>
//                                                     <option value='Point Cloud'>
//                                                         Point Cloud
//                                                     </option>
//                                                     <option value='Other'>
//                                                         Other
//                                                     </option>
//                                                 </select>
//                                             </div>
//                                         </Col>
//                                     </Row>
//                                     <Row>
//                                         <Col lg={12}>
//                                             <div className='mb-3 mb-lg-0'>
//                                                 <Label
//                                                     htmlFor='choices-status-input'
//                                                     className='form-label'
//                                                 >
//                                                     Status
//                                                 </Label>
//                                                 <select
//                                                     className='form-select'
//                                                     data-choices
//                                                     data-choices-search-false
//                                                     id='choices-status-input'
//                                                     onChange={
//                                                         formik.handleChange
//                                                     }
//                                                     value={formik.values.status}
//                                                 >
//                                                     <option defaultValue='Preprocessing'>
//                                                         Preprocessing
//                                                     </option>
//                                                     <option value='Ready'>
//                                                         Ready
//                                                     </option>
//                                                 </select>
//                                             </div>
//                                         </Col>
//                                     </Row>
//                                     <Row>
//                                         <Col lg={12}>
//                                             <div>
//                                                 <Label
//                                                     htmlFor='choices-access-input'
//                                                     className='form-label'
//                                                 >
//                                                     Access
//                                                 </Label>
//                                                 <select
//                                                     className='form-select'
//                                                     data-choices
//                                                     data-choices-search-false
//                                                     id='choices-access-input'
//                                                     onChange={
//                                                         formik.handleChange
//                                                     }
//                                                     value={formik.values.access}
//                                                 >
//                                                     <option defaultValue='Private'>
//                                                         Private
//                                                     </option>
//                                                     <option value='Public'>
//                                                         Public
//                                                     </option>
//                                                 </select>
//                                             </div>
//                                         </Col>
//                                     </Row>
//                                     <Row>
//                                         <Col lg={12}>
//                                             <div>
//                                                 <Label
//                                                     htmlFor='choices-has-annotations-input'
//                                                     className='form-label'
//                                                 >
//                                                     Has Annotations?
//                                                 </Label>
//                                                 <select
//                                                     className='form-select'
//                                                     data-choices
//                                                     data-choices-search-false
//                                                     id='choices-has-annotations-input'
//                                                     onChange={
//                                                         formik.handleChange
//                                                     }
//                                                     value={formik.values.access}
//                                                 >
//                                                     <option defaultValue='Yes'>
//                                                         Yes
//                                                     </option>
//                                                     <option value='No'>
//                                                         No
//                                                     </option>
//                                                 </select>
//                                             </div>
//                                         </Col>
//                                     </Row>
//                                 </CardBody>
//                             </Card>
//                         </Col>
//                     </Row>
//                 </ModalBody>
//                 <div className='modal-footer'>
//                     <div className='hstack gap-2 justify-content-end'>
//                         <button
//                             onClick={() => {
//                                 onCancelClick();
//                                 setModal(false);
//                             }}
//                             type='button'
//                             className='btn btn-light'
//                             data-bs-dismiss='modal'
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type='submit'
//                             className='btn btn-success'
//                             id='add-btn'
//                         >
//                             Save
//                         </button>
//                     </div>
//                 </div>
//             </Form>
//         </Modal>
//     );
// };

// LinkDatasetModal.propTypes = {
//     onCancelClick: PropTypes.func,
//     onSaveClick: PropTypes.func,
//     show: PropTypes.any,
// };

// export default LinkDatasetModal;
