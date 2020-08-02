// if(terrain=="mountain")
//   return contour;
// else if(terrain=="sea")
//   return shoreline;
// else if(radius_large)              //20 in Nautical Miles
// {
//     if(location_known_Accuracy)
//       return trackline;
//     else 
//       return parallelSweep;     //creepingLine less efficient
// }
// else
// {
//     if(uniform_coverage)
//        return expandingSquare;
//     return sector;
// }

const searchPatterns = (req) => {
    const sector = {
        name: "Sector Search",
        description: "small Area Circular search intensive coverage at center",
        location_known_Accuracy: true,
        radius_large: false,
        uniform_coverage: false,
        terrain: "flat"
   };
   
   const expandingSquare = {
       Name: "Expanding Square Search",
       description: "small area rectangular search with unifrom coverage",
       location_known_Accuracy: true,
       radius_large: false,
       uniform_coverage: true,
       terrain: "flat"
   };
   
   const trackline = {
       Name: "Trackline Search",
       description: "large area Track search with used for first effort search",
       location_known_Accuracy: true,
       radius_large: true,
       uniform_coverage: true,
       terrain: "flat"
   };
   
   const parallelSweep = {
       Name: "Parralel Sweep Search",
       description: "large area search with parallel sweeps",
       location_known_Accuracy: false,
       radius_large: true,
       uniform_coverage: true,
       terrain: "flat"
   };
   
   const creepingLine = {
       Name: "Creeping Line Search",
       description: "A large area search with parallen sweeps in rectangle",
       location_known_Accuracy: false,
       radius_large: true,
       uniform_coverage: true,
       terrain: "flat"
   };
   
   const contour = {
       Name: "Contour Search",
       description: "This Mountain terrain search circles mountain from top to bottom",
       location_known_Accuracy: false,
       radius_large: true,
       uniform_coverage: true,
       terrain: "mountain"
   };
   
   const shoreline = {
       Name: "Shoreline Search",
       description: "Search at survivor at dry land near sea, clinging to rocks of sea and in boats sea ",
       location_known_Accuracy: false,
       radius_large: true,
       uniform_coverage: true,
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
        if(uniform_coverage){
            search_patterns.filter(function(element){ return (!radius_large)&&uniform_coverage});           
        }
        else{
            search_patterns.filter(function(element){ return (!radius_large)&&(!uniform_coverage)});
        }
    }
};

export default searchPattern;

