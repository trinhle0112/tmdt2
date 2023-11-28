$(document).ready(function(){

    function changePagination(partnerItemList){
        var items = partnerItemList;
        var numItems = items.length;
        var perPage = 6;
        items.slice(perPage).hide();
    
        $('.post-pagination').pagination({
            items: numItems,
            itemsOnPage: perPage,
            prevText: "<",
            nextText: ">",
            onPageClick: function(pageNumber){
                var showFrom = perPage * (pageNumber - 1);
                var showTo = showFrom + perPage;
                items.hide().slice(showFrom, showTo).show();
            }
        });
    }
  
    const getPartnerList = () => {
        $.getJSON("/assets/data/partners.json", (data) => {
            data.forEach(partnerItem => {
                createPartnerList(partnerItem);
            })
        changePagination($('.partners-grid .partner-item'));
        });
    }
    const partnerList = document.querySelector(".partners-grid");

    function createPartnerList(partnerItems){
        let code = `
            <div class="partner-item wow pixFadeUp" data-wow-delay="0.3s">
                <div class="partner-info">
                    <img loading="lazy" src="${partnerItems.partnerLogo}" alt="" class="partner-overview-logo">
                    <h5 class="partner-name">${partnerItems.partnerName}</h5>
                    <p class="partner-description">
                        "${partnerItems.partnerDescription}"
                    </p>
                    <div class="learn-more">
                        <div>
                        <a href="${partnerItems.partnerLearnMoreLink}" class="partner-link w-inline-block">
                            Learn more
                        </a>
                        </div>
                        <div class="learn-more-arrow">
                            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.93333 5.68333C9.89367 5.58103 9.8342 5.48758 9.75833 5.40833L5.59167 1.24166C5.51397 1.16396 5.42173 1.10233 5.32021 1.06028C5.21869 1.01823 5.10988 0.996582 5 0.996582C4.77808 0.996582 4.56525 1.08474 4.40833 1.24166C4.33063 1.31936 4.269 1.4116 4.22695 1.51312C4.1849 1.61464 4.16326 1.72344 4.16326 1.83333C4.16326 2.05524 4.25141 2.26807 4.40833 2.42499L7.15833 5.16666H0.833333C0.612319 5.16666 0.400358 5.25446 0.244078 5.41074C0.0877975 5.56702 0 5.77898 0 5.99999C0 6.22101 0.0877975 6.43297 0.244078 6.58925C0.400358 6.74553 0.612319 6.83333 0.833333 6.83333H7.15833L4.40833 9.57499C4.33023 9.65246 4.26823 9.74463 4.22592 9.84618C4.18362 9.94773 4.16183 10.0566 4.16183 10.1667C4.16183 10.2767 4.18362 10.3856 4.22592 10.4871C4.26823 10.5887 4.33023 10.6809 4.40833 10.7583C4.4858 10.8364 4.57797 10.8984 4.67952 10.9407C4.78107 10.983 4.88999 11.0048 5 11.0048C5.11001 11.0048 5.21893 10.983 5.32048 10.9407C5.42203 10.8984 5.5142 10.8364 5.59167 10.7583L9.75833 6.59166C9.8342 6.51241 9.89367 6.41895 9.93333 6.31666C10.0167 6.11377 10.0167 5.88621 9.93333 5.68333Z" fill="currentColor"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        `;
        partnerList.innerHTML += code;
    }
    getPartnerList();
    
});


