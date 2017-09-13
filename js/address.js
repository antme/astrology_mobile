
var first = []; /* 省，直辖市 */
var second = []; /* 市 */
var third = []; /* 镇 */

var year = []
var month = [];
var day = [];
var house = [];
var mine = [];

var selectYear = 0;
var selectMonth = 0;

for(var i=0;i<101;i++){
  year.push({"text":1970+i,"name":i});
}

for(var i=0;i<12;i++){
  if(i<9){
    month.push({"text":"0" +(1+i),"name":i});
  }else{
    month.push({"text":1+i,"name":i});
  }
}
for(var i=0;i<31;i++){
  if(i<9){
    day.push({"text":"0"+(1+i),"name":i});
  }else{
    day.push({"text":1+i,"name":i});
  }
}
for(var i=0;i<24;i++){
  if(i<9){
    house.push({"text":"0"+i,"name":i});
  }else{
    house.push({"text":i,"name":i});
  }
}
for(var i=0;i<60;i++){
  if(i<9){
    mine.push({"text":"0"+i,"name":i});
  }else{
    mine.push({"text":i,"name":i});
  }
}





var selectedIndex = [0, 0, 0]; /* 默认选中的地区 */

var selectedIndex2 = [30, 0, 0, 0, 0]; /* 默认选中的时间 */

var checked = [0, 0, 0]; /* 已选选项 */
var checked2 = [0, 0, 0, 0, 0]; /* 已选选项 */

function creatList(obj, list){
  obj.forEach(function(item, index, arr){
  var temp = new Object();
  temp.text = item.name;
  temp.value = index;
  list.push(temp);
  })
}

var checkTimer = function (times) {
  var arr = times.split(" ");
  var ye = arr[0].split("-");
  var ho = arr[1].split(":");
  var y = Number(ye[0]);
  y = y - 1970;
  var m = Number(ye[1]);
  m = m - 1;
  var d = Number(ye[2]);
  d = d - 1;

  var h = Number(ho[0]);
  var min = Number(ho[1]);
  selectedIndex2 = [y, m, d, h, min];
  picker2.selectedIndex = selectedIndex2;
}

creatList(city, first);

if (city[selectedIndex[0]].hasOwnProperty('sub')) {
  creatList(city[selectedIndex[0]].sub, second);
} else {
  second = [{text: '', value: 0}];
}

if (city[selectedIndex[0]].sub[selectedIndex[1]].hasOwnProperty('sub')) {
  creatList(city[selectedIndex[0]].sub[selectedIndex[1]].sub, third);
} else {
  third = [{text: '', value: 0}];
}

var picker = new Picker({
	data: [first, second, third],
  selectedIndex: selectedIndex,
	title: ''
});

var picker2 = new Picker({
	data: [year, month, day, house, mine],
  selectedIndex: selectedIndex2,
	title: ''
});

picker.on('picker.select', function (selectedVal, selectedIndex) {
  var text1 = first[selectedIndex[0]].text;
  var text2 = second[selectedIndex[1]].text;
  var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';
  document.getElementById(nameEl).setAttribute('value',text1 + ' ' + text2 + ' ' + text3);
  $('#'+nameEl).val(text1 + ' ' + text2 + ' ' + text3);
});

picker2.on('picker.select', function (selectedVal, selectedIndex) {
  var text1 = year[selectedIndex[0]].text;
  var text2 = month[selectedIndex[1]].text;
  var text3 = day[selectedIndex[2]].text;
  var text4 = house[selectedIndex[3]].text;
  var text5 = mine[selectedIndex[4]].text;
  document.getElementById(timer).setAttribute('value',text1 + '/' + text2 + '/' + text3 + ' ' + text4 + ':' + text5);
  $('#'+timer).val(text1 + '/' + text2 + '/' + text3 + ' ' + text4 + ':' + text5);
  console.log($('#'+timer).val());
});

picker2.on('picker.change', function (index, selectedIndex) {
   if (index === 0) {
    selectYear = 1970 + selectedIndex;
    if(selectMonth === 1){
      day=[];
      if(rn(selectYear)){
        for(var i=0;i<29;i++){
          if(i<9){
            day.push({"text":"0" +(1+i),"name":i});
          }else{
            day.push({"text":1+i,"name":i});
          }
        }
      }else{
        for (var j = 0; j < 28; j++) {
          if (i < 9) {
            day.push({"text":"0" +(1+j),"name":j});
          } else {
            day.push({"text":1+j,"name":j});
          }
        }
      }
      picker2.refillColumn(2, day);
      picker2.scrollColumn(2, 0);
    }
   } else if (index === 1) {
    selectMonth = selectedIndex;
    if (selectedIndex === 1) {
      day = [];
      if (rn(selectYear)) {
        for(var i=0;i<29;i++){
          if(i<9){
            day.push({"text":"0" +(1+i),"name":i});
          }else{
            day.push({"text":1+i,"name":i});
          }
        }
      }else{
        for(var i=0;i<28;i++){
          if(i<9){
            day.push({"text":"0" +(1+i),"name":i});
          }else{
            day.push({"text":1+i,"name":i});
          }
        }
      }
      
    }else if(selectedIndex ===0 || selectedIndex === 2 || selectedIndex === 4 || selectedIndex === 6 || selectedIndex === 7 || selectedIndex === 9 || selectedIndex=== 11){
      day=[];
      for(var i=0;i<31;i++){
        if(i<9){
          day.push({"text":"0" +(1+i),"name":i});
        }else{
          day.push({"text":1+i,"name":i});
        }
      }
    }else{
      day=[];
      for(var i=0;i<30;i++){
        if(i<9){
          day.push({"text":"0" +(1+i),"name":i});
        }else{
          day.push({"text":1+i,"name":i});
        }
      }
    }
    picker2.refillColumn(2, day);
    picker2.scrollColumn(2, 0);
   }
});

var rn = function (years) {
  if (((years % 4)==0) && ((years % 100)!=0) || ((years % 400)==0)) {
    return true;
  } else { 
    return false; 
  }
}

picker.on('picker.change', function (index, selectedIndex) {
  if (index === 0){
    firstChange();
  } else if (index === 1) {
    secondChange();
  }

  function firstChange() {
    second = [];
    third = [];
    checked[0] = selectedIndex;
    var firstCity = city[selectedIndex];
    if (firstCity.hasOwnProperty('sub')) {
      creatList(firstCity.sub, second);

      var secondCity = city[selectedIndex].sub[0]
      if (secondCity.hasOwnProperty('sub')) {
        creatList(secondCity.sub, third);
      } else {
        third = [{text: '', value: 0}];
        checked[2] = 0;
      }
    } else {
      second = [{text: '', value: 0}];
      third = [{text: '', value: 0}];
      checked[1] = 0;
      checked[2] = 0;
    }

    picker.refillColumn(1, second);
    picker.refillColumn(2, third);
    picker.scrollColumn(1, 0)
    picker.scrollColumn(2, 0)
  }

  function secondChange() {
    third = [];
    checked[1] = selectedIndex;
    var first_index = checked[0];
    if (city[first_index].sub[selectedIndex].hasOwnProperty('sub')) {
      var secondCity = city[first_index].sub[selectedIndex];
      creatList(secondCity.sub, third);
      picker.refillColumn(2, third);
      picker.scrollColumn(2, 0)
    } else {
      third = [{text: '', value: 0}];
      checked[2] = 0;
      picker.refillColumn(2, third);
      picker.scrollColumn(2, 0)
    }
  }

});

picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
  console.log(selectedIndex);
  var text1 = first[selectedIndex[0]].text;
  var text2 = second[selectedIndex[1]].text;
  var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';
 // $('#'+nameEl).val(text1 + ' ' + text2 + ' ' + text3);
  document.getElementById(nameEl).setAttribute('value',text1 + ' ' + text2 + ' ' + text3);
});

picker2.on('picker.valuechange', function (selectedVal, selectedIndex) {
  console.log(selectedIndex);
  var text1 = year[selectedIndex[0]].text;
  var text2 = month[selectedIndex[1]].text;
  var text3 = day[selectedIndex[2]].text;
  var text4 = house[selectedIndex[3]].text;
  var text5 = mine[selectedIndex[4]].text;
 // $('#'+nameEl).val(text1 + ' ' + text2 + ' ' + text3);
  document.getElementById(timer).setAttribute('value',text1 + ' ' + text2 + ' ' + text3);
  console.log($('#'+timer).val());
});

