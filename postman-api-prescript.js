/*
Use this Pre-request Script to dynamically generate the API signature needed to connect to SeamlessDocs' API.

Add this file to your Postman Pre-request Script tab
In order for this script to work properly, you will need to add the following Environment Variables:
`api_key` & `api_secret` (both of these values can be generated in the API Keys page in SeamlessDocs

Dynamically generate Headers values. You will need to add in the following Headers fields to accept the dynamically generated values:
Key: AuthDate
Value: {{requestTimeStamp}}

Key: Authorization
Value: HMAC-SHA256 api_key={{api_key}} signature={{signatureHash}}

After you add the required fields, values, and the pre-request script you don't don't need to worry about generating the API signature. You can freely change the HTTP method, URL and body to be able to test out the API requests as needed.
*/

var moment = require("moment")
var ApiSecret = pm.environment.get("api_secret");

var moment = require("moment")

var getLocation = function(href) {
    urlParts = /api(.*)$/.exec(href);
    return urlParts[1];
};

var requestURI = getLocation(pm.request.url);
var requestMethod = pm.request.method;

var requestTimeStamp = moment(new Date().toUTCString()).valueOf() / 1000;
postman.setEnvironmentVariable("requestTimeStamp", requestTimeStamp);

var signatureRawData  = requestMethod + "+" + requestURI + "+" + requestTimeStamp;

var hash = CryptoJS.HmacSHA256(signatureRawData, ApiSecret);
postman.setEnvironmentVariable("signatureHash", hash);
