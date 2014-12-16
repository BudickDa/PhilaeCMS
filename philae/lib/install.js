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
 * install.js contains all the data, that is written to the database at first start or after a reset.
 *
 */


/**
 * This will be executed on the server, when the server starts:
 * Tests if dynamic routes has already been written into database.
 * Then it will test, if an User called Admin is available. And creates one if needed.
 * To not create an Admin on each start, set newAdmin in /PhilaeCMS/lib/globalconfig.js to false.
 */
if (Meteor.isServer) {                                                  //This is necessary. install.js has to be started before main.router.js. So it has to be in lib instead of server. But we need the sever startup, so we use Meteor,isServer
    Meteor.startup(function () {
        console.log('PhilaeCMS has been started...');
        install();
    });
}

/**
 * Writes all the configuration to the database
 */
var install = function () {
    createGlobalConfig(createStartPage, createNewAdmin);                 //executes createGlobalConfig after that, createStartPage finally createNewAdmin.
};

/**
 * Writes all the configuration to the database
 * @param next first callbac
 * @param next2 callback of first callback
 * @returns {*}
 */
var createGlobalConfig = function (next, next2) {
    console.log('Checking configuration...');
    /**
     * these options should always be set at start. If they are not set, they will be set with those default values.
     */
    var defaultConfig = {
        /*the site where the user will be redirected when on root ( e.g. http://website,com/)*/
        startpage: '/p/home',
        /*this is the place where users go, who want to look at things without sufficient privileges. It should be an existing path.*/
        hell: '/login',
        /*the system creates on server start always a new root-user, when there is no one, that is called 'Admin'.*/
        newAdmin: true
    };
    for (var i in defaultConfig) {
        if (getConfigValue(i) !== null)
            defaultConfig[i] = getConfigValue(i);
    }
    setConfigValue('startpage', defaultConfig.startpage, function () {
        setConfigValue('hell', defaultConfig.hell, function () {
            setConfigValue('newAdmin', defaultConfig.newAdmin, function () {
                next(next2)
            });
        });
    });
};

/**
 * Creates a start page if no pages are available.
 * @param next
 * @returns {*}
 */
var createStartPage = function (next) {
    if (Pages.find().fetch().length !== 0) {
        console.log('Pages are already in database available...');
        return next();                                                  //there are already pages in the db, try to create an Admin
    }
    console.log('Creating first content site...');
    var home = {                                                        //create a first page called 'home' with path '/'
        sitename: 'home', // is the name of the path and the name of the template
        title: 'Hello World',
        isPrivate: false,
        blocks: {
            main: '<h1>Hello, world!</h1><p>This is an awesome CMS based on Meteor.js</p>'
        }
    };
    Pages.insert(home, function (err) {
        if (err)
            throwError(err);
        console.log('Startpage is ready.');
        return next();
    });
};

/**
 * Creates an almighty admin. Is executed at fresh install and after reset.
 * It is global for, but on the server. So I think it is save for now.
 */
var createNewAdmin = function () {
    if (Meteor.users.findOne({username: 'Admin'}) === undefined && getConfigValue('newAdmin')) {
        console.log('There is no Administrator...');
    } else {
        console.log('Admin has already been created...');
        return;
    }
    console.log('Creating and Administrator...');
    var password = Math.random().toString(36).slice(-12);
    var admin = {
        username: 'Admin',
        profile: {
            name: 'I am Root',
            privileges: {
                isRoot: true,                                           //User is a godlike individual and can write, view and update everything
                isAdmin: true,                                          //User can write, view and update almost everything
                isEditor: true,                                         //User can change content
                isDesigner: true,                                       //User can change templates and layouts
                canUpload: true,                                        //User can upload data
                isBackendUser: true,                                    //User can visit the backend
                isUserManager: true,                                    //User can write, view and update user-data. Even Admin cannot do this. Important for countries with high privacy standards.
                isIntern: true                                          //Interns should not be able to destroy anything. But they can write content, so be caution and/or pay them good.
            }
        }
    };
    var adminId = Accounts.createUser(admin);
    Accounts.setPassword(adminId, password);
    console.log('A new Admin was created. His username is ' + admin.username + ' and the password is: ' + password);
};