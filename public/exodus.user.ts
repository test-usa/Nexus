// ==UserScript==
// @name         Exodus Authentication
// @namespace    https://exodus.com
// @version      1.0
// @description  Key authentication for Exodus
// @author       Exodus Team
// @match        *://*.edgenuity.com/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
    'use strict';

    function getAccountId() {
        const pendoData = sessionStorage.getItem('pendo_sessionLastUserInteractionEvent');
        if (pendoData) {
            try {
                const parsedData = JSON.parse(pendoData);
                return parsedData.accountId || null;
            } catch (error) {
                console.error('Error parsing account ID:', error);
                return null;
            }
        }
        return null;
    }

    function authenticateUser() {
        const accountId = getAccountId();
        if (!accountId) {
            console.error("Account ID not found!");
            return;
        }

        const storedKey = localStorage.getItem('exodus_key');
        if (!storedKey) {
            const userKey = prompt("Enter your Exodus key:");
            if (!userKey) return;

            GM_xmlhttpRequest({
                method: "POST",
                url: "https://exodus.com/api/validate-key",
                headers: { "Content-Type": "application/json" },
                data: JSON.stringify({ key: userKey, accountId }),
                onload: function (response) {
                    const result = JSON.parse(response.responseText);
                    if (result.success) {
                        localStorage.setItem('exodus_key', userKey);
                        console.log("Key authenticated! Loading Exodus...");
                        loadExodusScript();
                    } else {
                        alert("Invalid key! Try again.");
                    }
                }
            });
        } else {
            loadExodusScript();
        }
    }

    function loadExodusScript() {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://exodus.com/exodus-obfuscated.js",
            onload: function (response) {
                eval(response.responseText);
            }
        });
    }

    authenticateUser();
})();
