function indexController($scope,$http,$interval){
	
    initFamillies();

    /**
     * []
     * @param  {[type]} famillyName [description]
     * @return {[type]}           [description]
     */
     $scope.toggleTimer = function(famillyName) {  
                //var famillyTimersArray = getTimersAjax(famillyName)
                var matchingFamilly = getFamillyObject(famillyName);
                if(matchingFamilly.timerIsRunning){
                    matchingFamilly.timerIsRunning = false;
                    $interval.cancel(matchingFamilly.timer);
                    matchingFamilly.timer = undefined;
                }
                else{
                 matchingFamilly.timerIsRunning = true;   
                 matchingFamilly.timer =  $interval(function(){
                    matchingFamilly.remainingTime -= 1000;
                },1000);
             }

             $scope.toggleButtonText(matchingFamilly);
                
         }

    /**
     * [Does the ajax call to get the timer objects.]
     * @param  {[string or string array]} famillyName [Contains the name of the familly, with its first character capitalized.]
     * @return {[An array of objects]} data [The timers object]
     */
     $scope.getTimersAjax = function(familly){
        //AJAX Call
        var responsePromise = $http.get("http://192.168.1.12:4242/timers?FAMILIES[]="+famillyName);

        responsePromise.success(function(data, status, headers, config) {
            return data;
        });
        responsePromise.error(function(data, status, headers, config) {
         console.log(data); 

     });
    }

    /**
     * [Changes the text of the timer button after a click]
     * @param  {[type]} famillyName [The name of the familly who's buttons has been pressed.]
     */
     $scope.toggleButtonText = function(familly){
         familly.buttonText = (familly.timerIsRunning)?'S T O P':'S T A R T';

     }

    /**
     * [returns the familly object matching the given famillyName]
     * @param  {[String]} famillyName [The name of the familly we're looking for]
     * @return {[Object]} familly [The matching familly object]
     */

     function getFamillyObject(famillyName)
     {
        var n = $scope.famillies.length;
        var i;
        for(i = 0; i < n; i++){
            var currentName = $scope.famillies[i].name; 
            if(currentName === famillyName){
                return $scope.famillies[i];
            }
        } 

        throw "Familly name has no match in $scope" 
    }

    /**
     * [Initiate de families informations]
     * @return {[type]} [description]
     */
     function initFamillies(){
        /**
     * [Basic information about each familly]
     * @type {Array}
     */

     $scope.famillies = [
     {name : 'Greyjoy', buttonText : 'S T A R T', timerIsRunning : false, picture : "./Ressources/Familly_pictures/Greyjoy.jpg", remainingTime : undefined},
     {name : 'Baratheon', buttonText : 'S T A R T' , timerIsRunning : false, picture : "./Ressources/Familly_pictures/Baratheon.jpg", remainingTime : undefined},
     {name : 'Lannister', buttonText : 'S T A R T', timerIsRunning : false, picture : "./Ressources/Familly_pictures/Lannister.jpg", remainingTime : undefined},
     {name : 'Stark', buttonText : 'S T A R T', timerIsRunning :  false, picture : "./Ressources/Familly_pictures/Stark.jpg", remainingTime : undefined},
     {name : 'Tyrell', buttonText : 'S T A R T', timerIsRunning : false, picture : "./Ressources/Familly_pictures/Tyrell.jpg", remainingTime : undefined},
     {name : 'Martell', buttonText : 'S T A R T',timerIsRunning : false, picture : "./Ressources/Familly_pictures/Martell.jpg", remainingTime : undefined}
     ]

     var n = $scope.famillies.length;
     var i;
     for(i = 0; i < n; i++){
        $scope.famillies[i].remainingTime = new Date(0,0,0,3,0,0,0);
    }
}

}