const nowDateJson = +new Date();
const index = {
    async init () {
        try {
            // 공지사항
            const noticeList = await requestArticles(59);
            document.querySelector('.notice > ul').innerHTML = renderArticles(noticeList);
            
            // 보도
            // const bodoList = await requestArticles(61);
            // document.querySelector('.bodo > ul').innerHTML = renderArticles(bodoList);
        } catch (e) {
            console.error(e);
        }
    },
};

const requestArticles = (id) => {
    return new Promise((resolve, reject) => {
        $.getJSON(`${CONTEXT_PATH}/article/${id}.json?version=${nowDateJson}`)
            .done(res => resolve(res))
            .fail(err => reject(err));
    });
};

const renderArticles = (result) => {
	// 최대 5개로 고정
	if (result) {
		if (result.length > 5) {
			result.splice(5, result.length - 5);
		}
	}
	
	return result.map(({ articleCode, articleSeq, title, regDate }, index) => {
		const nowDateD = new Date();
		const regDateD = stringToDate(regDate);
		const diff = (nowDateD.getTime() - regDateD.getTime()) / 1000 / 60 / 60 / 24;
		
		return `<li>
					<a href="${CONTEXT_PATH}/kor/article/${articleCode}/${articleSeq}">
						<strong>${title}</strong>
						${diff < 7 ? `<i>NEW</i>` : ``}
						<span>${regDate.split(' ')[0]}</span>
					</a>
				</li>`;
	}).join('');
};

function stringToDate(value) {
	if (value == null || value == '') return;
	
    let year = value.substring(0, 4);
    let month = value.substring(5, 7);
    let day = value.substring(8, 10);
    let hour = value.substring(11, 13);
    let minute = value.substring(14, 16);
    let second = value.substring(17, 19);
    
    return new Date(year, month - 1, day, hour, minute, second);
}

function preview(siteCode, articleCode, seq) {
    document.previewForm.action = `${CONTEXT_PATH}/${siteCode}/article/${articleCode}/${seq}/preview`;
    document.previewForm.target = "_blank";
    document.previewForm.submit();
}