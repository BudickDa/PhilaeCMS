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

configCache = {};


/**
 * Setter-Method for configuration. The configuration is saved to the database
 * @param key the name of the configuration (e.g. hell, newAdmin, startpage)
 * @param value the value of the configuration
 * @param next an optional callback
 */
setConfigValue = function (key, value, next) {
    var newConfig = {_id: key, value: value};
    var oldConfig = getConfigValue(key);
    if (oldConfig === null || oldConfig.value !== value)
        console.log(key + ' has a new value: ' + value);
    Config.upsert(key, newConfig, function (err) {
        if (err) {
            throwError(err);
        }
        if (configCache[key] === undefined)
            configCache[key] = {};
        configCache[key].value = value;
        if (typeof(next) === "function")
            return next();
        else
            console.log('no callback at ' + key);
    });
};

/**
 * Getter for the configuration
 * @param key the name of the configuration (e.g. hell, newAdmin, startpage)
 * @returns {*} the value of the configuration.
 */
getConfigValue = function (key) {
    configCache[key] = Config.findOne(key);
    if (configCache[key] !== undefined && configCache[key] !== null)
        return configCache[key].value;
    else {
        throwError('Configuration ' + key + ' was not found.');
        return null;
    }
};