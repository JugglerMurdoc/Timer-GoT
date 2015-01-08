function indexController($scope,$http,$interval){
	
    initFamilies();

    var startAllButtonText='START ALL'
    var startAllButtonIs

    /**
     * []
     * @param  {[type]} familyName [description]
     * @return {[type]}           [description]
     */
     $scope.toggleTimer = function(familyName) {  
                //var familyTimersArray = getTimersAjax(familyName)
                var matchingfamily = getfamilyObject(familyName);
                if(matchingfamily.timerIsRunning){
                    matchingfamily.timerIsRunning = false;
                    $interval.cancel(matchingfamily.timer);
                    matchingfamily.timer = undefined;
                }
                else{
                 matchingfamily.timerIsRunning = true;   
                 matchingfamily.timer =  $interval(function(){
                    matchingfamily.remainingTime -= 1000;
                },1000);
             }

             $scope.toggleButtonText(matchingfamily);
                
         }

    $scope.startAllButtonClick = function(){
        for(var fam in $scope.families){
            if($scope.families[fam].timerIsRunning === undefined || $scope.families[fam].timerIsRunning === false){
                
                $scope.toggleTimer($scope.families[fam].name);
            }
        }
    }   ;


    /**
     * [Does the ajax call to get the timer objects.]
     * @param  {[string or string array]} familyName [Contains the name of the family, with its first character capitalized.]
     * @return {[An array of objects]} data [The timers object]
     */
     $scope.getTimersAjax = function(family){
        //AJAX Call
        var responsePromise = $http.get("http://192.168.1.12:4242/timers?FAMILIES[]="+family.name);

        responsePromise.success(function(data, status, headers, config) {
            return data;
        });
        responsePromise.error(function(data, status, headers, config) {
         console.log(data); 

     });
    }

    /**
     * [Changes the text of the timer button after a click]
     * @param  {[type]} familyName [The name of the family who's buttons has been pressed.]
     */
     $scope.toggleButtonText = function(family){
         family.buttonText = (family.timerIsRunning)?'S T O P':'S T A R T';

     }

    /**
     * [returns the family object matching the given familyName]
     * @param  {[String]} familyName [The name of the family we're looking for]
     * @return {[Object]} family [The matching family object]
     */

     function getfamilyObject(familyName)
     {
        var n = $scope.families.length;
        var i;
        for(i = 0; i < n; i++){
            var currentName = $scope.families[i].name; 
            if(currentName === familyName){
                return $scope.families[i];
            }
        } 

        throw "family name has no match in $scope" 
    }

    var family = function(familyName){
        this.name = familyName;
        this.buttonText =  'START';
        this.timerIsRunning = false;
        this.picture  = "./Ressources/family_pictures/"+familyName+".jpg";
        this.remainingTime = new Date(0,0,0,3,0,0,0);
    };


    /**
     * [Initiate de families informations]
     * @return {[type]} [description]
     */
     function initfamilies(){
        /**
     * [Basic information about each family]
     * @type {Array}
     */

     $scope.families = [
     {name : 'Greyjoy', buttonText : 'S T A R T', timerIsRunning : false, picture : "./Ressources/family_pictures/Greyjoy.jpg", remainingTime : undefined},
     {name : 'Baratheon', buttonText : 'S T A R T' , timerIsRunning : false, picture : "./Ressources/family_pictures/Baratheon.jpg", remainingTime : undefined},
     {name : 'Lannister', buttonText : 'S T A R T', timerIsRunning : false, picture : "./Ressources/family_pictures/Lannister.jpg", remainingTime : undefined},
     {name : 'Stark', buttonText : 'S T A R T', timerIsRunning :  false, picture : "./Ressources/family_pictures/Stark.jpg", remainingTime : undefined},
     {name : 'Tyrell', buttonText : 'S T A R T', timerIsRunning : false, picture : "./Ressources/family_pictures/Tyrell.jpg", remainingTime : undefined},
     {name : 'Martell', buttonText : 'S T A R T',timerIsRunning : false, picture : "./Ressources/family_pictures/Martell.jpg", remainingTime : undefined}
     ]

     var n = $scope.families.length;
     var i;
     for(i = 0; i < n; i++){
        $scope.families[i].remainingTime = new Date(0,0,0,3,0,0,0);
    }
}

}