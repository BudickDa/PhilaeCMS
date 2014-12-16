/**
 * PhilaeCMS
 * Copyright (C) 2014  Daniel Budick
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

//Login and backend-routes shall not be deleted.
Router.route('/backend', {
    name: 'backend',
    layoutTemplate: 'BackendLayout'
});
Router.route('/backend/page/all', {
    name: 'allPages',
    layoutTemplate: 'BackendLayout',
    waitOn: function () {
        return Meteor.subscribe('allPages');
    }
});

Router.route('/backend/page/:_id', {
    name: 'editPage',
    layoutTemplate: 'BackendLayout',
    waitOn: function () {
        Meteor.subscribe('oneSite', this.params._id)
    },
    action: function () {
        this.render('editPage', {
            data: function () {
                return Pages.findOne(this.params._id);
            }
        });
    }
});

Router.route('/login');

//Redirect router to startpage:
Router.route('/', function () {
    var routeInstance = this;
    var destination = getConfigValue('startpage');
    if (destination === null)
        return routeInstance.render('notFound');
    else
        return routeInstance.redirect(getConfigValue('startpage'));
});

var requireIsBackendUser = function () {
    if (Meteor.isClient) {
        var routeInstance = this;
        var user = Meteor.user();
        if (user === undefined) {
            if (Meteor.loggingIn()) {
                routeInstance.render(routeInstance.loadingTemplate);
            } else {
                routeInstance.render(getConfigValue('hell'));
            }
        } else {
            if (Privilege.isBackendUser(user))
                routeInstance.render();
            else
                routeInstance.redirect(getConfigValue('hell'));
        }
    }
};
Router.onBeforeAction(requireIsBackendUser, {only: ['backend', 'allPages']});


/**
 * All the CMS-Sites are in this Route
 */
Router.route('/p/:path', {
    action: function () {
        var path = this.params.path;
        return this.render(path, {
            data: function () {
                return Pages.findOne({sitename: path}).blocks
            }
        });
    }
});