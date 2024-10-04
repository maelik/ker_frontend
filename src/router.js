import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import EventList from './components/EventList.vue';
import EventDetails from './components/EventDetails.vue';
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
import EventTricount from './components/EventTricount.vue';
import DiscussionDetails from './components/DiscussionDetails.vue';
import ListExpenses from './components/ListExpenses.vue';
import ExpenseDetails from './components/ExpenseDetails.vue';
import InvitationGuest from './components/InvitationGuest.vue';
import createExpense from './components/CreateExpense.vue';

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
      { path: 'tricount', name: 'EventTricount', component: EventTricount },
      // Rediriger vers 'info' par défaut
      { path: '', redirect: 'info' },
    ],
  },
  { path: '/events/:id/discussions/:postId', name: 'DiscussionDetails', component: DiscussionDetails, props: true },
  { path: '/events/:id/tricount/listExpenses', name: 'ListExpenses', component: ListExpenses, props: true },
  { path: '/events/:id/tricount/expenseDetails/:expenseId', name: 'ExpenseDetails', component: ExpenseDetails, props: true },
  { path: '/events/:id/tricount/createExpense', name: 'createExpense', component: createExpense, props: true },
  { path: '/createEvent/step1', name: 'Step1', component: Step1 },
  { path: '/createEvent/step2', name: 'Step2', component: Step2 },
  { path: '/createEvent/step3', name: 'Step3', component: Step3 },
  { path: '/createEvent/step4', name: 'Step4', component: Step4 },
  { path: '/createEvent/step5', name: 'Step5', component: Step5 },
  { path: '/createEvent/step6', name: 'Step6', component: Step6 },
  { path: '/createEvent/step7', name: 'Step7', component: Step7 },
  { path: '/events/:id/invite', name: 'InvitationGuest', component: InvitationGuest, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
