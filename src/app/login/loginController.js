console.log("App is " + loginApp)

const USER_POOL_ID = "us-east-1_ThFdWlCzs"
const IDENTITY_POOL_ID = "us-east-1:e3c9312a-b55e-43fd-8356-9b642e1d66dc"
const CLIENT_ID = "2uoh44mquangcqdgu4qhr10316"

loginApp.controller("loginController", function($scope) {

    $scope.message = "Please login. Or try muahaha."

    $scope.login = function () {
        var authenticationData = {
            Username : $scope.user.username,
            Password : $scope.user.password,
        };
        var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
        var poolData = {
            UserPoolId : USER_POOL_ID, // Your user pool id here
            ClientId : CLIENT_ID // Your client id here
        };
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        var userData = {
            Username : $scope.user.username,
            Pool : userPool
        };
        var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                console.log('access token + ' + result.getAccessToken().getJwtToken());

                //POTENTIAL: Region needs to be set if not already set previously elsewhere.
                AWS.config.region = "us-east-1";

                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId : IDENTITY_POOL_ID, // your identity pool id here
                    Logins : {
                        // Change the key below according to the specific region your user pool is in.
                        "cognito-idp.us-east-1.amazonaws.com/us-east-1_ThFdWlCzs" : result.getIdToken().getJwtToken()
                    }
                });

                //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
                AWS.config.credentials.refresh((error) => {
                    if (error) {
                        console.error(error);
                    } else {
                        // Instantiate aws sdk service objects now that the credentials have been updated.
                        // example: var s3 = new AWS.S3();
                        console.log('Successfully logged!');
                    }
                });
                $scope.message = "Success!"
            },

            onFailure: function(err) {
                alert(err);
            }
        });
    }
});
