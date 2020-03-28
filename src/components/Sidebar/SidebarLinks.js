// Sidebar Routers
export const category1 = [ 
  {
    action: 'dashboard',
    title: 'dashboard',
    items: null,
    path:'/dashboard'
  },
  {
    action: 'settings',
    title: 'settings',
    permission: 'SETTINGS',
    items: [
            {
              action: 'ti-dashboard',
              title: 'stateassembly',
              items: null,
              path: '/state-assembly',
              permission: 'MANAGE_STATE_ASSEMBLY'
            }, 
            {
              action: 'ti-dashboard',
              title: 'district',
              items: null,
              path: '/district',
              permission: 'MANAGE_DISTRICTS'
            }, 
            {
              action: 'ti-dashboard',
              title: 'parliamentaryconstituency',
              items: null,
              path: '/parliamentary-constituency',
              permission: 'MANAGE_PARLIAMENTARY'
            },
            {
              action: 'ti-dashboard',
              title: 'assemblyconstituency',
              items: null,
              path: '/assembly-constituency',
              permission: 'MANAGE_ASSEMBLY_CONSTITUENCIES'
            },  
            {
              action: 'ti-dashboard',
              title: 'ward',
              items: null,
              path: '/ward',
              permission: 'MANAGE_WARD'
            },  
            {
              action: 'ti-dashboard',
              title: 'booth',
              items: null,
              path: '/booth',
              permission: 'MANAGE_BOOTH'
            },
            {
              action: 'ti-dashboard',
              title: 'hierarchyUpload',
              items: null,
              path: '/hierarchy-upload ',
              permission: 'MANAGE_HIERARCHY_UPLOAD'
            },
            {
              action: 'home',
              title: 'PartyOffice',
              items: null,
              path: '/party-office',
              permission: 'MANAGE_PARTY_OFFICE'
            },
            {
              action: 'home',
              title: 'pollingStation',
              items: null,
              path: '/polling-station',
              permission: 'MANAGE_POLLING_STATION'
            },
            {
              action: 'group_work',
              title: 'voterDynamicFileds',
              items: null,
              path: '/voter-dynamic-fileds',
              permission: 'MANAGE_CITIZEN_DYNAMIC_FIELDS'
            },
            {
              action: 'group_work',
              title: 'applicationSetting',
              items: null,
              path: '/application-setting',
              permission: 'APPLICATION_SETTING'
            }
         ]
  },  
  {
    action: 'account_circle',
    title: 'webuser',
    permission: 'WEB_USER',
    items: [
      {
        action: 'ti-dashboard',
        title: 'usermanage',
        items: null,
        path: '/user-manage',
        permission: 'MANAGE_USERS'
      }, 
      {
        action: 'ti-dashboard',
        title: 'departmentuser',
        items: null,
        path: '/department-user',
        permission: 'MANAGE_DEPT_USERS'
      },
    ]
  },  
  {
    action: 'account_balance',
    title: 'departments',
    permission: 'DEPARTMENTS',
    items: [
      {
        action: 'ti-dashboard',
        title: 'department',
        items: null,
        path: '/department',
        permission: 'MANAGE_DEPARTMENT'
      }, 
      {
        action: 'ti-dashboard',
        title: 'subdepartment',
        items: null,
        path: '/sub-department',
        permission: 'MANAGE_SUBDEPARTMENT'
      }]
  },
  {
    action : 'people',
    title : 'volunteer',
    permission : 'VOLUNTEER',
    items : [
            {
              action: 'group_work',
              title: 'manageVolunteer',
              items: null,
              path: '/volunteer',
              permission: 'MANAGE_VOLUNTEER'
            },
            {
              action: 'group_work',
              title: 'volunteerNotification',
              items: null,
              path: '/volunteer-notification',
              permission: 'VOLUNTEER_NOTIFICATION'
            },
            {
              action: 'group_work',
              title: 'volunteerSetting',
              items: null,
              path: '/volunteer-setting',
              permission: 'VOLUNTEER_SETTING'
            },
            {
              action : 'group_work',
              title : 'segmentations',
              items : null,
              path : '/segmentations',
              permission : 'MANAGE_SEGMENTATIONS'
            }
      ]
  },
  {
    action : 'file_upload',
    title : 'uploadData',
    permission : 'UPLOAD_DATA',
    items : [
            {
              action: 'ti-dashboard',
              title: 'voterUpload',
              items: null,
              path: '/voterUpload',
              permission: 'MANAGE_CITIZEN_UPLOAD'
            },
            {
              action: 'home',
              title: 'previousElectionUpload',
              items: null,
              path: '/previous-election-upload',
              permission: 'PREVIOUS_ELECTION_UPLOAD'
            }
      ]
  },
  {
    action : 'settings_applications',
    title : 'surveySettings',
    permission : 'SURVEY_SETTINGS',
    items : [
            {
              action: 'home',
              title: 'Party',
              items: null,
              path: '/party',
              permission: 'MANAGE_PARTY'
            },
            {
              action: 'dashboard',
              title: 'survey',
              items: null,
              path:'/survey',
              permission: 'MANAGE_SURVEY'
            },
      ]
  },
  {
    action: 'accessibility',
    title: 'userPermissions',
    items: null,
    path: '/user-permissions',
    permission: 'MANAGE_ROLE_MANAGEMENT'
  },
  {
    action: 'cast',
    title: 'newsFeed',
    items: null,
    path: '/news-feed',
    permission: 'NEWS_FEED'
  },
  {
    action: 'wc',
    title: 'voter',
    items: null,
    path: '/voter',
    permission: 'MANAGE_CITIZEN'
  },
  {
    action: 'portrait',
    title: 'voterProfile',
    items: [
      {
        action: 'ti-dashboard',
        title: 'voterDashbord',
        items: null,
        path: '/voter-dashboard',
        permission: 'CITIZEN_DASHBOARD'
       },
      {
          action: 'ti-dashboard',
          title: 'numberOfVotersInHouse',
          items: null,
          path: '/number-voters-house',
          permission: 'NUMBER_OF_VOTERS_HOUSE'
      }
    ],
    permission: 'CITIZEN_PROFILE'
  },
  {
    action: 'note_add',
    title: 'complaints',
    permission: 'COMPLAINTS',
    items: [
      {
        action: 'ti-dashboard',
        title: 'managecomplaint',
        items: null,
        path: '/complaint',
        permission: 'MANAGE_COMPLAINT'
      }, 
      {
        action: 'ti-dashboard',
        title: 'assignedComplaint',
        items: null,
        path: '/assigned-complaint',
        permission: 'MANAGE_ASSIGNED_COMPLAINT'
      }, 
      {
        action: 'ti-dashboard',
        title: 'createcomplaint',
        items: null,
        path: '/createcomplaint',
        permission: 'MANAGE_NEW_COMPLAINT'
      }]
  },
  {
    action: 'view_list',
    title: 'reports',
    permission: 'MANAGE_REPORTS',
    items: [
      {
        action: 'view_list',
        title: 'questionAnswerReport',
        items: null,
        path: '/survey-reports',
        permission: 'QUESTION_ANSWER_REPORT'
      }, 
      {
        action: 'view_list',
        title: 'surveyReports',
        items: null,
        path: '/download-reports',
        permission: 'SURVEY_REPORTS'
      },
      {
        action: 'view_list',
        title: 'lastDayCounting',
        items: null,
        path: '/last-day-counting',
        permission : 'LAST_DAY_COUNTING'
      }
    ]
  }
]