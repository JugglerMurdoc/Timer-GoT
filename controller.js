function indexController($scope, $http, $interval) {

    initFamilies();

    /**
    * [Initiate de families informations]
    * @return {[type]} [description]
    */
    initFamilies();

    $scope.startAllButtonClick = function () {
        for (var i in $scope.families) {
            $scope.families[i].startTimer();
        }
    }

    $scope.resetAllButtonClick = function () {  
        for (var i in $scope.families) {
            $scope.families[i].reset();
        }
    }

    $scope.stopAllButtonClick = function () {
        for (var i in $scope.families) {
            $scope.families[i].stopTimer();
        }
    }

    $scope.updateTime = function (family) {
        family.remainingTime -= 1000;
    }


    /**
     * [Does the ajax call to get the timer objects.]
     * @param  {[string or string array]} familyName [Contains the name of the family, with its first character capitalized.]
     * @return {[An array of objects]} data [The timers object]
     */
    $scope.getTimersAjax = function (family) {
        //AJAX Call
        var responsePromise = $http.get("http://192.168.1.12:4242/timers?FAMILIES[]=" + family.name);

        responsePromise.success(function (data, status, headers, config) {
            return data;
        });
        responsePromise.error(function (data, status, headers, config) {
            console.log(data);

        });
    }

    /**
     * [returns the family object matching the given familyName]
     * @param  {[String]} familyName [The name of the family we're looking for]
     * @return {[Object]} family [The matching family object]
     */

    function getfamilyObject(familyName) {
        var n = $scope.families.length;
        var i;
        for (i = 0; i < n; i++) {
            var currentName = $scope.families[i].name;
            if (currentName === familyName) {
                return $scope.families[i];
            }
        }

        throw "Familly name has no match in $scope"
    }

    function Family(familyName) {
        var timerThread = undefined;
        this.name = familyName;
        this.buttonText = 'S T A R T';
        this.timerIsRunning = false;
        this.picture = "./Ressources/Familly_pictures/" + familyName + ".jpg";
        this.remainingTime = new Date(0, 0, 0, 3, 0, 0, 0);
        this.buttonTimerButtonClick = function () {
            this.toggleTimer();
        }
        this.toggleTimer = function () {
            if (this.timerIsRunning) {
                this.stopTimer();
            }
            else {
                this.startTimer();
            }
        }
        this.startTimer = function () {
            var that = this;
            if (!(this.timerIsRunning)) {
                that.timerIsRunning = true;
                that.timerThread = $interval(function () { $scope.updateTime(that) }, 1000);
            }

            this.toggleButtonText();
        }
        this.stopTimer = function () {
            if (this.timerIsRunning) {
                $interval.cancel(this.timerThread);
                this.timerThread = undefined;
                this.timerIsRunning = false;

                this.toggleButtonText();
            }
        }
        this.toggleButtonText = function () {
            this.buttonText = (this.timerIsRunning) ? 'S T O P' : 'S T A R T';
        }
        this.reset = function () {
            this.remainingTime = new Date(0, 0, 0, 3, 0, 0, 0);
        }

    }

    /**
     * [Initiate de families informations]
     * @return {[type]} [description]
     */
    function initFamilies() {
        /**
     * [Basic information about each family]
     * @type {Array}
     */
        $scope.families = new Array();
        $scope.families.push(new Family('Greyjoy'));
        $scope.families.push(new Family('Baratheon'));
        $scope.families.push(new Family('Lannister'));
        $scope.families.push(new Family('Stark'));
        $scope.families.push(new Family('Tyrell'));
        $scope.families.push(new Family('Martell'));
    }



}
