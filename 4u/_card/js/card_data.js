/**
 * 순번,유형,그룹,문항
 */
var questArray = new Array(48);
var idx = 0;
questArray[idx++] = '01,R,G1,식물키우기';
questArray[idx++] = '02,R,G1,동물키우기';
questArray[idx++] = '03,R,G1,요리하기';

questArray[idx++] = '04,R,G2,전자제품 다루기';

questArray[idx++] = '05,R,G3,도구(기계) 다루기';
questArray[idx++] = '06,R,G3,모형 조립하기';

questArray[idx++] = '07,R,G4,야외 활동하기';

questArray[idx++] = '08,R,G5,운동하기';

questArray[idx++] = '09,I,G6,별자리 관찰하기';

questArray[idx++] = '10,I,G7,곤충(미생물) 키우기';

questArray[idx++] = '11,I,G8,완구 제품 개조하기';

questArray[idx++] = '12,I,G9,DIY 제작해보기';

questArray[idx++] = '13,I,G10,천연 방향제 만들기';

questArray[idx++] = '14,I,G11,애견 카페가기';

questArray[idx++] = '15,I,G12,박물관 관람하기';
questArray[idx++] = '16,I,G12,외국인과 대화하기';

questArray[idx++] = '17,A,G13,음악 감상하기';
questArray[idx++] = '18,A,G13,악기 연주하기';

questArray[idx++] = '19,A,G14,그림(만화) 그리기';
questArray[idx++] = '20,A,G14,의상 코디하기';
questArray[idx++] = '21,A,G14,옷이나 물건 디자인하기';

questArray[idx++] = '22,A,G15,방송국에 사연 보내기';

questArray[idx++] = '23,A,G16,사람들 앞에서 춤추기';
questArray[idx++] = '24,A,G16,노래나 연기하기';

questArray[idx++] = '25,S,G17,어린아이 돌보기';
questArray[idx++] = '26,S,G17,모임 활동하기';
questArray[idx++] = '27,S,G17,다른 사람 가르치기';
questArray[idx++] = '28,S,G17,함께 공부하기';
questArray[idx++] = '29,S,G17,문제 해결하도록 돕기';

questArray[idx++] = '30,S,G18,주변사람 돕기';
questArray[idx++] = '31,S,G18,고민 상담하기';
questArray[idx++] = '32,S,G18,봉사활동 참여하기';

questArray[idx++] = '33,E,G19,모임 주도하기';
questArray[idx++] = '34,E,G19,새로운 일에 도전하기';

questArray[idx++] = '35,E,G20,다른 사람 설득하기';
questArray[idx++] = '36,E,G20,외국어로 말하기';

questArray[idx++] = '37,E,G21,발표(연설)하기';
questArray[idx++] = '38,E,G21,자신의 목표 세우기';

questArray[idx++] = '39,E,G22,스스로 용돈 벌어보기';
questArray[idx++] = '40,E,G22,아르바이트 해보기';

questArray[idx++] = '41,C,G23,문서 작성하기';
questArray[idx++] = '42,C,G23,규칙적인 생활하기';
questArray[idx++] = '43,C,G23,자료 분류하기';
questArray[idx++] = '44,C,G23,자료 정리하고 검토하기';

questArray[idx++] = '45,C,G24,숫자나 차트 이용하기';
questArray[idx++] = '46,C,G24,일일 계획 세우기';
questArray[idx++] = '47,C,G24,책상 정리하기';
questArray[idx++] = '48,C,G24,실내 활동하기';



var typeString = [
	'r||<h3 class="ty_r"><strong>실재형</strong>의 특징<span>(Realistic)</span></h3><ul class="result_feature ty_r"><li><span><span class="ico01"></span></span>운동, 감각이나 기계적 감각이 있다.</li><li><span><span class="ico02"></span></span>물건, 기계, 도구를 다루며 밖에서 일하는 것을 좋아한다.</li><li><span><span class="ico03"></span></span>모형을 제작하거나 요리를 하고 동물, 식물 기르는 일을 즐긴다.</li><li><span><span class="ico04"></span></span>사람들과 어울리는 것 보다 물건을 갖고 노는 것을 더 좋아한다.</li></ul>',
	'i||<h3 class="ty_i"><strong>탐구형</strong>의 특징<span>(Investigative)</span></h3><ul class="result_feature ty_i"><li><span><span class="ico01"></span></span>수학, 과학에 소질이 있다.</li><li><span><span class="ico02"></span></span>학문적이며 관찰, 조사 분석 등을 하며 어려운 문제를 풀거나 혼자 일하는 것을 좋아한다.</li><li><span><span class="ico03"></span></span>퍼즐이나 실험, 데이터 분석을 즐긴다.</li><li><span><span class="ico04"></span></span>사람들과 어울리는 것보다 생각하는 것을 더 좋아한다.</li></ul>',
	'a||<h3 class="ty_a"><strong>예술형</strong>의 특징<span>(Artistic)</span></h3><ul class="result_feature ty_a"><li><span><span class="ico01"></span></span>예술적 감각이나 상상력이 풍부하다.</li><li><span><span class="ico02"></span></span>틀에 박히지 않은 상황에서 자유롭게 새로운 창작 활동을 즐기며 획기적이거나 직감적이다.</li><li><span><span class="ico03"></span></span>공연을 좋아하고 시각적인 예술을 즐긴다.</li><li><span><span class="ico04"></span></span>물건을 갖고 노는 것 보다 생각하는 것을 좋아한다.</li></ul>',
	's||<h3 class="ty_s"><strong>사회형</strong>의 특징<span>(Social)</span></h3><ul class="result_feature ty_s"><li><span><span class="ico01"></span></span>언어 능력이 발달하였고 사교적 성격을 소유하고 있다.</li><li><span><span class="ico02"></span></span>사회적 관계에 관심이 있고 대중 앞에서 도움이 되는 말을 잘한다.</li><li><span><span class="ico03"></span></span>사람들이 문제를 해결하도록 상담하거나 돕거나 가르치는 일을 즐긴다.</li><li><span><span class="ico04"></span></span>물건을 갖고 노는 것 보다 사람과 어울리는 것을 더 좋아한다.</li></ul>',
	'e||<h3 class="ty_e"><strong>기업형</strong>의 특징<span>(Enterprising)</span></h3><ul class="result_feature ty_e"><li><span><span class="ico01"></span></span>리더쉽이 있고 언어 구사 능력을 갖고 있다.</li><li><span><span class="ico02"></span></span>영향력을 행사하는 것을 좋아하고 경제나 정치에 관심이 있다.</li><li><span><span class="ico03"></span></span>자기 주장이 강하며 물건을 갖고 놀거나 생각하는 것 보다 데이터를 다루거나 사람들과 어울리는 것을 더 좋아한다.</li></ul>',
	'c||<h3 class="ty_c"><strong>관습형</strong>의 특징<span>(Conventional)</span></h3><ul class="result_feature ty_c"><li><span><span class="ico01"></span></span>사무적인 일이나 수학에 소질이 있다.</li><li><span><span class="ico02"></span></span>실내에서 일하면서 정리정돈하는 것을 즐긴다.</li><li><span><span class="ico03"></span></span>데이터 다루는 일을 좋아하고 규칙을 세우고 일정한 틀이나 기준에 따라 행동하는 것을 좋아한다.</li><li><span><span class="ico04"></span></span>사람들과 어울리거나 생각하는 것 보다 단어나 숫자를 다루는 것을 더 좋아한다.</li></ul>'
];



// var groupData = [
// 	'G1||농림환경(농림수산)||생물교육과,기술·가정교육과,생명과학과,식물자원학과,원예학과,동물자원학과,생물산업공학부,산림자원학과,조경학과,식품과학부,식품공학과,',
// 	'G2||기계기술(전기/전자)||전기전자제어공학부,정보통신공학부,컴퓨터공학부,',
// 	'G3||기계기술(기계/건설)||기계자동차공학부,건설환경공학부,건축학전공,건축공학전공,산업시스템공학과,금형설계공학과,생물산업공학부,',
// 	'G4||사회안전(체육)||체육교육과,생활체육지도학과,응급구조학과,',
// 	'G5||운동(체육)||체육교육과,생활체육지도학과,',
// 	'G6||과학||물리교육과,화학교육과,생물교육과,지구과학교육과,컴퓨터교육과,기술·가정교육과,생명과학과,지질환경과학과,대기과학과,간호학과,보건행정학과,응급구조학과,의료정보학과,',
// 	'G7||생활과학||문화재보존과학과,의류상품학과,조형디자인학부,식품과학부,식품공학과,',
// 	'G8||이학공학연구||물리학과,응용수학과,화학과,전기전자제어공학부,정보통신공학부,컴퓨터공학부,기계자동차공학부,건설환경공학부,건축학전공,건축공학전공,금형설계공학과,',
// 	'G9||화학/소재||기술·가정교육과,산업디자인공학부,의류상품학과,화학공학부,신소재공학부,광공학과,',
// 	'G10||산업/안전||환경교육과,환경공학부,산업시스템과학과,금형설계공학과,지역개발학부,생물산업공학부,',
// 	'G11||생명||생물교육과,생명과학과,식물자원학과,원예학과,동물자원학과,산림자원학과,조경학과,특수동물학과,',
// 	'G12||인문사회연구(역사, 사회)||역사교육과,일반사회교육과,사학과,지리학과,경제통상학부,경영학과,관광학부,행정학과,법학과,사회복지학과,문화재보존과학과,산업시스템공학과,지역개발학부,',
// 	'G13||음악(예술)||음악교육과,영상학과,',
// 	'G14||미술(예술)||미술교육과,의류상품학과,게임디자인학과,조형디자인학부,만화애니메이션학부,산업디자인공학부,영상학과,',
// 	'G15||문학(예술)||국어교육과,만화애니메이션학부,영상학과,영어영문학과,독어독문학과,불어불문학과,중어중문학과,',
// 	'G16||방송영상(예술)||무용학과,영상학과,유아교육과,',
// 	'G17||교육(사범)||국어교육과,한문교육과,영어교육과,윤리교육과,교육학과,상업정보교육과,문헌정보교육과,특수교육과,역사교육과,일반사회교육과,지리교육과,유아교육과,수학교육과,물리교육과,화학교육과,생물교육과,지구과학교육과,환경교육과,컴퓨터교육과,기술·가정교육과,체육교육과,음악교육과,미술교육과,',
// 	'G18||사회복지서비스(보건, 사회)||간호학과,응급구조학과,사회복지학과,관광학부,교육학과,보건행정학과,',
// 	'G19||관리경영(경영)||일반사회교육과,상업정보교육과,관광학부,경영학과,경제통상학부,산업시스템공학과,지역개발학부,산업유통학과,',
// 	'G20||사회언론(외국어)||영어교육과,영여영문학과,중어중문학과,불어불문학과,독어독문학과,국제학부,경영학과,경제통상학부,관광학부,행정학과,사회복지학과,산업시스템공학과,',
// 	'G21||사회언론(언어)||국어교육과,한문교육과,영어교육과,영여영문학과,중어중문학과,불어불문학과,독어독문학과,',
// 	'G22||영업판매(경제)||상업정보교육과,경제통상학부,관광학부,의류상품학과,경영학과,산업유통학과,',
// 	'G23||사무행정||문헌정보교육과,경영학과,행정학과,보건행정학과,의료정보학과,',
// 	'G24||세무회계(수학)||수학교육과,경영학과,응용수학과,경제통상학부,'
// ];



var titleData = [
	'r||실재형',
	'i||탐구형',
	'a||예술형',
	's||사회형',
	'e||기업형',
	'c||관습형'
];