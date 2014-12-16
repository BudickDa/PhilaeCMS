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

Template.allPages.helpers({
    pages: function () {
        return Pages.find();
    }
});


/**
 * Edit Pages:
 */
Template.editPage.events({
    'click #edit': function (event, target) {
        var _id = document.getElementById('id').value;
        var sitename = document.getElementById('sitename').value;
        var oldSite = Pages.findOne(_id);
        if (oldSite === null || oldSite === undefined)
            return throwError('There is something wrong with the _id.');
        if (oldSite.sitename !== sitename) {
            /*the name of the site has changed, so we have to update the route*/
            /*todo: handle route change in Router*/
        }
        Pages.update(_id, {
            sitename: sitename,
            title: document.getElementById('title').value,
            blocks: {
                main: document.getElementById('main').value
            }
        }, function (err, affected) {
            if (err)
                throwError(err);
            displayMessage('The Site has been updated.');
        });
    }
});