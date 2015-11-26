/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
		alert("Device is ready");
		push.initPushNotificationRegister();
    }
};

//Push Notification
var push={

	initPushNotificationRegister: function(){
        var pushNotification = window.plugins.pushNotification;


        if ( device.platform == 'android' || device.platform == 'Android'){
            pushNotification.register(push.successHandler, push.errorHandler,{"senderID":"165573687429","ecb":"push.onNotificationGCM"});
        } 
        else {
            pushNotification.register(push.tokenHandler,push.errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"push.onNotificationAPN"});
        }

    },

// result contains any message sent from the plugin call
    successHandler: function(result) {
       alert('Callback Success! Result = '+result);
    },

    errorHandler:function(error) {
        alert(error);
    },

//Callback from GCM-----------------------------------------
	onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
//                $("#redidtxtareas").val(e.regid);
                if ( e.regid.length > 0 )
                {
                   /*  dbmanager.checkFirstRun(function(returnData){
                        if(returnD ata.rows.length==0){*/
                            alert("Registrationid"+ e.regid);
                       /*  }    
                    }); */
                }
            break;

            case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
            alert('message = '+e.message+' msgcnt = '+e.msgcnt);
            break;

            case 'error':
              alert('GCM error = '+e.msg);
            break;

            default:
//              alert('An unknown GCM event has occurred');
              break;
        }
    },

//Callback for APNS------------------------------------------------
	tokenHandler: function(result) {
        // Your iOS push server needs to know the token before it can push to this device
        // here is where you might want to send it the token for later use.
        dbmanager.checkFirstRun(function(returnData){
            if(returnData.rows.length==0){
                alert("RegistrationID"+result);
            }    
        });
    },

	onNotificationAPN: function(event) {
        if ( event.alert )
        {
            navigator.notification.alert(event.alert);
        }

        if ( event.sound )
        {
            var snd = new Media(event.sound);
            snd.play();
        }

        if ( event.badge )
        {
            pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
        }
    }
};

function fbLogin(){
    alert("Checking..");
    var permission=["public_profile", "email"];
    var fbLoginSuccess = function (userData) {
       alert("UserInfo: " + JSON.stringify(userData));
	  
	   
	   facebookConnectPlugin.api("/me?fields=id,email,name&access_token="+userData.authResponse.accessToken, permission,
        function (result) {
            var name=result.name;
            var email=result.email;
            var fbid=result.id;
			alert(name+''+email+''+ fbid);
        },
        function (error) {
            alert("Facebook get userprofile failed: " + JSON.stringify(error));
        });
    
//do something when login success
}
    alert("2nd checking..");
    facebookConnectPlugin.login(permission, 
                                fbLoginSuccess, 
                                function (error) { alert("fail login with fb " + JSON.stringify(error))}
                               );
							   
	// try{
		// facebookConnectPlugin.login(permission, 
                                // fbLoginSuccess, 
                                // function (error) { alert("fail login with fb " + JSON.stringify(error))}
                               // );
	// }
	// catch(ex){
		// alert(ex.message);
	// }
}

function FBShowDialog(promolink) { 
                facebookConnectPlugin.showDialog( {
                            method: "share",
                            href: promolink,
                        }, 
                    function (response) {//do something when share success
					},
					
                    function (response) {//do something when share is failed
					});
}

