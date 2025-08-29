import { createRouter, createWebHistory } from 'vue-router';

const HomePage = () => import('@/pages/HomePage.vue');
const AboutPage = () => import('@/pages/AboutPage.vue');
const ShowcasePage = () => import('@/pages/ShowcasePage.vue');
const ComponentsDemoPage = () => import('@/pages/ComponentsDemoPage.vue');
const RosterPage = () => import('@/pages/RosterPage.vue');
const EventsPage = () => import('@/pages/EventsPage.vue');
const RecruitmentPage = () => import('@/pages/RecruitmentPage.vue');
const ProjectsListPage = () => import('@/features/projects/views/ProjectsListPage.vue');
const ProjectDetailPage = () => import('@/features/projects/views/ProjectDetailPage.vue');
const ProjectCreatePage = () => import('@/features/projects/views/ProjectCreatePage.vue');
const ProjectEditPage = () => import('@/features/projects/views/ProjectEditPage.vue');
const ProjectsUiDemoPage = () => import('@/features/projects/views/ProjectsUiDemoPage.vue');
const ForumListPage = () => import('@/features/forum/views/ForumListPage.vue');
const CreateThreadPage = () => import('@/features/forum/views/CreateThreadPage.vue');
const ThreadDetailPage = () => import('@/features/forum/views/ThreadDetailPage.vue');

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/about', name: 'about', component: AboutPage },
    { path: '/showcase', name: 'showcase', component: ShowcasePage },
    { path: '/components', name: 'components-demo', component: ComponentsDemoPage },
    { path: '/roster', name: 'roster', component: RosterPage },
    { path: '/events', name: 'events', component: EventsPage },
    { path: '/recruitment', name: 'recruitment', component: RecruitmentPage },
    { path: '/projects', name: 'projects', component: ProjectsListPage },
    { path: '/projects/new', name: 'project-create', component: ProjectCreatePage },
    { path: '/projects/:id', name: 'project-detail', component: ProjectDetailPage, props: true },
    { path: '/projects/:id/edit', name: 'project-edit', component: ProjectEditPage, props: true },
    { path: '/projects/ui-demo', name: 'projects-ui-demo', component: ProjectsUiDemoPage },
    { path: '/forum', name: 'forum', component: ForumListPage },
    { path: '/forum/new', name: 'forum-new', component: CreateThreadPage },
    { path: '/forum/:id', name: 'forum-thread', component: ThreadDetailPage, props: true },
  ],
});

export default router;
