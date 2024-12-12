import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import EventList from './components/EventList.vue';
import EventDetails from './components/EventDetails.vue';
import CreateEvent from './components/CreateEvent.vue';
import Step1 from './components/Step1.vue';
import Step2 from './components/Step2.vue';
import Step3 from './components/Step3.vue';
import Step4 from './components/Step4.vue';
import Step5 from './components/Step5.vue';
import Step6 from './components/Step6.vue';
import Step7 from './components/Step7.vue';
import EventInfo from './components/EventInfo.vue';
import EventParticipants from './components/EventParticipant.vue';
import EventListPost from './components/EventListPost.vue';
import EventKercount from './components/EventKercount.vue';
import DiscussionDetails from './components/DiscussionDetails.vue';
import ListExpenses from './components/ListExpenses.vue';
import ExpenseDetails from './components/ExpenseDetails.vue';
import InvitationGuest from './components/InvitationGuest.vue';
import CreateExpense from './components/CreateExpense.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/events', name: 'EventList', component: EventList },
  { 
    path: '/events/:id', 
    name: 'EventDetails', 
    component: EventDetails, 
    props: true,
    beforeEnter(to, from, next) {
      
      if (to.matched.length === 1) {
        next({ name: 'EventInfo', params: { id: to.params.id } });
      } else {
        next(); // Continue à la route
      }
    },
    children: [
      { path: 'info', name: 'EventInfo', component: EventInfo },
      { path: 'participants', name: 'EventParticipants', component: EventParticipants },
      { path: 'discussions', name: 'EventListPost', component: EventListPost },
      { path: 'kercount', name: 'EventKercount', component: EventKercount },
      // Rediriger vers 'info' par défaut
      { path: '',name: 'redirect', redirect: 'info' },
    ],
  },
  { path: '/events/:id/discussions/:postId', name: 'DiscussionDetails', component: DiscussionDetails, props: true },
  { path: '/events/:id/tricount/listExpenses', name: 'ListExpenses', component: ListExpenses },
  { path: '/events/:id/tricount/expenseDetails/:expenseId', name: 'ExpenseDetails', component: ExpenseDetails },
  { path: '/events/:id/tricount/createExpense', name: 'createExpense', component: CreateExpense },
  { 
    path: '/createEvent', 
    name: 'CreateEvent', 
    component: CreateEvent,
    children: [
      { path: 'step1', name: 'Step1', component: Step1 },
      { path: 'step2', name: 'Step2', component: Step2 },
      { path: 'step3', name: 'Step3', component: Step3 },
      { path: 'step4', name: 'Step4', component: Step4 },
      { path: 'step5', name: 'Step5', component: Step5 },
      { path: 'step6', name: 'Step6', component: Step6 },
      { path: 'step7', name: 'Step7', component: Step7 },
    ],
  },
  { path: '/events/:id/invite', name: 'InvitationGuest', component: InvitationGuest, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
