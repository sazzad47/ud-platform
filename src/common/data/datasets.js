import { v4 as uuidv4 } from 'uuid';

const datasetsDummyData = [
    {
        _id: uuidv4(),
        id: 1,
        name: 'Hyperspectral images of crops',
        description:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
        owner: 'Tonya Noble',
        uploadDate: '08 Dec, 2021',
        type: 'Videos',
        status: 'Preprocessing',
        access: 'Public',
        hasAnnotations: 'No',
    },
    {
        _id: uuidv4(),
        id: 2,
        name: 'Car density map',
        description:
            'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
        owner: 'Mary Rucker',
        uploadDate: '24 Oct, 2021',
        type: 'Other',
        status: 'Ready',
        access: 'Private',
        hasAnnotations: 'Yes',
    },
    {
        _id: uuidv4(),
        id: 3,
        name: 'Population density map',
        description:
            'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
        owner: 'Mary Rucker',
        uploadDate: '24 June, 2022',
        type: 'Videos',
        status: 'Ready',
        access: 'Private',
        hasAnnotations: 'Yes',
    },
    {
        _id: uuidv4(),
        id: 4,
        name: 'Movies and Actors Dataset',
        description:
            'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
        owner: 'Johnny Goodies',
        uploadDate: '15 March, 2022',
        type: 'Point Cloud',
        status: 'Ready',
        access: 'Public',
        hasAnnotations: 'No',
    },
    {
        _id: uuidv4(),
        id: 5,
        name: 'Lidar Scanning of Slovenia 2014',
        description:
            'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
        owner: 'Mary Rucker',
        uploadDate: '24 Oct, 2021',
        type: 'Images',
        status: 'Ready',
        access: 'Private',
        hasAnnotations: 'Yes',
    },
    {
        _id: uuidv4(),
        id: 6,
        name: 'Severe Storm Event Details',
        description:
            'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
        owner: 'Mary Rucker',
        uploadDate: '24 Oct, 2021',
        type: 'Point Cloud',
        status: 'Preprocessing',
        access: 'Private',
        hasAnnotations: 'Yes',
    },
    {
        _id: uuidv4(),
        id: 7,
        name: 'Environmental Impact of Food Production',
        description:
            'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
        owner: 'Mary Rucker',
        uploadDate: '24 Oct, 2021',
        type: 'Other',
        status: 'Ready',
        access: 'Public',
        hasAnnotations: 'No',
    },
];

export { datasetsDummyData };
