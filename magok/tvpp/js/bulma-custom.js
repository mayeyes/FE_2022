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
        totalPages: $("#" + gridId).getGridParam("lastpage"),	// ??? ????????? ?????? ???
        visiblePages: pageSize,	// ???????????? ????????? ???????????? ????????? ?????? ???
        startPage : $("#" + gridId).getGridParam("page"), // ????????? ???????????? ?????? ?????????
        initiateStartPageClick: false,	// ??????????????? ????????? ????????? ?????? ?????? ?????? (default : true)
        paginationClass: "pagination-list",	// ul ?????????
        first : " ",	// ?????????????????? ????????? ???????????? ???????????? ????????? ?????? ?????? ?????????
        prev : " ",	// ?????? ????????? ????????? ???????????? ?????????
        next : " ",	// ?????? ????????? ????????? ???????????? ?????????
        last : " ",	// ?????????????????? ????????? ??????????????? ?????? ????????? ???????????? ?????????
        nextClass : "hide hide-pagination-next",	// ?????? ????????? CSS class
        prevClass : "hide hide-pagination-prev",	// ?????? ????????? CSS class
        lastClass : "hide hide-pagination-last",	// ????????? ????????? CSS calss
        firstClass : "hide hide-pagination-first",	// ??? ????????? CSS class
        pageClass : "",	// ????????? ????????? CSS class
        activeClass : "selected",	// ????????? ????????? ????????? CSS class
        disabledClass : "unselected",	// ?????? ?????? ????????? ????????? CSS class
        anchorClass : "pagination-link",	//?????? ?????? ????????? ?????? CSS class
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
