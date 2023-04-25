import MainNavBar from './main-navbar';
import ProjectCardDescriptions from './card';
import MainHead from './main-head';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import projects from '../shared/project-list';
import CV from './cv';


function MainPage() {
    return (
        <>
            <BrowserRouter>
                <MainNavBar />
                <Routes>
                    <Route path="" element={
                        <div>
                            <MainHead />
                            <ProjectCardDescriptions />
                        </div>} />
                    {projects.map((project) => (
                        <Route path={project.link} element={project.component} key={project.name} />
                    ))}
                    <Route path='cv' element={<CV/>}/>
                </Routes>

            </BrowserRouter>
        </>
    );
}

export default MainPage;