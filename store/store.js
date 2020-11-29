/* eslint-disable semi */
import axios from 'axios'

const devMode = process.env.NODE_ENV === 'development';
const projectID = 'b61a77df-b2e3-0095-a454-64ffc39d06d3';

// Event names:
export const EVENTS = {
  TOGGLE_DARK_THEME: 'TOGGLE_DARK_THEME',
  TRIGGER_RIGHT_DRAWER: 'TRIGGER_RIGHT_DRAWER',
  SET_LOADING: 'SET_LOADING',
  UPDATE_CAFES: 'UPDATE_CAFES',
  UPDATE_PROJECT_ITEMS: 'UPDATE_PROJECT_ITEMS'
}

export const state = () => ({
  appTitle: 'A.P. Technical Test',
  projectItems: [],
  cafes: [],
  currentLanguage: 'en-US',
  rightDrawerIsOpen: false,
  loading: false,
  isDarkTheme: true,
  menuItems: [
    { title: 'Home', route: '/', icon: 'mdi-home' },
    { title: 'Project', route: '/project', icon: 'mdi-folder' }
  ]
})

export const getters = {
  getAppTitle: state => state.title,
  getRightDrawer: state => state.rightDrawerIsOpen,
  getRightDrawerMenus: state => state.menuItems,
  getLoadingStatus: state => state.loading,
  isDarkThemeInUse: state => state.isDarkTheme
}

export const mutations = {
  [EVENTS.TRIGGER_RIGHT_DRAWER]: (state, isOpen) => {
    // eslint-disable-next-line semi
    state.rightDrawerIsOpen = isOpen;
    if (devMode) { console.log('[TRIGGER_RIGHT_DRAWER] mutation: isOpen: ' + state.rightDrawerIsOpen) }
  },
  [EVENTS.TOGGLE_DARK_THEME]: (state) => {
    state.isDarkTheme = !state.isDarkTheme;
    if (devMode) { console.log('[TOGGLE_DARK_THEME] mutation: darkTheme: ' + state.isDarkTheme) }
  },
  [EVENTS.SET_LOADING]: (state, isLoading) => {
    state.loading = isLoading;
  },
  [EVENTS.UPDATE_CAFES]: (state, payload) => {
    if (payload && payload.items) {
      state.cafes = payload.items;
    } else {
      state.cafes = []
    }
  },
  [EVENTS.UPDATE_PROJECT_ITEMS]: (state, payload) => {
    if (payload && payload.items) {
      state.projectItems = payload.items;
    } else {
      state.projectItems = []
    }
  }
}

export const actions = {
  triggerRightDrawer: (context, isOpen) => {
    context.commit(EVENTS.TRIGGER_RIGHT_DRAWER, isOpen)
  },
  openRightDrawer: (context) => {
    context.commit(EVENTS.TRIGGER_RIGHT_DRAWER, true)
  },
  closeRightDrawer: (context) => {
    context.commit(EVENTS.TRIGGER_RIGHT_DRAWER, false)
  },
  toggleDarkTheme: (context) => {
    if (devMode) { console.log('Action: store/toggleDarkTheme'); }
    context.commit(EVENTS.TOGGLE_DARK_THEME, null);
  },
  stopLoading: (context) => {
    context.commit(EVENTS.SET_LOADING, false);
  },
  startLoading: (context) => {
    context.commit(EVENTS.SET_LOADING, true);
  },
  loadCafeItems: (context) => {
    context.commit(EVENTS.SET_LOADING, true);
    axios
      .get(`https://deliver.kenticocloud.com/${projectID}/items?system.type=cafe`)
      .then(function (response) {
        context.commit(EVENTS.UPDATE_CAFES, response.data);
        context.dispatch('stopLoading');
        /* pre-loading all Project's Items */
        const prItems = context.state.projectItems;
        if (!prItems || !prItems.length || prItems.length <= 0) {
          context.dispatch('loadProjectItems');
        }
      })
      .catch(err => console.error(err))
  },
  loadProjectItems: (context) => {
    context.commit(EVENTS.SET_LOADING, true);
    axios
      .get(`https://deliver.kenticocloud.com/${projectID}/items`)
      .then(function (response) {
        context.commit(EVENTS.UPDATE_PROJECT_ITEMS, response.data);
        context.dispatch('stopLoading');
        /* pre-loading all Project's Items */
        const cafes = context.state.cafes;
        if (!cafes || !cafes.length || cafes.length <= 0) {
          context.dispatch('loadCafeItems');
        }
      })
      .catch(err => console.error(err))
  }
}
