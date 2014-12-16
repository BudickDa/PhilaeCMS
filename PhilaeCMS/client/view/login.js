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

Template.login.events({
    'submit .form-signin': function (event, target) {
        event.preventDefault();
        var username = document.getElementById('inputUsername').value; //get Username from form
        var password = document.getElementById('inputPassword').value; //get Password from form
        if (Meteor.user()) {
            if (Meteor.user().username === username) {
                return Router.go('/backend'); //The user is already logged in under this username. The user can visit login while he is logged in. Maybe he wants to change to another user.
            }
        }
        return Meteor.loginWithPassword(username, password, function (err) {
            if (err)
                throwError(err); //something went wrong... display error.
            else
                return Router.go('/backend'); //everything went better than expected. Relocate user to backend.
        });
    }
});