import Constant from "./classes/constant";

function config(locationProvider, stateProvider, urlRouterProvider, $httpProvider, jwtOptionsProvider, lockProvider) {
  locationProvider.html5Mode(true);
  urlRouterProvider.otherwise('/');

  jwtOptionsProvider.config({
    tokenGetter: function() {
      return localStorage.getItem('access_token');
    },
    whiteListedDomains: ['localhost', 'jmp-apps.auth0.com']
  });

  $httpProvider.interceptors.push('jwtInterceptor');

  stateProvider.state('default', {
    url: '/',
    template: ''
  })
  .state('dashboard', {
    url: '/dashboard',
    template: '<dashboard></dashboard>'
  })
  .state('ballance', {
    url: '/ballance',
    template: '<ballance></ballance>'
  })
  .state('finance', {
    url: '/finance',
    template: '<finance></finance>'
  })
  .state('listTransaksi', {
    url: '/list-transaksi?status&show',
    template: '<list-transaksi></list-transaksi>'
  })
  .state('viewTransaksi', {
    url: '/view-transaksi/{id}',
    params: {
      id: null
    },
    template: '<view-transaksi></view-transaksi>'
  })
  .state('transaksi', {
    url: '/transaksi',
    template: '<transaksi-main></transaksi-main>'
  })
  .state('callback', {
    url: '/callback',
    template: '<login-callback></login-callback>'
  })
  .state('routes', {
    url: '/routes',
    template: '<routes></routes>'
  })
  .state('customers', {
    url: '/customers',
    template: '<customers></customers>'
  })
  .state('vehicles', {
    url: '/vehicles',
    template: '<vehicles></vehicles>'
  })
  .state('drivers', {
    url: '/drivers',
    template: '<drivers></drivers>'
  })
  .state('keneks', {
    url: '/keneks',
    template: '<keneks></keneks>'
  })
  .state('users', {
    url: '/users',
    template: '<users></users>'
  })
  .state('switchRole', {
    url: '/switch-role',
    template: '<switch-role></switch-role>'
  });

  lockProvider.init({
    clientID: 'FwUoeHNGCB19ndqGLITKyQi0smIxaOSK',
    domain: 'jmp-apps.auth0.com',
    options: {
      theme: {
        logo: Constant.FRONTEND_URL + '/dist/android-icon-192x192.png'
      },
      languageDictionary: {
        title: "JMP Apps"
      },
      closable: false,
      auth: {
        audience: 'http://cdp-kontrak.jmp-logistic.com/',
        responseType: 'token id_token',
        redirect: true,
        redirectUrl: Constant.FRONTEND_URL + '/callback',
        params: {
          prompt: 'select_account',
          scope: 'openid email profile'
        },
        sso: false
      }
    }
  });
}

config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', 'jwtOptionsProvider', 'lockProvider'];

export default config;