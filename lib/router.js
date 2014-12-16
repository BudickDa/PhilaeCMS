//this is the config for all your routes:
Router.configure({
    layoutTemplate: 'FrontendLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return Meteor.subscribe('pages');
    }
});

/**
 * This site is for 404 errors
 * You can redirect here via this.redirect('/404')
 */
Router.route('/404', {
    name: 'notFound'
});


//here you can manually config your own routes. You should not use /login or /backend as path, except you know what you are doing.

