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
 * collections.js contains the code for defining the model of the backend.
 */

/**
 * Config  contains the configuration of the backend, it is only on Object called globalConfig:
 */
Config = new Mongo.Collection('config');


/**
 * Pages contains the content of each page and its path
 */

Pages = new Mongo.Collection('pages');


/**
 * Local (client-only) collection for errors
 * (We called it Errors instead of Error, because Error is a JavaScript-Object)
 */
Errors = new Mongo.Collection(null);

/**
 * Local (client-only) collection for messages
 */
Messages = new Mongo.Collection(null);


/**
 * Navbar
 * contains the buttons in the navbar
 */
NavbarItems = new Mongo.Collection('navbaritems');


/**
 * Function to save errors, that is displayed automatically
 * @param message error message
 */
throwError = function (message) {
    console.log(message); //display error in console, if there is no template rendered
    Errors.insert({message: message});
};

/**
 * Function to save messages, that is displayed automatically and vanishes after 5 sec.
 * @param message
 */
displayMessage = function (message) {
    Messages.remove({}); //destroy every other message
    var _id = Messages.insert({message: message});
    Meteor.setTimeout(function () {
        Messages.remove(_id);
    }, 5000)
};
