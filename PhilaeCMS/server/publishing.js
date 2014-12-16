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

/**
 * Publishing
 */

/**
 * Publish all pages to every backend-user
 */
Meteor.publish('allPages', function () {
    if (Privilege.isBackendUser(Meteor.users.findOne(this.userId)))
        return Pages.find();
});

/**
 * Publish specific pages to every backend-user
 */
Meteor.publish('oneSite', function (_id) {
    if (Privilege.isBackendUser(Meteor.users.findOne(this.userId)))
        return Pages.findOne(_id);
});
/**
 * Publish site via path for frontend-user
 */
Meteor.publish('pages', function () {
    return Pages.find({isPrivate: false});
});


/*todo: Publishing..*/
