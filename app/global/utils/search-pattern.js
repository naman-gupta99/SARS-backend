const searchPatterns = (req) => {
    const sector = {
        name: "Sector Search",
        description: "small Area Circular search when location is known with good accuracy",
        location_known_Accuracy: true,
        radius_large: false,
        terrain: "flat"
   };
   
   const expandingSquare = {
       Name: "Expanding Square Search",
       description: "small area rectangular search with uniform coverage",
       location_known_Accuracy: true,
       radius_large: false,
       terrain: "flat"
   };
   
   const trackline = {
       Name: "Trackline Search",
       description: "large area Track search used for first effort search",
       location_known_Accuracy: true,
       radius_large: true,
       terrain: "flat"
   };
   
   const parallelSweep = {
       Name: "Parralel Sweep Search",
       description: "large area search with parallel sweeps",
       location_known_Accuracy: false,
       radius_large: true,
       terrain: "flat"
   };
   
   const creepingLine = {
       Name: "Creeping Line Search",
       description: "A large area search with parallel sweeps in rectangle",
       location_known_Accuracy: false,
       radius_large: true,
       terrain: "flat"
   };
   
   const contour = {
       Name: "Contour Search",
       description: "This Mountain terrain search, circles mountain from top to bottom",
       location_known_Accuracy: false,
       radius_large: true,
       terrain: "mountain"
   };
   
   const shoreline = {
       Name: "Shoreline Search",
       description: "Search survivors at dry land near sea, clinging to rocks of sea and in boats in sea",
       location_known_Accuracy: false,
       radius_large: true,
       terrain: "sea"
   };

    var search_patterns=[sector,expandingSquare,trackline,parallelSweep,creepingLine,contour,shoreline];
    if( terrain=="mountain"){
        search_patterns.filter(function(element){return element.terrain=="mountain"});
    }
    else if(terrain=="sea"){
        search_patterns.filter(function(element){return element.terrain=="sea"});
    }
    else if(radius_large){
        if(location_known_Accuracy){
            search_patterns.filter(function(element){ return radius_large&&location_known_Accuracy});
        }
        else{
            search_patterns.filter(function(element){return radius_large&&(!location_known_Accuracy)});
        }
    }
    else{
        search_patterns.filter(function(element){ return (!radius_large)});           
    }
};

export default searchPattern;

