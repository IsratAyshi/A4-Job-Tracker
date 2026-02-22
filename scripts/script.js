

let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-filter-btn';

let total = document.getElementById('total');
let availableTotalCount = document.getElementById('availableJob-count')
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');

const allCardSection = document.getElementById('allCards');

function calculateCount() {
    const totalJobs = allCardSection.children.length;
    total.innerText = totalJobs; //8
    // availableTotalCount.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    if (currentStatus == "all-filter-btn"){
        availableTotalCount.innerText = `${totalJobs}`;
    }
    else if (currentStatus == "interview-filter-btn"){
        availableTotalCount.innerText = `${interviewList.length} of ${totalJobs}`;
    }
    else if (currentStatus == "rejected-filter-btn"){
        availableTotalCount.innerText = `${rejectedList.length} of ${totalJobs}`;
    }
}
calculateCount();

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

function toggleStyle(id) {
    // adding white bg for all
    allFilterBtn.classList.add('btn-ghost', 'bg-white');
    interviewFilterBtn.classList.add('btn-ghost', 'bg-white');
    rejectedFilterBtn.classList.add('btn-ghost', 'bg-white');

    // if any button has primary then remove
    allFilterBtn.classList.remove('bg-[#3b82f6FF]', 'text-white');
    interviewFilterBtn.classList.remove('bg-[#3b82f6FF]', 'text-white');
    rejectedFilterBtn.classList.remove('bg-[#3b82f6FF]', 'text-white');

    currentStatus = id; // current status by default 'all'
    // console.log(currentStatus)

    const selected = document.getElementById(id);
    // console.log(selected);

    // adding primary to current button
    selected.classList.remove('btn-ghost', 'bg-white')
    selected.classList.add('bg-[#3b82f6FF]', 'text-white')
    // step 1 finish
}
