/**
   Licensed to the Apache Software Foundation (ASF) under one
   or more contributor license agreements.  See the NOTICE file
   distributed with this work for additional information
   regarding copyright ownership.  The ASF licenses this file
   to you under the Apache License, Version 2.0 (the
   "License"); you may not use this file except in compliance
   with the License.  You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing,
   software distributed under the License is distributed on an
   "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
   KIND, either express or implied.  See the License for the
   specific language governing permissions and limitations
   under the License.
*/

/**
 * TimeSince.
 * A forward counter JavaScript utility.
 * 
 * Author: Ivan De Marino <detronizator@gmail.com>
 * Version: 0.1
 * Last-Update: 2011-06-05
 */
 
/**
 * @function timeSince
 *
 * @param startTimestamp Date object that represent the moment in time to start from.
 * As weird as it sounds, the month is a number between 0 and 11.
 * Example: 17th Feb 2011 is 'new Date(2001, 01, 17)'.
 *
 * @param format Output format.
 * If you want to variate the format, pass a string as second parameter.
 * Acceptable values are:
 * - "%%D%%" for days
 * - "%%H%%" for hours
 * - "%%M%%" for minutes
 * - "%%S%%" for seconds
 * Default format is: "%%D%% Days, %%H%% Hours, %%M%% Minutes, %%S%% Seconds."
 *
 * @returns Object containing a method 'update()' in case the User wants to force the update of the counter.
 */
var timeSince = function(startTimestamp, format) {
    var placeHolder = null,
    placeHolderId = "cntdwn",
    interval = null;

    if (typeof(format) === "undefined") {
        // Default format
        format = "%%D%% Days, %%H%% Hours, %%M%% Minutes, %%S%% Seconds.";
    }

    var _normaliseNum = function(secs, num1, num2) {
        s = ((Math.floor(secs / num1)) % num2) + '';
        if (s.length < 2)
            s = "0" + s; //< ensure the number is made of at least 2 digits
        return s;
    }

    var _printTimestamp = function(timestamp) {
        timestamp = Math.floor(timestamp / 1000);
        //< ms to s
        var resultString = format.replace(/%%D%%/g, _normaliseNum(timestamp, 86400, 100000));
        resultString = resultString.replace(/%%H%%/g, _normaliseNum(timestamp, 3600, 24));
        resultString = resultString.replace(/%%M%%/g, _normaliseNum(timestamp, 60, 60));
        resultString = resultString.replace(/%%S%%/g, _normaliseNum(timestamp, 1, 60));

        placeHolder.innerHTML = resultString;
    };

    var update = function() {
        _printTimestamp(new Date() - startTimestamp);
    };

    var _createSpan = function() {
        document.write("<span id=" + placeHolderId + "></span>");
        return document.getElementById(placeHolderId);
    };
    // Create span/placeholder straightaway
    placeHolder = _createSpan();

    // Do the first update
    update();

    // Start Interval - tick every second
    interval = setInterval(function() {
        update();
    },
    1000);

    return {
        updateTimeSince: update
    };
};