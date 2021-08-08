import Home from "../Components/pages/Home";
import About from "../Components/pages/About";
import UserGuide from "../Components/pages/UserGuide";
// import StoreFront from "../Components/StoreFront/StoreFront";
const INDEX = '/';
const ABOUT = '/about';
const CONTACT = '/contact';
const USERGUIDE = '/user-guide';

const API = {
    CONTACT_MAIL: process.env.MIX_APP_URL+"/api/contact-mail"
};

const routes = [
    {
        path: INDEX,
        exact: true,
        page: {
            component: Home,
            render_component: "./pages/Home.js",
            title: 'Settings'
        }
    },
    {
        path: ABOUT,
        exact: true,
        page: {
            component: About,
            title: 'Plan & Pricing'
        }
    },
    {
        path: USERGUIDE,
        exact: true,
        page: {
            component: UserGuide,
            title: 'User Guide'
        }
    }

];

export {routes, INDEX, API};
