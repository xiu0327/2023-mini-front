var bookings = { 
    view:"dbllist",
    id: "bookings",
    list:{ 
      autoheight: true,
      select: false,
      template:function(obj, common){
        var dir = (common.id  === "left" ? "right" : "left");
        return obj.value + "<span class='select_one webix_icon mdi mdi-arrow-"+dir+"'></span>"
      },
      onClick:{
        "select_one":function(e, id){
            /*
            화살표를 눌렀을 때 발생할 이벤트 함수
            this.getItem(id) : id에 해당하는 data값 가벼오기
            this.config.$id : 선택한 데이터의 위치 (left, right)
            this.updateItem(pre, next) : id에 해당하는 data를 next 값으로 변경
            this.getTopParentView().select(id, mode) : mode = true(할당 O), false(할당 X) / id를 mode로 이동
            */
          var mode = this.config.$id === "left";
          this.getTopParentView().select(id, mode);
          return false;
        }
      }
    },
    labelLeft:"진료 예약 목록",
    labelRight:"할당된 진료 예약 목록",
    buttons:false,
    data: [
      {id: 1, value: "루루(김아무개)/고양이/11:00", timeNo: 1},
      {id: 2, value: "나비(오아무개)/고양이/11:30", timeNo: 2},
      {id: 3, value: "복실(정아무개)/강아지/14:00", timeNo: 3},
      {id: 4, value: "김덕팔(이아무개)/강아지/9:00", timeNo: 4}
      ]
  };


webix.ui({
    view:"form",
    id:"f1", 
    width:700,
    rows:[
        {
            view:"toolbar",
            paddingY:2,
            cols:[
                {
                    view:"datepicker",
                    id:"bookingDate",
                    inputWidth:300,
                    label: '일자',
                    format: "%Y년 %m월 %d일",
                    labelWidth:90
                },
                {
                    view:"combo", width:350, label: '담당 수의사', labelWidth:100, name:"fruit2",
                    value:1, options:{
                      body:{
                        data:[
                          { id:1, value:"홍길동" },
                          { id:2, value:"김동팔" },
                          { id:3, value:"이광춘" }
                        ],
                        on:{
                          'onItemClick':function(id){
                            webix.message("Clicked: "+this.getItem(id).value);
                          }
                        }
                      }
                    }},
            ]
        },
        { 
            view:"forminput", 
            id:"bookingForm", 
            name:"booking", 
            body:bookings, 
            labelWidth:0 },
        {
            view:"toolbar", 
            paddingY:2,
            cols:[
                {},
                { 
                    view:"button", 
                    value:"초기화", 
                    width:150, 
                    click: function() { 
                        let data = $$("bookings").config.data; // 리스트에 현존하는 전체 데이터
                        data.map(item => $$("bookings").select([item.id], false));
                        console.log("할당 내용 초기화");
                    } 
                },
                { 
                    view:"button", 
                    value:"저장", 
                    width:150,
                    click: function() {
                        /*
                        console.log($$("bookings").$$("left").data.serialize()); : 왼쪽(할당 X)인 데이터 가져오기
                        console.log($$("bookings").$$("right").data.serialize()); : 오른쪽 (할당 O)인 데이터 가져오기
                        */
                        console.log($$("bookings").$$("right").data.serialize());
                        console.log($$("bookingDate").getValue());
                        console.log("할당 내용 저장");
                    } 
                },
                {}
            ]
          }
    ]
});

/* 할당되어 있는 진료 활성화 */
$$("f1").setValues({
    booking:"3"
})

$$("bookingDate").attachEvent("onChange", function(newValue, oldValue, config){
    console.log("일자가 변경될 때마다 진료 예약 데이터 변경");
});
