import React, { Component } from 'react';
import './App.scss';

// component imports
import Cards from './components/Cards';

// data imports
import units from './data.json';

class App extends Component {
  render() {

    var names = [];
    var parents = [];
    var problemParents = [];
    var parentsWithEnding = [];
    var datas = [];
    units.forEach(function(unit){
      names.push(unit.name);
      if (unit.parent.length > 0) {
        parents.push(unit.parent);
      }
      var bullets = [];
      unit.contact_details.forEach(function(contact_detail){
        bullets.push(contact_detail.value);
      })
      datas.push({
        title:unit.name, 
        subtitle:unit.parent, 
        bullets:bullets
      });
    })

    parents.forEach(function(parent){
      if (!names.includes(parent)) {
        problemParents.push(parent);
      }
      if (["處", "室"].includes(parent.charAt(parent.length - 1))){
        parentsWithEnding.push(parent);
      }
    })

    var toRemove = [
      "臺灣保安警察總隊",
      "榮民工程股份有限公司行政處",
      "榮民工程股份有限公司業務一處",
      "考試院秘書處",
      "考試院第一組",
      "考試院第二組",
      "考試院第三組",
      "考試院資訊室",
      "公教人員住宅輔建福利互助委員會",
      "國家公園警察大隊",
      "榮民工程股份有限公司營建施工處",
      "第三工程所",
      "第一工程所",
      "第二工程所",
      "工務局養護工程處",
      "國家安全會議國家安全局",
      "財政局稅捐稽徵處",
      "第四工程所",
      "臺灣鐵路管理局工務處",
      "臺灣鐵路管理局材料處",
      "臺灣高等法院檢察署臺灣臺東地方法院檢察署",
      "警政署入出境管理局",
      "桃園國際航空站",
      "宜蘭縣政府地方稅務局",
      "臺東縣政府教育處",
      "基隆市政府教育處",
      "宜蘭縣政府教育處",
      "屏東縣政府教育處",
      "公共工程委員會企劃處",
      "工務局新建工程處",
      "訓練所",
      "司法院司法人員研習所",
      "行政院莫拉克颱風災後重建委員會",
      "交通部臺中港務局",
      "中山科學研究院",
      "貨運服務總所",
      "台灣中油股份有限公司採購處",
      "嘉義市政府教育處",
      "苗栗縣政府農業處",
      "陸軍步兵訓練指揮部暨步兵學校",
      "行政院政府憑證管理中心",
      "臺灣金融控股股份有限公司財務處",
      "花蓮縣政府教育處",
      "工務局採購處",
      "雲林縣政府教育處",
      "苗栗縣政府教育處",
      "花蓮縣政府農業處",
      "陸軍後勤指揮部採購處",
      "國立中山大學",
      "花蓮縣政府觀光處",
      "新竹市政府社會處",
      "花蓮縣政府社會處",
      "花蓮縣政府建設處",
      "新竹縣政府綜合發展處",
      "雲林縣政府民政處",
      "屏東縣政府勞工處",
      "屏東縣政府社會處",
      "屏東縣政府城鄉發展處",
      "基隆市政府社會處",
      "基隆市政府行政處",
      "新竹市政府城市行銷處",
      "屏東縣政府工務處",
      "屏東縣政府農業處"
    ];

    problemParents = problemParents.filter( ( el ) => !toRemove.includes( el ) );

    console.log([...new Set(problemParents)]);
    console.log(problemParents);
    console.log([...new Set(parentsWithEnding)]);
    console.log(parentsWithEnding);

    return (
      <div className="App">
        <Cards datas={datas} />
      </div>
    );
  }
}

export default App;
