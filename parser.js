var fs = require('fs'); 
var parse = require('csv-parse');

function getHierarchyDict(str){
  var hierarchies = str.split(',')
  var archiesDict = {};

  hierarchies.forEach(function(hierarchy){
    var k = hierarchy.split('=')[0];
    var v = hierarchy.split('=')[1];
    switch (k) {
      case "ou":
        if (archiesDict.hasOwnProperty("ou")) {
          archiesDict["ou"] = archiesDict["ou"].concat(Array(v));
        } else {
          archiesDict["ou"] = Array(v);
        }
        break;
      case "l":
        if (archiesDict.hasOwnProperty("l")) {
          archiesDict["l"] = archiesDict["l"].concat(Array(v));
        } else {
          archiesDict["l"] = Array(v);
        }
        break;
      default:
        archiesDict[k] = v;
        break;
    }
  })

  if (archiesDict.hasOwnProperty("ou")) {
    archiesDict["ou"] = archiesDict["ou"].reverse();
  }
  if (archiesDict.hasOwnProperty("l")) {
    archiesDict["l"] = archiesDict["l"].reverse();
  }

  return archiesDict;
}

function getParent(archiesDict){
  if (archiesDict.hasOwnProperty("ou")){
    // has parent
    var ou = archiesDict["ou"];
    var lString = "";

    if (archiesDict.hasOwnProperty("l")){
      var l = archiesDict["l"];
    
      l.forEach(function(l){
        lString += l;
      })  
    }

    if (ou.length == 1) {
      if (archiesDict.hasOwnProperty("l")) {
        var temp = (lString + archiesDict["o"]);
        if (lString.charAt(lString.length - 1) == archiesDict["o"].charAt(0)){
          return lString.slice(0, lString.length - 1) + archiesDict["o"];
        } else {
          return temp;
        }
      } else {
        return archiesDict["o"];
      }
    } else if (ou.length == 2){
      if (lString.length > 0) {
        if (lString.charAt(lString.length - 1) == archiesDict["o"].charAt(0)){
          return lString.slice(0, lString.length - 1) + archiesDict["o"] + ou[ou.length - 2];
        } else {
          return lString + archiesDict["o"] + ou[ou.length - 2];
        }
      } else {
        if (ou[ou.length - 2].charAt(ou[ou.length - 2].length - 1) == "部") {
          return ou[ou.length - 2];
        } else {
          return archiesDict["o"] + ou[ou.length - 2];
        }
      }
    } else {
      // ou.length > 1
      return ou[ou.length - 2];
    }
  } else {
    // no parent
    return "";
  }
}

function getFullName(archiesDict){
  var fn = "";
  if (archiesDict.hasOwnProperty("l")) {
    var l = archiesDict["l"];
    l.forEach(function(l){
      fn += l;
    })
  }
  fn += archiesDict["o"];
  if (archiesDict.hasOwnProperty("ou")) {
    var ou = archiesDict["ou"];
    ou.forEach(function(u){
      fn += u;
    })
  }
  
  return fn;
}

var units=[];
var index = 0;
fs.createReadStream('./GDS.csv')
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvrow) {
        if (index) {
          // console.log(csvrow);
          //process row
          var unit = {};
          unit["name"] = csvrow[0];

          var archiesDict = getHierarchyDict(csvrow[4]);

          var other_names = [];
          other_names.push({
            "name": getFullName(archiesDict)
          });
          unit["other_names"] = other_names;

          var identifiers = [];
          identifiers.push({
            "scheme": "OID",
            "identifier": csvrow[1]
          });
          unit["identifiers"] = identifiers;
          unit["parent"] = getParent(archiesDict);

          var contact_details = [];
          contact_details.push({
            "type": "voice",
            "label": "電話",
            "value": csvrow[2]
          });
          contact_details.push({
            "type": "address",
            "value": csvrow[3]
          })
          unit["contact_details"] = contact_details;
          
          units.push(unit);
        }
        index++;
    })
    .on('end',function() {
      //do something with csvData
      // console.log(units);
      fs.writeFileSync('./data.json', JSON.stringify(units), 'utf-8');
    });
