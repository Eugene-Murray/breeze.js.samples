﻿(function(angular) {
    'use strict';

   angular.module( "app" )
        .factory( 'databaseReset', dbReset );

        // **************************************
        // Private construction function
        // **************************************

        function dbReset ( $http, $q, config )
        {
            return { reset: reset };

            // ***********************************
            // Private Method
            // ***********************************

            function reset()
            {
                var deferred = $q.defer();

                //See http://docs.angularjs.org/api/ng.$http
                $http.post(config.devServiceName + '/reset')
                     .success(success)
                     .error(fail);

                return deferred.promise;

                // ***********************************
                // Internal Handlers
                // ***********************************

                function onSuccessReset(data) {
                    deferred.resolve("Database reset succeeded with message: " + data);
                }

                function onFailReset(data, status) {
                    deferred.reject( getMessage(data, status) );
                }
            }

            function getMessage(data, status) {
                var message = "Database reset failed (" + status + ")";
                if (data) {
                    try {
                        data = JSON.parse(data).Message;
                    } finally {
                        message += "\n" + data;
                    }
                }
                return message;
            }

        };


}( this.angular ));
