import { useState } from 'react';

import NewProject from './Components/NewProject.jsx';
import NoProjectSelected from './Components/NoProjectSelected.jsx';
import ProjectsSidebar from './Components/ProjectsSidebar.jsx'; 
import SelectedProject from './Components/SelectProject.jsx';

  function App() {
    const [projectsState, setprojectState] = useState({
      selectedProjectId: undefined,
      projects: []
    });

  function handleSelectProject(id) {
    setprojectState(preState => {
      return{
        ...preState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setprojectState(preState => {
      return{
        ...preState,
        selectedProjectId: null,
      };
    });
  } 

  function handleCancelAddProject() {
    setprojectState(preState => {
      return{
        ...preState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projrctData) {
    setprojectState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projrctData,
        id:projectId,
      };

      return {
        ...prevState,
        selectedProjectId:undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }

  function handleDeleteProject () {
    setprojectState(prevState => {
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }
  
  const selectedProject = projectsState.projects.find(
    project => project.id === projectsState.selectedProjectId
  );

  let content = (
  <SelectedProject project={selectedProject} onDelete={handleDeleteProject}/>
  );

  if (projectsState.selectedProjectId === null) {
    content = <NewProject  onAdd={handleAddProject} onCancel={handleCancelAddProject}/>;
  } else if (projectsState.selectedProjectId ===undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar 
        onStartAddProject={handleStartAddProject} 
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;
