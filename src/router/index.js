import Vue from 'vue'
import Router from 'vue-router'

// layout components
import Full from '@/container/Full'


import Login from '@/views/session/Login'


// sampark
import Dashboard from '@/views/sampark/sampark'
import StateAssembly from '@/views/sampark/state-assembly'
import ParliamentaryConstituency from '@/views/sampark/parliamentary-constituency'
import District from '@/views/sampark/district'
import AssemblyConstituency from '@/views/sampark/assembly-constituency'
import Ward from '@/views/sampark/ward'
import Booth from '@/views/sampark/booth'
import Volunteer from '@/views/sampark/volunteer'
import Survey from '@/views/sampark/survey'
import Citizen from '@/views/sampark/citizen'
import Complaint from '@/views/sampark/complaint'
import createcomplaint from '@/views/sampark/createcomplaint'
import editcomplaint from '@/views/sampark/editcomplaint'
import UserManaged from '@/views/sampark/user-manage'
import DepartmentUser from '@/views/sampark/department-user'
import Department from '@/views/sampark/department'
import SubDepartment from '@/views/sampark/sub-department'
import UserPermissions from '@/views/sampark/user-permissions'
import assignedComplaint from '@/views/sampark/assigned-complaint'
import hierarchyUpload from '@/views/sampark/hierarchy-upload'
import PartyOffice from '@/views/sampark/party-office'
import PollingStation from '@/views/sampark/polling-station'
import CitizenDynamicFileds from '@/views/sampark/citizen-dynamic-fileds'
import applicationSetting from '@/views/sampark/application-setting'
import volunteerNotification from '@/views/sampark/volunteer-notification'
import volunteerSetting from '@/views/sampark/volunteer-setting'
import NewsFeed from '@/views/sampark/news-feed'
import NumberOfVotersInHouse from '@/views/sampark/number-voters-house'
import Party from '@/views/sampark/party'
import SurveyReports from '@/views/sampark/reports'
import DownloadReports from '@/views/sampark/download-reports'
import CitizenUpload from '@/views/sampark/citizen-upload'
import CitizenDashboard from '@/views/sampark/citizen-dashboard'
import LastDayCounting from '@/views/sampark/last-day-counting'
import PreviousElectionUpload from '@/views/sampark/previous-election-upload'
import Segmentations from '@/views/sampark/segmentations'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Full,
      redirect: '/login',
      children: [
        {
          path: '/dashboard',
          component: Dashboard,
          meta: {
            title: 'Samparaka',//if u changhed this name then also change this name in Full.vue file
            breadcrumb: ' ',
          }
        },
        {
          path: '/state-assembly',
          component: StateAssembly,
          meta: {
            title: 'State Assembly',
            breadcrumb: ' ',
          permission : "MANAGE_STATE_ASSEMBLY"
          }
        },
        {
          path: '/parliamentary-constituency',
          component: ParliamentaryConstituency,
          meta: {
            title: 'Parliamentary Constituencies',
            breadcrumb: ' ',
          permission : "MANAGE_PARLIAMENTARY"
          }
        },
        {
          path: '/district',
          component: District,
          meta: {
            title: 'District',
            breadcrumb: ' ',
          permission : "MANAGE_DISTRICTS"
          }
        },
        {
          path: '/assembly-constituency',
          component: AssemblyConstituency,
          meta: {
            title: 'Assembly Constituencies',
            breadcrumb: ' ',
          permission : "MANAGE_ASSEMBLY_CONSTITUENCIES"
          }
        },
        {
          path: '/ward',
          component: Ward,
          meta: {
            title: 'Ward',
            breadcrumb: ' ',
            permission : "MANAGE_WARD"
          }
        },
        {
          path: '/booth',
          component: Booth,
          meta: {
            title: 'Booth',
            breadcrumb: ' ',
          permission : "MANAGE_BOOTH"
          }
        },
        {
          path: '/volunteer',
          component: Volunteer,
          meta: {
            title: 'Manage Volunteer',
            breadcrumb: ' ',
          permission : "MANAGE_VOLUNTEER"
          }
        },
        {
          path: '/survey',
          component: Survey,
          meta: {
            title: 'Survey Questions',
            breadcrumb: ' ',
          permission : "MANAGE_SURVEY"
          }
        },
        {
          path: '/complaint',
          component: Complaint,
          meta: {
            title: 'Complaint',
            breadcrumb: ' ',
          permission : "MANAGE_COMPLAINT"
          }
        },
        {
          path: '/news-feed',
          component: NewsFeed,
          meta: {
            title: 'News Feed',
            breadcrumb: ' ',
          permission : "NEWS_FEED"
          }
        },
        {
          path: '/user-permissions',
          component: UserPermissions,
          meta: {
            title: 'Role Management',
            breadcrumb: ' ',
          permission : "MANAGE_ROLE_MANAGEMENT"
          }
        },
        {
          path: '/voter',
          component: Citizen,
          meta: {
            title: 'Voter Data',
            breadcrumb: ' ',
          permission : "MANAGE_CITIZEN"
          }
        },
        {
          path: '/party-office',
          component: PartyOffice,
          meta: {
            title: 'Party Office',
            breadcrumb: ' ',
          permission : "MANAGE_PARTY_OFFICE"
          }
        },
        {
          path: '/party',
          component: Party,
          meta: {
            title: 'Political Parties',
            breadcrumb: ' ',
          permission : "MANAGE_PARTY"
          }
        },
        {
          path: '/createcomplaint',
          component: createcomplaint,
          meta: {
            title: 'New Complaint',
            breadcrumb: ' ',
            permission : "MANAGE_NEW_COMPLAINT"
          }
        },
        {
          path: '/assigned-complaint',
          component: assignedComplaint,
          meta: {
            title: 'My Assigned Complaint',
            breadcrumb: ' ',
            permission : "MANAGE_ASSIGNED_COMPLAINT"
          }
        },
        {
          path: '/editcomplaint',
          component: editcomplaint,
          meta: {
            title: 'Edit Complaint',
            breadcrumb: ' ',
            permission : "MANAGE_EDIT_COMPLAINT"
          }
        },
        {
          path: '/user-manage',
          component: UserManaged,
          meta: {
            title: 'Users',
            breadcrumb: ' ',
          permission : "MANAGE_USERS"
          }
        },
        {
          path: '/department-user',
          component: DepartmentUser,
          meta: {
            title: 'Department Users',
            breadcrumb: ' ',
          permission : "MANAGE_DEPT_USERS"
          }
        },
        {
          path: '/department',
          component: Department,
          meta: {
            title: 'Department',
            breadcrumb: ' ',
          permission : "MANAGE_DEPARTMENT"
          }
        },
        {
          path: '/sub-department',
          component: SubDepartment,
          meta: {
            title: 'Sub Department',
            breadcrumb: ' ',
          permission : "MANAGE_SUBDEPARTMENT"
          }
        },
        {
          path: '/hierarchy-upload ',
          component: hierarchyUpload ,
          meta: {
            title: 'Hierarchy Upload ',
            breadcrumb: ' ',
          permission : "MANAGE_HIERARCHY_UPLOAD"
          }
        },
        {
          path: '/polling-station',
          component: PollingStation ,
          meta: {
            title: 'Polling Station',
            breadcrumb: ' ',
          permission : "MANAGE_POLLING_STATION"
          }
        },
        {
          path: '/voter-dynamic-fileds',
          component: CitizenDynamicFileds ,
          meta: {
            title: 'Voter Dynamic Fields',
            breadcrumb: ' ',
          permission : "MANAGE_CITIZEN_DYNAMIC_FIELDS"
          }
        },
        {
          path: '/application-setting',
          component: applicationSetting ,
          meta: {
            title: 'Application Setting',
            breadcrumb: ' ',
          permission : "APPLICATION_SETTING"
          }
        },
        {
          path: '/volunteer-notification',
          component: volunteerNotification ,
          meta: {
            title: 'Volunteer Notification',
            breadcrumb: ' ',
          permission : "VOLUNTEER_NOTIFICATION"
          }
        },
        {
          path: '/volunteer-setting',
          component: volunteerSetting ,
          meta: {
            title: 'Volunteer Setting',
            breadcrumb: ' ',
          permission : "VOLUNTEER_SETTING"
          }
        },
        {
          path: '/number-voters-house',
          component: NumberOfVotersInHouse ,
          meta: {
          title: 'Number Of Voters/House',
          breadcrumb: ' ',
          permission : "NUMBER_OF_VOTERS_HOUSE"
          }
        },
        {
          path:'/survey-reports',
          component : SurveyReports,
          meta: {
            title: 'Survey Reports',
            breadcrumb: ' ',
            permission : "QUESTION_ANSWER_REPORT"
          }
        },
        {
          path:'/download-reports',
          component : DownloadReports,
          meta: {
            title: 'Download Reports',
            breadcrumb: ' ',
            permission : "SURVEY_REPORTS"
          }
        },
        {
          path:'/voterUpload',
          component : CitizenUpload,
          meta: {
            title: 'Voter Upload',
            breadcrumb: ' ',
            permission : "MANAGE_CITIZEN_UPLOAD"
          }
        },
        {
          path:'/last-day-counting',
          component : LastDayCounting,
          meta: {
            title: 'Last Day Counting',
            breadcrumb: ' ',
            permission : "LAST_DAY_COUNTING"
          }
        },
        {
          path:'/voter-dashboard',
          component : CitizenDashboard,
          meta: {
            title: 'Voter Dashboard',
            breadcrumb: ' ',
            permission : "CITIZEN_DASHBOARD"
          }
        },        
        {
          path:'/previous-election-upload',
          component : PreviousElectionUpload,
          meta: {
            title: 'Previous Election Upload',
            breadcrumb: ' ',
            permission : "PREVIOUS_ELECTION_UPLOAD"
          }
        },        
        {
          path:'/segmentations',
          component : Segmentations,
          meta: {
            title: 'Segmentations',
            breadcrumb: ' ',
            permission : "MANAGE_SEGMENTATIONS"
          }
        }
      ]
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: 'Login',
        breadcrumb: 'Session / Login'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.path != '/login' && to.path != '/'){
    const loginUser = window.localStorage.getItem('loginUser');
    const auth_token = window.localStorage.getItem('auth_token');
    if(loginUser && auth_token) {
      if(to.meta.permission){
        const permissions = window.localStorage.getItem('permissions').split(',');
        var data = permissions.filter(function (action) {
          return action == to.meta.permission;
        });
        if(data.length > 0){
          next();
        }else{
          next('dashboard');
        }
      }else{
        next();
      }

    }else{
      alert('Session Expired Please Login');
      next('login');
    }
  }else{
    next();
  }
})

export default router
