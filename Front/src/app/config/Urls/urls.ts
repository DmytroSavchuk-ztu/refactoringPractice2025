// const baseUrl = 'https://rodevilst.com/api/';
// const imageUrl = 'https://rodevilst.com/api/projects/download/'
const baseUrl = 'http://localhost:3030/api/';
const imageUrl = 'http://localhost:3030/api/projects/download/'

const urls = {

  auth: {
    signIn: baseUrl + 'auth/signin',
    changePass: baseUrl + 'auth/resetPass'
  },

  crew: {
    crew: baseUrl + 'crew',
    crewAll: baseUrl + 'crew/crewsAll',
    addCrew: baseUrl + 'crew/addCrew',
    deleteCrew: baseUrl + 'crew/deleteCrew',
    getCrewById: baseUrl + 'crew/crew',
    getCrews: baseUrl + 'crew/crews',
    getSingleCrew: baseUrl + 'crew/crew',
    editCrew: baseUrl + 'crew/editCrew'
  },

  project: {
    getProjects: baseUrl + 'projects',
    deleteProject: baseUrl + 'projects',
    getProjectById: baseUrl + 'projects',
    addNewProject: baseUrl + 'projects',
    editProject: baseUrl + 'projects',
    addPrize: baseUrl + 'projects/addPrize',
    addParticipation: baseUrl + 'projects/addParticipation',
    prize: baseUrl + 'projects/prize',
    participation: baseUrl + 'projects/participation',
  },

  news: {
    getNews: baseUrl + 'news',
    getPublishedNews: baseUrl + 'news/publishedNews',
    addPost: baseUrl + 'news/post',
    addSection: baseUrl + 'news/addSection',
    changeSection: baseUrl + 'news/section',
    changeNews: baseUrl + 'news/news',
  },

  vacancy: {
    vacancy: baseUrl + 'vacancy',
    publishedVacancy: baseUrl + 'vacancy/publish'
  },

  text: {
    getText: baseUrl + 'text'
  },

  email: {
    postEmail: baseUrl + 'email/post',
    getEmail: baseUrl + 'email'
  },

  footerButton: {
    buttons: baseUrl + 'button',
    activeButtons: baseUrl + 'button/active'
  },

  dist: {
    dist: baseUrl + 'dist',
    getAll: baseUrl + 'dist/all',
    getActive: baseUrl + 'dist/active'
  },


  address: {
    address: baseUrl + 'address',
    published: baseUrl + 'address/published'
  },

  partner: {
    partner: baseUrl + 'partner',
    published: baseUrl + 'partner/published'
  }


}

export {urls, imageUrl}
