const navbarMediaFunc = (evt)=>{
    let item = evt.target;
    $(".navbar-start > .navbar-item > .navbar-link").each((innerIdx, innerItem)=>{
        if(item != innerItem){
            $(innerItem).next().hide();
        }else{
            $(innerItem).next().toggle();
        }
    });
}
const navbarEventHandler = ()=>{
    $(".navbar-dropdown").attr("style", "");
    if(window.matchMedia("screen and (max-width: 1023px)").matches){
        $(".navbar-start > .navbar-item > .navbar-link").each((idx, item)=>{
            item.addEventListener("click", navbarMediaFunc, true);
        });
    }else{
        $(".navbar-start > .navbar-item > .navbar-link").each((idx, item)=>{
            item.removeEventListener("click", navbarMediaFunc, true);
        });
    }
}
$(document).ready(function() {
    $(".navbar-burger").click(function() {
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });

    navbarEventHandler();
    window.addEventListener("resize", ()=>{
        navbarEventHandler();
    });
});

function handleWrapAgreement() {
    $("#agreementWrap").toggle();
}

function handleWrapPrivacy() {
    $("#privacyWrap").toggle();
}

function makePagination(param){
    let pageClass = "";
    if(typeof param.isSmall != "undefined" && param.isSmall) pageClass += " custom-is-small";
    let pagerId = "pager";
    if(typeof param.pagerId != "undefined") pagerId = param.pagerId;

    let gridId = "grid";
    if(typeof param.gridId != "undefined") gridId = param.gridId;

    let firstAndLastHide = "";
    if(typeof param.hasFirstAndLast != "undefined" && !param.hasFirstAndLast) firstAndLastHide = " style='display: none;'";

    let pageSize = 10;
    if(typeof param.pageSize != "undefined" && param.pageSize) pageSize = param.pageSize;

    let pageFrag = `
        <nav id="${pagerId }Nav" class="pagination is-centered${pageClass }" aria-label="pagination">
            <a class="pagination-previous first"${firstAndLastHide }><<</a>
            <a class="pagination-previous prev"><</a>
            <a class="pagination-next next">></a>
            <a class="pagination-next last"${firstAndLastHide }>>></a>
        </nav>
    `;

    $("#" + pagerId).html("");
    $("#" + pagerId).append(pageFrag);
    $("#" + pagerId + "Nav").twbsPagination({
        totalPages: $("#" + gridId).getGridParam("lastpage"),	// 총 페이지 번호 수
        visiblePages: pageSize,	// 하단에서 한번에 보여지는 페이지 번호 수
        startPage : $("#" + gridId).getGridParam("page"), // 시작시 표시되는 현재 페이지
        initiateStartPageClick: false,	// 플러그인이 시작시 페이지 버튼 클릭 여부 (default : true)
        paginationClass: "pagination-list",	// ul 클래스
        first : " ",	// 페이지네이션 버튼중 처음으로 돌아가는 버튼에 쓰여 있는 텍스트
        prev : " ",	// 이전 페이지 버튼에 쓰여있는 텍스트
        next : " ",	// 다음 페이지 버튼에 쓰여있는 텍스트
        last : " ",	// 페이지네이션 버튼중 마지막으로 가는 버튼에 쓰여있는 텍스트
        nextClass : "hide hide-pagination-next",	// 이전 페이지 CSS class
        prevClass : "hide hide-pagination-prev",	// 다음 페이지 CSS class
        lastClass : "hide hide-pagination-last",	// 마지막 페이지 CSS calss
        firstClass : "hide hide-pagination-first",	// 첫 페이지 CSS class
        pageClass : "",	// 페이지 버튼의 CSS class
        activeClass : "selected",	// 클릭된 페이지 버튼의 CSS class
        disabledClass : "unselected",	// 클릭 안된 페이지 버튼의 CSS class
        anchorClass : "pagination-link",	//버튼 안의 앵커에 대한 CSS class
        onPageClick: function (event, page) {
            $("#" + gridId).trigger("reloadGrid", [ { page: page } ] );
        }
    });

    $("#" + pagerId + " .pagination .selected a").addClass("is-current");
    $("#" + pagerId + " .pagination .pagination-previous.prev").on("click", ()=>{
        $("#" + pagerId + " .pagination .hide-pagination-prev").click();
    });
    $("#" + pagerId + " .pagination .pagination-next.next").on("click", ()=>{
        $("#" + pagerId + " .pagination .hide-pagination-next").click();
    });
    $("#" + pagerId + " .pagination .pagination-previous.first").on("click", ()=>{
        $("#" + pagerId + " .pagination .hide-pagination-first").click();
    });
    $("#" + pagerId + " .pagination .pagination-next.last").on("click", ()=>{
        $("#" + pagerId + " .pagination .hide-pagination-last").click();
    });
}
