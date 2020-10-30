const repo = "https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Item Icons/"
let facilitytypes={
  refinery:[
    {name:"bmatlvl", 
     src:repo+'Materials/SalvageIcon.png'
    },
    {name:"rmatlvl", 
     src:repo+'Materials/ComponentsIcon.png'
    },
    {name:"ematlvl", 
     src:repo+'Materials/SulfurIcon.png'
    },
    {name:"fuellvl", 
     src:repo+'Materials/CrudeOilIcon.png'
    },
  ],
  production:[
    {name:"smallarms",
     src:repo+'Filters/IconFilterSmallWeapons.png'
    },
    {name:"heavyarms",
     src:repo+'Filters/IconFilterHeavyWeapons.png'
    },
    {name:"utility",
     src:repo+'Filters/IconFilterUtility.png'
    },
    {name:"medical",
     src:repo+'Filters/IconFilterMedical.png'
    },
    {name:"supplies",
     src:repo+'Filters/IconFacilitiesSupplies.png'
    }
  ]
}

function GetDateString(datestring){
  let date = new Date(datestring)
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var day = addZero(date.getDate());
  var month = months[date.getMonth()];
  var year = date.getFullYear();
  if(year<1100){
  return "None";
  }
  var hour = addZero(date.getHours());
  var minute = addZero(date.getMinutes());
  var second = addZero(date.getSeconds());
  var string = day+"/"+month+"/"+year+" "+hour+":"+minute+":"+second;
  return string;
}

function addZero(num){
  if(num<10){
  num = "0"+num;
  }
  return num;
}

export default {
  array:facilitytypes,
  GetDate:GetDateString,
  limit:20
}