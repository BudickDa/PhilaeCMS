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
 * These functions check privileges of the user.
 * Privileges:
 * - isRoot: User is a godlike individual and can write, view and update everything
 * - isAdmin: User can write, view and update almost everything
 * - isEditor: User can change content (Plaintext and HTML)
 * - isDesigner: User can change css
 * - canUpload: User can upload data
 * - isBackendUser: User can visit the backend
 * - isUserManager: User can write, view and update user-data. Even Admin cannot do this. Important for countries with high privacy standards.
 * - isIntern: Interns should not be able to destroy anything. They can create content, but cannot write HTML
 */
Privilege = {
    /**
     * @param privilege is the name of the privilege, that is to check
     * @param user is the Userobject which permission is to check
     * @returns {boolean} false: the user has not the permission. true, the user has the permission.
     */
    checkPrivilege: function (privilege, user) {
        if (user === null || user === undefined)
            return false;
        if (user.profile === undefined) {
            throwError('User has no profile. This should not happen.');
            return false;
        }
        if (user.profile.privileges === undefined) {
            throwError('User has no privileges. This should not happen.');
            return false;
        }
        if (user.profile.privileges.isRoot === true)
            return true; //overwrites everything. This user has godlike powers!
        if (user.profile.privileges[privilege] === undefined)
            return false;
        if (user.profile.privileges[privilege] === true)
            return true;
        return false; //the user has not the sufficient permission
    },
    /**
     * isAdmin: User can write, view and update almost everything
     * @param user is the Userobject which permission is to check
     * @returns {boolean} false: the user is not an admin.
     */
    isAdmin: function (user) {
        return this.checkPrivilege('isAdmin', user);
    },
    /**
     * isEditor: User can change content (Plaintext and HTML)
     * @param user is the Userobject which permission is to check
     * @returns {boolean} false: the user cannot change content
     */
    isEditor: function (user) {
        return this.checkPrivilege('isEditor', user);
    },
    /**
     * isDesigner: User can change CSS
     * @param user is the Userobject which permission is to check
     * @returns {boolean} false: the user cannot change CSS
     */
    isDesigner: function (user) {
        return this.checkPrivilege('isDesigner', user);
    },
    /**
     * canUpload: User can upload data
     * @param user is the Userobject which permission is to check
     * @returns {boolean} false: the user cannot upload data
     */
    canUpload: function (user) {
        return this.checkPrivilege('canUpload', user);
    },
    /**
     * isBackendUser: User can visit the backend
     * @param user is the Userobject which permission is to check
     * @returns {boolean} false: the user cannot access the backend
     */
    isBackendUser: function (user) {
        return this.checkPrivilege('isBackendUser', user);
    },
    /**
     * isUserManager: User can write, view and update user-data. Even Admin cannot do this. Important for countries with high privacy standards.
     * @param user is the Userobject which permission is to check
     * @returns {boolean} false: the user is not an UserManager
     */
    isUserManager: function (user) {
        return this.checkPrivilege('isUserManager', user);
    },
    /**
     * isIntern: Interns should not be able to destroy anything. They can create content, but cannot write HTML
     * @param user is the Userobject which permission is to check
     * @returns {boolean} false: the user is not an intern
     */
    isIntern: function (user) {
        return this.checkPrivilege('isIntern', user);
    }
};