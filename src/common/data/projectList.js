import { v4 as uuidv4 } from 'uuid';

// Import Images
import slack from '../../assets/images/brands/slack.png';
import dribbble from '../../assets/images/brands/dribbble.png';
import mailChimp from '../../assets/images/brands/mail_chimp.png';
import dropbox from '../../assets/images/brands/dropbox.png';
import avatar2 from '../../assets/images/users/avatar-2.jpg';
import avatar3 from '../../assets/images/users/avatar-3.jpg';
import avatar4 from '../../assets/images/users/avatar-4.jpg';
import avatar5 from '../../assets/images/users/avatar-5.jpg';
import avatar6 from '../../assets/images/users/avatar-6.jpg';
import avatar7 from '../../assets/images/users/avatar-7.jpg';
import avatar8 from '../../assets/images/users/avatar-8.jpg';
import avatar9 from '../../assets/images/users/avatar-9.jpg';
import avatar10 from '../../assets/images/users/avatar-10.jpg';
import airfield from '../../assets/images/projects/airfield-monitoring.png';
import urban from '../../assets/images/projects/urban-mapping.jpg';
import leakage from '../../assets/images/projects/leakage-detection.jpg';
import powerlines from '../../assets/images/projects/power-lines.jpg';
import solar from '../../assets/images/projects/solar-inspection.jpg';
import leftsidebar from '../../assets/images/projects/project-left-sidebar.jpg';
import urbanmappingmain from '../../assets/images/projects/urban-mapping-main.jpg';
import rightsidebartop from '../../assets/images/projects/project-right-sidebar-top.png';
import projectcontrols from '../../assets/images/projects/project-controls.jpg';
import urbanmappinobj001 from '../../assets/images/projects/urban-mapping-object-001.png';
import urbanmappinobj002 from '../../assets/images/projects/urban-mapping-object-002.png';
import urbanmappinobj003 from '../../assets/images/projects/urban-mapping-object-003.png';
import airfielddetection from '../../assets/images/projects/airfield-detection.jpg';
import airplane001 from '../../assets/images/projects/airplane01.jpg';
import airplane002 from '../../assets/images/projects/airplane02.jpg';
import airplane003 from '../../assets/images/projects/airplane03.jpg';
import airplane004 from '../../assets/images/projects/airplane04.jpg';
import stripes from '../../assets/images/projects/download.jpg';
import planeinforest from '../../assets/images/projects/david-kovalenko-G85VuTpw6jg-unsplash.jpg';
import lightbulb from '../../assets/images/projects/diego-ph-fIq0tET6llw-unsplash.jpg';
import pencils from '../../assets/images/projects/jess-bailey-l3N9Q27zULw-unsplash.jpg';

const projectList = [
    {
        _id: uuidv4(),
        id: 1,
        isDesign1: true,
        time: 'Updated 3hrs ago',
        img: airfield,
        imgbgColor: 'warning',
        label: 'Airfield monitoring',
        status: 'Inprogess',
        caption:
            'Automated detection of irregularities in airfield video streams.',
        number: '18/42',
        progressBar: '34%',
        subItem: [
            { id: 1, imgFooter: avatar2 },
            { id: 2, imgNumber: '+' },
        ],
        date: '10 Jul, 2021',
        ratingClass: '',
        datasets: [5, 6],
        mainImage: airfielddetection,
        smallImages: [airplane001, airplane002, airplane003, airplane004],
        hasAnnotations: 'No',
    },
    {
        _id: uuidv4(),
        id: 2,
        isDesign1: true,
        time: 'Last update: 08 May',
        img: urban,
        imgbgColor: 'danger',
        label: 'Urban mapping',
        caption:
            'Hyperspectral image processing for building classification in urban settings.',
        number: '22/56',
        progressBar: '54%',
        subItem: [
            { id: 1, imgFooter: avatar3 },
            { id: 2, imgNumber: 'S', bgColor: 'secondary' },
            { id: 3, imgFooter: avatar4 },
            { id: 4, imgNumber: '+' },
        ],
        date: '18 May, 2021',
        ratingClass: 'active',
        datasets: [3, 4],
        mainImage: urbanmappingmain,
        smallImages: [urbanmappinobj001, urbanmappinobj002, urbanmappinobj003],
        hasAnnotations: 'Yes',
    },
    {
        _id: uuidv4(),
        id: 3,
        isDesign1: true,
        time: 'Updated 2hrs ago',
        img: leakage,
        imgbgColor: 'success',
        label: 'Oil leakage monitoring',
        caption:
            'Combination of sensor and image processing for automated detection of leakages.',
        number: '14/20',
        status: 'Inprogess',
        progressBar: '65%',
        subItem: [
            { id: 1, imgFooter: avatar5 },
            { id: 2, imgNumber: 'M', bgColor: 'warning' },
            { id: 3, imgNumber: '+' },
        ],
        date: '21 Feb, 2021',
        ratingClass: 'active',
        datasets: [1, 4],
        mainImage: stripes,
        smallImages: [planeinforest, lightbulb, pencils],
        hasAnnotations: 'Yes',
    },
    {
        _id: uuidv4(),
        id: 4,
        isDesign1: true,
        time: 'Last update : 21 Jun',
        img: powerlines,
        imgbgColor: 'info',
        label: 'Power line monitoring',
        caption: 'Sensor and drone-based power line monitoring system',
        number: '20/34',
        status: 'Inprogess',
        progressBar: '78%',
        subItem: [
            { id: 1, imgNumber: 'K', bgColor: 'info' },
            { id: 2, imgNumber: 'M', bgColor: 'danger' },
            { id: 3, imgNumber: '+' },
        ],
        date: '03 Aug, 2021',
        ratingClass: '',
        datasets: [5, 6, 7],
        mainImage: stripes,
        smallImages: [planeinforest, lightbulb, pencils],
        hasAnnotations: 'No',
    },
    {
        _id: uuidv4(),
        id: 5,
        isDesign1: true,
        time: 'Last update: 15 Aug',
        img: solar,
        imgbgColor: 'info',
        label: 'Home inspections',
        caption: 'Home inspection system',
        status: 'Inprogess',
        progressBar: '68%',
        statusClass: 'warning',
        subItem: [
            { id: 1, imgNumber: 'D', bgColor: 'danger' },
            { id: 2, imgTeam: avatar5 },
            { id: 3, imgTeam: avatar6 },
            { id: 4, imgNumber: '+' },
        ],
        date: '15 Aug, 2023',
        ratingClass: 'active',
        cardHeaderClass: 'danger',
        datasets: [2, 3, 4, 7],
        mainImage: stripes,
        smallImages: [planeinforest, lightbulb, pencils],
        hasAnnotations: 'Yes',
    },
    {
        _id: uuidv4(),
        id: 6,
        isDesign1: true,
        time: 'Last update: 03 Sep',
        img: stripes,
        imgbgColor: 'info',
        label: 'Project X',
        caption: 'An exploration of deep space',
        status: 'Inprogess',
        statusClass: 'warning',
        subItem: [
            { id: 1, imgNumber: 'D', bgColor: 'danger' },
            { id: 2, imgTeam: avatar5 },
            { id: 3, imgTeam: avatar6 },
            { id: 4, imgNumber: '+' },
        ],
        date: '03 Sep, 2023',
        progressBar: '20%',
        ratingClass: 'active',
        cardHeaderClass: 'danger',
        datasets: [2, 3, 4, 7],
        mainImage: stripes,
        smallImages: [planeinforest, lightbulb, pencils],
        hasAnnotations: 'Yes',
    },
];
export { projectList };
