/**
 * Food
 * ==============================================
 * @author MAYEYE_JAR
 * @history 작성일            작성자     변경내용
 * @history 2020-02-07  MAYEYE_JAR   최초 작성
 * ==============================================
 */
const CAMPUS_GUIDE_URL = `${CONTEXT_PATH}/${siteCode}/api/campusGuide`;
let smap_marker = []; //본관
let cmap_marker = []; //대덕밸리

const campusGuide = {
    async list(){
        smap_marker = await campusGuides('CAT092');
        cmap_marker = await campusGuides('CAT094');

        /////////////////////////////////////////
        // JS 맵 실행
        /////////////////////////////////////////
        changeMobileUI();
        // 초기 설정
        init();
        // 초기 캠퍼스 UI
        initUI();
        // 초기 지도 설정
        initMap();
        drawCampusMap();
        // 초기 이벤트 설정
        initEventListener();
    },
    view(id){
        JSON_URL = `${CAMPUS_GUIDE_URL}/${id}`;
    },
};

const campusGuides = (categorySeq) => {
    //원본
    // return new Promise((resolve, reject) => {
    //     $.ajaxGet(`${CAMPUS_GUIDE_URL}/${categorySeq}`, null)
    //         .done(res => resolve(res))
    //         .fail(err => reject(err))
    // });

    //임시
    return new Promise((resolve, reject) => {
        $.ajaxGet(`/pcu_cmap/json/${categorySeq}.json`, null)
            .done(res => resolve(res))
            .fail(err => reject(err))
    });
};
